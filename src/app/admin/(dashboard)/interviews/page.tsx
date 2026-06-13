import Link from 'next/link';
import { getInterviews } from '@/lib/data';
import { youtubeId } from '@/lib/youtube';
import { deleteInterviewAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function InterviewsAdminPage() {
  const interviews = await getInterviews();

  return (
    <>
      <div className="admin-topbar">
        <h1>Interviews</h1>
        <Link className="btn btn-primary" href="/admin/interviews/new">➕ Add Interview</Link>
      </div>
      <div className="admin-content">
        <div className="notice">
          🎤 Add YouTube interviews here. They show up in the <strong>Interviews</strong> section
          on the home page. If there are no interviews, that section is hidden automatically.
        </div>
        <table className="data-table">
          <thead><tr><th>Title</th><th className="hide-sm">Video</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {interviews.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No interviews yet. Click “Add Interview” to add your first YouTube video.</td></tr>
            )}
            {interviews.map((iv) => {
              const id = youtubeId(iv.youtubeUrl);
              return (
                <tr key={iv.id}>
                  <td><strong>🎬 {iv.title}</strong></td>
                  <td className="hide-sm" style={{ color: 'var(--muted)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{iv.youtubeUrl}</td>
                  <td>{id ? <span className="tag">✓ Valid link</span> : <span className="tag tag-feat">⚠ Check link</span>}</td>
                  <td>
                    <div className="row-actions">
                      <Link className="btn btn-ghost btn-sm" href={`/admin/interviews/${iv.id}`}>Edit</Link>
                      <form action={deleteInterviewAction}>
                        <input type="hidden" name="id" value={iv.id} />
                        <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
