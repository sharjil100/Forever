'use client';
import Image from 'next/image';

export default function Story() {
  return (
    <section className="story" id="story">
      <div className="story-inner">
        {/* Editorial image */}
        <div className="story-img reveal">
          <Image
            src="/story2.png"
            alt="FOREVER brand editorial"
            width={1400} height={1867}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.72)' }}
          />
        </div>

        {/* Copy */}
        <div>
          <span className="label reveal">Our Philosophy</span>
          <blockquote className="story-quote reveal reveal-delay-1">
            &ldquo;Clothes that don&apos;t ask
            <br />for your attention.
            <br />They just hold it.&rdquo;
          </blockquote>
          <div className="story-body reveal reveal-delay-2">
            <p>
              FOREVER was not built to follow seasons. It was built
              to outlast them.
            </p>
            <p>
              Heavyweight fleece. Clean silhouettes. No logos fighting
              for attention. Just fabric, construction, and the
              understanding that the best clothes feel like a second skin.
            </p>
            <p>
              Worn by those who dress with intention — not to be seen,
              but to be remembered.
            </p>
          </div>
          <a href="/shop" className="btn btn-primary reveal reveal-delay-3">
            Open the Catalogue
          </a>
        </div>
      </div>
    </section>
  );
}
