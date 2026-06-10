import type { ChatMessage as ChatMessageType } from "@/types";
import { SectionCard } from "./SectionCard";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex flex-col gap-y-2", isUser && "items-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-surface-3 text-text"
            : "border border-border bg-surface text-text"
        )}
      >
        {!isUser && (
          <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
            Brievify
          </p>
        )}
        {message.content}
      </div>
      {message.sections && message.sections.length > 0 && (
        <div className="flex w-full max-w-[85%] flex-col gap-y-1.5">
          {message.sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}
