'use client';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Orders', match: (p) => p === '/admin' || p.startsWith('/admin/orders') },
  { href: '/admin/stock', label: 'Stock', match: (p) => p.startsWith('/admin/stock') },
];

export default function AdminNav() {
  const path = usePathname();
  return LINKS.map((l) => (
    <a key={l.href} href={l.href} className={l.match(path) ? 'active' : undefined}>{l.label}</a>
  ));
}
