"use client";

import { useEffect, useRef } from "react";
import { useBuilder } from "@/hooks/useBuilder";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { LivePreview } from "@/components/builder/LivePreview";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { messages, sections, isBuilding, sendMessage, discardChanges } =
    useBuilder();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-full">
      {/* Chat — 40% */}
      <div className="flex w-full flex-col border-r border-border lg:w-2/5">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-2">
            Builder
          </p>
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

        <div className="border-t border-border p-3">
          <ChatInput onSend={sendMessage} disabled={isBuilding} />
        </div>
      </div>

      {/* Live preview — 60% (en mobile se oculta; v1 desktop-first) */}
      <div className="hidden flex-1 lg:block">
        <LivePreview sections={sections} isBuilding={isBuilding} />
      </div>
    </div>
  );
}
