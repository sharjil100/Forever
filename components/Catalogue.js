'use client';
import Image from 'next/image';

export default function Catalogue() {
  return (
    <section className="catalogue" id="catalogue">
      <div className="container">

        <div className="cat-hero reveal-stagger reveal">
          <span className="label">/ Issue 03 — SS26</span>
          <h2 className="cat-hero-title">
            A catalogue,<br />
            <em>not a collection.</em>
          </h2>
          <p className="cat-hero-sub">
            FOREVER is not a seasonal brand. Every piece we&rsquo;ve ever made still lives
            in one place — heavyweight fleece, oversized cuts, and the archive that
            started it all. Browse it like a magazine.
          </p>
        </div>

        <div className="cat-spread">
          <a href="/shop" className="cat-card cat-card-lg reveal reveal-blur">
            <div className="cat-card-img">
              <Image
                src="/cover-ss26.png"
                alt="Embrace the Journey"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="cat-card-foot">
              <div>
                <span className="cat-card-eyebrow">Cover Story</span>
                <h3 className="cat-card-title">Embrace the Journey</h3>
                <p className="cat-card-meta">Drop 03 · 13 styles · In stock</p>
              </div>
              <span className="cat-arrow" aria-hidden="true">↗</span>
            </div>
          </a>

          <div className="cat-side reveal-stagger reveal">
            <a href="/shop#archive" className="cat-card cat-card-sm">
              <div className="cat-card-img cat-card-img-archive">
                <Image
                  src="/COVER-SS24-CROP.png"
                  alt="The Beginning archive"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  style={{ objectFit: 'cover', filter: 'grayscale(0.6) brightness(0.85)' }}
                />
              </div>
              <div className="cat-card-foot">
                <div>
                  <span className="cat-card-eyebrow">Archive</span>
                  <h3 className="cat-card-title-sm">The Beginning</h3>
                </div>
                <span className="cat-arrow-sm" aria-hidden="true">↗</span>
              </div>
            </a>

            <div className="cat-card cat-card-cta">
              <span className="cat-card-eyebrow cat-card-eyebrow-light">Browse all</span>
              <h3 className="cat-cta-title">
                Open the<br />catalogue.
              </h3>
              <p className="cat-cta-sub">
                Hoodies, tees, sweatpants and the founders&rsquo; archive — every piece in one place.
              </p>
              <a href="/shop" className="cat-cta-btn">
                <span>Enter Catalogue</span>
                <span className="cat-cta-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
