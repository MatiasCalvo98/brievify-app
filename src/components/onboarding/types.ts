import type { VisualStyle } from "@/types";

export interface OnboardingState {
  // Paso 1 — Brand Kit
  brandName: string;
  logoUrl: string | null;
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  whatYouSell: string;
  whoFor: string;
  differentiator: string;
  tone: number; // 0 formal → 100 casual

  // Paso 2 — Style Quiz
  visualStyle: VisualStyle | null;
}

export const INITIAL_ONBOARDING: OnboardingState = {
  brandName: "",
  logoUrl: null,
  colorPrimary: "#1a1a1a",
  colorSecondary: "#f5f2ec",
  colorAccent: "#b8ef35",
  whatYouSell: "",
  whoFor: "",
  differentiator: "",
  tone: 60,
  visualStyle: null,
};

/**
 * Compone los 3 campos estructurados en la descripción de negocio
 * que va al system prompt de Claude.
 */
export function composeBusinessDescription(state: OnboardingState): string {
  const parts: string[] = [];
  if (state.whatYouSell.trim()) parts.push(`Vende: ${state.whatYouSell.trim()}`);
  if (state.whoFor.trim()) parts.push(`Público: ${state.whoFor.trim()}`);
  if (state.differentiator.trim())
    parts.push(`Diferencial: ${state.differentiator.trim()}`);
  return parts.join(". ");
}

export function toneLabel(tone: number): string {
  if (tone < 25) return "Formal y profesional";
  if (tone < 50) return "Profesional pero cercano";
  if (tone < 75) return "Cercano y conversacional";
  return "Casual y canchero";
}
