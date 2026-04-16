'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { items, dispatch, subtotal, shipping, grandTotal } = useCart();

  const remaining = 200 - subtotal;

  return (
    <>
      <div className={`cart-bg${open ? ' open' : ''}`} onClick={onClose} />

      <aside className={`cart-drawer${open ? ' open' : ''}`}>
        {/* Header */}
        <div className="cart-head">
          <h2 className="cart-title">Your Cart</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-glyph">∅</div>
              <p>Your cart is empty.</p>
              <a href="#shop" className="btn btn-ghost" onClick={onClose}
                style={{ marginTop: 8 }}>
                Explore Collection
              </a>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="ci-img" style={{ position: 'relative', width: 68, height: 86 }}>
                  <Image src={item.image} alt={item.name} fill
                    style={{ objectFit: 'cover' }} sizes="68px" />
                </div>
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-size">{item.size}</div>
                  <div className="ci-qty">
                    <button className="ci-qty-btn"
                      onClick={() => dispatch({ type: 'DEC', id: item.id })}>−</button>
                    <span className="ci-qty-num">{item.qty}</span>
                    <button className="ci-qty-btn"
                      onClick={() => dispatch({ type: 'INC', id: item.id })}>+</button>
                  </div>
                </div>
                <div className="ci-right">
                  <span className="ci-price">${(item.price * item.qty).toFixed(0)}</span>
                  <button className="ci-remove"
                    onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer totals — only when cart has items */}
        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-totals">
              <div className="cart-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(0)}</span>
              </div>
              <div className="cart-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="cart-row-total">
                <span>Total</span>
                <span>${grandTotal.toFixed(0)}</span>
              </div>
            </div>

            <p className="cart-note">
              {remaining > 0
                ? `Add $${remaining.toFixed(0)} more for free shipping`
                : '✓ Free shipping applied'}
            </p>

            <button className="btn btn-primary btn-full">
              Proceed to Checkout
            </button>
            <p className="cart-secure">🔒 Secure checkout</p>
          </div>
        )}
      </aside>
    </>
  );
}
