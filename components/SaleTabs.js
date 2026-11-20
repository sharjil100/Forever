'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES, byCategory } from '@/data/products';

export default function SaleTabs() {
  const [tab, setTab] = useState(CATEGORIES[0].id);
  const items = byCategory(tab);

  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">The Return Sale</h2>
        <a href={`/shop?c=${tab}`} className="link">View all</a>
      </div>
      <div className="tabs" role="tablist">
        {CATEGORIES.map((c) => (
          <button key={c.id} role="tab" aria-selected={tab === c.id}
            className={`tab${tab === c.id ? ' active' : ''}`} onClick={() => setTab(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid">
        {items.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 2} />)}
      </div>
    </section>
  );
}
