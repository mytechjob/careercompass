import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isAuthenticated } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';
import { logoutAction } from '../actions';

export const metadata: Metadata = { title: 'Admin', robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect('/admin/login');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="brand"><span className="logo">🧭</span> <span>Career Compass</span></Link>
        <AdminNav />
        <div className="side-foot">
          <Link href="/" className="admin-nav" style={{ display: 'block', padding: '11px 14px', borderRadius: 9, color: '#cdd9ec' }} target="_blank">🌐 <span>View Site</span></Link>
          <form action={logoutAction}>
            <button type="submit" className="admin-nav" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '11px 14px', borderRadius: 9, color: '#cdd9ec', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>🚪 <span>Log Out</span></button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
