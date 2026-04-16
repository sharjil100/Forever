'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const FOG = 'https://fearofgod.com/cdn/shop/files';

export default function Story() {
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
    <section className="story" id="story" ref={ref}>
      <div className="story-inner">
        {/* Editorial image */}
        <div className="story-img reveal">
          <Image
            src={`${FOG}/LOOK_36_26241979-d8f6-4a59-81bf-798c81a576b9.jpg`}
            alt="FOREVER brand editorial"
            width={700} height={900}
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
          <a href="#shop" className="btn btn-primary reveal reveal-delay-3">
            Shop the Collection
          </a>
        </div>
      </div>
    </section>
  );
}
