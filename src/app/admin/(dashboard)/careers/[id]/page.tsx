import { notFound } from 'next/navigation';
import CareerForm from '@/components/admin/CareerForm';
import { getCareer, getCategories } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function EditCareerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [career, categories] = await Promise.all([getCareer(id), getCategories()]);
  if (!career) notFound();
  return <CareerForm career={career} categories={categories} />;
}
