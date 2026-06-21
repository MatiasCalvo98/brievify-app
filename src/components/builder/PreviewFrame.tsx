"use client";

import { useMemo } from "react";
import type { GeneratedSection } from "@/types";
import { renderPage } from "@/lib/sections/renderer";
import { type BrandTokens, DEFAULT_BRAND_TOKENS } from "@/lib/sections/brand-tokens";
import type { ThemeId } from "@/lib/sections/style-themes";
import type { PreviewProduct } from "@/lib/sections/renderer";
import { cn } from "@/lib/utils";

interface PreviewFrameProps {
  sections: GeneratedSection[];
  mode: "desktop" | "mobile";
  brand?: BrandTokens;
  themeId: ThemeId;
  products?: PreviewProduct[];
}

export function PreviewFrame({
  sections,
  mode,
  brand = DEFAULT_BRAND_TOKENS,
  themeId,
  products = [],
}: PreviewFrameProps) {
  const html = useMemo(
    () => renderPage(sections, brand, themeId, products),
    [sections, brand, themeId, products]
  );
  const hasContent = sections.some((s) => s.status === "ready");

  return (
    <div className="flex h-full items-center justify-center overflow-hidden bg-ink p-4">
      {hasContent ? (
        <iframe
          srcDoc={html}
          title="Live preview"
          sandbox="allow-same-origin allow-scripts"
          className={cn(
            "h-full rounded-lg border border-border bg-white transition-all duration-500",
            mode === "mobile" ? "w-[390px]" : "w-full"
          )}
        />
      ) : (
        <div className="text-center">
          <p className="font-heading text-sm font-bold text-text-2">
            Tu página aparece acá
          </p>
          <p className="mt-1 max-w-xs text-xs text-muted">
            Describí lo que querés en el chat y mirá cómo se construye en
            tiempo real, sección a sección.
          </p>
        </div>
      )}
    </div>
  );
}
