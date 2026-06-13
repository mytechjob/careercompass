import Link from 'next/link';
import type { Interview } from '@/db/schema';
import { saveInterviewAction } from '@/app/admin/actions';

export default function InterviewForm({ interview }: { interview?: Interview }) {
  const editing = !!interview;
  return (
    <>
      <div className="admin-topbar"><h1>{editing ? 'Edit Interview' : 'Add Interview'}</h1></div>
      <div className="admin-content">
        <Link className="btn btn-ghost btn-sm" href="/admin/interviews" style={{ marginBottom: 18 }}>← Back to interviews</Link>
        <form className="form-card" action={saveInterviewAction} style={{ maxWidth: 620 }}>
          {editing && <input type="hidden" name="id" value={interview!.id} />}
          <div className="form-group">
            <label>Interview title *</label>
            <input className="form-control" name="title" required defaultValue={interview?.title ?? ''} placeholder="e.g. A Day with a Pediatric Nurse" />
          </div>
          <div className="form-group">
            <label>YouTube link *</label>
            <input className="form-control" name="youtubeUrl" required defaultValue={interview?.youtubeUrl ?? ''} placeholder="https://www.youtube.com/watch?v=..." />
            <span className="hint">Paste any YouTube link — a normal watch link, a youtu.be short link, or a Shorts link all work.</span>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editing ? 'Save changes' : 'Add interview'}</button>
            <Link className="btn btn-ghost" href="/admin/interviews">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  );
}
