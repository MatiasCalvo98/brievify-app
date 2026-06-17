import type { SectionDefinition, SectionId } from "@/types";

/**
 * Librería de secciones CRO de Brievify.
 * Cada sección tiene los principios de conversión incorporados —
 * Claude elige y compone desde esta librería, nunca desde un canvas en blanco.
 */
export const SECTION_LIBRARY: Record<SectionId, SectionDefinition> = {
  "hero-primary": {
    id: "hero-primary",
    name: "Hero Principal",
    croBuiltIn:
      "CTA sobre el fold, beneficio claro en headline, subtext con propuesta de valor",
    usage: "Home, landing de campaña",
    category: "hero",
  },
  "hero-urgency": {
    id: "hero-urgency",
    name: "Hero con Urgencia",
    croBuiltIn:
      'Countdown timer, badge "Oferta termina en...", CTA de alta presión',
    usage: "Campañas Hot Sale / CyberMonday",
    category: "hero",
  },
  "trust-strip": {
    id: "trust-strip",
    name: "Banda de Confianza",
    croBuiltIn: "Íconos de garantía, métodos de pago, envío y devoluciones",
    usage: "Debajo del hero, debajo del PDP",
    category: "confianza",
  },
  "social-proof": {
    id: "social-proof",
    name: "Prueba Social",
    croBuiltIn:
      "Reviews con estrellas, # de clientes satisfechos, logo de medios",
    usage: "Sección de marca",
    category: "confianza",
  },
  "product-grid": {
    id: "product-grid",
    name: "Grilla de Productos",
    croBuiltIn:
      "Badges de descuento/novedad, precio tachado, call-to-action por card",
    usage: "Colecciones, destacados",
    category: "productos",
  },
  "urgency-banner": {
    id: "urgency-banner",
    name: "Banner de Urgencia",
    croBuiltIn: "Stock limitado, tiempo limitado, oferta exclusiva",
    usage: "Top del sitio, campaña",
    category: "urgencia",
  },
  testimonials: {
    id: "testimonials",
    name: "Testimonios",
    croBuiltIn:
      "Foto + nombre + verificado, orientado a objeciones clave",
    usage: "Near-footer",
    category: "confianza",
  },
  "faq-objections": {
    id: "faq-objections",
    name: "FAQ Orientado a Objeciones",
    croBuiltIn: "Responde las 5 dudas que frenan la compra",
    usage: "Cerca del CTA principal",
    category: "contenido",
  },
  "about-brand": {
    id: "about-brand",
    name: "Historia de Marca",
    croBuiltIn: "Quiénes somos, misión, elemento humano",
    usage: "About, sección de confianza",
    category: "contenido",
  },
  "cta-final": {
    id: "cta-final",
    name: "CTA Final",
    croBuiltIn: "Un solo CTA grande, urgencia suave, sin distracciones",
    usage: "Final de cualquier página",
    category: "cierre",
  },
  "announcement-bar": {
    id: "announcement-bar",
    name: "Barra de Anuncio",
    croBuiltIn: "Texto rotativo, descuento destacado, envío gratis",
    usage: "Top de todas las páginas",
    category: "urgencia",
  },
  "collection-banner": {
    id: "collection-banner",
    name: "Banner de Colección",
    croBuiltIn: "Imagen fullwidth, headline de colección, CTA",
    usage: "Top de páginas de colección",
    category: "productos",
  },
};

export const SECTION_IDS = Object.keys(SECTION_LIBRARY) as SectionId[];

export function getSection(id: SectionId): SectionDefinition {
  return SECTION_LIBRARY[id];
}
