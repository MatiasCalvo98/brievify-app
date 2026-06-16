import type { VisualStyle } from "@/types";
import type { BrandTokens } from "./brand-tokens";

/**
 * Un StyleTheme traduce el "estilo visual" de la marca (minimal, glassy, bold...)
 * en decisiones concretas de CSS que el renderer aplica a cada sección.
 * Esto es lo que hace que "glassy" se vea glassy y "bold" se vea bold —
 * no solo cambia el orden de secciones, cambia el look.
 */
export interface StyleTheme {
  // Tipografía
  fontStack: string;
  headingWeight: number;
  headingTransform: "none" | "uppercase";
  headingLetterSpacing: string;
  headingSize: string; // clamp() del h1

  // Formas
  radius: string; // border-radius general
  radiusButton: string;
  radiusCard: string;

  // Profundidad / atmósfera
  cardShadow: string;
  cardBorder: string;
  cardBackground: (brand: BrandTokens) => string;
  heroBackground: (brand: BrandTokens) => string;
  glass: boolean; // si aplica backdrop-filter

  // Botones
  buttonStyle: (brand: BrandTokens) => string;

  // Spacing
  heroPadding: string;
  sectionPadding: string;
}

const SYSTEM_SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/**
 * Glassmorphism helper: fondo translúcido con blur.
 */
function glassBg(hex: string, alpha = 0.55): string {
  return `${hex}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
}

export function getStyleTheme(style: VisualStyle): StyleTheme {
  switch (style) {
    case "minimal":
      return {
        fontStack: SYSTEM_SANS,
        headingWeight: 600,
        headingTransform: "none",
        headingLetterSpacing: "-0.02em",
        headingSize: "clamp(30px,4.5vw,50px)",
        radius: "8px",
        radiusButton: "8px",
        radiusCard: "12px",
        cardShadow: "0 1px 3px rgba(0,0,0,0.04)",
        cardBorder: "1px solid rgba(0,0,0,0.07)",
        cardBackground: () => "#ffffff",
        heroBackground: (b) => b.secondary,
        glass: false,
        buttonStyle: (b) =>
          `background:${b.accent};color:${b.primary};font-weight:600;`,
        heroPadding: "96px 24px",
        sectionPadding: "72px 24px",
      };

    case "moderno":
      return {
        fontStack: SYSTEM_SANS,
        headingWeight: 800,
        headingTransform: "none",
        headingLetterSpacing: "-0.04em",
        headingSize: "clamp(34px,5.5vw,60px)",
        radius: "12px",
        radiusButton: "10px",
        radiusCard: "16px",
        cardShadow: "0 8px 30px rgba(0,0,0,0.08)",
        cardBorder: "1px solid rgba(0,0,0,0.06)",
        cardBackground: () => "#ffffff",
        heroBackground: (b) =>
          `linear-gradient(135deg, ${b.secondary} 0%, ${glassBg(b.accent, 0.12)} 100%)`,
        glass: false,
        buttonStyle: (b) =>
          `background:${b.accent};color:${b.primary};font-weight:700;box-shadow:0 4px 14px ${glassBg(b.accent, 0.35)};`,
        heroPadding: "100px 24px",
        sectionPadding: "80px 24px",
      };

    case "elegante":
      return {
        fontStack: "Georgia, 'Times New Roman', Times, serif",
        headingWeight: 500,
        headingTransform: "none",
        headingLetterSpacing: "0.01em",
        headingSize: "clamp(32px,5vw,56px)",
        radius: "2px",
        radiusButton: "2px",
        radiusCard: "4px",
        cardShadow: "0 2px 20px rgba(0,0,0,0.05)",
        cardBorder: "1px solid rgba(0,0,0,0.1)",
        cardBackground: () => "#ffffff",
        heroBackground: (b) => b.secondary,
        glass: false,
        buttonStyle: (b) =>
          `background:${b.primary};color:#fff;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;font-size:13px;`,
        heroPadding: "110px 24px",
        sectionPadding: "88px 24px",
      };

    case "bold":
      return {
        fontStack: "'Arial Black', 'Helvetica Neue', sans-serif",
        headingWeight: 900,
        headingTransform: "uppercase",
        headingLetterSpacing: "-0.03em",
        headingSize: "clamp(36px,6vw,68px)",
        radius: "0px",
        radiusButton: "0px",
        radiusCard: "0px",
        cardShadow: "6px 6px 0 rgba(0,0,0,0.9)",
        cardBorder: "2px solid #000",
        cardBackground: () => "#ffffff",
        heroBackground: (b) => b.accent,
        glass: false,
        buttonStyle: (b) =>
          `background:${b.primary};color:#fff;font-weight:900;text-transform:uppercase;border:2px solid ${b.primary};`,
        heroPadding: "90px 24px",
        sectionPadding: "72px 24px",
      };

    case "sobrio":
      return {
        fontStack: SYSTEM_SANS,
        headingWeight: 600,
        headingTransform: "none",
        headingLetterSpacing: "0",
        headingSize: "clamp(28px,4vw,46px)",
        radius: "4px",
        radiusButton: "4px",
        radiusCard: "6px",
        cardShadow: "none",
        cardBorder: "1px solid rgba(0,0,0,0.12)",
        cardBackground: () => "#ffffff",
        heroBackground: (b) => b.secondary,
        glass: false,
        buttonStyle: (b) =>
          `background:${b.primary};color:#fff;font-weight:600;`,
        heroPadding: "80px 24px",
        sectionPadding: "64px 24px",
      };

    case "cálido":
      return {
        fontStack: "'Trebuchet MS', 'Segoe UI', sans-serif",
        headingWeight: 700,
        headingTransform: "none",
        headingLetterSpacing: "-0.01em",
        headingSize: "clamp(32px,5vw,54px)",
        radius: "16px",
        radiusButton: "999px",
        radiusCard: "20px",
        cardShadow: "0 10px 40px rgba(0,0,0,0.06)",
        cardBorder: "1px solid rgba(0,0,0,0.05)",
        cardBackground: () => "#ffffff",
        heroBackground: (b) =>
          `linear-gradient(160deg, ${b.secondary} 0%, ${glassBg(b.accent, 0.15)} 100%)`,
        glass: false,
        buttonStyle: (b) =>
          `background:${b.accent};color:${b.primary};font-weight:700;border-radius:999px;box-shadow:0 6px 20px ${glassBg(b.accent, 0.3)};`,
        heroPadding: "96px 24px",
        sectionPadding: "76px 24px",
      };

    default:
      return getStyleTheme("minimal");
  }
}

/**
 * Variante "glassy": no es un visualStyle propio sino un modificador.
 * Si la marca pide glassy, envolvemos elementos en tarjetas translúcidas con blur.
 */
export function applyGlass(theme: StyleTheme, brand: BrandTokens): StyleTheme {
  return {
    ...theme,
    glass: true,
    cardBackground: () => glassBg("#ffffff", 0.55),
    cardShadow: "0 8px 32px rgba(0,0,0,0.12)",
    cardBorder: "1px solid rgba(255,255,255,0.4)",
    heroBackground: (b) =>
      `linear-gradient(135deg, ${b.secondary} 0%, ${glassBg(b.accent, 0.18)} 60%, ${glassBg(b.primary, 0.1)} 100%)`,
  };
}
