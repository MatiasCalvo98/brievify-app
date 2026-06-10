/**
 * Wrapper del Shopify Admin API (REST + GraphQL).
 *
 * Integración (paso 9 del plan):
 * - Leer tema activo y assets vía Themes API
 * - apply_page escribe las secciones al tema SOLO tras aprobación del usuario
 * - access_token cifrado en Supabase, asociado al shop_domain
 */
export const SHOPIFY_API_VERSION = "2025-01";
