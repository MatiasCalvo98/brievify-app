import crypto from "crypto";

/**
 * Helpers del OAuth flow de Shopify (Custom App vía Partners).
 */

export function getShopifyScopes(): string {
  return process.env.SHOPIFY_SCOPES ?? "read_products,read_themes,write_themes";
}

export function getApiKey(): string {
  return process.env.SHOPIFY_API_KEY ?? "";
}

export function getApiSecret(): string {
  return process.env.SHOPIFY_API_SECRET ?? "";
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

/**
 * Valida que el shop sea un dominio .myshopify.com legítimo.
 */
export function isValidShop(shop: string): boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/.test(shop);
}

/**
 * Normaliza la entrada del usuario a un dominio .myshopify.com.
 * Acepta "mitienda", "mitienda.myshopify.com" o la URL completa.
 */
export function normalizeShop(input: string): string | null {
  let shop = input.trim().toLowerCase();
  shop = shop.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!shop.includes(".")) shop = `${shop}.myshopify.com`;
  return isValidShop(shop) ? shop : null;
}

/**
 * Construye la URL de autorización de Shopify.
 */
export function buildAuthUrl(shop: string, state: string): string {
  const params = new URLSearchParams({
    client_id: getApiKey(),
    scope: getShopifyScopes(),
    redirect_uri: `${getAppUrl()}/api/shopify/callback`,
    state,
  });
  return `https://${shop}/admin/oauth/authorize?${params.toString()}`;
}

/**
 * Verifica el HMAC de un callback de Shopify (seguridad anti-tampering).
 */
export function verifyHmac(searchParams: URLSearchParams): boolean {
  const hmac = searchParams.get("hmac");
  if (!hmac) return false;

  const params: string[] = [];
  searchParams.forEach((value, key) => {
    if (key !== "hmac" && key !== "signature") {
      params.push(`${key}=${value}`);
    }
  });
  const message = params.sort().join("&");

  const computed = crypto
    .createHmac("sha256", getApiSecret())
    .update(message)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(computed, "utf-8"),
      Buffer.from(hmac, "utf-8")
    );
  } catch {
    return false;
  }
}

/**
 * Intercambia el authorization code por un access token permanente.
 */
export async function exchangeCodeForToken(
  shop: string,
  code: string
): Promise<{ access_token: string; scope: string } | null> {
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: getApiKey(),
      client_secret: getApiSecret(),
      code,
    }),
  });
  if (!res.ok) return null;
  return res.json();
}
