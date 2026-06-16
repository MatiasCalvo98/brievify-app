"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, GeneratedSection } from "@/types";

/**
 * Hook del builder (Fase 8): chat real con Claude vía /api/chat.
 * Lee el stream NDJSON del route handler y actualiza los mensajes y el
 * live preview en tiempo real, sección a sección.
 */

let counter = 0;
function uid(prefix: string) {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}

type StreamEvent =
  | { type: "text"; delta: string }
  | { type: "section_ready"; section: GeneratedSection }
  | { type: "section_updated"; section: GeneratedSection }
  | { type: "sections_reordered"; orderedIds: string[] }
  | { type: "page_started"; title: string; pageType: string }
  | { type: "error"; message: string }
  | { type: "done" };

export function useBuilder() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid("msg"),
      role: "assistant",
      content:
        'Hola, soy Brievify. Contame qué vendés y qué página querés construir — por ejemplo: "una home para mi tienda de ropa deportiva femenina, estilo minimal". La vas a ver crecer en el preview de la derecha.',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [sections, setSections] = useState<GeneratedSection[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const sectionsRef = useRef<GeneratedSection[]>([]);
  sectionsRef.current = sections;
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;
  const pageIdRef = useRef<string | null>(null);
  pageIdRef.current = pageId;

  const sendMessage = useCallback(
    async (content: string) => {
      if (isBuilding) return;
      setIsBuilding(true);

      const userMessage: ChatMessage = {
        id: uid("msg"),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      const assistantId = uid("msg");
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        sections: [],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);

      const appendText = (delta: string) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + delta } : m
          )
        );
      };

      const attachSection = (section: GeneratedSection) => {
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== assistantId) return m;
            const existing = m.sections ?? [];
            const index = existing.findIndex((s) => s.id === section.id);
            const next =
              index === -1
                ? [...existing, section]
                : existing.map((s) => (s.id === section.id ? section : s));
            return { ...m, sections: next };
          })
        );
      };

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messagesRef.current, userMessage]
              .filter((m) => m.content.trim().length > 0)
              .map((m) => ({ role: m.role, content: m.content })),
            sections: sectionsRef.current,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          appendText(
            data?.error === "missing_api_key"
              ? "Todavía no puedo construir: falta configurar la ANTHROPIC_API_KEY en el archivo .env.local del proyecto. Agregala, reiniciá el servidor y seguimos."
              : "Tuve un problema para procesar tu pedido. Probá de nuevo en un momento."
          );
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
          appendText("No pude abrir la conexión de streaming. Probá de nuevo.");
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        const processLine = (line: string) => {
          if (!line.trim()) return;
          let event: StreamEvent;
          try {
            event = JSON.parse(line) as StreamEvent;
          } catch {
            return;
          }

          switch (event.type) {
            case "text":
              appendText(event.delta);
              break;
            case "section_ready":
              setSections((prev) => [...prev, event.section]);
              attachSection(event.section);
              break;
            case "section_updated":
              setSections((prev) =>
                prev.map((s) => (s.id === event.section.id ? event.section : s))
              );
              attachSection(event.section);
              break;
            case "sections_reordered":
              setSections((prev) => {
                const byId = new Map(prev.map((s) => [s.id, s]));
                return event.orderedIds
                  .map((id) => byId.get(id))
                  .filter((s): s is GeneratedSection => Boolean(s));
              });
              break;
            case "error":
              appendText(
                "\n\nUps, algo falló mientras construía. Probá de nuevo o reformulá el pedido."
              );
              break;
            case "page_started":
            case "done":
              break;
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          lines.forEach(processLine);
        }
        if (buffer) processLine(buffer);
      } catch {
        appendText(
          "No pude conectarme al servidor. Verificá que esté corriendo y probá de nuevo."
        );
      } finally {
        setIsBuilding(false);
      }
    },
    [isBuilding]
  );

  const discardChanges = useCallback(() => {
    setSections([]);
    setPageId(null);
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

  // Guardar el borrador actual en Supabase
  const saveDraft = useCallback(async (): Promise<boolean> => {
    if (sectionsRef.current.length === 0) return false;
    setSaveState("saving");
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: pageIdRef.current,
          page_type: "home",
          title: "Mi home",
          sections: sectionsRef.current,
          status: "draft",
        }),
      });
      const json = await res.json();
      if (json.data?.id) {
        setPageId(json.data.id);
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2500);
        return true;
      }
      setSaveState("idle");
      return false;
    } catch {
      setSaveState("idle");
      return false;
    }
  }, []);

  // Restaurar el último borrador al montar el builder
  useEffect(() => {
    fetch("/api/pages?draft=1")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.sections && Array.isArray(data.sections) && data.sections.length > 0) {
          setSections(data.sections);
          setPageId(data.id);
          setMessages((prev) => [
            ...prev,
            {
              id: uid("msg"),
              role: "assistant",
              content:
                "Recuperé tu último borrador. Podés seguir donde lo dejaste o pedirme cambios.",
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return {
    messages,
    sections,
    isBuilding,
    sendMessage,
    discardChanges,
    saveDraft,
    saveState,
  };
}
