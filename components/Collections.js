'use client';
import Image from 'next/image';
import { collections } from '@/data/products';
import { useEffect, useRef } from 'react';

export default function Collections() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="collections" id="collections" ref={ref}>
      <div className="container">
        <span className="label reveal">Shop by Category</span>
        <h2 className="section-title reveal reveal-delay-1">The Collections</h2>
      </div>

      <div
        className="collections-grid"
        style={{ maxWidth: 1320, margin: '64px auto 0', padding: '0 48px' }}
      >
        {collections.map((c, i) => (
          <div
            key={c.id}
            className={`coll-card reveal reveal-delay-${i + 1}${i === 1 ? ' featured' : ''}`}
          >
            <Image
              src={c.image}
              alt={c.name}
              width={900} height={1200}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.5)' }}
              sizes="(max-width:900px) 100vw, 33vw"
            />
            <div className="coll-card-overlay">
              <div className="coll-line">{c.label}</div>
              <h3 className="coll-name">{c.name}</h3>
              <p className="coll-desc">{c.desc}</p>
              <a href="#shop" className="coll-link">Shop Now →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
