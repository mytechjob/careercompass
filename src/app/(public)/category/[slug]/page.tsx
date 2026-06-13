import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CareerCard from '@/components/CareerCard';
import { getCategory, getCareersByCategory } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) return { title: 'Category not found' };
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) notFound();
  const careers = await getCareersByCategory(slug);

  return (
    <>
      <section className="detail-hero" style={{ padding: '36px 0' }}>
        <div className="container">
          <div className="breadcrumb"><Link href="/categories">Categories</Link> › {cat.name}</div>
          <div className="d-top">
            <div className="d-icon">{cat.icon || '📁'}</div>
            <div>
              <h1 style={{ fontSize: '1.9rem' }}>{cat.name}</h1>
              <p className="d-lead">{cat.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {careers.length ? (
            <div className="card-grid">
              {careers.map((c) => <CareerCard key={c.id} career={c} categoryName={cat.name} />)}
            </div>
          ) : (
            <div className="empty"><div className="e-icon">📭</div>No careers in this category yet.</div>
          )}
        </div>
      </section>
    </>
  );
}
