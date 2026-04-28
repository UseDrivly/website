import { createClient } from '@supabase/supabase-js';
import JobEditor from '@/components/admin/JobEditor';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: job, error } = await supabase
    .from('career_jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    notFound();
  }

  return <JobEditor initialData={job} jobId={job.id} />;
}
