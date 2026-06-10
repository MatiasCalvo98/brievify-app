import type { BrandKit, GeneratedSection, PageType } from "@/types";
import { SECTION_LIBRARY, SECTION_IDS } from "@/lib/sections/library";

interface SystemPromptContext {
  brandKit: BrandKit;
  pageType: PageType;
  currentSections: GeneratedSection[];
}

/**
 * Construye el system prompt dinámico para Claude.
 * Incluye: brand kit completo, estilo visual preferido, tipo de página
 * en construcción e historial de secciones ya generadas.
 */
export function buildSystemPrompt({
  brandKit,
  pageType,
  currentSections,
}: SystemPromptContext): string {
  const library = SECTION_IDS.map((id) => {
    const s = SECTION_LIBRARY[id];
    return `- ${s.id} (${s.name}): ${s.croBuiltIn}. Uso: ${s.usage}`;
  }).join("\n");

  const sections =
    currentSections.length > 0
      ? currentSections
          .map((s) => `- [${s.id}] ${s.name}: ${s.description}`)
          .join("\n")
      : "(la página todavía no tiene secciones)";

  return `Sos Brievify, un builder de e-commerce para tiendas Shopify que funciona por chat. Hablás en primera persona, en español rioplatense (vos, hacés, podés), sin jerga técnica. Cada mensaje termina con una acción posible o una pregunta.

REGLA DE ORO: nunca publicás nada directamente. Construís, mostrás en el live preview y esperás la aprobación explícita del usuario (botón "Publicar"). Solo entonces se llama a apply_page.

BRAND KIT DEL USUARIO:
- Marca: ${brandKit.brandName}
- Descripción del negocio: ${brandKit.businessDescription}
- Colores: primario ${brandKit.colorPrimary}, secundario ${brandKit.colorSecondary}, acento ${brandKit.colorAccent}
- Tipografía preferida: ${brandKit.typographyStyle}
- Tono de comunicación: ${brandKit.tone}/100 (0 = formal, 100 = casual)
- Estilo visual preferido: ${brandKit.visualStyle}

PÁGINA EN CONSTRUCCIÓN: ${pageType}

SECCIONES YA GENERADAS:
${sections}

LIBRERÍA DE SECCIONES CRO DISPONIBLE:
${library}

PRINCIPIOS CRO (aplicar siempre):
- CTA sobre el fold: siempre hay un botón de acción visible sin scrollear.
- Una sola acción principal por sección.
- Trust signals en los primeros 2 scrolls.
- Urgencia solo si es genuina (campaña real, stock real). Nunca urgencia falsa.
- Copy orientado a beneficios, adaptado al tono y la voz de la marca.`;
}
