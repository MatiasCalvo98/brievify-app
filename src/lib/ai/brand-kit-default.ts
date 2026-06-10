import type { BrandKit } from "@/types";

/**
 * Brand kit de ejemplo, usado hasta que la Fase 5 (Supabase) traiga el
 * brand kit real del usuario. El system prompt de Claude lo consume igual.
 */
export const DEFAULT_BRAND_KIT: BrandKit = {
  id: "default",
  userId: "default",
  brandName: "Tu Marca",
  logoUrl: null,
  colorPrimary: "#1a1a1a",
  colorSecondary: "#f5f2ec",
  colorAccent: "#b8ef35",
  typographyStyle: "moderna",
  businessDescription:
    "Tienda de e-commerce en Argentina. El usuario todavía no cargó su brand kit — preguntale qué vende, a quién y cuál es su diferencial antes de construir, y adaptá el copy a eso.",
  tone: 60,
  visualStyle: "minimal",
  updatedAt: new Date().toISOString(),
};
