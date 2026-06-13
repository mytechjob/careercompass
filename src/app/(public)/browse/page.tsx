import Link from 'next/link';
import type { Metadata } from 'next';
import CareerCard from '@/components/CareerCard';
import SearchBar from '@/components/SearchBar';
import { getCategoriesWithCounts, searchCareers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Browse Careers',
  description: 'Search and filter careers by category to find one you want to explore.',
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q = '', cat = '' } = await searchParams;
  const [results, cats] = await Promise.all([
    searchCareers(q, cat || undefined),
    getCategoriesWithCounts(),
  ]);
  const catName = (id: string | null) => cats.find((c) => c.id === id)?.name ?? 'General';

  const chipHref = (catId: string) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (catId) params.set('cat', catId);
    const s = params.toString();
    return `/browse${s ? `?${s}` : ''}`;
  };

  return (
    <>
      <section className="detail-hero" style={{ padding: '36px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '1.9rem', margin: 0, color: 'var(--navy)' }}>Browse Careers</h1>
          <p className="d-lead">Search and filter to find a career you want to learn more about.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 22 }}>
            <SearchBar defaultValue={q} placeholder="Search careers..." />
          </div>

          <div className="chips" style={{ marginBottom: 28, justifyContent: 'center' }}>
            <Link className={`chip ${!cat ? 'active' : ''}`} href={chipHref('')}>All</Link>
            {cats.map((c) => (
              <Link key={c.id} className={`chip ${cat === c.id ? 'active' : ''}`} href={chipHref(c.id)}>
                {c.icon} {c.name} <span className="count">{c.count}</span>
              </Link>
            ))}
          </div>

          {results.length ? (
            <div className="card-grid">
              {results.map((c) => <CareerCard key={c.id} career={c} categoryName={catName(c.categoryId)} />)}
            </div>
          ) : (
            <div className="empty"><div className="e-icon">🔍</div>No careers match your search. Try a different word.</div>
          )}
        </div>
      </section>
    </>
  );
}
