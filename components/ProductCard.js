'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, onQuickView, onToast }) {
  const { dispatch } = useCart();
  const [hovered, setHovered] = useState(false);

  function handleAdd(e) {
    e.stopPropagation();
    if (!product.inStock) return;
    dispatch({ type: 'ADD', item: product });
    onToast(`${product.name} added to cart`);
  }

  const imgSrc = hovered && product.hoverImage ? product.hoverImage : product.image;

  return (
    <div
      className="product-card"
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Visual */}
      <div className="pc-visual">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width:480px) 100vw, (max-width:768px) 50vw, 25vw"
          style={{ objectFit: 'cover', transition: 'opacity .4s' }}
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

      {/* Info */}
      <div className="pc-info">
        <span className="pc-line">{product.category.toUpperCase()}</span>
        <h3 className="pc-name">{product.name}</h3>
        <span className="pc-sub">{product.colorway}</span>
        <p className="pc-desc">{product.description}</p>
        <div className="pc-footer">
          <div>
            <span className="pc-price">${product.price}</span>
            {product.originalPrice && (
              <span className="pc-original">${product.originalPrice}</span>
            )}
          </div>
          <span className="pc-size" style={{ fontSize: 9, color: 'var(--text3)' }}>
            {product.size.split('/')[0].trim()}+
          </span>
        </div>
      </div>
    </div>
  );
}
