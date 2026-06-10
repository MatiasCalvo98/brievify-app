import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "emerald" | "amber" | "coral" | "neutral";
}

const variants = {
  lime: "bg-lime-surf text-lime border-lime/20",
  emerald: "bg-emerald/10 text-emerald border-emerald/20",
  amber: "bg-amber/10 text-amber border-amber/20",
  coral: "bg-coral/10 text-coral border-coral/20",
  neutral: "bg-surface-2 text-text-2 border-border",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
