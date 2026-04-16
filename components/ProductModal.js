'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductModal({ product, onClose, onToast }) {
  const { dispatch } = useCart();

  if (!product) return null;

  function handleAdd() {
    if (!product.inStock) return;
    dispatch({ type: 'ADD', item: product });
    onToast(`${product.name} added to cart`);
    onClose();
  }

  // which sizes does this product actually have
  const availSizes = product.size.split('/').map((s) => s.trim());

  return (
    <>
      <div className="modal-bg open" onClick={onClose} />
      <div className="modal-box open">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-grid">

          {/* Image */}
          <div className="modal-img">
            <Image
              src={product.image}
              alt={product.name}
              width={600} height={800}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Info */}
          <div className="modal-info">
            <div className="modal-line">{product.category.toUpperCase()}</div>
            <h2 className="modal-name">{product.name}</h2>
            <p className="modal-sub">{product.colorway} — {product.subtitle}</p>
            <p className="modal-desc">{product.longDescription}</p>

            {/* Size selector */}
            <div style={{ marginBottom: 28 }}>
              <div className="modal-notes-title">Select Size</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {SIZES.map((sz) => {
                  const avail = availSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      style={{
                        padding: '8px 14px',
                        border: '1px solid',
                        borderColor: avail ? 'var(--border-hi)' : 'var(--border)',
                        background: 'transparent',
                        color: avail ? 'var(--text)' : 'var(--text3)',
                        fontSize: 11,
                        letterSpacing: '.08em',
                        cursor: avail ? 'pointer' : 'default',
                        opacity: avail ? 1 : 0.35,
                        transition: 'all .2s',
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="modal-price">
              ${product.price}
              {product.originalPrice && (
                <span className="modal-size" style={{ textDecoration: 'line-through', color: 'var(--text3)' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={handleAdd}
              disabled={!product.inStock}
              style={{ opacity: product.inStock ? 1 : 0.4 }}
            >
              {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </button>

            <p style={{ marginTop: 14, fontSize: 11, color: 'var(--text3)', textAlign: 'center' }}>
              Free shipping over $200 &nbsp;·&nbsp; Easy returns
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
