'use client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Toast from './Toast';
import { useCart } from '@/context/CartContext';

const CAT_META = {
  hoodies:    { num: '01', label: 'Hoodies',    quote: 'Heavyweight fleece, worn forever.' },
  tshirts:    { num: '02', label: 'T-Shirts',   quote: 'One cut. Five colors. No filler.' },
  sweatpants: { num: '03', label: 'Sweatpants', quote: 'The bottom half of every outfit.' },
};

function CategoryBlock({ category, items, onQuickView, onToast, onAdd }) {
  const meta = CAT_META[category];
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <div className="cat-block">
      <div className="cat-head">
        <span className="cat-num">{meta.num}</span>
        <span className="cat-name">{meta.label}</span>
        <span className="cat-count">{items.length} styles</span>
      </div>

      <div className="editorial">
        {/* Feature — model card */}
        <div
          className="ed-feature"
          onClick={() => onQuickView(featured)}
          role="button"
          tabIndex={0}
        >
          <Image
            src={featured.modelImage || featured.image}
            alt={featured.name}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="ed-feature-foot">
            <button className="ed-pill" onClick={(e) => { e.stopPropagation(); onQuickView(featured); }}>
              View {meta.label}
            </button>
            <span className="ed-arrow-circle" aria-hidden="true">↗</span>
          </div>
        </div>

        {/* Right side — 2 stacked cards */}
        <div className="ed-side">
          <div className="ed-card-light">
            <div className="ed-mag-row">
              <span className="ed-mag-label">Magazine</span>
              <h3 className="ed-mag-title">FOREVER<br />2026</h3>
            </div>
            <div className="ed-mag-img" onClick={() => onQuickView(featured)}>
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                style={{ objectFit: 'cover' }}
              />
              <button
                className="ed-arrow-btn"
                aria-label="View product"
                onClick={(e) => { e.stopPropagation(); onQuickView(featured); }}
              >↗</button>
            </div>
          </div>

          <div className="ed-card-dark">
            <h3 className="ed-quote">{meta.quote}</h3>
            <p className="ed-quote-sub">
              Explore the {meta.label.toLowerCase()} drop — designed in studio, worn anywhere.
            </p>
            <button
              className="ed-cta"
              onClick={() => onAdd(featured)}
              disabled={!featured.inStock}
            >
              <span>{featured.inStock ? 'Quick Add' : 'Sold Out'}</span>
              <span className="ed-cta-arrow">↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* T-shirt color picker — only for tshirts */}
      {category === 'tshirts' && (
        <div className="tee-swatches">
          <span className="tee-swatch-label">Available in</span>
          <div className="tee-swatch-row">
            {items.map((t) => (
              <button
                key={t.id}
                className="tee-swatch"
                style={{ background: t.colorHex }}
                onClick={() => onQuickView(t)}
                aria-label={t.colorway}
                title={t.colorway}
              />
            ))}
          </div>
        </div>
      )}

      {/* Remaining items grid */}
      <div className="cat-grid">
        {rest.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={onQuickView}
            onToast={onToast}
          />
        ))}
      </div>
    </div>
  );
}

function ArchiveCard({ product, onQuickView }) {
  return (
    <div className="archive-card" onClick={() => onQuickView(product)}>
      <div className="archive-visual">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <span className="archive-badge">Sold Out</span>
      </div>
      <div className="archive-info">
        <span className="archive-line">Drop 01 — Founders</span>
        <h3 className="archive-name">{product.name}</h3>
        <p className="archive-sub">{product.colorway} · {product.subtitle}</p>
        <div className="archive-foot">
          <span className="archive-price">${product.price}</span>
          <span className="archive-status">Stock Out</span>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [modal, setModal]     = useState(null);
  const [toast, setToast]     = useState('');
  const [toastOn, setToastOn] = useState(false);
  const { dispatch } = useCart();

  const grouped = useMemo(() => {
    const embrace   = products.filter((p) => p.collection === 'embrace');
    const beginning = products.filter((p) => p.collection === 'beginning');
    return {
      hoodies:    embrace.filter((p) => p.category === 'hoodies'),
      tshirts:    embrace.filter((p) => p.category === 'tshirts'),
      sweatpants: embrace.filter((p) => p.category === 'sweatpants'),
      beginning,
    };
  }, []);

  function showToast(msg) {
    setToast(msg);
    setToastOn(true);
    setTimeout(() => setToastOn(false), 2200);
  }

  function handleAdd(product) {
    if (!product.inStock) return;
    dispatch({ type: 'ADD', item: product });
    showToast(`${product.name} added to cart`);
  }

  return (
    <>
      {/* ── EMBRACE THE JOURNEY ────────────────────────────── */}
      <section className="shop journey" id="shop">
        <div className="container">
          <div className="journey-head">
            <span className="label">/ Drop 03 — SS26</span>
            <h2 className="section-title">Embrace the Journey</h2>
            <p className="journey-sub">
              Three categories. Thirteen pieces. One season worth wearing.
            </p>
          </div>

          <CategoryBlock
            category="hoodies"
            items={grouped.hoodies}
            onQuickView={setModal}
            onToast={showToast}
            onAdd={handleAdd}
          />
          <CategoryBlock
            category="tshirts"
            items={grouped.tshirts}
            onQuickView={setModal}
            onToast={showToast}
            onAdd={handleAdd}
          />
          <CategoryBlock
            category="sweatpants"
            items={grouped.sweatpants}
            onQuickView={setModal}
            onToast={showToast}
            onAdd={handleAdd}
          />
        </div>
      </section>

      {/* ── THE BEGINNING — ARCHIVE ────────────────────────── */}
      <section className="archive" id="archive">
        <div className="container">
          <div className="archive-head">
            <span className="label archive-label">/ Archive — Drop 01</span>
            <h2 className="section-title archive-title">The Beginning</h2>
            <p className="archive-intro">
              Where it all started. Three pieces from the founding run — all sold out, kept here for the record.
            </p>
          </div>

          <div className="archive-grid">
            {grouped.beginning.map((p) => (
              <ArchiveCard key={p.id} product={p} onQuickView={setModal} />
            ))}
          </div>
        </div>
      </section>

      {modal && (
        <ProductModal
          product={modal}
          onClose={() => setModal(null)}
          onToast={showToast}
        />
      )}
      <Toast message={toast} show={toastOn} />
    </>
  );
}
