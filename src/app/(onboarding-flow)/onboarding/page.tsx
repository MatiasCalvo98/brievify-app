"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { StepBrandKit } from "@/components/onboarding/StepBrandKit";
import { StepStyleQuiz } from "@/components/onboarding/StepStyleQuiz";
import { StepShopify } from "@/components/onboarding/StepShopify";
import {
  INITIAL_ONBOARDING,
  composeBusinessDescription,
  type OnboardingState,
} from "@/components/onboarding/types";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, title: "Brand Kit", subtitle: "Tu marca, colores y negocio" },
  { n: 2, title: "Estilo visual", subtitle: "El look de tu tienda" },
  { n: 3, title: "Shopify", subtitle: "Conectá tu tienda" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<OnboardingState>(INITIAL_ONBOARDING);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (patch: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const canAdvance =
    step === 1
      ? state.brandName.trim().length > 0 && state.whatYouSell.trim().length > 0
      : step === 2
        ? state.visualStyle !== null
        : true;

  const handleFinish = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/brand-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: state.brandName,
          logo_url: state.logoUrl,
          color_primary: state.colorPrimary,
          color_secondary: state.colorSecondary,
          color_accent: state.colorAccent,
          business_description: composeBusinessDescription(state),
          tone: state.tone,
          visual_style: state.visualStyle ?? "minimal",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "No se pudo guardar el brand kit");
      }
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink">
      <div className="mx-auto max-w-3xl px-6 py-8 pb-16">
        <div className="flex justify-center">
          <Logo href="/" />
        </div>

        {/* Stepper */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full font-heading text-xs font-bold transition-colors",
                  step > s.n
                    ? "bg-lime text-ink"
                    : step === s.n
                      ? "bg-lime-surf text-lime ring-1 ring-lime/30"
                      : "bg-surface-2 text-muted"
                )}
              >
                {step > s.n ? <Check size={15} /> : s.n}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-10 transition-colors",
                    step > s.n ? "bg-lime/40" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <h1 className="font-heading text-2xl font-extrabold tracking-[-0.04em] text-bright">
            {STEPS[step - 1].title}
          </h1>
          <p className="mt-1 text-sm text-text-2">{STEPS[step - 1].subtitle}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
          {step === 1 && <StepBrandKit state={state} update={update} />}
          {step === 2 && <StepStyleQuiz state={state} update={update} />}
          {step === 3 && <StepShopify />}
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-coral">{error}</p>
        )}

        <div className="mt-6 flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={saving}
            >
              <ArrowLeft size={16} /> Atrás
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvance}>
              Continuar <ArrowRight size={16} />
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Guardando…
                </>
              ) : (
                <>
                  Empezar a construir <ArrowRight size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
