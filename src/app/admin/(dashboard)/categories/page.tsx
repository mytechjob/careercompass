import Link from 'next/link';
import { getCategoriesWithCounts } from '@/lib/data';
import { deleteCategoryAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function CategoriesAdminPage() {
  const cats = await getCategoriesWithCounts();

  return (
    <>
      <div className="admin-topbar">
        <h1>Categories</h1>
        <Link className="btn btn-primary" href="/admin/categories/new">➕ Add Category</Link>
      </div>
      <div className="admin-content">
        <div className="notice">Categories group related careers (for example, Doctors and Nurses both go under Healthcare).</div>
        <table className="data-table">
          <thead><tr><th>Category</th><th>Description</th><th>Careers</th><th>Actions</th></tr></thead>
          <tbody>
            {cats.map((cat) => (
              <tr key={cat.id}>
                <td><strong>{cat.icon || '📁'} {cat.name}</strong></td>
                <td style={{ color: 'var(--muted)' }}>{cat.description}</td>
                <td><span className="tag">{cat.count}</span></td>
                <td>
                  <div className="row-actions">
                    <Link className="btn btn-ghost btn-sm" href={`/admin/categories/${cat.id}`}>Edit</Link>
                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="id" value={cat.id} />
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
