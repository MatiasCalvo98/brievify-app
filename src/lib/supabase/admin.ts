import { createClient } from "@supabase/supabase-js";

/**
 * Cliente admin con service_role key.
 * Usar SOLO en Route Handlers server-side — nunca en el cliente.
 * Bypasea RLS: usar solo para operaciones administrativas (webhooks, sync).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
