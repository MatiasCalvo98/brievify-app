import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-lime text-ink hover:bg-lime-2 font-heading font-bold",
  secondary:
    "bg-surface-2 text-text border border-border hover:border-border-2 hover:bg-surface-3 font-heading font-semibold",
  ghost:
    "bg-transparent text-text-2 hover:text-text hover:bg-surface-2 font-heading font-semibold",
  destructive:
    "bg-transparent text-coral border border-coral/30 hover:bg-coral/10 font-heading font-semibold",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
