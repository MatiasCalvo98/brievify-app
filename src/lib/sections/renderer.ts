import type { GeneratedSection } from "@/types";
import { type BrandTokens, DEFAULT_BRAND_TOKENS } from "./brand-tokens";

const DEFAULT_BRAND = DEFAULT_BRAND_TOKENS;

function esc(value: unknown): string {
  // Si Claude devuelve un objeto {text, label, icon, etc.}, extraer el texto
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    value = obj.text ?? obj.label ?? obj.name ?? obj.value ?? Object.values(obj).find(v => typeof v === "string") ?? "";
  }
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Renderiza una sección generada a HTML para el iframe del live preview.
 * En v1 cada tipo de sección tiene un template; el contenido viene del
 * objeto `content` generado por Claude (o por el mock).
 */
export function renderSection(
  section: GeneratedSection,
  brand: BrandTokens = DEFAULT_BRAND
): string {
  const c = section.content;

  switch (section.sectionId) {
    case "announcement-bar":
      return `<div style="background:${brand.primary};color:#fff;text-align:center;padding:10px 16px;font-size:13px;letter-spacing:0.06em;">${esc(c.text ?? "Envío gratis a todo el país 🚚")}</div>`;

    case "hero-primary":
      return `
        <section style="background:${brand.secondary};padding:96px 24px;text-align:center;">
          <h1 style="font-size:clamp(32px,5vw,56px);margin:0 0 16px;color:${brand.primary};line-height:1.1;font-weight:800;">${esc(c.headline ?? `Bienvenido a ${brand.brandName}`)}</h1>
          <p style="font-size:18px;color:${brand.primary}cc;max-width:560px;margin:0 auto 32px;">${esc(c.subheadline ?? "Productos pensados para vos.")}</p>
          <a href="#" style="display:inline-block;background:${brand.accent};color:${brand.primary};padding:14px 36px;border-radius:8px;font-weight:700;text-decoration:none;">${esc(c.cta ?? "Comprar ahora")}</a>
        </section>`;

    case "hero-urgency":
      return `
        <section style="background:${brand.primary};padding:80px 24px;text-align:center;color:#fff;">
          <span style="display:inline-block;background:${brand.accent};color:${brand.primary};padding:6px 14px;border-radius:99px;font-size:12px;font-weight:700;letter-spacing:0.1em;margin-bottom:20px;">${esc(c.badge ?? "OFERTA TERMINA EN 48 HS")}</span>
          <h1 style="font-size:clamp(30px,5vw,52px);margin:0 0 14px;line-height:1.1;font-weight:800;">${esc(c.headline ?? "Hot Sale: hasta 40% OFF")}</h1>
          <p style="font-size:17px;opacity:0.8;max-width:520px;margin:0 auto 28px;">${esc(c.subheadline ?? "Solo por tiempo limitado.")}</p>
          <a href="#" style="display:inline-block;background:${brand.accent};color:${brand.primary};padding:14px 36px;border-radius:8px;font-weight:700;text-decoration:none;">${esc(c.cta ?? "Ver ofertas")}</a>
        </section>`;

    case "trust-strip": {
      const rawItems = (c.items as unknown[] | undefined) ?? [
        "✓ Garantía de devolución",
        "✓ Envío a todo el país",
        "✓ Pago seguro",
        "✓ Cuotas sin interés",
      ];
      // Normalizar: Claude puede mandar strings, objetos {icon, text}, {label}, etc.
      const items = rawItems.map((i) => {
        if (typeof i === "string") return i;
        if (i && typeof i === "object") {
          const obj = i as Record<string, unknown>;
          const text = obj.text ?? obj.label ?? obj.name ?? obj.value ?? "";
          const icon = obj.icon ?? obj.emoji ?? "";
          return icon ? `${icon} ${text}` : String(text);
        }
        return String(i ?? "");
      });
      return `
        <section style="background:#fff;border-top:1px solid #eee;border-bottom:1px solid #eee;padding:20px 24px;">
          <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;font-size:14px;color:${brand.primary};">
            ${items.map((i) => `<span>${esc(i)}</span>`).join("")}
          </div>
        </section>`;
    }

    case "social-proof":
      return `
        <section style="background:${brand.secondary};padding:64px 24px;text-align:center;">
          <p style="font-size:28px;margin:0 0 8px;">★★★★★</p>
          <h2 style="font-size:28px;margin:0 0 10px;color:${brand.primary};font-weight:800;">${esc(c.headline ?? "+2.000 clientes felices")}</h2>
          <p style="color:${brand.primary}99;margin:0;">${esc(c.subheadline ?? "Calificación promedio 4.8/5 en más de 600 reviews verificadas.")}</p>
        </section>`;

    case "product-grid": {
      const products =
        (c.products as { name: string; price: string; oldPrice?: string; badge?: string }[] | undefined) ??
        [
          { name: "Producto destacado 1", price: "$24.999", oldPrice: "$32.999", badge: "-25%" },
          { name: "Producto destacado 2", price: "$18.500", badge: "NUEVO" },
          { name: "Producto destacado 3", price: "$29.999", oldPrice: "$39.999", badge: "-25%" },
          { name: "Producto destacado 4", price: "$15.999" },
        ];
      return `
        <section style="background:#fff;padding:64px 24px;">
          <h2 style="text-align:center;font-size:30px;margin:0 0 36px;color:${brand.primary};font-weight:800;">${esc(c.headline ?? "Los más vendidos")}</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;max-width:1000px;margin:0 auto;">
            ${products
              .map(
                (p) => `
              <div style="border:1px solid #eee;border-radius:12px;overflow:hidden;">
                <div style="background:${brand.secondary};height:180px;position:relative;">
                  ${p.badge ? `<span style="position:absolute;top:10px;left:10px;background:${brand.accent};color:${brand.primary};font-size:11px;font-weight:700;padding:4px 10px;border-radius:99px;">${esc(p.badge)}</span>` : ""}
                </div>
                <div style="padding:14px;">
                  <p style="margin:0 0 6px;font-size:14px;color:${brand.primary};">${esc(p.name)}</p>
                  <p style="margin:0 0 12px;font-weight:700;color:${brand.primary};">${esc(p.price)} ${p.oldPrice ? `<span style="text-decoration:line-through;color:#999;font-weight:400;font-size:13px;">${esc(p.oldPrice)}</span>` : ""}</p>
                  <a href="#" style="display:block;text-align:center;background:${brand.primary};color:#fff;padding:10px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">Agregar al carrito</a>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </section>`;
    }

    case "urgency-banner":
      return `<div style="background:${brand.accent};color:${brand.primary};text-align:center;padding:12px 16px;font-weight:700;font-size:14px;">${esc(c.text ?? "⏳ Últimas unidades — la oferta termina hoy")}</div>`;

    case "testimonials": {
      const rawTestimonials = (c.testimonials as unknown[] | undefined) ?? [
          { name: "María G. ✓", quote: "Llegó rapidísimo y la calidad superó lo que esperaba." },
          { name: "Lucas P. ✓", quote: "Tenía dudas con el talle y me asesoraron al toque. Compro de nuevo." },
          { name: "Sofía R. ✓", quote: "El proceso de devolución fue simple. Cero problemas." },
        ];
      const testimonials = rawTestimonials.map((t) => {
        if (typeof t === "object" && t !== null) {
          const obj = t as Record<string, unknown>;
          return {
            name: String(obj.name ?? obj.author ?? obj.customer ?? "Cliente verificado"),
            quote: String(obj.quote ?? obj.text ?? obj.review ?? obj.content ?? ""),
          };
        }
        return { name: "Cliente", quote: String(t ?? "") };
      });
      return `
        <section style="background:${brand.secondary};padding:64px 24px;">
          <h2 style="text-align:center;font-size:30px;margin:0 0 36px;color:${brand.primary};font-weight:800;">${esc(c.headline ?? "Lo que dicen nuestros clientes")}</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:920px;margin:0 auto;">
            ${testimonials
              .map(
                (t) => `
              <div style="background:#fff;border-radius:12px;padding:22px;">
                <p style="margin:0 0 14px;font-size:15px;color:${brand.primary};line-height:1.5;">"${esc(t.quote)}"</p>
                <p style="margin:0;font-size:13px;font-weight:700;color:${brand.primary};">${esc(t.name)}</p>
              </div>`
              )
              .join("")}
          </div>
        </section>`;
    }

    case "faq-objections": {
      const rawFaqs = (c.faqs as unknown[] | undefined) ?? [
          { q: "¿Cuánto tarda el envío?", a: "Entre 2 y 5 días hábiles a todo el país." },
          { q: "¿Puedo devolver el producto?", a: "Sí, tenés 30 días para cambios y devoluciones sin costo." },
          { q: "¿Qué medios de pago aceptan?", a: "Tarjetas, Mercado Pago y transferencia. Hasta 6 cuotas sin interés." },
        ];
      const faqs = rawFaqs.map((f) => {
        if (typeof f === "object" && f !== null) {
          const obj = f as Record<string, unknown>;
          return {
            q: String(obj.q ?? obj.question ?? obj.pregunta ?? ""),
            a: String(obj.a ?? obj.answer ?? obj.respuesta ?? obj.text ?? ""),
          };
        }
        return { q: "", a: String(f ?? "") };
      });
      return `
        <section style="background:#fff;padding:64px 24px;">
          <h2 style="text-align:center;font-size:30px;margin:0 0 32px;color:${brand.primary};font-weight:800;">${esc(c.headline ?? "Preguntas frecuentes")}</h2>
          <div style="max-width:640px;margin:0 auto;">
            ${faqs
              .map(
                (f) => `
              <div style="border-bottom:1px solid #eee;padding:18px 0;">
                <p style="margin:0 0 6px;font-weight:700;color:${brand.primary};">${esc(f.q)}</p>
                <p style="margin:0;color:${brand.primary}99;font-size:15px;">${esc(f.a)}</p>
              </div>`
              )
              .join("")}
          </div>
        </section>`;
    }

    case "about-brand":
      return `
        <section style="background:${brand.secondary};padding:72px 24px;text-align:center;">
          <h2 style="font-size:30px;margin:0 0 14px;color:${brand.primary};font-weight:800;">${esc(c.headline ?? `Sobre ${brand.brandName}`)}</h2>
          <p style="max-width:600px;margin:0 auto;color:${brand.primary}cc;font-size:16px;line-height:1.6;">${esc(c.body ?? "Nacimos para hacer las cosas distinto. Cada producto está pensado, probado y elegido por personas reales.")}</p>
        </section>`;

    case "cta-final":
      return `
        <section style="background:${brand.primary};padding:80px 24px;text-align:center;color:#fff;">
          <h2 style="font-size:clamp(26px,4vw,40px);margin:0 0 14px;font-weight:800;">${esc(c.headline ?? "¿Lista para encontrar tu próximo favorito?")}</h2>
          <p style="opacity:0.8;margin:0 0 28px;">${esc(c.subheadline ?? "Envío gratis en tu primera compra.")}</p>
          <a href="#" style="display:inline-block;background:${brand.accent};color:${brand.primary};padding:15px 40px;border-radius:8px;font-weight:700;text-decoration:none;">${esc(c.cta ?? "Comprar ahora")}</a>
        </section>`;

    case "collection-banner":
      return `
        <section style="background:${brand.primary};padding:64px 24px;text-align:center;color:#fff;">
          <h1 style="font-size:clamp(28px,4vw,46px);margin:0 0 12px;font-weight:800;">${esc(c.headline ?? "Nueva colección")}</h1>
          <a href="#" style="display:inline-block;border:2px solid ${brand.accent};color:${brand.accent};padding:12px 32px;border-radius:8px;font-weight:700;text-decoration:none;">${esc(c.cta ?? "Ver colección")}</a>
        </section>`;

    default:
      return "";
  }
}

/**
 * Renderiza la página completa (todas las secciones) como documento HTML
 * para inyectar en el iframe del live preview vía srcDoc.
 */
export function renderPage(
  sections: GeneratedSection[],
  brand: BrandTokens = DEFAULT_BRAND
): string {
  const body = sections
    .filter((s) => s.status === "ready")
    .map((s) => renderSection(s, brand))
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; }
  a { transition: opacity 0.2s; }
  a:hover { opacity: 0.85; }
</style>
</head>
<body>${body}</body>
</html>`;
}
