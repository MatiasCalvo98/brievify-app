import type { BrandTokens } from "./brand-tokens";

/**
 * Los 8 temas visuales de Brievify.
 * Cada tema es una ESTÉTICA INTEGRAL: no cambia solo la tipografía, sino toda
 * la atmósfera — fondo de página, gradientes, texturas, sombras, glass, bordes,
 * forma de los botones, hover, y el tratamiento de cada superficie.
 *
 * Esto es lo que hace que una tienda se vea única y deseable, y lo que justifica
 * pagar la suscripción.
 */

export type ThemeId =
  | "glassy"
  | "brutalist"
  | "soft"
  | "editorial"
  | "neon"
  | "organic"
  | "luxe"
  | "vibrant";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  tagline: string;
  bestFor: string;
}

export const THEME_LIST: ThemeMeta[] = [
  { id: "glassy", name: "Glassy", tagline: "Vidrio, blur y profundidad", bestFor: "Tech, gadgets, premium" },
  { id: "brutalist", name: "Brutalist", tagline: "Bordes duros, sin concesiones", bestFor: "Streetwear, sneakers, diseño" },
  { id: "soft", name: "Soft", tagline: "Aire, pasteles y calma", bestFor: "Belleza, skincare, wellness" },
  { id: "editorial", name: "Editorial", tagline: "Tipografía de revista", bestFor: "Moda, joyería, autor" },
  { id: "neon", name: "Neon", tagline: "Oscuro con brillo eléctrico", bestFor: "Gaming, fitness, energía" },
  { id: "organic", name: "Organic", tagline: "Curvas y calidez natural", bestFor: "Alimentos, plantas, eco" },
  { id: "luxe", name: "Luxe", tagline: "Negro, oro y silencio", bestFor: "Lujo, relojería, alta gama" },
  { id: "vibrant", name: "Vibrant", tagline: "Color saturado y energía pop", bestFor: "Casual, deco, colorido" },
];

/**
 * Tokens completos que el renderer aplica a TODAS las secciones.
 */
export interface StyleTheme {
  id: ThemeId;

  // Google Fonts a importar (URL completa de @import)
  fontImport: string;
  fontHeading: string;
  fontBody: string;

  // Tipografía
  headingWeight: number;
  headingTransform: "none" | "uppercase" | "lowercase";
  headingLetterSpacing: string;
  headingSize: string; // clamp() del h1
  headingLineHeight: string;

  // Fondo global de la página (detrás de todas las secciones)
  pageBackground: (b: BrandTokens) => string;
  // Color de texto base sobre el page background
  bodyColor: (b: BrandTokens) => string;

  // Hero
  heroBackground: (b: BrandTokens) => string;
  heroTextColor: (b: BrandTokens) => string;
  heroOverlay: string; // capa extra (mesh, grid, glow) inyectada en el hero

  // Superficies / cards
  surface: (b: BrandTokens) => string; // background de cards
  surfaceBorder: string;
  surfaceShadow: string;
  surfaceRadius: string;
  glass: boolean;

  // Botones
  buttonRadius: string;
  buttonStyle: (b: BrandTokens) => string;
  buttonHover: string; // CSS extra para :hover (vía clase)

  // Badges / pills
  badgeStyle: (b: BrandTokens) => string;

  // Spacing
  heroPadding: string;
  sectionPadding: string;

  // Decoración: CSS global extra inyectado en <style> (animaciones, etc.)
  globalCss: string;
}

// Helper: hex con alpha
function alpha(hex: string, a: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const THEMES: Record<ThemeId, StyleTheme> = {
  // ─────────────────────────────────────────────────────────────
  // GLASSY — vidrio esmerilado, blur, gradientes mesh, profundidad
  // ─────────────────────────────────────────────────────────────
  glassy: {
    id: "glassy",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');",
    fontHeading: "'Sora', sans-serif",
    fontBody: "'Inter', sans-serif",
    headingWeight: 800,
    headingTransform: "none",
    headingLetterSpacing: "-0.03em",
    headingSize: "clamp(36px,5.5vw,64px)",
    headingLineHeight: "1.05",
    pageBackground: (b) =>
      `radial-gradient(120% 120% at 10% 0%, ${alpha(b.accent, 0.18)} 0%, transparent 45%), radial-gradient(120% 120% at 100% 100%, ${alpha(b.primary, 0.14)} 0%, transparent 50%), ${b.secondary}`,
    bodyColor: (b) => b.primary,
    heroBackground: () => "transparent",
    heroTextColor: (b) => b.primary,
    heroOverlay: `<div style="position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 20%, rgba(255,255,255,0.5) 0%, transparent 70%);pointer-events:none;"></div>`,
    surface: () => "rgba(255,255,255,0.55)",
    surfaceBorder: "1px solid rgba(255,255,255,0.6)",
    surfaceShadow: "0 8px 32px rgba(0,0,0,0.10)",
    surfaceRadius: "20px",
    glass: true,
    buttonRadius: "14px",
    buttonStyle: (b) =>
      `background:${b.accent};color:${b.primary};font-weight:700;box-shadow:0 8px 24px ${alpha(b.accent, 0.4)};backdrop-filter:blur(4px);`,
    buttonHover: "transform:translateY(-2px);",
    badgeStyle: (b) =>
      `background:rgba(255,255,255,0.6);color:${b.primary};backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.7);`,
    heroPadding: "120px 24px",
    sectionPadding: "88px 24px",
    globalCss: `
      section { position: relative; }
      .bv-card { backdrop-filter: blur(16px) saturate(140%); -webkit-backdrop-filter: blur(16px) saturate(140%); }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // BRUTALIST — bordes negros gruesos, sombras duras, sin redondeo
  // ─────────────────────────────────────────────────────────────
  brutalist: {
    id: "brutalist",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Mono:wght@400;500&display=swap');",
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'DM Mono', monospace",
    headingWeight: 700,
    headingTransform: "uppercase",
    headingLetterSpacing: "-0.02em",
    headingSize: "clamp(38px,6.5vw,76px)",
    headingLineHeight: "0.95",
    pageBackground: (b) => b.secondary,
    bodyColor: (b) => b.primary,
    heroBackground: (b) => b.accent,
    heroTextColor: (b) => b.primary,
    heroOverlay: `<div style="position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 38px,rgba(0,0,0,0.06) 38px,rgba(0,0,0,0.06) 40px);pointer-events:none;"></div>`,
    surface: () => "#ffffff",
    surfaceBorder: "3px solid #000000",
    surfaceShadow: "8px 8px 0 #000000",
    surfaceRadius: "0px",
    glass: false,
    buttonRadius: "0px",
    buttonStyle: (b) =>
      `background:${b.primary};color:#fff;font-weight:700;border:3px solid #000;box-shadow:5px 5px 0 #000;text-transform:uppercase;letter-spacing:0.04em;`,
    buttonHover: "transform:translate(2px,2px);box-shadow:2px 2px 0 #000;",
    badgeStyle: (b) =>
      `background:${b.primary};color:#fff;border:2px solid #000;font-weight:700;text-transform:uppercase;`,
    heroPadding: "100px 24px",
    sectionPadding: "72px 24px",
    globalCss: `
      .bv-card { transition: transform 0.1s, box-shadow 0.1s; }
      a:hover { transform: translate(2px,2px); }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // SOFT — sombras difusas, mucho redondeo, pasteles, aire
  // ─────────────────────────────────────────────────────────────
  soft: {
    id: "soft",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Nunito:wght@400;500;600&display=swap');",
    fontHeading: "'Quicksand', sans-serif",
    fontBody: "'Nunito', sans-serif",
    headingWeight: 700,
    headingTransform: "none",
    headingLetterSpacing: "-0.01em",
    headingSize: "clamp(32px,5vw,56px)",
    headingLineHeight: "1.15",
    pageBackground: (b) =>
      `linear-gradient(180deg, ${b.secondary} 0%, ${alpha(b.accent, 0.08)} 100%)`,
    bodyColor: (b) => b.primary,
    heroBackground: (b) =>
      `radial-gradient(80% 80% at 50% 0%, ${alpha(b.accent, 0.22)} 0%, ${b.secondary} 60%)`,
    heroTextColor: (b) => b.primary,
    heroOverlay: "",
    surface: () => "#ffffff",
    surfaceBorder: "1px solid rgba(0,0,0,0.04)",
    surfaceShadow: "0 20px 50px rgba(0,0,0,0.07)",
    surfaceRadius: "28px",
    glass: false,
    buttonRadius: "999px",
    buttonStyle: (b) =>
      `background:${b.accent};color:${b.primary};font-weight:700;border-radius:999px;box-shadow:0 10px 30px ${alpha(b.accent, 0.35)};`,
    buttonHover: "transform:translateY(-2px);box-shadow:0 14px 36px rgba(0,0,0,0.12);",
    badgeStyle: (b) =>
      `background:${alpha(b.accent, 0.18)};color:${b.primary};border-radius:999px;font-weight:700;`,
    heroPadding: "108px 24px",
    sectionPadding: "84px 24px",
    globalCss: `
      .bv-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .bv-card:hover { transform: translateY(-4px); }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // EDITORIAL — serif dramática, layout de revista, contraste
  // ─────────────────────────────────────────────────────────────
  editorial: {
    id: "editorial",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=Work+Sans:wght@400;500&display=swap');",
    fontHeading: "'Fraunces', serif",
    fontBody: "'Work Sans', sans-serif",
    headingWeight: 900,
    headingTransform: "none",
    headingLetterSpacing: "-0.02em",
    headingSize: "clamp(40px,7vw,84px)",
    headingLineHeight: "0.98",
    pageBackground: (b) => b.secondary,
    bodyColor: (b) => b.primary,
    heroBackground: (b) => b.secondary,
    heroTextColor: (b) => b.primary,
    heroOverlay: "",
    surface: () => "#ffffff",
    surfaceBorder: "1px solid rgba(0,0,0,0.1)",
    surfaceShadow: "none",
    surfaceRadius: "2px",
    glass: false,
    buttonRadius: "0px",
    buttonStyle: (b) =>
      `background:${b.primary};color:#fff;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;font-size:12px;border-bottom:2px solid ${b.accent};`,
    buttonHover: "letter-spacing:0.18em;",
    badgeStyle: (b) =>
      `background:transparent;color:${b.primary};border:1px solid ${b.primary};font-style:italic;letter-spacing:0.05em;`,
    heroPadding: "120px 24px",
    sectionPadding: "96px 24px",
    globalCss: `
      h1, h2 { font-optical-sizing: auto; }
      a { transition: letter-spacing 0.3s; }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // NEON — fondo oscuro, acentos con glow, alto contraste, futurista
  // ─────────────────────────────────────────────────────────────
  neon: {
    id: "neon",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Rajdhani:wght@400;500;600&display=swap');",
    fontHeading: "'Chakra Petch', sans-serif",
    fontBody: "'Rajdhani', sans-serif",
    headingWeight: 700,
    headingTransform: "uppercase",
    headingLetterSpacing: "0.01em",
    headingSize: "clamp(36px,6vw,70px)",
    headingLineHeight: "1.0",
    pageBackground: (b) =>
      `radial-gradient(100% 80% at 50% 0%, ${alpha(b.accent, 0.16)} 0%, transparent 50%), #0a0a0f`,
    bodyColor: () => "#e8e8f0",
    heroBackground: () =>
      `radial-gradient(70% 90% at 50% 10%, rgba(255,255,255,0.03) 0%, transparent 60%), #0a0a0f`,
    heroTextColor: () => "#ffffff",
    heroOverlay: `<div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,black,transparent 80%);pointer-events:none;"></div>`,
    surface: () => "rgba(255,255,255,0.03)",
    surfaceBorder: "1px solid rgba(255,255,255,0.1)",
    surfaceShadow: "0 0 0 1px rgba(255,255,255,0.02)",
    surfaceRadius: "10px",
    glass: false,
    buttonRadius: "8px",
    buttonStyle: (b) =>
      `background:${b.accent};color:#0a0a0f;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;box-shadow:0 0 24px ${alpha(b.accent, 0.6)},0 0 8px ${alpha(b.accent, 0.4)};`,
    buttonHover: `box-shadow:0 0 40px var(--bv-glow);transform:translateY(-1px);`,
    badgeStyle: (b) =>
      `background:transparent;color:${b.accent};border:1px solid ${b.accent};text-transform:uppercase;box-shadow:0 0 12px ${alpha(b.accent, 0.4)};`,
    heroPadding: "120px 24px",
    sectionPadding: "88px 24px",
    globalCss: `
      .bv-card { transition: border-color 0.3s, box-shadow 0.3s; }
      .bv-card:hover { border-color: var(--bv-accent); box-shadow: 0 0 30px var(--bv-glow); }
      h1, h2 { text-shadow: 0 0 30px var(--bv-glow); }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // ORGANIC — formas blob, curvas, gradientes cálidos, nada recto
  // ─────────────────────────────────────────────────────────────
  organic: {
    id: "organic",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Mulish:wght@400;500;600&display=swap');",
    fontHeading: "'Fredoka', sans-serif",
    fontBody: "'Mulish', sans-serif",
    headingWeight: 700,
    headingTransform: "none",
    headingLetterSpacing: "-0.01em",
    headingSize: "clamp(34px,5.5vw,60px)",
    headingLineHeight: "1.1",
    pageBackground: (b) =>
      `linear-gradient(160deg, ${b.secondary} 0%, ${alpha(b.accent, 0.12)} 100%)`,
    bodyColor: (b) => b.primary,
    heroBackground: (b) =>
      `radial-gradient(60% 70% at 75% 20%, ${alpha(b.accent, 0.28)} 0%, transparent 55%), radial-gradient(50% 60% at 15% 80%, ${alpha(b.primary, 0.1)} 0%, transparent 55%), ${b.secondary}`,
    heroTextColor: (b) => b.primary,
    heroOverlay: "",
    surface: () => "#ffffff",
    surfaceBorder: "none",
    surfaceShadow: "0 16px 44px rgba(0,0,0,0.06)",
    surfaceRadius: "32px",
    glass: false,
    buttonRadius: "999px",
    buttonStyle: (b) =>
      `background:${b.accent};color:${b.primary};font-weight:700;border-radius:999px;box-shadow:0 8px 24px ${alpha(b.accent, 0.32)};`,
    buttonHover: "transform:scale(1.04);",
    badgeStyle: (b) =>
      `background:${alpha(b.accent, 0.2)};color:${b.primary};border-radius:999px;font-weight:700;`,
    heroPadding: "108px 24px",
    sectionPadding: "84px 24px",
    globalCss: `
      .bv-card { border-radius: 32px; transition: transform 0.3s; }
      .bv-card:hover { transform: translateY(-3px) rotate(-0.5deg); }
      a { transition: transform 0.2s; }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // LUXE — negro y oro, mínimo, espaciado amplio, serif fina
  // ─────────────────────────────────────────────────────────────
  luxe: {
    id: "luxe",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');",
    fontHeading: "'Cormorant Garamond', serif",
    fontBody: "'Jost', sans-serif",
    headingWeight: 500,
    headingTransform: "none",
    headingLetterSpacing: "0.02em",
    headingSize: "clamp(38px,6vw,72px)",
    headingLineHeight: "1.05",
    pageBackground: () => "#0c0c0c",
    bodyColor: () => "#e8e3d8",
    heroBackground: () =>
      `radial-gradient(80% 100% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 55%), #0c0c0c`,
    heroTextColor: () => "#f5f0e6",
    heroOverlay: `<div style="position:absolute;left:50%;bottom:40px;transform:translateX(-50%);width:1px;height:60px;background:linear-gradient(to bottom, transparent, rgba(212,175,55,0.6));pointer-events:none;"></div>`,
    surface: () => "#141414",
    surfaceBorder: "1px solid rgba(212,175,55,0.2)",
    surfaceShadow: "none",
    surfaceRadius: "2px",
    glass: false,
    buttonRadius: "0px",
    buttonStyle: () =>
      `background:transparent;color:#d4af37;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;font-size:12px;border:1px solid #d4af37;`,
    buttonHover: "background:#d4af37;color:#0c0c0c;",
    badgeStyle: () =>
      `background:transparent;color:#d4af37;border:1px solid rgba(212,175,55,0.4);letter-spacing:0.1em;text-transform:uppercase;`,
    heroPadding: "140px 24px",
    sectionPadding: "104px 24px",
    globalCss: `
      a { transition: background 0.4s, color 0.4s; }
      .bv-card { transition: border-color 0.4s; }
      .bv-card:hover { border-color: rgba(212,175,55,0.5); }
    `,
  },

  // ─────────────────────────────────────────────────────────────
  // VIBRANT — colores saturados, bloques de color, geométrico, pop
  // ─────────────────────────────────────────────────────────────
  vibrant: {
    id: "vibrant",
    fontImport:
      "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');",
    fontHeading: "'Outfit', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    headingWeight: 900,
    headingTransform: "none",
    headingLetterSpacing: "-0.03em",
    headingSize: "clamp(38px,6.5vw,72px)",
    headingLineHeight: "0.98",
    pageBackground: (b) => b.secondary,
    bodyColor: (b) => b.primary,
    heroBackground: (b) =>
      `linear-gradient(115deg, ${b.accent} 0%, ${b.accent} 50%, ${b.secondary} 50%, ${b.secondary} 100%)`,
    heroTextColor: (b) => b.primary,
    heroOverlay: `<div style="position:absolute;top:30px;right:40px;width:90px;height:90px;border-radius:50%;background:${"var(--bv-primary)"};opacity:0.12;pointer-events:none;"></div>`,
    surface: () => "#ffffff",
    surfaceBorder: "2px solid var(--bv-primary)",
    surfaceShadow: "6px 6px 0 var(--bv-accent)",
    surfaceRadius: "14px",
    glass: false,
    buttonRadius: "12px",
    buttonStyle: (b) =>
      `background:${b.primary};color:#fff;font-weight:800;box-shadow:4px 4px 0 ${b.accent};`,
    buttonHover: "transform:translate(2px,2px);box-shadow:2px 2px 0 var(--bv-accent);",
    badgeStyle: (b) =>
      `background:${b.accent};color:${b.primary};font-weight:800;border-radius:8px;`,
    heroPadding: "104px 24px",
    sectionPadding: "80px 24px",
    globalCss: `
      .bv-card { transition: transform 0.15s, box-shadow 0.15s; }
      a:hover { transform: translate(2px,2px); }
    `,
  },
};

export function getTheme(id: ThemeId): StyleTheme {
  return THEMES[id] ?? THEMES.glassy;
}

export const DEFAULT_THEME_ID: ThemeId = "glassy";

/**
 * Mapea el "visualStyle" legacy del brand kit (minimal, moderno, elegante,
 * bold, sobrio, cálido) al ThemeId que mejor lo representa, como default inicial.
 */
export function visualStyleToThemeId(visualStyle: string | null | undefined): ThemeId {
  switch (visualStyle) {
    case "minimal": return "glassy";
    case "moderno": return "vibrant";
    case "elegante": return "editorial";
    case "bold": return "brutalist";
    case "sobrio": return "luxe";
    case "cálido": return "soft";
    case "calido": return "soft";
    default: return "glassy";
  }
}
