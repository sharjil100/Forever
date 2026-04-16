'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function Nav({ onCartOpen }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { totalQty } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Collections', href: '#collections' },
    { label: 'Shop All',    href: '#shop' },
    { label: 'Our Story',   href: '#story' },
    { label: 'Contact',     href: '#join' },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Left */}
          <div className="nav-left">
            <button
              className="nav-icon-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="hamburger">
                <span /><span />
              </div>
            </button>
          </div>

          {/* Logo */}
          <a href="/" className="nav-logo">FOREVER</a>

          {/* Right */}
          <div className="nav-right">
            <button
              className="nav-icon-btn"
              onClick={onCartOpen}
              aria-label="Open cart"
            >
              {/* Bag icon */}
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className={`cart-badge${totalQty > 0 ? ' show' : ''}`}>
                {totalQty}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
