import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { rowToBrandKit } from "@/lib/brand-kit-mapper";

/**
 * GET  /api/brand-kit  → devuelve el brand kit del usuario autenticado
 * POST /api/brand-kit  → crea o actualiza el brand kit
 */

async function getProfileId(clerkUserId: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .single();
  return data?.id ?? null;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "No autenticado" }, { status: 401 });

  const profileId = await getProfileId(userId);
  if (!profileId) return Response.json({ data: null });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brand_kits")
    .select("id, brand_name, logo_url, color_primary, color_secondary, color_accent, typography_style, business_description, tone, visual_style, updated_at")
    .eq("user_id", profileId)
    .single();

  if (error || !data) return Response.json({ data: null });
  return Response.json({ data: rowToBrandKit(data) });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json();
  const supabase = createAdminClient();

  // Asegurar que el profile existe
  await supabase.from("profiles").upsert(
    { clerk_user_id: userId },
    { onConflict: "clerk_user_id" }
  );

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!profile) return Response.json({ error: "Profile no encontrado" }, { status: 500 });

  const payload = {
    user_id: profile.id,
    brand_name: body.brand_name ?? null,
    logo_url: body.logo_url ?? null,
    color_primary: body.color_primary ?? "#1a1a1a",
    color_secondary: body.color_secondary ?? "#f5f2ec",
    color_accent: body.color_accent ?? "#b8ef35",
    typography_style: body.typography_style ?? "moderna",
    business_description: body.business_description ?? null,
    tone: body.tone ?? 60,
    visual_style: body.visual_style ?? "minimal",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("brand_kits")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single();

  if (error || !data) return Response.json({ error: error?.message ?? "Error al guardar" }, { status: 500 });
  return Response.json({ data: rowToBrandKit(data) });
}
