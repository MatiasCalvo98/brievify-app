"use client";

import type { OnboardingState } from "./types";
import type { VisualStyle } from "@/types";
import { MiniPreview } from "./MiniPreview";
import { cn } from "@/lib/utils";

interface StepStyleQuizProps {
  state: OnboardingState;
  update: (patch: Partial<OnboardingState>) => void;
}

const STYLES: { id: VisualStyle; name: string; description: string }[] = [
  { id: "minimal", name: "Minimal", description: "Limpio, mucho espacio, foco en el producto" },
  { id: "moderno", name: "Moderno", description: "Tipografía fuerte, contraste alto, dinámico" },
  { id: "elegante", name: "Elegante", description: "Serif refinada, lujo sobrio, premium" },
  { id: "bold", name: "Bold", description: "Mayúsculas, bordes duros, impacto máximo" },
  { id: "sobrio", name: "Sobrio", description: "Serio, confiable, sin estridencias" },
  { id: "cálido", name: "Cálido", description: "Redondeado, amigable, cercano" },
];

export function StepStyleQuiz({ state, update }: StepStyleQuizProps) {
  return (
    <div>
      <p className="mb-6 text-sm text-text-2">
        Cada opción está renderizada con los colores que elegiste. Elegí el
        estilo que mejor representa tu marca.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STYLES.map((style) => {
          const selected = state.visualStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => update({ visualStyle: style.id })}
              className={cn(
                "group flex flex-col gap-3 rounded-xl border p-3 text-left transition-all",
                selected
                  ? "border-lime/40 bg-lime-surf"
                  : "border-border bg-surface hover:border-border-2 hover:bg-surface-2"
              )}
            >
              <MiniPreview state={state} styleOverride={style.id} compact />
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-heading text-sm font-bold",
                      selected ? "text-lime" : "text-bright"
                    )}
                  >
                    {style.name}
                  </span>
                  {selected && (
                    <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.15em] text-lime">
                      Elegido
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-text-2">
                  {style.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
