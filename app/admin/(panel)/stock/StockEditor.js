'use client';
import { useMemo, useState, useTransition } from 'react';
import Image from 'next/image';
import { saveStock } from '../../actions';

const LOW = 3;

export default function StockEditor({ groups, initial, sold }) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [msg, setMsg] = useState('');
  const [pending, start] = useTransition();

  const changed = useMemo(
    () => Object.keys(values).filter((k) => values[k] !== saved[k]),
    [values, saved]
  );
  const totalUnits = Object.values(values).reduce((s, n) => s + (Number(n) || 0), 0);
  const totalSold = Object.values(sold).reduce((s, n) => s + n, 0);

  function set(key, raw) {
    const n = raw === '' ? '' : Math.max(0, Math.floor(Number(raw)) || 0);
    setValues((v) => ({ ...v, [key]: n }));
    setMsg('');
  }

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
        setMsg(`Saved ${res.saved} change${res.saved === 1 ? '' : 's'}.`);
      } else {
        setMsg(res?.error || 'Could not save.');
      }
    });
  }

  return (
    <>
      <div className="adm-stock-bar">
        <div>
          <h1 className="adm-h1">Stock</h1>
          <p className="adm-muted">{totalUnits} units in stock · {totalSold} sold (excl. cancelled). Orders reduce stock automatically; cancelling puts it back.</p>
        </div>
        <div className="adm-save">
          {msg && <span className="adm-muted">{msg}</span>}
          <button className="btn btn-dark" onClick={save} disabled={pending || changed.length === 0}>
            {pending ? 'Saving…' : changed.length ? `Save ${changed.length} change${changed.length === 1 ? '' : 's'}` : 'Saved'}
          </button>
        </div>
      </div>

      {groups.map((g) => (
        <div className="adm-card" key={g.id}>
          <h2>{g.label}</h2>
          <div className="adm-table-wrap">
            <table className="adm-table adm-stock">
              <thead>
                <tr>
                  <th>Product</th>
                  {g.products[0].sizes.map((s) => <th key={s}>{s}</th>)}
                  <th>Total</th>
                  <th>Sold</th>
                </tr>
              </thead>
              <tbody>
                {g.products.map((p) => {
                  const total = p.sizes.reduce((s, size) => s + (Number(values[`${p.slug}|${size}`]) || 0), 0);
                  const soldTotal = p.sizes.reduce((s, size) => s + (sold[`${p.slug}|${size}`] || 0), 0);
                  return (
                    <tr key={p.slug}>
                      <td>
                        <div className="adm-prod">
                          <div className="adm-prod-img"><Image src={p.image} alt="" fill sizes="40px" style={{ objectFit: 'cover' }} /></div>
                          <div><b>{p.colorName}</b><span>{p.name}</span></div>
                        </div>
                      </td>
                      {p.sizes.map((size) => {
                        const key = `${p.slug}|${size}`;
                        const v = values[key] ?? '';
                        const low = v !== '' && Number(v) <= LOW;
                        return (
                          <td key={size}>
                            <input type="number" min="0" inputMode="numeric" value={v}
                              className={`adm-qty${low ? ' low' : ''}${values[key] !== saved[key] ? ' dirty' : ''}`}
                              onChange={(e) => set(key, e.target.value)} aria-label={`${p.colorName} ${size} stock`} />
                            {sold[key] ? <small className="adm-sold">{sold[key]} sold</small> : null}
                          </td>
                        );
                      })}
                      <td><b>{total}</b></td>
                      <td>{soldTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}
