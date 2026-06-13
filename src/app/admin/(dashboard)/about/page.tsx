import Link from 'next/link';
import { getAbout } from '@/lib/data';
import { saveAboutAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function AboutAdminPage() {
  const about = await getAbout();
  const m = about.members || [];

  const memberFields = (i: number) => {
    const mem = m[i] ?? { name: '', role: '', emoji: '', bio: '' };
    return (
      <div key={i} className="form-card" style={{ maxWidth: 'none', boxShadow: 'none', border: '1px solid var(--line)', padding: 20, marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 14px', color: 'var(--navy)', fontSize: '1.05rem' }}>👤 Team member {i + 1}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" name={`m${i}_name`} defaultValue={mem.name} placeholder="First name (or nickname)" />
          </div>
          <div className="form-group">
            <label>Role <span className="hint">(what they do on the team)</span></label>
            <input className="form-control" name={`m${i}_role`} defaultValue={mem.role} placeholder="e.g. Design & Website" />
          </div>
          <div className="form-group">
            <label>Photo emoji</label>
            <input className="form-control" name={`m${i}_emoji`} defaultValue={mem.emoji} placeholder="e.g. 🌸" maxLength={4} />
          </div>
          <div className="form-group full">
            <label>Short bio</label>
            <textarea className="form-control" name={`m${i}_bio`} style={{ minHeight: 70 }} defaultValue={mem.bio} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="admin-topbar"><h1>About Page</h1></div>
      <div className="admin-content">
        <div className="notice">Edit your About Us page here. Changes show up on the public site right away.</div>
        <form className="form-card" action={saveAboutAction}>
          <div className="form-group">
            <label>Page heading</label>
            <input className="form-control" name="heading" defaultValue={about.heading} placeholder="About Us" />
          </div>
          <div className="form-group">
            <label>Intro <span className="hint">(short line shown at the top)</span></label>
            <textarea className="form-control" name="intro" style={{ minHeight: 60 }} defaultValue={about.intro} />
          </div>
          <div className="form-group">
            <label>Our mission</label>
            <textarea className="form-control" name="mission" style={{ minHeight: 100 }} defaultValue={about.mission} />
          </div>

          <h2 style={{ color: 'var(--navy)', fontSize: '1.15rem', margin: '8px 0 16px' }}>Meet the Team (3 Girl Scouts)</h2>
          {[0, 1, 2].map(memberFields)}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save About page</button>
            <Link className="btn btn-ghost" href="/about" target="_blank">Preview page ↗</Link>
          </div>
        </form>
      </div>
    </>
  );
}
