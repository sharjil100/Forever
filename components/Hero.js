'use client';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">

        {/* LEFT COLUMN */}
        <div className="hero-col hero-col-left">
          <div className="hero-words hero-words-l">
            <h1 className="hero-word">where</h1>
            <h2 className="hero-word">style</h2>
          </div>

          <div className="hero-info">
            <span className="hero-small-label">#FASHION</span>
            <p className="hero-desc">
              Explore curated collections<br />
              exclusive drops and everyday<br />
              essentials all thoughtfully<br />
              designed in one stylish<br />
              shopping destination.
            </p>
          </div>

          <span className="hero-collection">New<br />Collection 2026</span>
        </div>

        {/* CENTER MODEL */}
        <div className="hero-col hero-col-center">
          <img src="/hero3.png" alt="FOREVER — New Collection 2026" className="hero-model" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="hero-col hero-col-right">
          <div className="hero-right-head">
            <span className="hero-tag">#STYLED FOR<br />LIFE.</span>
            <div className="hero-words hero-words-r">
              <h2 className="hero-word hero-word-r">lives</h2>
              <h2 className="hero-word hero-word-r">now</h2>
            </div>
          </div>

          <div className="hero-mid-r">
            <div className="hero-avatars">
              <div className="hero-avatar">S</div>
              <div className="hero-avatar">K</div>
              <div className="hero-avatar">A</div>
              <div className="hero-avatar-dot" />
            </div>
            <span className="hero-plus" aria-hidden="true">+</span>
          </div>

          <div className="hero-stat">
            <span className="hero-stat-num">280K</span>
            <span className="hero-stat-lbl">PEOPLE WE INSPIRE</span>
          </div>
        </div>

      </div>

      {/* BRAND LOGOS BAR — attached under hero image */}
      <div className="hero-brands">
        <div className="hero-brands-track">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="hero-brands-group" key={i} aria-hidden={i > 0}>
              {[
                'As seen in', 'Vogue', 'Hypebeast', 'Highsnobiety', 'GQ', 'Dazed', 'i-D',
                'Oversized', 'Streetwear', 'Essentials', 'Drop 03', 'SS26', 'Archive',
                'Unisex', 'Heavyweight', 'Relaxed Fit', 'Made in BANGLADESH', 'Limited',
              ].map((b, j) => (
                <span key={`${i}-${j}`} className="hero-brand-item">{b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
