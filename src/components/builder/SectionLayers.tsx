"use client";

import { useState } from "react";
import { GripVertical, Trash2, Layers } from "lucide-react";
import type { GeneratedSection } from "@/types";
import { cn } from "@/lib/utils";

interface SectionLayersProps {
  sections: GeneratedSection[];
  onReorder: (from: number, to: number) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function SectionLayers({
  sections,
  onReorder,
  onRemove,
  disabled,
}: SectionLayersProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const ready = sections.filter((s) => s.status === "ready");
  if (ready.length === 0) return null;

  const handleDrop = (to: number) => {
    if (dragIndex !== null && dragIndex !== to) {
      onReorder(dragIndex, to);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="border-t border-border">
      <div className="flex items-center gap-2 px-4 py-2.5">
        <Layers size={13} className="text-text-2" />
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-text-2">
          Secciones de la página
        </p>
        <span className="ml-auto text-[10px] text-muted">
          arrastrá para reordenar
        </span>
      </div>
      <div className="max-h-44 overflow-y-auto px-3 pb-3">
        <div className="flex flex-col gap-y-1">
          {ready.map((section, index) => (
            <div
              key={section.id}
              draggable={!disabled}
              onDragStart={() => setDragIndex(index)}
              onDragEnter={() => setOverIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={cn(
                "group flex items-center gap-2 rounded-lg border bg-surface-2 px-2.5 py-2 transition-all",
                disabled ? "opacity-60" : "cursor-grab active:cursor-grabbing",
                dragIndex === index
                  ? "border-lime/40 opacity-40"
                  : overIndex === index && dragIndex !== null
                    ? "border-lime/40 bg-surface-3"
                    : "border-border"
              )}
            >
              <GripVertical
                size={14}
                className="shrink-0 text-muted group-hover:text-text-2"
              />
              <span className="flex size-5 shrink-0 items-center justify-center rounded bg-ink text-[10px] font-bold text-text-2">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-xs font-bold text-bright">
                  {section.name}
                </p>
              </div>
              <button
                onClick={() => onRemove(section.id)}
                disabled={disabled}
                className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted opacity-0 transition-all hover:bg-coral/10 hover:text-coral group-hover:opacity-100"
                aria-label={`Eliminar ${section.name}`}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
