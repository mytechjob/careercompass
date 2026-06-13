import { notFound } from 'next/navigation';
import InterviewForm from '@/components/admin/InterviewForm';
import { getInterview } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function EditInterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const interview = await getInterview(Number(id));
  if (!interview) notFound();
  return <InterviewForm interview={interview} />;
}
