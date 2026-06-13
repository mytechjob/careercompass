import Link from 'next/link';
import type { Metadata } from 'next';
import InterviewCard from '@/components/InterviewCard';
import { getInterviews } from '@/lib/data';
import { youtubeId } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Interviews',
  description: 'Watch interviews with real professionals, recorded by our Girl Scout team.',
};

export default async function InterviewsPage() {
  const rows = await getInterviews();
  const interviews = rows
    .map((iv) => ({ id: iv.id, title: iv.title, videoId: youtubeId(iv.youtubeUrl) }))
    .filter((iv): iv is { id: number; title: string; videoId: string } => !!iv.videoId);

  return (
    <>
      <section className="detail-hero" style={{ padding: '36px 0' }}>
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> › Interviews</div>
          <h1 style={{ fontSize: '1.9rem', margin: 0, color: 'var(--navy)' }}>🎤 Interviews</h1>
          <p className="d-lead">Conversations with real professionals, recorded by our Girl Scout team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {interviews.length ? (
            <div className="card-grid">
              {interviews.map((iv) => <InterviewCard key={iv.id} title={iv.title} videoId={iv.videoId} />)}
            </div>
          ) : (
            <div className="empty">
              <div className="e-icon">🎬</div>
              No interviews have been added yet. Check back soon!
              <div style={{ marginTop: 14 }}><Link href="/" className="btn btn-primary">← Back home</Link></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
