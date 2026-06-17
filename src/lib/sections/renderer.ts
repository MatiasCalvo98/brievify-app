import type { GeneratedSection } from "@/types";
import { type BrandTokens, DEFAULT_BRAND_TOKENS } from "./brand-tokens";
import { getTheme, DEFAULT_THEME_ID, type StyleTheme, type ThemeId } from "./style-themes";
import { baseAnimationCss, baseAnimationJs } from "./animations";

const DEFAULT_BRAND = DEFAULT_BRAND_TOKENS;

function esc(value: unknown): string {
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    value =
      obj.text ??
      obj.label ??
      obj.name ??
      obj.value ??
      Object.values(obj).find((v) => typeof v === "string") ??
      "";
  }
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function alpha(hex: string, a: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/**
 * Claude suele mandar nombres de íconos de Lucide (truck, shield-check…) como
 * "icon". Los traducimos a emojis para que el trust strip muestre algo visual.
 * Si ya viene un emoji (o un ✓), lo dejamos como está.
 */
const ICON_EMOJI: Record<string, string> = {
  truck: "🚚",
  "shield-check": "🛡️",
  shield: "🛡️",
  "credit-card": "💳",
  card: "💳",
  "refresh-cw": "🔄",
  refresh: "🔄",
  "rotate-ccw": "🔄",
  lock: "🔒",
  "lock-keyhole": "🔒",
  check: "✓",
  "check-circle": "✅",
  "badge-check": "✅",
  star: "⭐",
  heart: "❤️",
  gift: "🎁",
  package: "📦",
  box: "📦",
  clock: "⏱️",
  timer: "⏱️",
  zap: "⚡",
  award: "🏆",
  medal: "🏅",
  "thumbs-up": "👍",
  phone: "📱",
  headphones: "🎧",
  "map-pin": "📍",
  globe: "🌎",
  leaf: "🌿",
  sparkles: "✨",
  tag: "🏷️",
  percent: "💰",
  "dollar-sign": "💵",
  wallet: "👛",
  "message-circle": "💬",
  users: "👥",
  "user-check": "✅",
  "calendar-check": "📅",
  "rotate-cw": "🔄",
};

function iconToEmoji(raw: string): string {
  if (!raw) return "";
  // Si ya es un emoji o símbolo no-ASCII (✓, 🚚…), devolverlo tal cual
  // eslint-disable-next-line no-control-regex
  if (/[^\u0000-\u007F]/.test(raw)) return raw;
  const key = raw.toLowerCase().trim().replace(/_/g, "-");
  return ICON_EMOJI[key] ?? "✓";
}

interface Ctx {
  brand: BrandTokens;
  theme: StyleTheme;
}

function heading(ctx: Ctx, extra = ""): string {
  const { theme } = ctx;
  return `font-family:${theme.fontHeading};font-weight:${theme.headingWeight};letter-spacing:${theme.headingLetterSpacing};text-transform:${theme.headingTransform};line-height:${theme.headingLineHeight};${extra}`;
}

function button(ctx: Ctx): string {
  const { theme, brand } = ctx;
  return `display:inline-block;padding:15px 38px;border-radius:${theme.buttonRadius};text-decoration:none;font-family:${theme.fontBody};transition:all 0.25s ease;${theme.buttonStyle(brand)}`;
}

function cardStyle(ctx: Ctx): string {
  const { theme } = ctx;
  return `background:${theme.surface(ctx.brand)};border:${theme.surfaceBorder};border-radius:${theme.surfaceRadius};box-shadow:${theme.surfaceShadow};${theme.glass ? "backdrop-filter:blur(16px) saturate(140%);-webkit-backdrop-filter:blur(16px) saturate(140%);" : ""}`;
}

function renderSection(section: GeneratedSection, ctx: Ctx): string {
  const { brand, theme } = ctx;
  const c = section.content;
  const txt = theme.bodyColor(brand);

  switch (section.sectionId) {
    case "announcement-bar": {
      // Claude puede mandar un texto o varios (messages/items) → rotador
      const raw =
        (c.messages as unknown[] | undefined) ??
        (c.items as unknown[] | undefined) ??
        (c.text !== undefined ? [c.text] : ["Envío gratis a todo el país 🚚"]);
      const msgs = (Array.isArray(raw) ? raw : [raw]).map((m) => esc(m));
      const inner =
        msgs.length > 1
          ? `<span class="bv-rotator">${msgs.map((m) => `<span>${m}</span>`).join("")}</span>`
          : msgs[0];
      return `<div style="background:${brand.primary};color:#fff;text-align:center;padding:11px 16px;font-size:13px;letter-spacing:0.06em;font-family:${theme.fontBody};">${inner}</div>`;
    }

    case "hero-primary":
      return `
        <section style="background:${theme.heroBackground(brand)};padding:${theme.heroPadding};text-align:center;position:relative;overflow:hidden;">
          ${theme.heroOverlay}
          <div style="position:relative;max-width:840px;margin:0 auto;">
            ${brand.logoUrl ? `<img src="${esc(brand.logoUrl)}" alt="${esc(brand.brandName)}" style="height:54px;max-width:220px;object-fit:contain;margin:0 auto 30px;display:block;" />` : ""}
            <h1 style="font-size:${theme.headingSize};margin:0 0 18px;color:${theme.heroTextColor(brand)};${heading(ctx)}">${esc(c.headline ?? `Bienvenido a ${brand.brandName}`)}</h1>
            <p style="font-size:19px;color:${alpha(typeof theme.heroTextColor(brand) === "string" && theme.heroTextColor(brand).startsWith("#") ? theme.heroTextColor(brand) : brand.primary, 0.78)};max-width:580px;margin:0 auto 34px;font-family:${theme.fontBody};line-height:1.5;">${esc(c.subheadline ?? "Productos pensados para vos.")}</p>
            <a href="#" class="bv-btn" style="${button(ctx)}">${esc(c.cta ?? "Comprar ahora")}</a>
          </div>
        </section>`;

    case "hero-urgency":
      return `
        <section style="background:${brand.primary};padding:96px 24px;text-align:center;color:#fff;position:relative;overflow:hidden;">
          <span style="display:inline-block;padding:7px 16px;border-radius:${theme.buttonRadius};font-size:12px;font-weight:700;letter-spacing:0.1em;margin-bottom:22px;font-family:${theme.fontBody};${theme.badgeStyle(brand)}">${esc(c.badge ?? "OFERTA TERMINA EN 48 HS")}</span>
          <h1 style="font-size:${theme.headingSize};margin:0 0 16px;${heading(ctx)}color:#fff;">${esc(c.headline ?? "Hot Sale: hasta 40% OFF")}</h1>
          <p style="font-size:18px;opacity:0.82;max-width:540px;margin:0 auto 32px;font-family:${theme.fontBody};">${esc(c.subheadline ?? "Solo por tiempo limitado.")}</p>
          <a href="#" class="bv-btn" style="${button(ctx)}">${esc(c.cta ?? "Ver ofertas")}</a>
        </section>`;

    case "trust-strip": {
      const rawItems = (c.items as unknown[] | undefined) ?? [
        "✓ Garantía de devolución",
        "✓ Envío a todo el país",
        "✓ Pago seguro",
        "✓ Cuotas sin interés",
      ];
      const items = rawItems.map((i) => {
        if (typeof i === "string") return i;
        if (i && typeof i === "object") {
          const obj = i as Record<string, unknown>;
          const t = obj.text ?? obj.label ?? obj.name ?? obj.value ?? "";
          const rawIcon = String(obj.icon ?? obj.emoji ?? "");
          const icon = iconToEmoji(rawIcon);
          return icon ? `${icon}\u00A0\u00A0${t}` : String(t);
        }
        return String(i ?? "");
      });
      const loop = [...items, ...items];
      return `
        <section style="background:${alpha(brand.primary, 0.04)};border-top:1px solid ${alpha(txt, 0.1)};border-bottom:1px solid ${alpha(txt, 0.1)};padding:20px 0;font-family:${theme.fontBody};">
          <div class="bv-marquee">
            <div class="bv-marquee-track">
              ${loop.map((i) => `<span class="bv-marquee-item" style="font-size:14px;color:${txt};font-weight:500;">${esc(i)}</span>`).join("")}
            </div>
          </div>
        </section>`;
    }

    case "social-proof":
      return `
        <section style="padding:${theme.sectionPadding};text-align:center;font-family:${theme.fontBody};">
          <p class="bv-stars" style="font-size:30px;margin:0 0 10px;color:${brand.accent};">★★★★★</p>
          <h2 style="font-size:30px;margin:0 0 12px;color:${txt};${heading(ctx)}">${esc(c.headline ?? "+2.000 clientes felices")}</h2>
          <p style="color:${alpha(txt, 0.65)};margin:0;font-size:16px;">${esc(c.subheadline ?? "Calificación promedio 4.8/5 en más de 600 reviews verificadas.")}</p>
        </section>`;

    case "product-grid": {
      const products =
        (c.products as { name: string; price: string; oldPrice?: string; badge?: string }[] | undefined) ?? [
          { name: "Producto destacado 1", price: "$24.999", oldPrice: "$32.999", badge: "-25%" },
          { name: "Producto destacado 2", price: "$18.500", badge: "NUEVO" },
          { name: "Producto destacado 3", price: "$29.999", oldPrice: "$39.999", badge: "-25%" },
          { name: "Producto destacado 4", price: "$15.999" },
        ];
      return `
        <section style="padding:${theme.sectionPadding};font-family:${theme.fontBody};">
          <h2 style="text-align:center;font-size:32px;margin:0 0 40px;color:${txt};${heading(ctx)}">${esc(c.headline ?? "Los más vendidos")}</h2>
          <div class="bv-pgrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px;max-width:1040px;margin:0 auto;">
            ${products
              .map(
                (p) => `
              <div class="bv-card bv-product" style="${cardStyle(ctx)};">
                <div class="bv-product-img" style="background:${alpha(brand.accent, 0.12)};height:190px;position:relative;display:flex;align-items:center;justify-content:center;">
                  ${p.badge ? `<span style="position:absolute;top:12px;left:12px;z-index:2;padding:5px 11px;font-size:11px;font-weight:700;border-radius:${theme.buttonRadius};font-family:${theme.fontBody};${theme.badgeStyle(brand)}">${esc(p.badge)}</span>` : ""}
                  <span style="color:${alpha(txt, 0.25)};font-size:13px;">Imagen del producto</span>
                </div>
                <div style="padding:16px;">
                  <p style="margin:0 0 8px;font-size:14px;color:${txt};">${esc(p.name)}</p>
                  <p style="margin:0 0 14px;font-weight:700;color:${txt};">${esc(p.price)} ${p.oldPrice ? `<span style="text-decoration:line-through;color:${alpha(txt, 0.4)};font-weight:400;font-size:13px;">${esc(p.oldPrice)}</span>` : ""}</p>
                  <a href="#" class="bv-btn bv-product-cta" style="display:block;text-align:center;padding:11px;border-radius:${theme.buttonRadius};font-size:13px;font-weight:600;text-decoration:none;font-family:${theme.fontBody};${theme.buttonStyle(brand)}">Agregar al carrito</a>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </section>`;
    }

    case "urgency-banner":
      return `<div style="background:${brand.accent};color:${brand.primary};text-align:center;padding:13px 16px;font-weight:700;font-size:14px;font-family:${theme.fontBody};">${esc(c.text ?? "⏳ Últimas unidades — la oferta termina hoy")}</div>`;

    case "testimonials": {
      const rawT = (c.testimonials as unknown[] | undefined) ?? [
        { name: "María G. ✓", quote: "Llegó rapidísimo y la calidad superó lo que esperaba." },
        { name: "Lucas P. ✓", quote: "Tenía dudas con el talle y me asesoraron al toque. Compro de nuevo." },
        { name: "Sofía R. ✓", quote: "El proceso de devolución fue simple. Cero problemas." },
      ];
      const testimonials = rawT.map((t) => {
        if (typeof t === "object" && t !== null) {
          const o = t as Record<string, unknown>;
          return {
            name: String(o.name ?? o.author ?? o.customer ?? "Cliente verificado"),
            quote: String(o.quote ?? o.text ?? o.review ?? o.content ?? ""),
          };
        }
        return { name: "Cliente", quote: String(t ?? "") };
      });
      return `
        <section style="padding:${theme.sectionPadding};font-family:${theme.fontBody};color:${txt};">
          <h2 style="text-align:center;font-size:32px;margin:0 0 40px;color:${txt};${heading(ctx)}">${esc(c.headline ?? "Lo que dicen nuestros clientes")}</h2>
          <div style="max-width:1000px;margin:0 auto;">
            <div class="bv-carousel">
              ${testimonials
                .map(
                  (t) => `
                <div class="bv-card" style="${cardStyle(ctx)};padding:28px;width:300px;max-width:80vw;">
                  <p style="margin:0 0 14px;color:${brand.accent};font-size:18px;letter-spacing:0.1em;">★★★★★</p>
                  <p style="margin:0 0 16px;font-size:15px;color:${txt};line-height:1.55;">"${esc(t.quote)}"</p>
                  <p style="margin:0;font-size:13px;font-weight:700;color:${txt};">${esc(t.name)}</p>
                </div>`
                )
                .join("")}
            </div>
            ${testimonials.length > 1 ? `<div class="bv-carousel-nav" style="color:${txt};">${testimonials.map((_, i) => `<button class="bv-dot${i === 0 ? " bv-active" : ""}" aria-label="Ir al testimonio ${i + 1}"></button>`).join("")}</div>` : ""}
          </div>
        </section>`;
    }

    case "faq-objections": {
      const rawF = (c.faqs as unknown[] | undefined) ?? [
        { q: "¿Cuánto tarda el envío?", a: "Entre 2 y 5 días hábiles a todo el país." },
        { q: "¿Puedo devolver el producto?", a: "Sí, tenés 30 días para cambios y devoluciones sin costo." },
        { q: "¿Qué medios de pago aceptan?", a: "Tarjetas, Mercado Pago y transferencia. Hasta 6 cuotas sin interés." },
      ];
      const faqs = rawF.map((f) => {
        if (typeof f === "object" && f !== null) {
          const o = f as Record<string, unknown>;
          return {
            q: String(o.q ?? o.question ?? o.pregunta ?? ""),
            a: String(o.a ?? o.answer ?? o.respuesta ?? o.text ?? ""),
          };
        }
        return { q: "", a: String(f ?? "") };
      });
      return `
        <section style="padding:${theme.sectionPadding};font-family:${theme.fontBody};">
          <h2 style="text-align:center;font-size:32px;margin:0 0 36px;color:${txt};${heading(ctx)}">${esc(c.headline ?? "Preguntas frecuentes")}</h2>
          <div style="max-width:660px;margin:0 auto;">
            ${faqs
              .map(
                (f) => `
              <div class="bv-faq-item" style="border-bottom:1px solid ${alpha(txt, 0.12)};padding:20px 0;">
                <div class="bv-faq-q">
                  <p style="margin:0;font-weight:700;color:${txt};font-size:16px;">${esc(f.q)}</p>
                  <span class="bv-faq-icon" style="color:${brand.accent};">+</span>
                </div>
                <div class="bv-faq-a"><p style="margin:0;color:${alpha(txt, 0.65)};font-size:15px;line-height:1.5;">${esc(f.a)}</p></div>
              </div>`
              )
              .join("")}
          </div>
        </section>`;
    }

    case "about-brand":
      return `
        <section style="padding:${theme.sectionPadding};text-align:center;font-family:${theme.fontBody};">
          <h2 style="font-size:32px;margin:0 0 16px;color:${txt};${heading(ctx)}">${esc(c.headline ?? `Sobre ${brand.brandName}`)}</h2>
          <p style="max-width:620px;margin:0 auto;color:${alpha(txt, 0.78)};font-size:16px;line-height:1.65;">${esc(c.body ?? "Nacimos para hacer las cosas distinto. Cada producto está pensado, probado y elegido por personas reales.")}</p>
        </section>`;

    case "cta-final":
      return `
        <section style="background:${brand.primary};padding:96px 24px;text-align:center;color:#fff;font-family:${theme.fontBody};">
          <h2 style="font-size:clamp(28px,4.5vw,46px);margin:0 0 16px;${heading(ctx)}color:#fff;">${esc(c.headline ?? "¿Lista para encontrar tu próximo favorito?")}</h2>
          <p style="opacity:0.82;margin:0 0 30px;font-size:17px;">${esc(c.subheadline ?? "Envío gratis en tu primera compra.")}</p>
          <a href="#" class="bv-btn" style="${button(ctx)}">${esc(c.cta ?? "Comprar ahora")}</a>
        </section>`;

    case "collection-banner":
      return `
        <section style="background:${theme.heroBackground(brand)};padding:${theme.sectionPadding};text-align:center;position:relative;overflow:hidden;">
          ${theme.heroOverlay}
          <h1 style="font-size:${theme.headingSize};margin:0 0 14px;color:${theme.heroTextColor(brand)};${heading(ctx)}position:relative;">${esc(c.headline ?? "Nueva colección")}</h1>
          <a href="#" class="bv-btn" style="${button(ctx)}position:relative;">${esc(c.cta ?? "Ver colección")}</a>
        </section>`;

    default:
      return "";
  }
}

export function renderPage(
  sections: GeneratedSection[],
  brand: BrandTokens = DEFAULT_BRAND,
  themeId: ThemeId = DEFAULT_THEME_ID
): string {
  const theme = getTheme(themeId);
  const ctx: Ctx = { brand, theme };

  const noReveal = new Set(["announcement-bar", "urgency-banner"]);
  const body = sections
    .filter((s) => s.status === "ready")
    .map((s) => {
      const html = renderSection(s, ctx);
      if (noReveal.has(s.sectionId)) return html;
      return `<div class="bv-reveal">${html}</div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  ${theme.fontImport}
  :root {
    --bv-primary: ${brand.primary};
    --bv-accent: ${brand.accent};
    --bv-secondary: ${brand.secondary};
    --bv-glow: ${alpha(brand.accent, 0.5)};
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    font-family: ${theme.fontBody};
    background: ${theme.pageBackground(brand)};
    color: ${theme.bodyColor(brand)};
    min-height: 100%;
  }
  .bv-btn:hover { ${theme.buttonHover} }
  ${baseAnimationCss(theme, brand)}
  ${theme.globalCss}
</style>
</head>
<body>${body}${baseAnimationJs()}</body>
</html>`;
}
