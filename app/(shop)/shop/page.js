import ProductCard from '@/components/ProductCard';
import { products, CATEGORIES } from '@/data/products';

export const metadata = { title: 'Shop — FOREVER' };

export default function ShopPage({ searchParams }) {
  const active = CATEGORIES.find((c) => c.id === searchParams?.c);
  const items = active ? products.filter((p) => p.category === active.id) : products;
  const filters = [{ id: null, label: 'All', count: products.length },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: products.filter((p) => p.category === c.id).length }))];

  return (
    <div className="shop">
      <div className="shop-banner">
        <span className="eyebrow">Flat 40% off</span>
        <h1>{active ? active.label : 'Shop All'}</h1>
      </div>

      <div className="shop-bar">
        <div className="chips">
          {filters.map((f) => {
            const on = (active?.id ?? null) === f.id;
            return (
              <a key={f.label} href={f.id ? `/shop?c=${f.id}` : '/shop'} className={`chip${on ? ' active' : ''}`}>
                {f.label} <span>{f.count}</span>
              </a>
            );
          })}
        </div>
        <span className="shop-count">{items.length} products</span>
      </div>

      <div className="grid grid-shop">
        {items.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
      </div>
    </div>
  );
}
