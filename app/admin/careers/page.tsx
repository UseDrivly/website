import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function AdminCareers() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: applications, error } = await supabase
    .from('career_applications')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching career applications:', error);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-[#D8E8D0]">
        <h2 className="text-xl font-bold text-[#0D3D21]">Career Applications</h2>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {!applications || applications.length === 0 ? (
          <div className="text-center text-[#4A5E46] py-12">
            No applications found.
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <details
                key={app.id}
                className="group bg-[#F7FAF2] rounded-xl border border-[#D8E8D0] overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#D8E8D0]/50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div>
                      <h3 className="font-bold text-[#0D3D21]">{app.name}</h3>
                      <p className="text-sm text-[#4A5E46]">{app.email} • {app.phone}</p>
                    </div>
                    <div className="hidden md:block px-3 py-1 bg-[#7AB800]/20 text-[#5F9908] rounded-md text-sm font-semibold">
                      {app.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#8FA489]">
                      {new Date(app.submitted_at).toLocaleDateString()}
                    </span>
                    <span className="transition group-open:rotate-180">
                      ▼
                    </span>
                  </div>
                </summary>
                
                <div className="p-4 border-t border-[#D8E8D0] bg-white">
                  <div className="md:hidden mb-4">
                    <span className="px-3 py-1 bg-[#7AB800]/20 text-[#5F9908] rounded-md text-sm font-semibold">
                      {app.role}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#8FA489] mb-1">Why Drivly?</h4>
                      <p className="text-sm text-[#333] whitespace-pre-wrap">
                        {app.why || <span className="text-gray-400 italic">Not provided</span>}
                      </p>
                    </div>
                    
                    {app.portfolio && (
                      <div>
                        <h4 className="text-xs font-bold uppercase text-[#8FA489] mb-1">Portfolio / Link</h4>
                        <a href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          {app.portfolio}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
