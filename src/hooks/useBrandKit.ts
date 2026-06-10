"use client";

import { useCallback, useEffect, useState } from "react";
import type { BrandKit } from "@/types";

interface UseBrandKitResult {
  brandKit: BrandKit | null;
  isLoading: boolean;
  save: (data: Partial<BrandKit>) => Promise<boolean>;
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
      body: JSON.stringify(data),
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
