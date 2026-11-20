import Image from 'next/image';
import { CATEGORIES } from '@/data/products';

export function CategoryTiles() {
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">Shop by Category</h2>
      </div>
      <div className="tiles">
        {CATEGORIES.map((c) => (
          <a key={c.id} href={`/shop?c=${c.id}`} className="tile">
            <Image src={c.tile} alt={c.label} fill sizes="(max-width: 767px) 80vw, 33vw" className="tile-img" />
            <div className="tile-label">
              <span>{c.label}</span>
              <u>Shop now</u>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Campaign() {
  const panels = [
    { img: '/images/campaign/red.jpg', kicker: 'Undying Black', title: 'Embrace The Journey', cta: 'Shop Hoodies', href: '/shop?c=hoodies' },
    { img: '/images/campaign/smoke.jpg', kicker: 'Steel Grey', title: 'Built For The Season', cta: 'Shop Sweatpants', href: '/shop?c=sweatpants' },
  ];
  return (
    <section className="campaign">
      {panels.map((p) => (
        <a key={p.img} href={p.href} className="campaign-panel">
          <Image src={p.img} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="tile-img" />
          <div className="campaign-text">
            <span className="hero-kicker">{p.kicker}</span>
            <h2>{p.title}</h2>
            <span className="btn btn-light">{p.cta}</span>
          </div>
        </a>
      ))}
    </section>
  );
}

export function Story() {
  return (
    <section className="story">
      <div className="story-media">
        <Image src="/images/campaign/glow.jpg" alt="" fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="story-text">
        <span className="eyebrow">We&rsquo;re back</span>
        <h2>We&rsquo;ve been quiet for a while.</h2>
        <p>
          Due to some unavoidable circumstances, we had to step away. But we never stopped believing in what we built.
          FOREVER is back — and to celebrate our return, everything is flat 40% off.
        </p>
        <p className="story-small">Stock is limited. Once it&rsquo;s gone, it&rsquo;s gone.</p>
        <a href="/shop" className="btn btn-dark">Shop the sale</a>
      </div>
    </section>
  );
}

export function Lookbook() {
  const looks = [1, 2, 3, 4, 5, 6];
  return (
    <section className="section">
      <div className="section-head">
        <h2 className="section-title">The Lookbook</h2>
        <a href="/shop" className="link">Shop the looks</a>
      </div>
      <div className="lookbook">
        <a href="/shop?c=tshirts" className="look look-video" aria-label="FOREVER oversized tees — watch the reel">
          <video src="/videos/lookbook-reel.mp4" poster="/videos/lookbook-reel-poster.jpg"
            autoPlay muted loop playsInline preload="metadata" />
          <span className="look-badge">Oversized Tees</span>
        </a>
        {looks.map((n) => (
          <a key={n} href="/shop" className="look">
            <Image src={`/images/look/${n}.jpg`} alt="FOREVER lookbook" fill sizes="(max-width: 767px) 70vw, 22vw" className="tile-img" />
          </a>
        ))}
      </div>
    </section>
  );
}
