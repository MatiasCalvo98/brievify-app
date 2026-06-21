import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/shopify/status → { connected: boolean, shop?: string }
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ connected: false });

  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (!profile) return Response.json({ connected: false });

  const { data } = await supabase
    .from("shopify_stores")
    .select("shop_domain")
    .eq("user_id", profile.id)
    .single();

  return Response.json({
    connected: !!data,
    shop: data?.shop_domain ?? null,
  });
}
