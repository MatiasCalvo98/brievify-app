import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-text placeholder:text-muted outline-none transition-colors focus:border-border-2",
        className
      )}
      {...props}
    />
  );
}
