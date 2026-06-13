import Link from 'next/link';
import { getCareers, getCategories } from '@/lib/data';
import { deleteCareerAction, toggleFeaturedAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function CareersAdminPage() {
  const [careers, cats] = await Promise.all([getCareers(), getCategories()]);
  const catName = (id: string | null) => cats.find((c) => c.id === id)?.name ?? 'Uncategorized';

  return (
    <>
      <div className="admin-topbar">
        <h1>Careers</h1>
        <Link className="btn btn-primary" href="/admin/careers/new">➕ Add Career</Link>
      </div>
      <div className="admin-content">
        <div className="notice">Click the star to feature a career on the home page. Use Edit to change any details.</div>
        <table className="data-table">
          <thead>
            <tr><th>Career</th><th className="hide-sm">Category</th><th className="hide-sm">Salary</th><th>Featured</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {careers.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No careers yet. Click “Add Career” to begin.</td></tr>
            )}
            {careers.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.icon || '💼'} {c.title}</strong></td>
                <td className="hide-sm"><span className="tag">{catName(c.categoryId)}</span></td>
                <td className="hide-sm">{c.salary || '—'}</td>
                <td>
                  <form action={toggleFeaturedAction}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="star-btn" title="Toggle featured" aria-label="Toggle featured">{c.featured ? '⭐' : '☆'}</button>
                  </form>
                </td>
                <td>
                  <div className="row-actions">
                    <Link className="btn btn-ghost btn-sm" href={`/admin/careers/${c.id}`}>Edit</Link>
                    <form action={deleteCareerAction}>
                      <input type="hidden" name="id" value={c.id} />
                      <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
