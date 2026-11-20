import Image from 'next/image';
import { formatPrice } from '@/data/site';
import StockTag from './StockTag';

export default function ProductCard({ product, priority = false }) {
  const [main, hover] = product.images;
  return (
    <a href={`/product/${product.slug}`} className="card">
      <div className="card-media">
        <Image src={main} alt={`${product.name} — ${product.colorName}`} fill priority={priority}
          sizes="(max-width: 767px) 50vw, 25vw" className="card-img" />
        {hover && (
          <Image src={hover} alt="" fill sizes="(max-width: 767px) 50vw, 25vw" className="card-img card-img-hover" />
        )}
        <span className="tag">Sale</span>
        <StockTag slug={product.slug} sizes={product.sizes} label={product.outLabel} />
      </div>
      <div className="card-info">
        <h3 className="card-name">{product.name}</h3>
        <div className="card-color">
          <span className="dot" style={{ background: product.colorHex }} />
          {product.colorName}
        </div>
        <div className="price">
          <s>{formatPrice(product.was)}</s>
          <b>{formatPrice(product.price)}</b>
          <em>−{product.discount}%</em>
        </div>
      </div>
    </a>
  );
}
