import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoIcon } from "./LogoIcon";

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoIcon />
      <span className="font-heading text-lg font-extrabold tracking-[-0.04em] text-bright">
        Brievify
      </span>
    </Link>
  );
}
