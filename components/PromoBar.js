import { site } from '@/data/site';

export default function PromoBar() {
  const items = [...site.promo, ...site.promo, ...site.promo, ...site.promo];
  return (
    <div className="promo" role="region" aria-label="Announcements">
      <div className="promo-track">
        {[0, 1].map((copy) => (
          <div className="promo-group" key={copy} aria-hidden={copy === 1}>
            {items.map((t, i) => (
              <a href="/shop" key={i}>{t}</a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
