import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import {
  verifyHmac,
  exchangeCodeForToken,
  normalizeShop,
  getAppUrl,
} from "@/lib/shopify/oauth";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/shopify/callback
 * Shopify redirige acá tras la autorización. Valida HMAC + state,
 * intercambia el code por access_token y lo guarda en Supabase.
 */
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.redirect(`${getAppUrl()}/sign-in`);

  const url = new URL(req.url);
  const params = url.searchParams;

  // Validar HMAC
  if (!verifyHmac(params)) {
    return Response.redirect(`${getAppUrl()}/dashboard?shopify=error_hmac`);
  }

  // Validar state contra el cookie
  const cookieStore = await cookies();
  const savedState = cookieStore.get("shopify_oauth_state")?.value;
  const state = params.get("state");
  if (!savedState || savedState !== state) {
    return Response.redirect(`${getAppUrl()}/dashboard?shopify=error_state`);
  }

  const shop = normalizeShop(params.get("shop") ?? "");
  const code = params.get("code");
  if (!shop || !code) {
    return Response.redirect(`${getAppUrl()}/dashboard?shopify=error_params`);
  }

  // Intercambiar code por token
  const token = await exchangeCodeForToken(shop, code);
  if (!token) {
    return Response.redirect(`${getAppUrl()}/dashboard?shopify=error_token`);
  }

  // Guardar en Supabase
  const supabase = createAdminClient();
  await supabase.from("profiles").upsert(
    { clerk_user_id: userId },
    { onConflict: "clerk_user_id" }
  );
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (profile) {
    await supabase.from("shopify_stores").upsert(
      {
        user_id: profile.id,
        shop_domain: shop,
        access_token: token.access_token,
        scope: token.scope,
        connected_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  }

  // Limpiar cookies
  cookieStore.delete("shopify_oauth_state");
  cookieStore.delete("shopify_oauth_shop");

  return Response.redirect(`${getAppUrl()}/dashboard?shopify=connected`);
}
