import type { Metadata } from 'next';
import CareersClient from './CareersClient';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { CareerJob } from '@/types';

export const metadata: Metadata = {
  title: 'Careers - Build Something That Matters | Drivly',
  description: "Join the Drivly team. We're looking for a few good people to help build Nigeria's first organised, app-based roadside assistance platform.",
};

export default async function CareersPage() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from('career_jobs')
    .select('id, title, description, location, type, is_published, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const jobs = (data ?? []) as CareerJob[];
  return <CareersClient jobs={jobs} />;
}
