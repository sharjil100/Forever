import { db } from '@/lib/supabase';
import { formatPrice } from '@/data/site';
import { STATUS_META, AREA_LABEL, StatusBadge, dhakaDate, dhakaTodayStartISO } from '../format';

export const dynamic = 'force-dynamic';

export default async function AdminOrders({ searchParams }) {
  const status = STATUS_META[searchParams?.status] ? searchParams.status : 'all';
  const q = String(searchParams?.q || '').replace(/[^\w\s+@.-]/g, '').trim().slice(0, 40);
  const supa = db();

  let list = supa.from('orders')
    .select('id,order_no,created_at,status,customer_name,phone,area,total,order_items(qty)')
    .order('created_at', { ascending: false })
    .limit(200);
  if (status !== 'all') list = list.eq('status', status);
  if (q) list = list.or(`order_no.ilike.%${q}%,phone.ilike.%${q}%,customer_name.ilike.%${q}%`);

  const todayStart = dhakaTodayStartISO();
  const [{ data: orders, error }, { data: all }, { data: lowStock }] = await Promise.all([
    list,
    supa.from('orders').select('status,total,created_at'),
    supa.from('stock').select('slug').lte('qty', 3),
  ]);

  const counts = { all: all?.length || 0 };
  for (const o of all || []) counts[o.status] = (counts[o.status] || 0) + 1;
  const live = (all || []).filter((o) => o.status !== 'cancelled');
  const today = live.filter((o) => o.created_at >= todayStart);
  const stats = [
    { label: 'New orders', value: counts.new || 0, hint: 'waiting for a call' },
    { label: 'Today', value: today.length, hint: formatPrice(today.reduce((s, o) => s + o.total, 0)) },
    { label: 'Revenue (all time)', value: formatPrice(live.reduce((s, o) => s + o.total, 0)), hint: `${live.length} orders, excl. cancelled` },
    { label: 'Low stock', value: lowStock?.length || 0, hint: 'sizes with 3 or fewer', href: '/admin/stock' },
  ];

  const tabs = ['all', ...Object.keys(STATUS_META)];

  return (
    <>
      <div className="adm-stats">
        {stats.map((s) => {
          const Inner = (
            <>
              <span>{s.label}</span>
              <b>{s.value}</b>
              <small>{s.hint}</small>
            </>
          );
          return s.href
            ? <a key={s.label} href={s.href} className="adm-stat">{Inner}</a>
            : <div key={s.label} className="adm-stat">{Inner}</div>;
        })}
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <div className="chips">
            {tabs.map((t) => (
              <a key={t} href={`/admin?status=${t}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className={`chip${status === t ? ' active' : ''}`}>
                {t === 'all' ? 'All' : STATUS_META[t].label} <span>{counts[t] || 0}</span>
              </a>
            ))}
          </div>
          <form className="adm-search">
            {status !== 'all' && <input type="hidden" name="status" value={status} />}
            <input name="q" defaultValue={q} placeholder="Search order no, phone, name" />
          </form>
        </div>

        {error && <p className="co-error">Couldn&rsquo;t load orders: {error.message}</p>}
        {!error && (!orders || orders.length === 0) && <p className="adm-empty">No orders here yet.</p>}

        {orders?.length > 0 && (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr><th>Order</th><th>Date</th><th>Customer</th><th>Phone</th><th>Items</th><th>Area</th><th>Total</th><th>Status</th></tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td><a href={`/admin/orders/${o.id}`} className="adm-link">{o.order_no}</a></td>
                    <td>{dhakaDate(o.created_at)}</td>
                    <td>{o.customer_name}</td>
                    <td><a href={`tel:${o.phone}`}>{o.phone}</a></td>
                    <td>{o.order_items.reduce((s, i) => s + i.qty, 0)}</td>
                    <td>{AREA_LABEL[o.area]}</td>
                    <td><b>{formatPrice(o.total)}</b></td>
                    <td><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
