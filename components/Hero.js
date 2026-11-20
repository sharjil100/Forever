import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media hero-desktop">
        <Image src="/images/hero/hero-desktop.jpg" alt="" fill priority sizes="100vw" quality={85}
          style={{ objectFit: 'cover', objectPosition: '50% 30%' }} />
      </div>
      <div className="hero-media hero-mobile">
        <Image src="/images/hero/hero-mobile.jpg" alt="" fill priority sizes="100vw" quality={85}
          style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-kicker">Now live</p>
        <h1 className="hero-title">The FOREVER Return Sale</h1>
        <p className="hero-sub">Flat 40% off every hoodie, sweatpant and tee.</p>
        <div className="hero-ctas">
          <a href="/shop?c=hoodies" className="btn btn-light">Shop Hoodies</a>
          <a href="/shop?c=tshirts" className="btn btn-outline-light">Shop Tees</a>
        </div>
      </div>
    </section>
  );
}
