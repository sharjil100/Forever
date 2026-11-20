import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/supabase';
import { formatPrice } from '@/data/site';
import { getProduct } from '@/data/products';
import { setOrderStatus } from '../../../actions';
import { AREA_LABEL, StatusBadge, dhakaDate } from '../../../format';
import ConfirmButton from './ConfirmButton';

export const dynamic = 'force-dynamic';

const NEXT_STEP = {
  new: { status: 'confirmed', label: 'Mark as Confirmed' },
  confirmed: { status: 'shipped', label: 'Mark as Shipped' },
  shipped: { status: 'delivered', label: 'Mark as Delivered' },
};

export default async function AdminOrder({ params }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();
  const { data: o } = await db().from('orders').select('*, order_items(*)').eq('id', id).maybeSingle();
  if (!o) notFound();

  const next = NEXT_STEP[o.status];
  const canCancel = !['delivered', 'cancelled'].includes(o.status);
  const wa = `https://wa.me/88${o.phone}`;

  return (
    <>
      <a href="/admin" className="adm-back">← All orders</a>
      <div className="adm-order-head">
        <div>
          <h1>{o.order_no}</h1>
          <p>{dhakaDate(o.created_at)} · Cash on Delivery</p>
        </div>
        <StatusBadge status={o.status} />
      </div>

      <div className="adm-order-grid">
        <div className="adm-card">
          <h2>Items</h2>
          {o.order_items.map((i) => {
            const p = getProduct(i.slug);
            return (
              <div className="co-item" key={i.id}>
                <div className="co-thumb">
                  {p && <Image src={p.images[0]} alt="" fill sizes="56px" style={{ objectFit: 'cover' }} />}
                  <span>{i.qty}</span>
                </div>
                <div className="co-item-info"><b>{i.name}</b><span>{i.color_name} · Size {i.size}</span></div>
                <div className="co-item-price">{formatPrice(i.price * i.qty)}</div>
              </div>
            );
          })}
          <div className="cart-row adm-sep"><span>Subtotal</span><span>{formatPrice(o.subtotal)}</span></div>
          <div className="cart-row"><span>Delivery ({AREA_LABEL[o.area]})</span><span>{formatPrice(o.delivery)}</span></div>
          <div className="cart-row cart-total"><span>Total to collect</span><span>{formatPrice(o.total)}</span></div>
        </div>

        <div className="adm-side">
          <div className="adm-card">
            <h2>Customer</h2>
            <p className="adm-cust">
              <b>{o.customer_name}</b><br />
              <a href={`tel:${o.phone}`}>{o.phone}</a> · <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a><br />
              {o.email && <><a href={`mailto:${o.email}`}>{o.email}</a><br /></>}
              <span style={{ whiteSpace: 'pre-line' }}>{o.address}</span><br />
              {AREA_LABEL[o.area]}
            </p>
            {o.note && <p className="adm-note">Note: {o.note}</p>}
          </div>

          <div className="adm-card">
            <h2>Update status</h2>
            <div className="adm-actions">
              {next && (
                <form action={setOrderStatus}>
                  <input type="hidden" name="id" value={o.id} />
                  <input type="hidden" name="status" value={next.status} />
                  <button className="btn btn-dark btn-full">{next.label}</button>
                </form>
              )}
              {canCancel && (
                <form action={setOrderStatus}>
                  <input type="hidden" name="id" value={o.id} />
                  <input type="hidden" name="status" value="cancelled" />
                  <ConfirmButton message={`Cancel ${o.order_no}? The items go back into stock.`}>Cancel order</ConfirmButton>
                </form>
              )}
              {!next && !canCancel && <p className="adm-empty">This order is {o.status}. No further steps.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
