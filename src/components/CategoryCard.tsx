import Link from 'next/link';

export default function CategoryCard({
  id, name, icon, description, count, compact = false,
}: {
  id: string; name: string; icon: string; description: string; count: number; compact?: boolean;
}) {
  return (
    <Link className="cat-card" href={`/category/${id}`}>
      <div className="cat-icon">{icon || '📁'}</div>
      <h3>{name}</h3>
      {!compact && <p>{description}</p>}
      <div className="cat-count">{count} career{count === 1 ? '' : 's'} →</div>
    </Link>
  );
}
