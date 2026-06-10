import { Check, Loader2 } from "lucide-react";
import type { GeneratedSection } from "@/types";

interface SectionCardProps {
  section: GeneratedSection;
}

export function SectionCard({ section }: SectionCardProps) {
  const ready = section.status === "ready";
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2.5">
      <span
        className={
          ready
            ? "flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald/15 text-emerald"
            : "flex size-6 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber"
        }
      >
        {ready ? <Check size={13} /> : <Loader2 size={13} className="animate-spin" />}
      </span>
      <div className="min-w-0">
        <p className="truncate font-heading text-xs font-bold text-bright">
          {section.name}
        </p>
        <p className="truncate text-[11px] text-text-2">{section.description}</p>
      </div>
      <span
        className={
          ready
            ? "ml-auto shrink-0 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald"
            : "ml-auto shrink-0 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-amber"
        }
      >
        {ready ? "Listo" : "Generando"}
      </span>
    </div>
  );
}
