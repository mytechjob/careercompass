import type { Metadata } from 'next';
import CategoryCard from '@/components/CategoryCard';
import { getCategoriesWithCounts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Career Categories',
  description: 'Explore careers grouped by field — healthcare, technology, education, and more.',
};

export default async function CategoriesPage() {
  const cats = await getCategoriesWithCounts();
  return (
    <>
      <section className="detail-hero" style={{ padding: '36px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '1.9rem', margin: 0, color: 'var(--navy)' }}>Career Categories</h1>
          <p className="d-lead">Pick a field to see all the careers inside it.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
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
