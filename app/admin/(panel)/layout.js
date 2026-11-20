import { requireAdmin } from '@/lib/auth';
import { isDbConfigured } from '@/lib/supabase';
import { logout } from '../actions';
import AdminNav from './AdminNav';

export const metadata = { title: 'Admin — FOREVER', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({ children }) {
  await requireAdmin();
  return (
    <div className="adm">
      <header className="adm-top">
        <a href="/admin" className="adm-brand"><span className="logo logo-sm">FOREVER</span><em>Admin</em></a>
        <nav className="adm-tabs"><AdminNav /></nav>
        <div className="adm-top-right">
          <a href="/" target="_blank" rel="noopener">View site ↗</a>
          <form action={logout}><button>Log out</button></form>
        </div>
      </header>
      <div className="adm-body">
        {isDbConfigured() ? children : (
          <div className="adm-card">
            <h2>Database not connected</h2>
            <p>Add <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> to the environment variables, then run <code>supabase/schema.sql</code> in the Supabase SQL editor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
