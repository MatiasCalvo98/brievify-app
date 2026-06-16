"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { GeneratedSection } from "@/types";
import { PreviewFrame } from "./PreviewFrame";
import { ThemeSelector } from "./ThemeSelector";
import type { BrandTokens } from "@/lib/sections/brand-tokens";
import type { ThemeId } from "@/lib/sections/style-themes";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  sections: GeneratedSection[];
  isBuilding: boolean;
  brand?: BrandTokens;
  themeId: ThemeId;
  onThemeChange: (id: ThemeId) => void;
  onSaveDraft?: () => void;
  saveState?: "idle" | "saving" | "saved";
}

export function LivePreview({
  sections,
  isBuilding,
  brand,
  themeId,
  onThemeChange,
  onSaveDraft,
  saveState = "idle",
}: LivePreviewProps) {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const readyCount = sections.filter((s) => s.status === "ready").length;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-2">
            Live preview
          </p>
          {isBuilding ? (
            <Badge variant="amber">Generando</Badge>
          ) : readyCount > 0 ? (
            <Badge variant="neutral">{readyCount} secciones</Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <ThemeSelector value={themeId} onChange={onThemeChange} />
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5">
            {(
              [
                { value: "desktop", icon: Monitor },
                { value: "mobile", icon: Smartphone },
              ] as const
            ).map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setMode(value)}
                className={cn(
                  "flex size-7 cursor-pointer items-center justify-center rounded-md transition-colors",
                  mode === value
                    ? "bg-surface-3 text-bright"
                    : "text-text-2 hover:text-text"
                )}
                aria-label={`Vista ${value}`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <PreviewFrame
          sections={sections}
          mode={mode}
          brand={brand}
          themeId={themeId}
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          disabled={readyCount === 0 || saveState === "saving"}
          onClick={onSaveDraft}
        >
          {saveState === "saving"
            ? "Guardando…"
            : saveState === "saved"
              ? "✓ Guardado"
              : "Guardar borrador"}
        </Button>
        <Button size="sm" disabled={readyCount === 0 || isBuilding}>
          Publicar a Shopify
        </Button>
      </div>
    </div>
  );
}
