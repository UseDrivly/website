import type { Metadata } from 'next';
import { getPosts } from '@/lib/supabase/posts';
import BusinessesClient from './BusinessesClient';

export const metadata: Metadata = {
  title: 'For Businesses - Real-Time Rescue and Fleet Management | Drivly',
  description: 'Drivly gives Nigerian businesses real-time roadside assistance for their entire fleet. Reduce downtime. Protect your operation. Launching in Lagos 2025.',
};

export default async function FleetPage() {
  const posts = await getPosts({ limit: 3 });
  return <BusinessesClient posts={posts} />;
}
