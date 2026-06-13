import Link from 'next/link';
import type { Career, Category } from '@/db/schema';
import { saveCareerAction } from '@/app/admin/actions';

export default function CareerForm({ career, categories }: { career?: Career; categories: Category[] }) {
  const editing = !!career;
  const c = career;

  return (
    <>
      <div className="admin-topbar"><h1>{editing ? 'Edit Career' : 'Add Career'}</h1></div>
      <div className="admin-content">
        <Link className="btn btn-ghost btn-sm" href="/admin/careers" style={{ marginBottom: 18 }}>← Back to careers</Link>
        <form className="form-card" action={saveCareerAction}>
          {editing && <input type="hidden" name="id" value={c!.id} />}
          <div className="form-grid">
            <div className="form-group">
              <label>Career title *</label>
              <input className="form-control" name="title" required defaultValue={c?.title ?? ''} placeholder="e.g. Registered Nurse" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" name="categoryId" defaultValue={c?.categoryId ?? ''}>
                <option value="">— Choose a category —</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Icon / emoji <span className="hint">(shows on cards)</span></label>
              <input className="form-control" name="icon" defaultValue={c?.icon ?? ''} placeholder="e.g. 🩺" maxLength={4} />
            </div>
            <div className="form-group">
              <label>Salary range</label>
              <input className="form-control" name="salary" defaultValue={c?.salary ?? ''} placeholder="e.g. $75,000 - $95,000 / year" />
            </div>
            <div className="form-group">
              <label>Education &amp; training</label>
              <input className="form-control" name="education" defaultValue={c?.education ?? ''} placeholder="e.g. Bachelor’s degree + license" />
            </div>
            <div className="form-group">
              <label>Job outlook</label>
              <select className="form-control" name="jobOutlook" defaultValue={c?.jobOutlook ?? 'medium'}>
                <option value="high">In high demand</option>
                <option value="medium">Steady demand</option>
                <option value="low">Limited demand</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Short description <span className="hint">(one sentence shown on cards)</span></label>
              <textarea className="form-control" name="shortDescription" style={{ minHeight: 60 }} defaultValue={c?.shortDescription ?? ''} placeholder="A short, friendly summary of the career." />
            </div>
            <div className="form-group full">
              <label>What they do</label>
              <textarea className="form-control" name="whatTheyDo" defaultValue={c?.whatTheyDo ?? ''} />
            </div>
            <div className="form-group full">
              <label>Work environment</label>
              <textarea className="form-control" name="workEnvironment" defaultValue={c?.workEnvironment ?? ''} />
            </div>
            <div className="form-group full">
              <label>How to become one</label>
              <textarea className="form-control" name="howToBecome" defaultValue={c?.howToBecome ?? ''} />
            </div>
            <div className="form-group full">
              <label>Skills needed <span className="hint">(one per line, or comma-separated)</span></label>
              <textarea className="form-control" name="skills" defaultValue={(c?.skills ?? []).join('\n')} placeholder={'Communication\nProblem solving\nTeamwork'} />
            </div>
            <div className="form-group full">
              <label>A day in the life</label>
              <textarea className="form-control" name="dayInLife" defaultValue={c?.dayInLife ?? ''} />
            </div>

            <div className="form-group full">
              <div className="checkbox-row">
                <input type="checkbox" id="featured" name="featured" defaultChecked={c?.featured ?? false} />
                <label htmlFor="featured">⭐ Feature this career on the home page</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editing ? 'Save changes' : 'Add career'}</button>
            <Link className="btn btn-ghost" href="/admin/careers">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
}
