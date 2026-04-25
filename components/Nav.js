'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function Nav({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const { totalQty } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('forever-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('forever-theme', next);
  };

  const links = [
    { label: 'Catalogue', href: '/shop' },
    { label: 'Archive',   href: '/shop#archive' },
    { label: 'Our Story', href: '/#story' },
    { label: 'Contact',   href: '/#join' },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo — left */}
          <a href="/" className="nav-logo">FOREVER</a>

          {/* Desktop centre links */}
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          {/* Right: theme toggle + cart + mobile hamburger */}
          <div className="nav-right">
            <button
              className="nav-icon-btn theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button className="nav-icon-btn" onClick={onCartOpen} aria-label="Open cart">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className={`cart-badge${totalQty > 0 ? ' show' : ''}`}>{totalQty}</span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="nav-icon-btn nav-hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="hamburger"><span /><span /></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
