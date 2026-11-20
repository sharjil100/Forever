import { db } from '@/lib/supabase';
import { products, CATEGORIES } from '@/data/products';
import StockEditor from './StockEditor';

export const dynamic = 'force-dynamic';

export default async function AdminStock() {
  const supa = db();
  const [{ data: stock, error }, { data: sold }] = await Promise.all([
    supa.from('stock').select('slug,size,qty'),
    supa.from('order_items').select('slug,size,qty,orders!inner(status)').neq('orders.status', 'cancelled'),
  ]);

  const qty = {};
  for (const r of stock || []) qty[`${r.slug}|${r.size}`] = r.qty;
  const soldMap = {};
  for (const r of sold || []) soldMap[`${r.slug}|${r.size}`] = (soldMap[`${r.slug}|${r.size}`] || 0) + r.qty;

  const groups = CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    products: products.filter((p) => p.category === c.id).map((p) => ({
      slug: p.slug, name: p.name, colorName: p.colorName, image: p.images[0], sizes: p.sizes,
    })),
  }));

  return (
    <>
      {error && <p className="co-error">Couldn&rsquo;t load stock: {error.message}. Did you run supabase/schema.sql?</p>}
      <StockEditor groups={groups} initial={qty} sold={soldMap} />
    </>
  );
}
