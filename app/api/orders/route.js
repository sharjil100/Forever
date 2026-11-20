import { NextResponse } from 'next/server';
import { db, isDbConfigured } from '@/lib/supabase';
import { sendOwnerEmail, sendCustomerEmail, isEmailConfigured } from '@/lib/email';
import { getProduct } from '@/data/products';
import { site, normalizePhone } from '@/data/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bad = (error, status = 400, extra = {}) => NextResponse.json({ error, ...extra }, { status });
const clean = (s, max) => String(s ?? '').trim().slice(0, max);

export async function POST(req) {
  if (!isDbConfigured()) return bad('Ordering is not set up yet. Please message us on Facebook.', 503);

  let body;
  try { body = await req.json(); } catch { return bad('Invalid request.'); }

  // ---- customer details ----
  const customer_name = clean(body.name, 80);
  const phone = normalizePhone(body.phone);
  const email = clean(body.email, 120).toLowerCase();
  const address = clean(body.address, 400);
  const area = body.area;
  const note = clean(body.note, 300);

  const fields = {};
  if (customer_name.length < 2) fields.name = 'Please enter your name.';
  if (!phone) fields.phone = 'Please enter a valid Bangladeshi mobile number (01XXXXXXXXX).';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'That email doesn\'t look right.';
  if (address.length < 8) fields.address = 'Please enter your full delivery address.';
  if (!site.delivery[area]) fields.area = 'Please choose a delivery area.';
  if (Object.keys(fields).length) return bad('Please check the highlighted fields.', 400, { fields });

  // ---- items: rebuild from the catalogue so prices can't be tampered with ----
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 30) return bad('Your bag is empty.');
  const merged = new Map();
  for (const raw of body.items) {
    const product = getProduct(String(raw.slug));
    const size = String(raw.size);
    const qty = Math.floor(Number(raw.qty));
    if (!product || !product.sizes.includes(size) || !(qty >= 1 && qty <= 20)) return bad('Some items in your bag are no longer available. Please refresh.');
    const key = `${product.slug}|${size}`;
    const prev = merged.get(key);
    merged.set(key, {
      slug: product.slug, name: product.name, color_name: product.colorName, size,
      qty: (prev?.qty || 0) + qty, price: product.price,
    });
  }
  const items = [...merged.values()];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = site.delivery[area].fee;
  const order = { customer_name, phone, email, address, area, note, subtotal, delivery, total: subtotal + delivery };

  // ---- place atomically (checks + decrements stock) ----
  const { data, error } = await db().rpc('place_order', { p_order: order, p_items: items });
  if (error) {
    const m = /OUT_OF_STOCK:(.*)/.exec(error.message || '');
    if (m) {
      const shortages = m[1].split(',').map((s) => {
        const [slug, size, available] = s.split('|');
        const p = getProduct(slug);
        return { slug, size, available: Number(available), label: p ? `${p.name} — ${p.colorName} (${size})` : `${slug} (${size})` };
      });
      return bad('Some items just sold out or have fewer left than you ordered.', 409, { shortages });
    }
    console.error('place_order failed', error);
    return bad('We couldn\'t place your order. Please try again or message us on Facebook.', 500);
  }

  const placed = { ...order, order_no: data?.[0]?.order_no };

  // ---- emails: failures are logged but never undo a placed order ----
  if (isEmailConfigured()) {
    const results = await Promise.allSettled([sendOwnerEmail(placed, items), sendCustomerEmail(placed, items)]);
    results.forEach((r) => r.status === 'rejected' && console.error('order email failed', r.reason));
  }

  return NextResponse.json({ ok: true, order_no: placed.order_no, total: placed.total });
}
