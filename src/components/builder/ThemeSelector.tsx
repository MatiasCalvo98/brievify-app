"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check, ChevronDown } from "lucide-react";
import { THEME_LIST, type ThemeId } from "@/lib/sections/style-themes";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
}

/**
 * Mini-swatch que representa cada tema con un degradé característico,
 * para que se distingan de un vistazo en el dropdown.
 */
const THEME_SWATCH: Record<ThemeId, string> = {
  glassy: "linear-gradient(135deg, #e3f0ff 0%, #c9e0f5 50%, #ffffff 100%)",
  brutalist: "linear-gradient(135deg, #ffde00 0%, #ffde00 50%, #000000 50%)",
  soft: "linear-gradient(135deg, #ffe1ec 0%, #e8d5ff 100%)",
  editorial: "linear-gradient(135deg, #faf6f0 0%, #1a1a1a 50%, #faf6f0 50%)",
  neon: "linear-gradient(135deg, #0a0a0f 0%, #00ffa3 100%)",
  organic: "linear-gradient(135deg, #fce8d8 0%, #b8e0c2 100%)",
  luxe: "linear-gradient(135deg, #0c0c0c 0%, #d4af37 100%)",
  vibrant: "linear-gradient(135deg, #ff5e40 0%, #ffde00 50%, #28d485 100%)",
};

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = THEME_LIST.find((t) => t.id === value) ?? THEME_LIST[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-semibold text-text transition-colors hover:border-border-2"
      >
        <span
          className="size-4 shrink-0 rounded-full ring-1 ring-white/20"
          style={{ background: THEME_SWATCH[value] }}
        />
        <span className="font-heading">{current.name}</span>
        <ChevronDown size={13} className="text-text-2" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-surface p-1.5 shadow-2xl shadow-black/40">
          <p className="px-2.5 py-2 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            <Palette size={11} className="mr-1.5 inline" />
            Tema visual
          </p>
          <div className="max-h-[360px] overflow-y-auto">
            {THEME_LIST.map((theme) => {
              const selected = theme.id === value;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onChange(theme.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                    selected ? "bg-surface-3" : "hover:bg-surface-2"
                  )}
                >
                  <span
                    className="size-9 shrink-0 rounded-lg ring-1 ring-white/10"
                    style={{ background: THEME_SWATCH[theme.id] }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading text-sm font-bold text-bright">
                        {theme.name}
                      </span>
                      {selected && <Check size={13} className="text-lime" />}
                    </div>
                    <p className="truncate text-[11px] text-text-2">
                      {theme.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
