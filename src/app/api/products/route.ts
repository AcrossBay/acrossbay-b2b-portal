import { NextResponse } from "next/server";
import { PRODUCTS } from "@/config/products";

export async function GET() {
  const active = PRODUCTS.filter((p) => p.active);

  return NextResponse.json({
    ok: true,
    products: active.map((p) => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      unit: p.unit,
      priceGbp: p.priceGbp,
    })),
  });
}
