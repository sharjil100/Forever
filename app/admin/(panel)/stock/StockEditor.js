'use client';
import { useEffect, useMemo, useState, useTransition } from 'react';
import Image from 'next/image';
import { saveStock } from '../../actions';

const LOW = 3;

function statusOf(q) {
  if (q === '' || q === undefined) return { label: '—', cls: '' };
  if (Number(q) === 0) return { label: 'Sold out', cls: 'out' };
  if (Number(q) <= LOW) return { label: 'Low', cls: 'low' };
  return { label: 'In stock', cls: 'ok' };
}

export default function StockEditor({ groups, initial, sold }) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [toast, setToast] = useState(null); // { ok, text }
  const [pending, start] = useTransition();

  const changed = useMemo(() => Object.keys(values).filter((k) => values[k] !== saved[k]), [values, saved]);
  const all = Object.values(values).map((n) => Number(n) || 0);
  const summary = {
    units: all.reduce((s, n) => s + n, 0),
    low: all.filter((n) => n > 0 && n <= LOW).length,
    out: all.filter((n) => n === 0).length,
    sold: Object.values(sold).reduce((s, n) => s + n, 0),
  };

  // warn before leaving with unsaved changes
  useEffect(() => {
    if (!changed.length) return;
    const h = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [changed.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const set = (key, raw) => setValues((v) => ({ ...v, [key]: raw === '' ? '' : Math.max(0, Math.floor(Number(raw)) || 0) }));
  const bump = (key, d) => setValues((v) => ({ ...v, [key]: Math.max(0, (Number(v[key]) || 0) + d) }));

  function save() {
    const updates = changed.map((k) => {
      const [slug, size] = k.split('|');
      return { slug, size, qty: Number(values[k]) || 0 };
    });
    start(async () => {
      const res = await saveStock(updates);
      if (res?.ok) {
        const next = { ...values };
        for (const k of changed) next[k] = Number(values[k]) || 0;
        setValues(next);
        setSaved(next);
        setToast({ ok: true, text: `Saved ${res.saved} change${res.saved === 1 ? '' : 's'} — the website updates within 30 seconds.` });
      } else {
        setToast({ ok: false, text: res?.error || 'Could not save. Please try again.' });
      }
    });
  }

  return (
    <div className="stk">
      <div className="stk-head">
        <h1 className="adm-h1">Stock</h1>
        <p className="adm-muted">Use − / + or type a number, then press <b>Save changes</b>. Online orders reduce stock automatically; cancelling an order puts it back.</p>
      </div>

      <div className="adm-stats">
        <div className="adm-stat"><span>Units in stock</span><b>{summary.units}</b><small>all products</small></div>
        <div className="adm-stat"><span>Low</span><b className="t-low">{summary.low}</b><small>sizes with 1–{LOW} left</small></div>
        <div className="adm-stat"><span>Sold out</span><b className="t-out">{summary.out}</b><small>sizes at 0</small></div>
        <div className="adm-stat"><span>Sold online</span><b>{summary.sold}</b><small>excl. cancelled</small></div>
      </div>

      {groups.map((g) => (
        <section key={g.id} className="stk-group">
          <h2 className="stk-group-title">{g.label}</h2>
          <div className="stk-grid">
            {g.products.map((p) => {
              const total = p.sizes.reduce((s, size) => s + (Number(values[`${p.slug}|${size}`]) || 0), 0);
              return (
                <div key={p.slug} className="stk-card">
                  <div className="stk-card-head">
                    <div className="stk-img"><Image src={p.image} alt="" fill sizes="56px" style={{ objectFit: 'cover' }} /></div>
                    <div className="stk-title">
                      <b>{p.colorName}</b>
                      <span>{p.name}</span>
                    </div>
                    <div className="stk-total"><b>{total}</b><span>units</span></div>
                  </div>
                  <div className="stk-rows">
                    {p.sizes.map((size) => {
                      const key = `${p.slug}|${size}`;
                      const v = values[key] ?? '';
                      const st = statusOf(v);
                      const dirty = values[key] !== saved[key];
                      return (
                        <div key={size} className={`stk-row${dirty ? ' dirty' : ''}`}>
                          <span className="stk-size">{size}</span>
                          <span className={`stk-pill ${st.cls}`}>{st.label}</span>
                          {sold[key] ? <span className="stk-sold">{sold[key]} sold</span> : <span className="stk-sold" />}
                          <div className="stk-step">
                            <button type="button" onClick={() => bump(key, -1)} disabled={!Number(v)} aria-label={`Remove one ${p.colorName} ${size}`}>−</button>
                            <input type="number" min="0" inputMode="numeric" value={v}
                              onChange={(e) => set(key, e.target.value)} aria-label={`${p.colorName} ${size} stock`} />
                            <button type="button" onClick={() => bump(key, 1)} aria-label={`Add one ${p.colorName} ${size}`}>+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* sticky save bar */}
      <div className={`stk-bar${changed.length ? ' show' : ''}`} role="region" aria-label="Unsaved changes">
        <span><b>{changed.length}</b> unsaved change{changed.length === 1 ? '' : 's'}</span>
        <div>
          <button type="button" className="btn stk-discard" onClick={() => setValues(saved)} disabled={pending}>Discard</button>
          <button type="button" className="btn btn-dark" onClick={save} disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button>
        </div>
      </div>

      {toast && <div className={`stk-toast ${toast.ok ? 'ok' : 'err'}`} role="status">{toast.ok ? '✓ ' : ''}{toast.text}</div>}
    </div>
  );
}
