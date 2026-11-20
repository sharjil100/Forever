'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';
import { SESSION_COOKIE, createSessionToken, passwordMatches } from '@/lib/session';
import { products } from '@/data/products';

const STATUSES = ['new', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export async function login(prevState, formData) {
  const password = String(formData.get('password') || '');
  // small fixed delay slows down password guessing
  await new Promise((r) => setTimeout(r, 400));
  if (!process.env.ADMIN_PASSWORD) return { error: 'ADMIN_PASSWORD is not set on the server.' };
  if (!(await passwordMatches(password))) return { error: 'Wrong password.' };
  const { token, maxAge } = await createSessionToken();
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge,
  });
  redirect('/admin');
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/login');
}

export async function setOrderStatus(formData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const status = String(formData.get('status'));
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return;
  const { error } = await db().rpc('set_order_status', { p_order_id: id, p_status: status });
  if (error) console.error('set_order_status failed', error);
  revalidatePath('/admin');
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath('/admin/stock');
}

const VALID = new Set(products.flatMap((p) => p.sizes.map((s) => `${p.slug}|${s}`)));

export async function saveStock(updates) {
  await requireAdmin();
  const rows = (Array.isArray(updates) ? updates : [])
    .filter((u) => VALID.has(`${u.slug}|${u.size}`) && Number.isInteger(u.qty) && u.qty >= 0 && u.qty <= 100000)
    .map((u) => ({ slug: u.slug, size: u.size, qty: u.qty, updated_at: new Date().toISOString() }));
  if (!rows.length) return { ok: true, saved: 0 };
  const { error } = await db().from('stock').upsert(rows, { onConflict: 'slug,size' });
  if (error) {
    console.error('saveStock failed', error);
    return { ok: false, error: 'Could not save stock. Please try again.' };
  }
  revalidatePath('/admin/stock');
  revalidatePath('/admin');
  return { ok: true, saved: rows.length };
}
