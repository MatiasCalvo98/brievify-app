import { createAdminClient } from "@/lib/supabase/admin";

export const SHOPIFY_API_VERSION = "2025-01";

export interface ShopifyConnection {
  shop: string;
  accessToken: string;
}

/**
 * Obtiene la conexión Shopify (shop + token) del usuario autenticado.
 */
export async function getShopifyConnection(
  clerkUserId: string
): Promise<ShopifyConnection | null> {
  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .single();
  if (!profile) return null;

  const { data } = await supabase
    .from("shopify_stores")
    .select("shop_domain, access_token")
    .eq("user_id", profile.id)
    .single();
  if (!data) return null;

  return { shop: data.shop_domain, accessToken: data.access_token };
}

/**
 * Llama al Admin API REST de Shopify.
 */
export async function shopifyFetch(
  conn: ShopifyConnection,
  path: string
): Promise<Response> {
  return fetch(
    `https://${conn.shop}/admin/api/${SHOPIFY_API_VERSION}/${path}`,
    {
      headers: {
        "X-Shopify-Access-Token": conn.accessToken,
        "Content-Type": "application/json",
      },
    }
  );
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  image: string | null;
  price: string | null;
  compareAtPrice: string | null;
}

/**
 * Lee los productos de la tienda (primeros N), normalizados para el preview.
 */
export async function getProducts(
  conn: ShopifyConnection,
  limit = 12
): Promise<ShopifyProduct[]> {
  const res = await shopifyFetch(
    conn,
    `products.json?limit=${limit}&status=active`
  );
  if (!res.ok) return [];

  const json = await res.json();
  const products = (json.products ?? []) as Array<{
    id: number;
    title: string;
    handle: string;
    image?: { src: string } | null;
    images?: { src: string }[];
    variants?: { price: string; compare_at_price: string | null }[];
  }>;

  return products.map((p) => {
    const variant = p.variants?.[0];
    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      image: p.image?.src ?? p.images?.[0]?.src ?? null,
      price: variant?.price ?? null,
      compareAtPrice: variant?.compare_at_price ?? null,
    };
  });
}
