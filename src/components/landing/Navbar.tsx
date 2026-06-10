import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NavbarAuthSection } from "./NavbarAuthSection";

const links = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-semibold text-text-2 transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <NavbarAuthSection />
      </nav>
    </header>
  );
}
