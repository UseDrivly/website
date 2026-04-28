import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminWaitlist({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const roleFilter = searchParams.role;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase.from('waitlist').select('*').order('created_at', { ascending: false });

  if (roleFilter && ['driver', 'provider', 'business'].includes(roleFilter)) {
    query = query.eq('role', roleFilter);
  }

  const { data: entries, error } = await query;

  if (error) {
    console.error('Error fetching waitlist:', error);
  }

  const tabs = [
    { label: 'All', value: undefined },
    { label: 'Drivers', value: 'driver' },
    { label: 'Providers', value: 'provider' },
    { label: 'Businesses', value: 'business' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-[#D8E8D0]">
        <h2 className="text-xl font-bold text-[#0D3D21] mb-4">Waitlist Entries</h2>
        
        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = tab.value === roleFilter;
            return (
              <Link
                key={tab.label}
                href={`/admin/waitlist${tab.value ? `?role=${tab.value}` : ''}`}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0D3D21] text-white'
                    : 'bg-[#F7FAF2] text-[#4A5E46] hover:bg-[#D8E8D0]'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-0">
        <table className="w-full text-left text-sm text-[#333]">
          <thead className="bg-[#F7FAF2] text-[#8FA489] uppercase text-xs sticky top-0">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Details</th>
              <th className="px-6 py-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8E8D0]">
            {!entries || entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-[#4A5E46]">
                  No entries found.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#F7FAF2]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0D3D21]">{entry.name}</td>
                  <td className="px-6 py-4">{entry.email}</td>
                  <td className="px-6 py-4">{entry.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#D8E8D0] text-[#0D3D21] rounded-md text-xs font-semibold capitalize">
                      {entry.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-xs text-[#4A5E46]">
                    {entry.role === 'driver' && (
                      <>
                        City: {entry.city} | Vehicle: {entry.vehicle_type}
                      </>
                    )}
                    {entry.role === 'provider' && (
                      <>Service: {entry.service_type}</>
                    )}
                    {entry.role === 'business' && (
                      <div className="truncate" title={entry.message}>
                        Company: {entry.company} | Type: {entry.business_type} | Fleet: {entry.fleet_size}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(entry.created_at).toLocaleDateString()}
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
