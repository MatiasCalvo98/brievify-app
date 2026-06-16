import type { BrandKit } from "@/types";

export interface BrandTokens {
  primary: string;
  secondary: string;
  accent: string;
  brandName: string;
  logoUrl?: string | null;
}

export const DEFAULT_BRAND_TOKENS: BrandTokens = {
  primary: "#1a1a1a",
  secondary: "#f5f2ec",
  accent: "#b8ef35",
  brandName: "Tu Marca",
  logoUrl: null,
};

/**
 * Convierte un BrandKit (de Supabase) a los tokens que consume el renderer.
 */
export function brandKitToTokens(brandKit: BrandKit | null): BrandTokens {
  if (!brandKit) return DEFAULT_BRAND_TOKENS;
  return {
    primary: brandKit.colorPrimary || DEFAULT_BRAND_TOKENS.primary,
    secondary: brandKit.colorSecondary || DEFAULT_BRAND_TOKENS.secondary,
    accent: brandKit.colorAccent || DEFAULT_BRAND_TOKENS.accent,
    brandName: brandKit.brandName || DEFAULT_BRAND_TOKENS.brandName,
    logoUrl: brandKit.logoUrl ?? null,
  };
}
