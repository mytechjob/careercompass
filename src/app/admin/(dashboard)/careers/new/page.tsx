import CareerForm from '@/components/admin/CareerForm';
import { getCategories } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function NewCareerPage() {
  const categories = await getCategories();
  return <CareerForm categories={categories} />;
}
