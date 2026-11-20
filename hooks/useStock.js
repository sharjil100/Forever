'use client';
import { useEffect, useState } from 'react';

// Loads live stock once per page view. Returns { ready, configured, qty(slug, size) }.
let cache = null;
let inflight = null;

function load() {
  if (cache) return Promise.resolve(cache);
  inflight ||= fetch('/api/stock')
    .then((r) => r.json())
    .then((d) => (cache = d))
    .catch(() => (cache = { configured: false, stock: {} }));
  return inflight;
}

export function useStock() {
  const [data, setData] = useState(cache);
  useEffect(() => {
    let alive = true;
    load().then((d) => alive && setData(d));
    return () => { alive = false; };
  }, []);
  const configured = Boolean(data?.configured);
  return {
    ready: Boolean(data),
    configured,
    // null = unknown (stock tracking not set up) → treat as available
    qty: (slug, size) => (configured ? data.stock?.[slug]?.[size] ?? 0 : null),
  };
}
