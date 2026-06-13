import Link from 'next/link';
import CareerCard from '@/components/CareerCard';
import CategoryCard from '@/components/CategoryCard';
import SearchBar from '@/components/SearchBar';
import { getCategoriesWithCounts, getFeaturedCareers, getCareers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featured, cats, all] = await Promise.all([
    getFeaturedCareers(),
    getCategoriesWithCounts(),
    getCareers(),
  ]);
  const catName = (id: string | null) => cats.find((c) => c.id === id)?.name ?? 'General';

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">🎀 Girl Scout Silver Award Project</span>
          <h1>Find the career that fits your future.</h1>
          <p>
            Explore real careers, learn what people actually do all day, and discover the
            exact steps — school, skills, and training — to get there.
          </p>
          <div className="hero-actions">
            <Link href="/browse" className="btn btn-primary">Browse all careers</Link>
            <Link href="/categories" className="btn btn-ghost">Explore by category</Link>
          </div>
          <div style={{ marginTop: 28 }}>
            <SearchBar placeholder='Search careers — try “nurse”, “design”, “code”...' />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured Careers</h2>
              <p>Hand-picked careers to get you started exploring.</p>
            </div>
            <Link href="/browse" className="btn btn-ghost btn-sm">View all {all.length} →</Link>
          </div>
          {featured.length ? (
            <div className="card-grid">
              {featured.map((c) => <CareerCard key={c.id} career={c} categoryName={catName(c.categoryId)} />)}
            </div>
          ) : (
            <div className="empty"><div className="e-icon">⭐</div>No featured careers yet. Add some in the Admin area!</div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--soft)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Browse by Category</h2>
              <p>Careers grouped by field, so you can explore what interests you.</p>
            </div>
          </div>
          <div className="cat-grid">
            {cats.map((c) => (
              <CategoryCard key={c.id} id={c.id} name={c.name} icon={c.icon} description={c.description} count={c.count} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
