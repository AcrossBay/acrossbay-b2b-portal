import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PRODUCTS } from "@/config/products";
import { getCookieName } from "@/lib/abAuth";

type OrderItemInput = { productId: string; qty: number };

function generateOrderNumber() {
  // semplice e leggibile; in produzione meglio un contatore/UUID + DB
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `AB-${y}${m}${day}-${rand}`;
}

export async function POST(req: Request) {
  // Auth “minima”: oggi controlli solo cookie presente.
  // Criticità: senza verifySession non puoi legare l’ordine al customerId reale.
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  if (!token) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const items: OrderItemInput[] = Array.isArray(body?.items) ? body.items : [];
  const note = (body?.note || "").toString().slice(0, 500);

  if (!items.length) {
    return NextResponse.json({ ok: false, error: "No items" }, { status: 400 });
  }

  // Validazione e calcolo totale lato server (mai fidarsi del frontend)
  const catalog = new Map(PRODUCTS.filter((p) => p.active).map((p) => [p.id, p]));
  const normalized = [];

  for (const it of items) {
    const productId = (it?.productId || "").toString();
    const qty = Number(it?.qty);

    if (!productId || !Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json({ ok: false, error: "Invalid item" }, { status: 400 });
    }

    const p = catalog.get(productId);
    if (!p) {
      return NextResponse.json({ ok: false, error: `Unknown product: ${productId}` }, { status: 400 });
    }

    const unitPrice = p.priceGbp;
    const lineTotal = Math.round(unitPrice * qty * 100) / 100;

    normalized.push({
      productId: p.id,
      sku: p.sku,
      name: p.name,
      unit: p.unit,
      qty,
      unitPriceGbp: unitPrice,
      lineTotalGbp: lineTotal,
    });
  }

  const subtotal = Math.round(normalized.reduce((s, x) => s + x.lineTotalGbp, 0) * 100) / 100;

  // Stato coerente con “non ancora operativo” / “no pagamenti”
  const order = {
    orderNumber: generateOrderNumber(),
    status: "pending_activation",
    currency: "GBP",
    subtotalGbp: subtotal,
    note,
    items: normalized,
    createdAt: new Date().toISOString(),
  };

  // IMPORTANTISSIMO: qui non stiamo salvando su DB (fase 2).
  // Quindi oggi è “generazione ordine + conferma”.
  return NextResponse.json({ ok: true, order });
}
