'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const RATINGS = [4.5, 4.3, 4.8, 4.2, 4.6, 4.7, 4.4, 4.9, 4.1, 4.5, 4.3, 4.7];

export default function ProductCard({ product, onQuickView, onToast }) {
  const { dispatch } = useCart();
  const [hovered, setHovered] = useState(false);

  const rating = RATINGS[product.id % RATINGS.length];
  const imgSrc = hovered && product.hoverImage ? product.hoverImage : product.image;

  function handleAdd(e) {
    e.stopPropagation();
    if (!product.inStock) return;
    dispatch({ type: 'ADD', item: product });
    onToast(`${product.name} added to cart`);
  }

  return (
    <div
      className="product-card"
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Oval image container */}
      <div className="pc-visual">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width:480px) 50vw, (max-width:768px) 50vw, 25vw"
          style={{ objectFit: 'contain', transition: 'opacity .4s' }}
        />
        {product.originalPrice && <span className="pc-badge">Sale</span>}
        {!product.inStock      && <span className="pc-badge-out">Sold Out</span>}
        <button
          className={`pc-add${!product.inStock ? ' disabled' : ''}`}
          onClick={handleAdd}
        >
          {product.inStock ? 'Quick Add' : 'Sold Out'}
        </button>
      </div>

      {/* Info row */}
      <div className="pc-info">
        <h3 className="pc-name">{product.name}</h3>
        <div className="pc-bottom">
          <div>
            <span className="pc-price">${product.price}</span>
            {product.originalPrice && (
              <span className="pc-original">${product.originalPrice}</span>
            )}
          </div>
          <div className="pc-stars">
            <span className="pc-stars-icon">★</span>
            <span className="pc-stars-num">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
