import { site } from '@/data/site';
import { CATEGORIES } from '@/data/products';

export default function Footer() {
  const social = [
    site.facebookUrl && { label: 'Facebook', href: site.facebookUrl },
    site.instagramUrl && { label: 'Instagram', href: site.instagramUrl },
    site.messengerUrl && { label: 'Messenger', href: site.messengerUrl },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="services">
        <div><b>Cash on Delivery</b><span>Pay when your order arrives</span></div>
        <div><b>Delivery Across Bangladesh</b><span>Dhaka and outside Dhaka</span></div>
        <div><b>Order on Messenger</b><span>Add to bag, then send us your order</span></div>
      </div>

      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo logo-footer">FOREVER</div>
          <p>Embrace the journey.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <a href="/shop">Shop All</a>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`/shop?c=${c.id}`}>{c.label}</a>
          ))}
        </div>
        {social.length > 0 && (
          <div className="footer-col">
            <h4>Follow</h4>
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        )}
      </div>
      <div className="footer-bottom">© 2026 FOREVER. All rights reserved.</div>
    </footer>
  );
}
