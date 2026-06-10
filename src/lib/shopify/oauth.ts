/**
 * Helpers del OAuth flow de Shopify (Custom App).
 *
 * Integración (paso 9 del plan):
 * - /api/shopify/auth inicia el flow con SHOPIFY_API_KEY y SHOPIFY_SCOPES
 * - /api/shopify/callback valida HMAC, intercambia el code por access_token
 *   y lo guarda cifrado en la tabla shopify_stores
 */
export function getShopifyScopes(): string {
  return process.env.SHOPIFY_SCOPES ?? "write_themes,read_themes,read_products";
}
