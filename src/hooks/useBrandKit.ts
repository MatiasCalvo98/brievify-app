"use client";

import { useCallback, useEffect, useState } from "react";
import type { BrandKit } from "@/types";

interface UseBrandKitResult {
  brandKit: BrandKit | null;
  isLoading: boolean;
  save: (data: Partial<BrandKit>) => Promise<boolean>;
}

/**
 * Convierte el BrandKit (camelCase) al payload snake_case que espera el API POST.
 */
function toPayload(data: Partial<BrandKit>) {
  return {
    brand_name: data.brandName,
    logo_url: data.logoUrl,
    color_primary: data.colorPrimary,
    color_secondary: data.colorSecondary,
    color_accent: data.colorAccent,
    typography_style: data.typographyStyle,
    business_description: data.businessDescription,
    tone: data.tone,
    visual_style: data.visualStyle,
  };
}

export function useBrandKit(): UseBrandKitResult {
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/brand-kit")
      .then((r) => r.json())
      .then(({ data }) => setBrandKit(data ?? null))
      .catch(() => setBrandKit(null))
      .finally(() => setIsLoading(false));
  }, []);

  const save = useCallback(async (data: Partial<BrandKit>): Promise<boolean> => {
    const res = await fetch("/api/brand-kit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toPayload(data)),
    });
    const json = await res.json();
    if (json.data) {
      setBrandKit(json.data);
      return true;
    }
    return false;
  }, []);

  return { brandKit, isLoading, save };
}
