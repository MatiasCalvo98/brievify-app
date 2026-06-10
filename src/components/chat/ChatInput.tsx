"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="flex items-end gap-2 rounded-xl border border-border bg-surface p-2 transition-colors focus-within:border-border-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        placeholder="Describí lo que querés construir…"
        className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-text placeholder:text-muted outline-none"
      />
      <button
        onClick={submit}
        disabled={disabled || !value.trim()}
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-lime text-ink transition-colors hover:bg-lime-2 disabled:pointer-events-none disabled:opacity-40"
        aria-label="Enviar mensaje"
      >
        <ArrowUp size={17} />
      </button>
    </div>
  );
}
