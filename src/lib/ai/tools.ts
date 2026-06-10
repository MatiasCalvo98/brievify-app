/**
 * Definiciones de tools para Claude (JSON Schema estricto).
 * Se consumen en el Route Handler del chat (paso 8 del plan de implementación).
 */
export const TOOLS = [
  {
    name: "build_section",
    description:
      "Genera una sección CRO-optimizada basada en el brand kit, el estilo visual preferido y el tipo de sección. Devuelve el contenido de la sección como JSON consumible por el renderer del preview.",
    input_schema: {
      type: "object" as const,
      properties: {
        section_id: {
          type: "string",
          enum: [
            "hero-primary",
            "hero-urgency",
            "trust-strip",
            "social-proof",
            "product-grid",
            "urgency-banner",
            "testimonials",
            "faq-objections",
            "about-brand",
            "cta-final",
            "announcement-bar",
            "collection-banner",
          ],
          description: "ID de la sección de la librería CRO a generar",
        },
        content: {
          type: "object",
          description:
            "Contenido de la sección (headline, subheadline, cta, items, etc.) adaptado al brand kit",
        },
        description: {
          type: "string",
          description:
            "Descripción en una línea, en lenguaje de negocio, de lo que hace esta sección",
        },
      },
      required: ["section_id", "content", "description"],
    },
  },
  {
    name: "update_section",
    description:
      "Modifica una sección ya generada según las instrucciones del usuario.",
    input_schema: {
      type: "object" as const,
      properties: {
        section_instance_id: {
          type: "string",
          description: "ID de la instancia de sección a modificar",
        },
        content: {
          type: "object",
          description: "Contenido actualizado de la sección",
        },
        description: {
          type: "string",
          description: "Descripción en una línea del cambio realizado",
        },
      },
      required: ["section_instance_id", "content", "description"],
    },
  },
  {
    name: "reorder_sections",
    description: "Reorganiza el orden de las secciones en la página.",
    input_schema: {
      type: "object" as const,
      properties: {
        ordered_ids: {
          type: "array",
          items: { type: "string" },
          description:
            "IDs de instancias de sección en el nuevo orden, de arriba hacia abajo",
        },
      },
      required: ["ordered_ids"],
    },
  },
  {
    name: "build_full_page",
    description:
      "Genera una página completa con las secciones recomendadas para ese tipo de página.",
    input_schema: {
      type: "object" as const,
      properties: {
        page_type: {
          type: "string",
          enum: ["home", "landing", "collection", "product"],
        },
        title: { type: "string", description: "Título de la página" },
      },
      required: ["page_type", "title"],
    },
  },
  {
    name: "get_store_data",
    description:
      "Obtiene información de la tienda Shopify conectada: tema activo, secciones existentes, productos y colecciones.",
    input_schema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "apply_page",
    description:
      "Aplica la página construida al tema de Shopify. SOLO debe llamarse tras aprobación explícita del usuario (botón Publicar). Claude nunca publica directamente.",
    input_schema: {
      type: "object" as const,
      properties: {
        page_id: { type: "string" },
      },
      required: ["page_id"],
    },
  },
];
