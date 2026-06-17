"use client";

import { useState } from "react";
import {
  X,
  LayoutGrid,
  Plus,
  Megaphone,
  Star,
  ShoppingBag,
  Clock,
  FileText,
  Flag,
} from "lucide-react";
import { SECTION_LIBRARY } from "@/lib/sections/library";
import type { SectionCategory, SectionDefinition } from "@/types";
import { cn } from "@/lib/utils";

interface SectionCatalogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (section: SectionDefinition) => void;
  disabled?: boolean;
}

const CATEGORY_META: Record<
  SectionCategory,
  { label: string; icon: typeof Star }
> = {
  hero: { label: "Hero", icon: Flag },
  confianza: { label: "Confianza", icon: Star },
  productos: { label: "Productos", icon: ShoppingBag },
  urgencia: { label: "Urgencia", icon: Clock },
  contenido: { label: "Contenido", icon: FileText },
  cierre: { label: "Cierre", icon: Megaphone },
};

const CATEGORY_ORDER: SectionCategory[] = [
  "hero",
  "confianza",
  "productos",
  "urgencia",
  "contenido",
  "cierre",
];

export function SectionCatalog({
  open,
  onClose,
  onAdd,
  disabled,
}: SectionCatalogProps) {
  const sections = Object.values(SECTION_LIBRARY);

  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: sections.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-30 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="absolute inset-y-0 left-0 z-40 flex w-[340px] max-w-[90%] flex-col border-r border-border bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-lime" />
            <p className="font-heading text-sm font-bold text-bright">
              Secciones CRO
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        <p className="border-b border-border px-4 py-3 text-xs leading-relaxed text-text-2">
          Cada sección viene con principios de conversión incorporados. Tocá
          una para que Brievify la agregue a tu página con el contenido de tu
          marca.
        </p>

        <div className="flex-1 overflow-y-auto p-3">
          {byCategory.map(({ cat, items }) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            return (
              <div key={cat} className="mb-5 last:mb-0">
                <div className="mb-2 flex items-center gap-2 px-1">
                  <Icon size={13} className="text-text-2" />
                  <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-text-2">
                    {meta.label}
                  </p>
                </div>
                <div className="flex flex-col gap-y-1.5">
                  {items.map((section) => (
                    <SectionItem
                      key={section.id}
                      section={section}
                      onAdd={onAdd}
                      disabled={disabled}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function SectionItem({
  section,
  onAdd,
  disabled,
}: {
  section: SectionDefinition;
  onAdd: (s: SectionDefinition) => void;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => onAdd(section)}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-border bg-surface-2 p-3 text-left transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:border-lime/30 hover:bg-surface-3"
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm font-bold text-bright">
          {section.name}
        </p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-text-2">
          {section.croBuiltIn}
        </p>
      </div>
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
          hover && !disabled
            ? "bg-lime text-ink"
            : "bg-surface text-text-2"
        )}
      >
        <Plus size={14} />
      </span>
    </button>
  );
}
