import { Webhook } from "svix";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Webhook de Clerk → sincroniza user.created y user.updated a la tabla profiles.
 * Configurar en Clerk Dashboard → Webhooks → Add endpoint:
 *   URL: https://tu-dominio.com/api/webhooks/clerk
 *   Events: user.created, user.updated
 *   Signing secret → CLERK_WEBHOOK_SECRET en .env.local
 */
export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "CLERK_WEBHOOK_SECRET no configurado" }, { status: 500 });
  }

  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Headers de svix faltantes" }, { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(secret);

  let event: { type: string; data: { id: string; email_addresses: { email_address: string }[] } };
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof event;
  } catch {
    return Response.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const supabase = createAdminClient();
    const email = event.data.email_addresses?.[0]?.email_address ?? null;

    await supabase.from("profiles").upsert(
      { clerk_user_id: event.data.id, email },
      { onConflict: "clerk_user_id" }
    );
  }

  return Response.json({ received: true });
}
