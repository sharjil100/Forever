'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { site, formatPrice } from '@/data/site';

export default function CartDrawer() {
  const { items, dispatch, subtotal, savings, isOpen, closeCart } = useCart();

  return (
    <>
      <div className={`scrim${isOpen ? ' open' : ''}`} onClick={closeCart} />
      <aside className={`cart-drawer${isOpen ? ' open' : ''}`} aria-hidden={!isOpen} aria-label="Your bag">
        <div className="drawer-head">
          <h2 className="drawer-title">Your Bag {items.length > 0 && <span>({items.reduce((s, i) => s + i.qty, 0)})</span>}</h2>
          <button className="icon-btn" onClick={closeCart} aria-label="Close bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty.</p>
            <a href="/shop" className="btn btn-dark" onClick={closeCart}>Shop the sale</a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((i) => (
                <div className="cart-item" key={i.key}>
                  <a href={`/product/${i.slug}`} className="ci-img" onClick={closeCart}>
                    <Image src={i.image} alt={`${i.name} ${i.colorName}`} fill sizes="88px" style={{ objectFit: 'cover' }} />
                  </a>
                  <div className="ci-info">
                    <div className="ci-top">
                      <a href={`/product/${i.slug}`} className="ci-name" onClick={closeCart}>{i.name}</a>
                      <button className="ci-remove" onClick={() => dispatch({ type: 'REMOVE', key: i.key })}>Remove</button>
                    </div>
                    <div className="ci-meta">{i.colorName} · Size {i.size}</div>
                    <div className="ci-bottom">
                      <div className="qty">
                        <button onClick={() => dispatch({ type: 'DEC', key: i.key })} aria-label="Decrease quantity">−</button>
                        <span>{i.qty}</span>
                        <button onClick={() => dispatch({ type: 'INC', key: i.key })} aria-label="Increase quantity">+</button>
                      </div>
                      <div className="price">
                        <s>{formatPrice(i.was * i.qty)}</s>
                        <b>{formatPrice(i.price * i.qty)}</b>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              <div className="cart-row"><span>You save</span><span className="save">−{formatPrice(savings)}</span></div>
              <div className="cart-row cart-total"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <p className="cart-small">Cash on delivery · Delivery charge added at checkout</p>
              <a href="/checkout" className="btn btn-dark btn-full" onClick={closeCart}>Checkout</a>
              {site.messengerUrl && (
                <a href={site.messengerUrl} target="_blank" rel="noopener noreferrer" className="cart-alt">Prefer to order on Messenger?</a>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
