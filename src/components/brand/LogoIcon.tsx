import { cn } from "@/lib/utils";

interface LogoIconProps {
  className?: string;
}

/**
 * Isotipo placeholder — el definitivo se está eligiendo entre 4 opciones
 * (ver brand-book). Reemplazar este SVG cuando se defina.
 */
export function LogoIcon({ className }: LogoIconProps) {
  return (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-lg bg-lime font-heading text-base font-extrabold text-ink",
        className
      )}
    >
      B
    </span>
  );
}
