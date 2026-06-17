"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LayoutGrid } from "lucide-react";
import { useBuilder } from "@/hooks/useBuilder";
import { useBrandKit } from "@/hooks/useBrandKit";
import { brandKitToTokens } from "@/lib/sections/brand-tokens";
import { visualStyleToThemeId, type ThemeId } from "@/lib/sections/style-themes";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { LivePreview } from "@/components/builder/LivePreview";
import { SectionCatalog } from "@/components/builder/SectionCatalog";
import { SectionLayers } from "@/components/builder/SectionLayers";
import { Button } from "@/components/ui/Button";
import type { SectionDefinition } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const { messages, sections, isBuilding, sendMessage, discardChanges, saveDraft, saveState, reorderSections, removeSection } =
    useBuilder();
  const { brandKit, isLoading } = useBrandKit();
  const brandTokens = brandKitToTokens(brandKit);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tema visual del builder, inicializado desde el brand kit
  const [themeId, setThemeId] = useState<ThemeId | null>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const handleAddSection = (section: SectionDefinition) => {
    setCatalogOpen(false);
    sendMessage(
      `Agregá una sección "${section.name}" a mi página, con el contenido adaptado a mi marca.`
    );
  };
  useEffect(() => {
    if (brandKit && themeId === null) {
      setThemeId(visualStyleToThemeId(brandKit.visualStyle));
    }
  }, [brandKit, themeId]);

  // Gate de onboarding: si no hay brand kit, mandar a /onboarding
  useEffect(() => {
    if (!isLoading && !brandKit) {
      router.replace("/onboarding");
    }
  }, [isLoading, brandKit, router]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Mientras carga el brand kit o redirige, mostrar loader
  if (isLoading || !brandKit || themeId === null) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={22} className="animate-spin text-text-2" />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Chat — 40% */}
      <div className="relative flex w-full flex-col border-r border-border lg:w-2/5">
        <SectionCatalog
          open={catalogOpen}
          onClose={() => setCatalogOpen(false)}
          onAdd={handleAddSection}
          disabled={isBuilding}
        />
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-2">
              Builder
            </p>
            <button
              onClick={() => setCatalogOpen(true)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-1 text-[11px] font-semibold text-text-2 transition-colors hover:border-lime/30 hover:text-text"
            >
              <LayoutGrid size={12} />
              Secciones
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={discardChanges}
            disabled={sections.length === 0 || isBuilding}
            className="h-7 px-2 text-xs"
          >
            Descartar cambios
          </Button>
        </div>

        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col gap-y-5 overflow-y-auto p-4"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        <SectionLayers
          sections={sections}
          onReorder={reorderSections}
          onRemove={removeSection}
          disabled={isBuilding}
        />

        <div className="border-t border-border p-3">
          <ChatInput onSend={sendMessage} disabled={isBuilding} />
        </div>
      </div>

      {/* Live preview — 60% (en mobile se oculta; v1 desktop-first) */}
      <div className="hidden flex-1 lg:block">
        <LivePreview
          sections={sections}
          isBuilding={isBuilding}
          brand={brandTokens}
          themeId={themeId}
          onThemeChange={setThemeId}
          onSaveDraft={saveDraft}
          saveState={saveState}
        />
      </div>
    </div>
  );
}
