import Link from 'next/link';
import type { Career } from '@/db/schema';

export default function CareerCard({ career, categoryName }: { career: Career; categoryName: string }) {
  return (
    <Link className="career-card" href={`/career/${career.id}`}>
      <div className="cc-banner">
        {career.icon || '💼'}
        {career.featured && <span className="badge-featured">★ Featured</span>}
      </div>
      <div className="cc-body">
        <div className="cc-cat">{categoryName}</div>
        <h3>{career.title}</h3>
        <p>{career.shortDescription}</p>
        <div className="cc-meta">
          <span><span aria-hidden>💰</span> {career.salary || '—'}</span>
        </div>
      </div>
    </Link>
  );
}
