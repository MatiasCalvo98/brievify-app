"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Hammer,
  Palette,
  FileText,
  History,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useShopify } from "@/hooks/useShopify";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Builder", icon: Hammer },
  { href: "/brand-kit", label: "Brand Kit", icon: Palette },
  { href: "/pages", label: "Páginas", icon: FileText },
  { href: "/pages?view=history", label: "Historial", icon: History },
  { href: "/settings", label: "Configuración", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-5 py-4">
        <Logo href="/dashboard" />
        <p className="mt-2 truncate text-xs text-text-2">
          mi-tienda.myshopify.com
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const base = href.split("?")[0];
          const active = pathname === base && !href.includes("?");
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-sm font-semibold transition-colors",
                active
                  ? "bg-surface-3 text-bright"
                  : "text-text-2 hover:bg-surface-2 hover:text-text"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-y-3 border-t border-border p-4">
        <ShopifyStatusBadge />
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-2">Plan Starter</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-lime hover:text-lime"
          >
            Upgrade
          </Button>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-7",
                userButtonPopoverCard:
                  "bg-surface border border-border shadow-none",
                userButtonPopoverActionButton: "text-text hover:bg-surface-2",
                userButtonPopoverActionButtonText: "text-text text-sm",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
          <span className="text-xs text-text-2">Mi cuenta</span>
        </div>
      </div>
    </aside>
  );
}

function ShopifyStatusBadge() {
  const { connected, shop, isLoading } = useShopify();
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-text-2">Shopify</span>
      {isLoading ? (
        <span className="text-[10px] text-muted">…</span>
      ) : connected ? (
        <Badge variant="emerald" title={shop ?? undefined}>Conectada</Badge>
      ) : (
        <Link href="/dashboard?connect=shopify">
          <Badge variant="amber" className="cursor-pointer hover:opacity-80">Conectar</Badge>
        </Link>
      )}
    </div>
  );
}
