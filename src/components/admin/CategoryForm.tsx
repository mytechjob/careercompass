import Link from 'next/link';
import type { Category } from '@/db/schema';
import { saveCategoryAction } from '@/app/admin/actions';

export default function CategoryForm({ category }: { category?: Category }) {
  const editing = !!category;
  return (
    <>
      <div className="admin-topbar"><h1>{editing ? 'Edit Category' : 'Add Category'}</h1></div>
      <div className="admin-content">
        <Link className="btn btn-ghost btn-sm" href="/admin/categories" style={{ marginBottom: 18 }}>← Back to categories</Link>
        <form className="form-card" action={saveCategoryAction} style={{ maxWidth: 560 }}>
          {editing && <input type="hidden" name="id" value={category!.id} />}
          <div className="form-group">
            <label>Category name *</label>
            <input className="form-control" name="name" required defaultValue={category?.name ?? ''} placeholder="e.g. Healthcare" />
          </div>
          <div className="form-group">
            <label>Icon / emoji</label>
            <input className="form-control" name="icon" defaultValue={category?.icon ?? ''} placeholder="e.g. 🩺" maxLength={4} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" style={{ minHeight: 70 }} defaultValue={category?.description ?? ''} placeholder="A short description of this field." />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editing ? 'Save changes' : 'Add category'}</button>
            <Link className="btn btn-ghost" href="/admin/categories">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
}
