import type { Metadata } from 'next';
import { getPosts } from '@/lib/supabase/posts';
import ProvidersClient from './ProvidersClient';

export const metadata: Metadata = {
  title: 'For Providers - Earn More From Your Skills | Drivly',
  description: 'Join the Drivly provider network. Keep 85% of every job, choose your hours, and build a verified reputation. Launching in Lagos 2025.',
};

export default async function ProvidersPage() {
  const posts = await getPosts({ limit: 3 });
  return <ProvidersClient posts={posts} />;
}
