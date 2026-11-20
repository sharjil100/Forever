'use client';
import { useStock } from '@/hooks/useStock';

// Card badge: "Sold Out" / "Available Soon" when every size of a product is at 0.
export default function StockTag({ slug, sizes, label }) {
  const stock = useStock();
  if (!stock.configured || !sizes.every((s) => stock.qty(slug, s) === 0)) return null;
  return <span className="tag tag-out">{label}</span>;
}
