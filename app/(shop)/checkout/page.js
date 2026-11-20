'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { site, formatPrice, normalizePhone } from '@/data/site';

export default function CheckoutPage() {
  const { items, subtotal, dispatch } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', area: 'inside_dhaka', note: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [message, setMessage] = useState('');
  const [placed, setPlaced] = useState(null);

  const delivery = site.delivery[form.area]?.fee ?? 0;
  const total = subtotal + delivery;
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: undefined })); };

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!normalizePhone(form.phone)) e.phone = 'Enter a valid mobile number (01XXXXXXXXX).';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'That email doesn\'t look right.';
    if (form.address.trim().length < 8) e.address = 'Please enter your full address (house, road, area, city).';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev) {
    ev.preventDefault();
    setMessage('');
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: items.map((i) => ({ slug: i.slug, size: i.size, qty: i.qty })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('idle');
        if (data.fields) setErrors(data.fields);
        if (data.shortages) {
          setMessage(`${data.error} ${data.shortages.map((s) => `${s.label}: ${s.available} left`).join(' · ')}`);
        } else {
          setMessage(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }
      setPlaced({ order_no: data.order_no, total: data.total, items, email: form.email.trim(), phone: form.phone });
      dispatch({ type: 'CLEAR' });
      setStatus('done');
      window.scrollTo({ top: 0 });
    } catch {
      setStatus('idle');
      setMessage('Network problem — please check your connection and try again.');
    }
  }

  if (status === 'done' && placed) {
    return (
      <div className="checkout checkout-done">
        <span className="eyebrow">Order placed</span>
        <h1>Thank you!</h1>
        <p className="co-lead">Your order number is <b>{placed.order_no}</b>.</p>
        <p>We&rsquo;ll call you on <b>{placed.phone}</b> to confirm before shipping. Pay {formatPrice(placed.total)} in cash when it arrives.</p>
        {placed.email && <p>A confirmation email is on its way to <b>{placed.email}</b>.</p>}
        <a href="/shop" className="btn btn-dark">Continue shopping</a>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout checkout-done">
        <h1>Your bag is empty</h1>
        <a href="/shop" className="btn btn-dark">Shop the sale</a>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <label className={`co-field${errors[k] ? ' has-error' : ''}`}>
      <span>{label}</span>
      {props.textarea
        ? <textarea value={form[k]} onChange={set(k)} rows={3} {...props.input} />
        : <input value={form[k]} onChange={set(k)} {...props.input} />}
      {errors[k] && <em>{errors[k]}</em>}
    </label>
  );

  return (
    <div className="checkout">
      <h1 className="co-title">Checkout</h1>
      <form className="co-grid" onSubmit={submit} noValidate>
        <div className="co-form">
          <h2 className="co-h">Delivery details</h2>
          {field('name', 'Full name *', { input: { autoComplete: 'name' } })}
          {field('phone', 'Mobile number *', { input: { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '01XXXXXXXXX' } })}
          {field('email', 'Email (optional — for your confirmation)', { input: { type: 'email', autoComplete: 'email' } })}
          {field('address', 'Full address *', { textarea: true, input: { autoComplete: 'street-address', placeholder: 'House, road, area, city' } })}

          <div className="co-field">
            <span>Delivery area *</span>
            <div className="co-areas">
              {Object.entries(site.delivery).map(([id, d]) => (
                <label key={id} className={`co-area${form.area === id ? ' active' : ''}`}>
                  <input type="radio" name="area" value={id} checked={form.area === id} onChange={set('area')} />
                  <b>{d.label}</b><span>{formatPrice(d.fee)}</span>
                </label>
              ))}
            </div>
          </div>
          {field('note', 'Note for us (optional)', { textarea: true, input: { rows: 2 } })}

          <div className="co-pay">
            <b>Payment: Cash on Delivery</b>
            <span>Pay when your order arrives. We&rsquo;ll call to confirm first.</span>
          </div>
        </div>

        <aside className="co-summary">
          <h2 className="co-h">Your order</h2>
          {items.map((i) => (
            <div className="co-item" key={i.key}>
              <div className="co-thumb">
                <Image src={i.image} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />
                <span>{i.qty}</span>
              </div>
              <div className="co-item-info">
                <b>{i.name}</b>
                <span>{i.colorName} · Size {i.size}</span>
              </div>
              <div className="co-item-price">{formatPrice(i.price * i.qty)}</div>
            </div>
          ))}
          <div className="cart-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="cart-row"><span>Delivery ({site.delivery[form.area].label})</span><span>{formatPrice(delivery)}</span></div>
          <div className="cart-row cart-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          {message && <p className="co-error" role="alert">{message}</p>}
          <button className="btn btn-dark btn-full btn-lg" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Placing order…' : `Place Order — ${formatPrice(total)}`}
          </button>
        </aside>
      </form>
    </div>
  );
}
