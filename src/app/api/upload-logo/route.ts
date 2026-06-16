import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/upload-logo
 * Recibe un archivo de imagen (multipart/form-data, campo "file"),
 * lo sube al bucket brand-assets de Supabase Storage y devuelve la URL pública.
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "No autenticado" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return Response.json({ error: "No se envió archivo" }, { status: 400 });

  // Validaciones básicas
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "El archivo debe ser una imagen" }, { status: 400 });
  }
  if (file.size > 2 * 1024 * 1024) {
    return Response.json({ error: "La imagen no puede superar 2MB" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop() ?? "png";
  const path = `${userId}/logo-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("brand-assets")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("brand-assets").getPublicUrl(path);
  return Response.json({ url: data.publicUrl });
}
