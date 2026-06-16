"use client";

import type { OnboardingState } from "./types";
import { toneLabel } from "./types";
import { MiniPreview } from "./MiniPreview";
import { LogoUpload } from "./LogoUpload";

interface StepBrandKitProps {
  state: OnboardingState;
  update: (patch: Partial<OnboardingState>) => void;
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1">
      <label className="mb-1.5 block font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-text-2">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-ink px-2 py-1.5">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="size-7 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
          style={{ appearance: "none" }}
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-xs text-text outline-none"
        />
      </div>
    </div>
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
  hint,
  multiline,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-text-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder:text-muted outline-none transition-colors focus:border-border-2"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder:text-muted outline-none transition-colors focus:border-border-2"
        />
      )}
      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}

export function StepBrandKit({ state, update }: StepBrandKitProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-y-5">
        <TextField
          label="Nombre de la marca"
          placeholder="Ej: iFusion"
          value={state.brandName}
          onChange={(v) => update({ brandName: v })}
        />

        <LogoUpload
          logoUrl={state.logoUrl}
          onChange={(url) => update({ logoUrl: url })}
        />

        <div className="flex gap-3">
          <ColorField
            label="Primario"
            value={state.colorPrimary}
            onChange={(v) => update({ colorPrimary: v })}
          />
          <ColorField
            label="Secundario"
            value={state.colorSecondary}
            onChange={(v) => update({ colorSecondary: v })}
          />
          <ColorField
            label="Acento"
            value={state.colorAccent}
            onChange={(v) => update({ colorAccent: v })}
          />
        </div>

        <TextField
          label="¿Qué vendés?"
          placeholder="Ej: Auriculares inalámbricos premium, AirPods originales y accesorios Apple"
          value={state.whatYouSell}
          onChange={(v) => update({ whatYouSell: v })}
          hint="Sé específico: cuanto más detalle, mejor construye Brievify"
        />

        <TextField
          label="¿A quién le vendés?"
          placeholder="Ej: Jóvenes de 18 a 30 que estudian o trabajan, siempre con el teléfono encima"
          value={state.whoFor}
          onChange={(v) => update({ whoFor: v })}
        />

        <TextField
          label="¿Cuál es tu diferencial?"
          placeholder="Ej: Envío gratis en 24hs, 6 cuotas sin interés y garantía local"
          value={state.differentiator}
          onChange={(v) => update({ differentiator: v })}
          multiline
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-text-2">
              Tono de comunicación
            </label>
            <span className="font-heading text-xs font-semibold text-lime">
              {toneLabel(state.tone)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={state.tone}
            onChange={(e) => update({ tone: Number(e.target.value) })}
            className="w-full accent-lime"
          />
          <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.15em] text-muted">
            <span>Formal</span>
            <span>Casual</span>
          </div>
        </div>
      </div>

      {/* Mini-preview en vivo */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <p className="mb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-text-2">
          Tu marca, en vivo
        </p>
        <MiniPreview state={state} />
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          Esto es un anticipo con tus colores. En el siguiente paso elegís el
          estilo visual.
        </p>
      </div>
    </div>
  );
}
