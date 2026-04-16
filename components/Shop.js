'use client';
import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Toast from './Toast';

const FILTERS = [
  { label: 'All',        value: 'all'       },
  { label: 'Hoodies',   value: 'hoodies'   },
  { label: 'T-Shirts',  value: 'tshirts'   },
  { label: 'Sweatpants',value: 'sweatpants'},
];

export default function Shop() {
  const [active,  setActive]  = useState('all');
  const [modal,   setModal]   = useState(null);
  const [toast,   setToast]   = useState('');
  const [toastOn, setToastOn] = useState(false);

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active);

  function showToast(msg) {
    setToast(msg);
    setToastOn(true);
    setTimeout(() => setToastOn(false), 2200);
  }

  return (
    <section className="shop" id="shop">
      <div className="container">
        <span className="label">The Full Range</span>
        <h2 className="section-title">Shop All</h2>

        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${active === f.value ? ' active' : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={setModal}
              onToast={showToast}
            />
          ))}
        </div>
      </div>

      {modal && (
        <ProductModal
          product={modal}
          onClose={() => setModal(null)}
          onToast={showToast}
        />
      )}

      <Toast message={toast} show={toastOn} />
    </section>
  );
}
