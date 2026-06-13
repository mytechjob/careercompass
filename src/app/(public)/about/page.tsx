import type { Metadata } from 'next';
import { getAbout } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the three Girl Scouts behind Career Compass and learn about our mission.',
};

export default async function AboutPage() {
  const about = await getAbout();
  const members = about.members || [];

  return (
    <>
      <section className="hero" style={{ padding: '60px 0 68px' }}>
        <div className="container hero-inner">
          <span className="eyebrow">🎀 Girl Scout Silver Award Project</span>
          <h1>{about.heading || 'About Us'}</h1>
          <p>{about.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><h2>Our Mission</h2></div></div>
          <div className="prose-card" style={{ margin: '0 auto' }}>
            <p>{about.mission}</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--soft)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head"><div><h2>Meet the Team</h2><p>The Girl Scouts behind Career Compass.</p></div></div>
          <div className="cat-grid">
            {members.map((m, i) => (
              <div key={i} className="cat-card team-card" style={{ cursor: 'default' }}>
                <div className="cat-icon">{m.emoji || '🙂'}</div>
                <h3>{m.name}</h3>
                <div className="cat-count" style={{ marginBottom: 10 }}>{m.role}</div>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
