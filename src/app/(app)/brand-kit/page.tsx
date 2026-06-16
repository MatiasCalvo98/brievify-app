"use client";

import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { useBrandKit } from "@/hooks/useBrandKit";
import { Button } from "@/components/ui/Button";
import { StepBrandKit } from "@/components/onboarding/StepBrandKit";
import { StepStyleQuiz } from "@/components/onboarding/StepStyleQuiz";
import {
  INITIAL_ONBOARDING,
  composeBusinessDescription,
  type OnboardingState,
} from "@/components/onboarding/types";
import type { VisualStyle } from "@/types";

/**
 * Parsea la business_description compuesta de vuelta a los 3 campos.
 */
function parseBusinessDescription(desc: string | null): {
  whatYouSell: string;
  whoFor: string;
  differentiator: string;
} {
  const result = { whatYouSell: "", whoFor: "", differentiator: "" };
  if (!desc) return result;
  const sell = desc.match(/Vende:\s*([^.]*)/);
  const who = desc.match(/Público:\s*([^.]*)/);
  const diff = desc.match(/Diferencial:\s*([^.]*)/);
  if (sell) result.whatYouSell = sell[1].trim();
  if (who) result.whoFor = who[1].trim();
  if (diff) result.differentiator = diff[1].trim();
  return result;
}

export default function BrandKitPage() {
  const { brandKit, isLoading, save } = useBrandKit();
  const [state, setState] = useState<OnboardingState>(INITIAL_ONBOARDING);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (brandKit) {
      const parsed = parseBusinessDescription(brandKit.businessDescription);
      setState({
        brandName: brandKit.brandName ?? "",
        logoUrl: brandKit.logoUrl,
        colorPrimary: brandKit.colorPrimary,
        colorSecondary: brandKit.colorSecondary,
        colorAccent: brandKit.colorAccent,
        whatYouSell: parsed.whatYouSell,
        whoFor: parsed.whoFor,
        differentiator: parsed.differentiator,
        tone: brandKit.tone,
        visualStyle: brandKit.visualStyle as VisualStyle,
      });
    }
  }, [brandKit]);

  const update = (patch: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const ok = await save({
      brandName: state.brandName,
      logoUrl: state.logoUrl,
      colorPrimary: state.colorPrimary,
      colorSecondary: state.colorSecondary,
      colorAccent: state.colorAccent,
      businessDescription: composeBusinessDescription(state),
      tone: state.tone,
      visualStyle: state.visualStyle ?? "minimal",
    } as never);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={22} className="animate-spin text-text-2" />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading text-2xl font-extrabold tracking-[-0.04em] text-bright">
              Brand Kit
            </h1>
            <p className="mt-2 text-sm text-text-2">
              El contexto base de todo lo que Brievify genera para tu tienda.
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Guardando…
              </>
            ) : saved ? (
              <>
                <Check size={16} /> Guardado
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <StepBrandKit state={state} update={update} />
        </div>

        <div className="mt-6">
          <h2 className="mb-4 font-heading text-sm font-bold text-bright">
            Estilo visual
          </h2>
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <StepStyleQuiz state={state} update={update} />
          </div>
        </div>
      </div>
    </div>
  );
}
