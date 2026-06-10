"use client";

import { useCallback, useState } from "react";
import type { ChatMessage, GeneratedSection, SectionId } from "@/types";
import { SECTION_LIBRARY } from "@/lib/sections/library";

/**
 * Mock del flujo de generación (paso 6 del plan): el chat funciona y el
 * preview se actualiza en tiempo real, pero sin Claude todavía.
 * En el paso 8 este hook se reemplaza por el streaming real del Route Handler.
 */

const MOCK_HOME_SECTIONS: SectionId[] = [
  "announcement-bar",
  "hero-primary",
  "trust-strip",
  "product-grid",
  "testimonials",
  "cta-final",
];

let counter = 0;
function uid(prefix: string) {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useBuilder() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid("msg"),
      role: "assistant",
      content:
        "Tu brand kit está listo. ¿Querés que construya tu home desde cero o empezamos por una sección específica?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [sections, setSections] = useState<GeneratedSection[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isBuilding) return;

      const userMessage: ChatMessage = {
        id: uid("msg"),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsBuilding(true);

      await wait(700);

      const assistantId = uid("msg");
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content:
            "Perfecto. Voy a construir tu home con las secciones que mejor convierten para tu tipo de tienda. Mirá el preview a la derecha — la vas a ver crecer sección a sección.",
          sections: [],
          timestamp: new Date().toISOString(),
        },
      ]);

      for (const sectionId of MOCK_HOME_SECTIONS) {
        const definition = SECTION_LIBRARY[sectionId];
        const instance: GeneratedSection = {
          id: uid("sec"),
          sectionId,
          name: definition.name,
          description: definition.croBuiltIn.split(",")[0],
          status: "generating",
          content: {},
        };

        setSections((prev) => [...prev, instance]);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, sections: [...(m.sections ?? []), instance] }
              : m
          )
        );

        await wait(900);

        const ready = { ...instance, status: "ready" as const };
        setSections((prev) => prev.map((s) => (s.id === instance.id ? ready : s)));
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  sections: (m.sections ?? []).map((s) =>
                    s.id === instance.id ? ready : s
                  ),
                }
              : m
          )
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: uid("msg"),
          role: "assistant",
          content:
            "Listo — tu home tiene 6 secciones con principios de conversión incorporados. ¿Querés ajustar algo o la publicamos a Shopify?",
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsBuilding(false);
    },
    [isBuilding]
  );

  const discardChanges = useCallback(() => {
    setSections([]);
    setMessages((prev) => [
      ...prev,
      {
        id: uid("msg"),
        role: "assistant",
        content:
          "Descarté los cambios. El preview volvió a cero. ¿Por dónde arrancamos ahora?",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return { messages, sections, isBuilding, sendMessage, discardChanges };
}
