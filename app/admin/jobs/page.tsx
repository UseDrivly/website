import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminJobsList() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: jobs, error } = await supabase
    .from('career_jobs')
    .select('id, title, is_published, created_at, location, type')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching career jobs:', error);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-[#D8E8D0] flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0D3D21]">Job Posts</h2>
        <Link
          href="/admin/jobs/new"
          className="px-4 py-2 bg-[#7AB800] text-[#0D3D21] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + New Job
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-[#333]">
          <thead className="bg-[#F7FAF2] text-[#8FA489] uppercase text-xs sticky top-0">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8E8D0]">
            {!jobs || jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#4A5E46]">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#F7FAF2]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0D3D21]">{job.title}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.type}</td>
                  <td className="px-6 py-4">
                    {job.is_published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold uppercase">Published</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold uppercase">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
