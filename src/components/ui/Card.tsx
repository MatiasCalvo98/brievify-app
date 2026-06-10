import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-border rounded-xl bg-surface",
        interactive &&
          "transition-colors duration-200 hover:bg-surface-2 hover:border-border-2",
        className
      )}
      {...props}
    />
  );
}
