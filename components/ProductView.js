'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/data/products';
import { formatPrice, site } from '@/data/site';
import { useStock } from '@/hooks/useStock';
import SizeChart from './SizeChart';

export default function ProductView({ product, colorways }) {
  const { addItem, items } = useCart();
  const stock = useStock();
  const [size, setSize] = useState(null);
  const [warn, setWarn] = useState(false);
  const [guide, setGuide] = useState(false);
  const category = CATEGORIES.find((c) => c.id === product.category);

  // qty === null means stock tracking isn't set up yet → everything is orderable
  const left = (s) => {
    const q = stock.qty(product.slug, s);
    if (q === null) return null;
    const inBag = items.find((i) => i.key === `${product.slug}-${s}`)?.qty || 0;
    return Math.max(0, q - inBag);
  };
  const soldOut = stock.configured && product.sizes.every((s) => stock.qty(product.slug, s) === 0);
  const sizeLeft = size ? left(size) : null;

  function add() {
    if (!size) { setWarn(true); return; }
    if (sizeLeft === 0) return;
    addItem(product, size);
  }

  const fees = Object.values(site.delivery).map((d) => `${d.label} ${formatPrice(d.fee)}`).join(' · ');

  return (
    <div className="pdp">
      <div className="pdp-gallery">
        {product.images.map((src, i) => (
          <div className="pdp-img" key={src}>
            <Image src={src} alt={`${product.name} ${product.colorName} — photo ${i + 1}`} fill priority={i < 2}
              sizes="(max-width: 899px) 88vw, 32vw" style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div className="pdp-info">
        <div className="pdp-sticky">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/shop">Shop</a> / <a href={`/shop?c=${category.id}`}>{category.label}</a>
          </nav>
          <h1 className="pdp-name">{product.name}</h1>
          <div className="pdp-color">{product.colorName}</div>
          <div className="price price-lg">
            <s>{formatPrice(product.was)}</s>
            <b>{formatPrice(product.price)}</b>
            <em>−{product.discount}%</em>
          </div>

          <div className="pdp-block">
            <div className="pdp-label">Colour <span>{product.colorName}</span></div>
            <div className="swatches">
              {colorways.map((c) => (
                <a key={c.slug} href={`/product/${c.slug}`} title={c.colorName}
                  className={`swatch${c.slug === product.slug ? ' active' : ''}`}>
                  <Image src={c.images[0]} alt={c.colorName} fill sizes="64px" style={{ objectFit: 'cover' }} />
                </a>
              ))}
            </div>
          </div>

          <div className="pdp-block">
            <div className="pdp-label">
              Size
              {warn && !size && <span className="warn">Please choose a size</span>}
              {size && sizeLeft !== null && sizeLeft > 0 && sizeLeft <= 3 && <span className="warn">Only {sizeLeft} left</span>}
              {product.sizeChart && (
                <button type="button" className="sc-link" onClick={() => setGuide(true)}>Size guide</button>
              )}
            </div>
            <div className="sizes" style={{ gridTemplateColumns: `repeat(${product.sizes.length}, 1fr)` }}>
              {product.sizes.map((s) => {
                const out = stock.qty(product.slug, s) === 0;
                return (
                  <button key={s} disabled={out} title={out ? product.outLabel : undefined}
                    className={`size${size === s ? ' active' : ''}${out ? ' out' : ''}`}
                    onClick={() => { setSize(s); setWarn(false); }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="btn btn-dark btn-full btn-lg" onClick={add} disabled={soldOut || sizeLeft === 0}>
            {soldOut ? product.outLabel : sizeLeft === 0 ? 'All in your bag' : size ? `Add to Bag — ${formatPrice(product.price)}` : 'Select a Size'}
          </button>
          <p className="pdp-note">Cash on delivery · Delivery across Bangladesh</p>

          <details className="acc" open>
            <summary>Description</summary>
            <p>{product.description}</p>
          </details>
          {product.sizeChart && (
            <details className="acc">
              <summary>Size &amp; Fit</summary>
              <SizeChart chart={product.sizeChart} selected={size} />
            </details>
          )}
          <details className="acc">
            <summary>Details</summary>
            <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </details>
          <details className="acc">
            <summary>Delivery &amp; Payment</summary>
            <p>Order online and pay cash when it arrives. We deliver across Bangladesh ({fees}) and call you to confirm before shipping.</p>
          </details>
        </div>
      </div>

      {guide && (
        <>
          <div className="scrim open" onClick={() => setGuide(false)} />
          <div className="sc-modal" role="dialog" aria-modal="true" aria-label={`${product.name} size guide`}>
            <div className="drawer-head">
              <h2 className="drawer-title">Size Guide — {category.label}</h2>
              <button className="icon-btn" onClick={() => setGuide(false)} aria-label="Close size guide">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div className="sc-modal-body">
              <SizeChart chart={product.sizeChart} selected={size} />
              <div className="sc-pick">
                {product.sizes.map((s) => {
                  const out = stock.qty(product.slug, s) === 0;
                  return (
                    <button key={s} disabled={out} className={`size${size === s ? ' active' : ''}${out ? ' out' : ''}`}
                      onClick={() => { setSize(s); setWarn(false); setGuide(false); }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
