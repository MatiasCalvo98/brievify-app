"use client";

import type { OnboardingState } from "./types";
import type { VisualStyle } from "@/types";

interface MiniPreviewProps {
  state: OnboardingState;
  /** Si se pasa un estilo, sobrescribe el del state (para el quiz) */
  styleOverride?: VisualStyle;
  compact?: boolean;
}

/**
 * Mini-hero renderizado con los colores reales del usuario.
 * Cada estilo visual cambia tipografía, spacing y forma del CTA.
 */
export function MiniPreview({ state, styleOverride, compact }: MiniPreviewProps) {
  const style = styleOverride ?? state.visualStyle ?? "minimal";
  const name = state.brandName.trim() || "Tu Marca";

  const styleConfig: Record<
    VisualStyle,
    {
      fontFamily: string;
      headlineWeight: number;
      radius: string;
      letterSpacing: string;
      uppercase: boolean;
      heroPadding: string;
    }
  > = {
    minimal: {
      fontFamily: "system-ui, sans-serif",
      headlineWeight: 600,
      radius: "6px",
      letterSpacing: "-0.02em",
      uppercase: false,
      heroPadding: compact ? "28px 18px" : "56px 32px",
    },
    moderno: {
      fontFamily: "'Helvetica Neue', sans-serif",
      headlineWeight: 800,
      radius: "10px",
      letterSpacing: "-0.04em",
      uppercase: false,
      heroPadding: compact ? "28px 18px" : "56px 32px",
    },
    elegante: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      headlineWeight: 500,
      radius: "2px",
      letterSpacing: "0.01em",
      uppercase: false,
      heroPadding: compact ? "30px 20px" : "60px 36px",
    },
    bold: {
      fontFamily: "'Arial Black', sans-serif",
      headlineWeight: 900,
      radius: "0px",
      letterSpacing: "-0.03em",
      uppercase: true,
      heroPadding: compact ? "30px 18px" : "60px 32px",
    },
    sobrio: {
      fontFamily: "system-ui, sans-serif",
      headlineWeight: 600,
      radius: "4px",
      letterSpacing: "0",
      uppercase: false,
      heroPadding: compact ? "26px 18px" : "52px 32px",
    },
    cálido: {
      fontFamily: "'Trebuchet MS', sans-serif",
      headlineWeight: 700,
      radius: "16px",
      letterSpacing: "-0.01em",
      uppercase: false,
      heroPadding: compact ? "28px 20px" : "56px 36px",
    },
  };

  const cfg = styleConfig[style];

  return (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #1C2B1F",
        fontFamily: cfg.fontFamily,
      }}
    >
      {/* Announcement bar */}
      <div
        style={{
          background: state.colorPrimary,
          color: "#fff",
          textAlign: "center",
          padding: "6px",
          fontSize: compact ? "9px" : "11px",
          letterSpacing: "0.05em",
        }}
      >
        Envío gratis a todo el país
      </div>

      {/* Hero */}
      <div
        style={{
          background: state.colorSecondary,
          padding: cfg.heroPadding,
          textAlign: "center",
        }}
      >
        {state.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={state.logoUrl}
            alt={name}
            style={{
              height: compact ? "34px" : "60px",
              maxWidth: compact ? "130px" : "220px",
              margin: "0 auto 14px",
              objectFit: "contain",
            }}
          />
        ) : null}
        <h2
          style={{
            color: state.colorPrimary,
            fontWeight: cfg.headlineWeight,
            letterSpacing: cfg.letterSpacing,
            textTransform: cfg.uppercase ? "uppercase" : "none",
            fontSize: compact ? "16px" : "26px",
            margin: "0 0 8px",
            lineHeight: 1.1,
          }}
        >
          {name}
        </h2>
        <p
          style={{
            color: state.colorPrimary,
            opacity: 0.7,
            fontSize: compact ? "10px" : "13px",
            margin: "0 0 16px",
          }}
        >
          {state.whatYouSell.trim()
            ? state.whatYouSell.trim().slice(0, 60)
            : "Tu propuesta de valor acá"}
        </p>
        <span
          style={{
            display: "inline-block",
            background: state.colorAccent,
            color: state.colorPrimary,
            padding: compact ? "7px 16px" : "10px 24px",
            borderRadius: cfg.radius,
            fontWeight: 700,
            fontSize: compact ? "10px" : "13px",
            textTransform: cfg.uppercase ? "uppercase" : "none",
          }}
        >
          Comprar ahora
        </span>
      </div>
    </div>
  );
}
