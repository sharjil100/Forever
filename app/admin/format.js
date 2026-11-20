export const STATUS_META = {
  new:       { label: 'New',       color: '#c4141c' },
  confirmed: { label: 'Confirmed', color: '#b26a00' },
  shipped:   { label: 'Shipped',   color: '#1f5fbf' },
  delivered: { label: 'Delivered', color: '#1d7a3a' },
  cancelled: { label: 'Cancelled', color: '#777777' },
};

export const AREA_LABEL = { inside_dhaka: 'Inside Dhaka', outside_dhaka: 'Outside Dhaka' };

export function dhakaDate(iso, withTime = true) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka', day: 'numeric', month: 'short',
    ...(withTime ? { hour: 'numeric', minute: '2-digit', hour12: true } : { year: 'numeric' }),
  }).format(new Date(iso));
}

// YYYY-MM-DD of "today" in Dhaka, and its UTC start instant
export function dhakaTodayStartISO() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return new Date(`${parts}T00:00:00+06:00`).toISOString();
}

export function StatusBadge({ status }) {
  const m = STATUS_META[status] || { label: status, color: '#777' };
  return <span className="adm-badge" style={{ color: m.color, borderColor: m.color }}>{m.label}</span>;
}
