import type { BrandKit } from "@/types";

interface BrandKitRow {
  id: string;
  user_id?: string;
  brand_name: string | null;
  logo_url: string | null;
  color_primary: string | null;
  color_secondary: string | null;
  color_accent: string | null;
  typography_style: string | null;
  business_description: string | null;
  tone: number | null;
  visual_style: string | null;
  updated_at: string | null;
}

/**
 * Convierte una fila de Supabase (snake_case) al tipo BrandKit (camelCase).
 */
export function rowToBrandKit(row: BrandKitRow): BrandKit {
  return {
    id: row.id,
    userId: row.user_id ?? "",
    brandName: row.brand_name ?? "Tu Marca",
    logoUrl: row.logo_url ?? null,
    colorPrimary: row.color_primary ?? "#1a1a1a",
    colorSecondary: row.color_secondary ?? "#f5f2ec",
    colorAccent: row.color_accent ?? "#b8ef35",
    typographyStyle: (row.typography_style ?? "moderna") as BrandKit["typographyStyle"],
    businessDescription: row.business_description ?? "",
    tone: row.tone ?? 60,
    visualStyle: (row.visual_style ?? "minimal") as BrandKit["visualStyle"],
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}
