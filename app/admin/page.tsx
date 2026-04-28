import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch counts
  const [
    { count: totalWaitlist },
    { count: driversCount },
    { count: providersCount },
    { count: businessesCount },
    { count: applicationsCount },
    { count: postsCount }
  ] = await Promise.all([
    supabase.from('waitlist').select('*', { count: 'exact', head: true }),
    supabase.from('waitlist').select('*', { count: 'exact', head: true }).eq('role', 'driver'),
    supabase.from('waitlist').select('*', { count: 'exact', head: true }).eq('role', 'provider'),
    supabase.from('waitlist').select('*', { count: 'exact', head: true }).eq('role', 'business'),
    supabase.from('career_applications').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-8 border border-[#D8E8D0] shadow-sm">
        <h2 className="text-2xl font-bold text-[#0D3D21] mb-6">Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#F7FAF2] rounded-xl p-6 border border-[#D8E8D0]">
            <div className="text-[#8FA489] text-sm font-semibold uppercase tracking-wider mb-2">Total Waitlist</div>
            <div className="text-4xl font-bold text-[#0D3D21]">{totalWaitlist || 0}</div>
          </div>
          
          <div className="bg-[#F7FAF2] rounded-xl p-6 border border-[#D8E8D0]">
            <div className="text-[#8FA489] text-sm font-semibold uppercase tracking-wider mb-2">Drivers</div>
            <div className="text-4xl font-bold text-[#5F9908]">{driversCount || 0}</div>
          </div>
          
          <div className="bg-[#F7FAF2] rounded-xl p-6 border border-[#D8E8D0]">
            <div className="text-[#8FA489] text-sm font-semibold uppercase tracking-wider mb-2">Providers</div>
            <div className="text-4xl font-bold text-[#5F9908]">{providersCount || 0}</div>
          </div>
          
          <div className="bg-[#F7FAF2] rounded-xl p-6 border border-[#D8E8D0]">
            <div className="text-[#8FA489] text-sm font-semibold uppercase tracking-wider mb-2">Businesses</div>
            <div className="text-4xl font-bold text-[#5F9908]">{businessesCount || 0}</div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 border border-[#D8E8D0] shadow-sm">
          <h2 className="text-xl font-bold text-[#0D3D21] mb-2">Careers</h2>
          <p className="text-[#4A5E46] mb-6 text-sm">Job applications received</p>
          <div className="text-5xl font-bold text-[#7AB800]">{applicationsCount || 0}</div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-[#D8E8D0] shadow-sm">
          <h2 className="text-xl font-bold text-[#0D3D21] mb-2">Blog Posts</h2>
          <p className="text-[#4A5E46] mb-6 text-sm">Published articles</p>
          <div className="text-5xl font-bold text-[#7AB800]">{postsCount || 0}</div>
        </div>
      </div>
    </div>
  );
}
