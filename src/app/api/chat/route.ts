import Anthropic from "@anthropic-ai/sdk";
import { randomUUID } from "crypto";
import { auth } from "@clerk/nextjs/server";
import { AI_MODEL } from "@/lib/ai/client";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { TOOLS } from "@/lib/ai/tools";
import { DEFAULT_BRAND_KIT } from "@/lib/ai/brand-kit-default";
import { createAdminClient } from "@/lib/supabase/admin";
import { SECTION_LIBRARY } from "@/lib/sections/library";
import type { BrandKit, GeneratedSection, SectionId } from "@/types";

export const maxDuration = 120;

interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  sections: GeneratedSection[];
}

type Emit = (event: Record<string, unknown>) => void;

const MAX_TOOL_LOOPS = 10;

function handleTool(
  block: Anthropic.ToolUseBlock,
  sections: GeneratedSection[],
  emit: Emit
): string {
  const input = block.input as Record<string, unknown>;

  switch (block.name) {
    case "build_section": {
      const sectionId = input.section_id as SectionId;
      const definition = SECTION_LIBRARY[sectionId];
      if (!definition) {
        return `Error: el section_id "${String(sectionId)}" no existe en la librería.`;
      }
      const section: GeneratedSection = {
        id: randomUUID(),
        sectionId,
        name: definition.name,
        description: String(input.description ?? definition.croBuiltIn),
        status: "ready",
        content: (input.content as Record<string, unknown>) ?? {},
      };
      sections.push(section);
      emit({ type: "section_ready", section });
      return `Sección "${section.name}" creada con id ${section.id}. Ya se muestra en el live preview.`;
    }

    case "update_section": {
      const id = String(input.section_instance_id ?? "");
      const index = sections.findIndex((s) => s.id === id);
      if (index === -1) {
        return `Error: no existe una sección con id ${id}. Secciones actuales: ${sections
          .map((s) => `${s.id} (${s.name})`)
          .join(", ")}`;
      }
      const updated: GeneratedSection = {
        ...sections[index],
        content: {
          ...sections[index].content,
          ...((input.content as Record<string, unknown>) ?? {}),
        },
        description: String(input.description ?? sections[index].description),
        status: "ready",
      };
      sections[index] = updated;
      emit({ type: "section_updated", section: updated });
      return `Sección "${updated.name}" actualizada. El preview ya refleja el cambio.`;
    }

    case "reorder_sections": {
      const orderedIds = (input.ordered_ids as string[]) ?? [];
      const byId = new Map(sections.map((s) => [s.id, s]));
      const reordered = orderedIds
        .map((id) => byId.get(id))
        .filter((s): s is GeneratedSection => Boolean(s));
      const missing = sections.filter((s) => !orderedIds.includes(s.id));
      sections.splice(0, sections.length, ...reordered, ...missing);
      emit({ type: "sections_reordered", orderedIds: sections.map((s) => s.id) });
      return "Secciones reordenadas. El preview muestra el nuevo orden.";
    }

    case "build_full_page": {
      const pageType = String(input.page_type ?? "home");
      const title = String(input.title ?? "Sin título");
      emit({ type: "page_started", title, pageType });
      return `Página "${title}" (${pageType}) iniciada. Ahora llamá a build_section para cada sección recomendada para este tipo de página, en orden de arriba hacia abajo.`;
    }

    case "get_store_data":
      return "La tienda Shopify todavía no está conectada (llega en la Fase 9). Trabajá con el brand kit y contenido de ejemplo realista.";

    case "apply_page":
      return "La publicación a Shopify se habilita en las Fases 9 y 10. Decile al usuario que puede construir y previsualizar todo, y que la publicación con un clic llega pronto.";

    default:
      return `Tool desconocida: ${block.name}`;
  }
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "missing_api_key", message: "Falta ANTHROPIC_API_KEY en .env.local." },
      { status: 500 }
    );
  }

  const body = (await req.json()) as ChatRequestBody;
  const client = new Anthropic();

  // Obtener brand kit real desde Supabase — si falla, usar el default
  let brandKit: BrandKit = DEFAULT_BRAND_KIT;
  try {
    const { userId } = await auth();
    if (userId) {
      const supabase = createAdminClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("clerk_user_id", userId)
        .single();
      if (profile) {
        const { data: bk } = await supabase
          .from("brand_kits")
          .select("id, user_id, brand_name, logo_url, color_primary, color_secondary, color_accent, typography_style, business_description, tone, visual_style, updated_at")
          .eq("user_id", profile.id)
          .single();
        if (bk) {
          brandKit = {
            id: bk.id,
            userId: bk.user_id,
            brandName: bk.brand_name ?? "Tu Marca",
            logoUrl: bk.logo_url ?? null,
            colorPrimary: bk.color_primary ?? "#1a1a1a",
            colorSecondary: bk.color_secondary ?? "#f5f2ec",
            colorAccent: bk.color_accent ?? "#b8ef35",
            typographyStyle: bk.typography_style ?? "moderna",
            businessDescription: bk.business_description ?? DEFAULT_BRAND_KIT.businessDescription,
            tone: bk.tone ?? 60,
            visualStyle: bk.visual_style ?? "minimal",
            updatedAt: bk.updated_at ?? new Date().toISOString(),
          };
        }
      }
    }
  } catch {
    // Seguir con brand kit default
  }

  const sections: GeneratedSection[] = [...(body.sections ?? [])];
  const history: Anthropic.MessageParam[] = (body.messages ?? [])
    .filter((m) => m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const emit: Emit = (event) => {
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      };

      try {
        for (let loop = 0; loop < MAX_TOOL_LOOPS; loop++) {
          const messageStream = client.messages.stream({
            model: AI_MODEL,
            max_tokens: 4096,
            system: buildSystemPrompt({
              brandKit,
              pageType: "home",
              currentSections: sections,
            }),
            tools: TOOLS,
            messages: history,
          });

          messageStream.on("text", (delta) => emit({ type: "text", delta }));

          const final = await messageStream.finalMessage();
          history.push({ role: "assistant", content: final.content });

          const toolUses = final.content.filter(
            (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
          );

          if (final.stop_reason !== "tool_use" || toolUses.length === 0) break;

          const results: Anthropic.ToolResultBlockParam[] = toolUses.map(
            (tool) => ({
              type: "tool_result",
              tool_use_id: tool.id,
              content: handleTool(tool, sections, emit),
            })
          );
          history.push({ role: "user", content: results });
        }

        emit({ type: "done" });
      } catch (error) {
        emit({
          type: "error",
          message: error instanceof Error ? error.message : "Error desconocido",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
