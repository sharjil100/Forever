'use client';
import { useState } from 'react';
import Nav        from '@/components/Nav';
import Shop       from '@/components/Shop';
import Footer     from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function ShopPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Nav onCartOpen={() => setCartOpen(true)} />

      <header className="shop-page-header">
        <div className="container reveal-stagger reveal">
          <a href="/" className="shop-page-back">← Back to FOREVER</a>
          <span className="label shop-page-eyebrow">/ The Catalogue</span>
          <h1 className="shop-page-title">
            Every piece, every drop.<br />
            <em>One catalogue.</em>
          </h1>
          <p className="shop-page-sub">
            From the founding run to the latest season — every garment FOREVER has made,
            in one place. Shop the current drop, or revisit the archive.
          </p>
        </div>
      </header>

      <Shop />
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
