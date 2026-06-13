import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCareer, getCategory } from '@/lib/data';
import { outlookLabel, outlookClass } from '@/lib/format';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const career = await getCareer(slug);
  if (!career) return { title: 'Career not found' };
  return {
    title: career.title,
    description: career.shortDescription,
    openGraph: { title: career.title, description: career.shortDescription },
  };
}

function Block({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <h2><span className="b-icon" aria-hidden>{icon}</span>{title}</h2>
      {children}
    </div>
  );
}

export default async function CareerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = await getCareer(slug);
  if (!career) notFound();
  const cat = career.categoryId ? await getCategory(career.categoryId) : undefined;

  // JSON-LD structured data for richer search results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Occupation',
    name: career.title,
    description: career.shortDescription,
    occupationalCategory: cat?.name,
    educationRequirements: career.education,
    skills: (career.skills || []).join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/browse">Careers</Link> ›{' '}
            {cat && <><Link href={`/category/${cat.id}`}>{cat.name}</Link> › </>}
            {career.title}
          </div>
          <div className="d-top">
            <div className="d-icon">{career.icon || '💼'}</div>
            <div>
              {cat && <div className="d-cat">{cat.name}</div>}
              <h1>{career.title}</h1>
              <p className="d-lead">{career.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="detail-layout">
          <div className="detail-main">
            {career.whatTheyDo && <Block icon="💡" title="What they do"><p>{career.whatTheyDo}</p></Block>}
            {career.workEnvironment && <Block icon="🏢" title="Work environment"><p>{career.workEnvironment}</p></Block>}
            {career.howToBecome && <Block icon="🎓" title="How to become one"><p>{career.howToBecome}</p></Block>}
            {career.skills?.length > 0 && (
              <Block icon="🌟" title="Skills you’ll need">
                <ul>{career.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </Block>
            )}
            {career.dayInLife && <Block icon="☀️" title="A day in the life"><p>{career.dayInLife}</p></Block>}
          </div>

          <aside className="detail-side">
            <h3>Quick Facts</h3>
            <div className="fact">
              <div className="fact-label">💰 Typical Salary</div>
              <div className="fact-value">{career.salary || '—'}</div>
            </div>
            <div className="fact">
              <div className="fact-label">📈 Job Outlook</div>
              <div className="fact-value"><span className={`outlook-pill ${outlookClass(career.jobOutlook)}`}>{outlookLabel(career.jobOutlook)}</span></div>
            </div>
            <div className="fact">
              <div className="fact-label">🎓 Education &amp; Training</div>
              <div className="fact-value">{career.education || '—'}</div>
            </div>
            <div className="fact">
              <div className="fact-label">📁 Category</div>
              <div className="fact-value">{cat ? cat.name : 'General'}</div>
            </div>
            <Link href="/browse" className="btn btn-ghost btn-block" style={{ marginTop: 18 }}>← Back to all careers</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
