"use client";

import { useState } from "react";
import { ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { normalizeShop } from "@/lib/shopify/oauth";
import { cn } from "@/lib/utils";

interface ConnectShopifyProps {
  onClose?: () => void;
  compact?: boolean;
}

export function ConnectShopify({ onClose, compact }: ConnectShopifyProps) {
  const [shop, setShop] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connect = () => {
    const normalized = normalizeShop(shop);
    if (!normalized) {
      setError("Ingresá tu dominio: mitienda.myshopify.com");
      return;
    }
    setLoading(true);
    // Redirige al flujo OAuth (full page)
    window.location.href = `/api/shopify/auth?shop=${encodeURIComponent(normalized)}`;
  };

  return (
    <div className={cn("flex flex-col", compact ? "gap-3" : "gap-4")}>
      {!compact && (
        <span className="flex size-12 items-center justify-center rounded-xl bg-lime-surf text-lime">
          <ShoppingBag size={24} />
        </span>
      )}
      <div>
        <h3 className="font-heading text-base font-bold text-bright">
          Conectá tu tienda Shopify
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-text-2">
          Brievify va a leer tus productos reales —fotos, nombres y precios— para
          construir tu página con tu catálogo de verdad.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-ink px-3 py-2 transition-colors focus-within:border-border-2">
          <input
            value={shop}
            onChange={(e) => {
              setShop(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && connect()}
            placeholder="mitienda.myshopify.com"
            className="w-full bg-transparent text-sm text-text placeholder:text-muted outline-none"
          />
        </div>
        {error && <p className="mt-1.5 text-[11px] text-coral">{error}</p>}
      </div>

      <button
        onClick={connect}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-lg bg-lime px-4 py-2.5 font-heading text-sm font-bold text-ink transition-colors hover:bg-lime-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Redirigiendo…
          </>
        ) : (
          <>
            Conectar tienda <ArrowRight size={16} />
          </>
        )}
      </button>

      {onClose && (
        <button
          onClick={onClose}
          className="text-center text-xs text-text-2 transition-colors hover:text-text"
        >
          Conectar más tarde
        </button>
      )}
    </div>
  );
}
