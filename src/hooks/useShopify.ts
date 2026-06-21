"use client";

import { useEffect, useState, useCallback } from "react";
import type { ShopifyProduct } from "@/lib/shopify/client";

interface ShopifyStatus {
  connected: boolean;
  shop: string | null;
  products: ShopifyProduct[];
  isLoading: boolean;
  refresh: () => void;
}

export function useShopify(): ShopifyStatus {
  const [connected, setConnected] = useState(false);
  const [shop, setShop] = useState<string | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(() => {
    setIsLoading(true);
    fetch("/api/shopify/status")
      .then((r) => r.json())
      .then((s) => {
        setConnected(s.connected);
        setShop(s.shop ?? null);
        if (s.connected) {
          return fetch("/api/shopify/products")
            .then((r) => r.json())
            .then((p) => setProducts(p.products ?? []));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { connected, shop, products, isLoading, refresh: load };
}
