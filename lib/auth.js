import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from './session';

// Second line of defence after middleware: every admin page and server action calls this.
export async function requireAdmin() {
  const ok = await verifySessionToken(cookies().get(SESSION_COOKIE)?.value);
  if (!ok) redirect('/admin/login');
}
