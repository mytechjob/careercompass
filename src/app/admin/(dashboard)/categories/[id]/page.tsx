import { notFound } from 'next/navigation';
import CategoryForm from '@/components/admin/CategoryForm';
import { getCategory } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategory(id);
  if (!category) notFound();
  return <CategoryForm category={category} />;
}
