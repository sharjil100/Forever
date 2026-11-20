'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/data/products';

const LINKS = [
  { label: 'Shop All', href: '/shop' },
  ...CATEGORIES.map((c) => ({ label: c.label, href: `/shop?c=${c.id}` })),
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQty, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button className="icon-btn header-burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>

          <nav className="header-links" aria-label="Main">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <a href="/" className="logo" aria-label="FOREVER home">FOREVER</a>

          <div className="header-right">
            <span className="header-sale">40% Off Sale</span>
            <button className="bag-btn" onClick={openCart} aria-label={`Open bag, ${totalQty} items`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 8h14l-1 13H6L5 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              <span className="bag-count">{totalQty}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`scrim${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`menu-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="drawer-head">
          <span className="logo logo-sm">FOREVER</span>
          <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="menu-sale">Flat 40% off everything</div>
        <nav className="menu-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}<span aria-hidden="true">→</span></a>
          ))}
        </nav>
        <div className="menu-tiles">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`/shop?c=${c.id}`} className="menu-tile">
              <Image src={c.tile} alt="" fill sizes="45vw" style={{ objectFit: 'cover' }} />
              <span>{c.label}</span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
