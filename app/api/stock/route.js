import { NextResponse } from 'next/server';
import { db, isDbConfigured } from '@/lib/supabase';

export const runtime = 'nodejs';
export const revalidate = 30; // stock is re-read at most every 30s

// Public: { "<slug>": { "<size>": qty } } — used to grey out sold-out sizes.
export async function GET() {
  if (!isDbConfigured()) return NextResponse.json({ configured: false, stock: {} });
  const { data, error } = await db().from('stock').select('slug,size,qty');
  if (error) return NextResponse.json({ configured: true, stock: {} }, { status: 500 });
  const stock = {};
  for (const r of data) (stock[r.slug] ||= {})[r.size] = r.qty;
  return NextResponse.json({ configured: true, stock });
}
