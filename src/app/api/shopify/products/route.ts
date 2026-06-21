import { auth } from "@clerk/nextjs/server";
import { getShopifyConnection, getProducts } from "@/lib/shopify/client";

/**
 * GET /api/shopify/products → productos reales de la tienda conectada
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ products: [] });

  const conn = await getShopifyConnection(userId);
  if (!conn) return Response.json({ products: [], connected: false });

  const products = await getProducts(conn, 12);
  return Response.json({ products, connected: true });
}
