import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function getProfileId(clerkUserId: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .single();
  return data?.id ?? null;
}

/**
 * GET  /api/pages          → lista las páginas del usuario (sin el draft activo)
 * GET  /api/pages?draft=1  → devuelve el último borrador en curso del usuario
 */
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "No autenticado" }, { status: 401 });

  const profileId = await getProfileId(userId);
  if (!profileId) return Response.json({ data: [] });

  const supabase = createAdminClient();
  const url = new URL(req.url);
  const draftOnly = url.searchParams.get("draft");

  if (draftOnly) {
    const { data } = await supabase
      .from("pages")
      .select("id, page_type, title, sections, status, updated_at")
      .eq("user_id", profileId)
      .eq("status", "draft")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return Response.json({ data: data ?? null });
  }

  const { data } = await supabase
    .from("pages")
    .select("id, page_type, title, sections, status, updated_at")
    .eq("user_id", profileId)
    .neq("status", "discarded")
    .order("updated_at", { ascending: false });

  return Response.json({ data: data ?? [] });
}

/**
 * POST /api/pages → crea o actualiza un borrador.
 * Body: { id?, page_type, title, sections, conversation? }
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json();
  const supabase = createAdminClient();

  await supabase.from("profiles").upsert(
    { clerk_user_id: userId },
    { onConflict: "clerk_user_id" }
  );
  const profileId = await getProfileId(userId);
  if (!profileId) return Response.json({ error: "Profile no encontrado" }, { status: 500 });

  const payload = {
    user_id: profileId,
    page_type: body.page_type ?? "home",
    title: body.title ?? "Mi página",
    sections: body.sections ?? [],
    status: body.status ?? "draft",
    updated_at: new Date().toISOString(),
  };

  let result;
  if (body.id) {
    result = await supabase
      .from("pages")
      .update(payload)
      .eq("id", body.id)
      .eq("user_id", profileId)
      .select("id, page_type, title, sections, status, updated_at")
      .single();
  } else {
    result = await supabase
      .from("pages")
      .insert(payload)
      .select("id, page_type, title, sections, status, updated_at")
      .single();
  }

  if (result.error) {
    return Response.json({ error: result.error.message }, { status: 500 });
  }
  return Response.json({ data: result.data });
}
