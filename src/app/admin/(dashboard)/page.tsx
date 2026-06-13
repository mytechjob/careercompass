import Link from 'next/link';
import { getCareers, getCategories, getFeaturedCareers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [all, cats, featured] = await Promise.all([getCareers(), getCategories(), getFeaturedCareers()]);
  const catName = (id: string | null) => cats.find((c) => c.id === id)?.name ?? 'Uncategorized';
  const recent = [...all].slice(0, 5);

  return (
    <>
      <div className="admin-topbar"><h1>Dashboard</h1></div>
      <div className="admin-content">
        <div className="notice">
          👋 Welcome! This is your content management system. Add careers, organize them into
          categories, star the ones to feature on the home page, and switch the site theme.
        </div>

        <div className="stat-grid">
          <div className="stat-card"><div className="s-num">{all.length}</div><div className="s-label">Total careers</div></div>
          <div className="stat-card"><div className="s-num">{cats.length}</div><div className="s-label">Categories</div></div>
          <div className="stat-card"><div className="s-num">{featured.length}</div><div className="s-label">Featured on home page</div></div>
        </div>

        <div className="page-actions"><h2 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.2rem' }}>Quick actions</h2></div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" href="/admin/careers/new">➕ Add a new career</Link>
          <Link className="btn btn-ghost" href="/admin/categories/new">📁 Add a category</Link>
          <Link className="btn btn-ghost" href="/admin/theme">🎨 Change theme</Link>
          <Link className="btn btn-ghost" href="/" target="_blank">🌐 Preview the live site</Link>
        </div>

        <div className="page-actions" style={{ marginTop: 36 }}>
          <h2 style={{ margin: 0, color: 'var(--navy)', fontSize: '1.2rem' }}>Recently added careers</h2>
          <Link className="btn btn-ghost btn-sm" href="/admin/careers">View all →</Link>
        </div>
        <table className="data-table">
          <thead><tr><th>Career</th><th className="hide-sm">Category</th><th>Featured</th></tr></thead>
          <tbody>
            {recent.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.icon || '💼'} {c.title}</strong></td>
                <td className="hide-sm"><span className="tag">{catName(c.categoryId)}</span></td>
                <td>{c.featured ? <span className="tag tag-feat">★ Featured</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
