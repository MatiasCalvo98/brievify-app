/**
 * Supabase browser client — usar SOLO en Client Components.
 *
 * Integración (paso 5 del plan):
 * - Instalar @supabase/supabase-js y @supabase/ssr
 * - createBrowserClient con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - RLS habilitado en todas las tablas, políticas por auth.uid() mapeado desde el JWT de Clerk
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
