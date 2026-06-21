import { auth } from "@clerk/nextjs/server";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { normalizeShop, buildAuthUrl } from "@/lib/shopify/oauth";

/**
 * GET /api/shopify/auth?shop=mitienda
 * Inicia el flujo OAuth: valida el shop, genera un state anti-CSRF y
 * redirige a la pantalla de autorización de Shopify.
 */
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "No autenticado" }, { status: 401 });

  const url = new URL(req.url);
  const shopInput = url.searchParams.get("shop") ?? "";
  const shop = normalizeShop(shopInput);

  if (!shop) {
    return Response.json(
      { error: "Dominio de tienda inválido. Usá el formato mitienda.myshopify.com" },
      { status: 400 }
    );
  }

  const state = randomBytes(16).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
  });
  cookieStore.set("shopify_oauth_shop", shop, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
  });

  return Response.redirect(buildAuthUrl(shop, state));
}
