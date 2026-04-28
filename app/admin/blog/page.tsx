import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminBlogList() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, is_published, published_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-[#D8E8D0] flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0D3D21]">Blog Posts</h2>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-[#7AB800] text-[#0D3D21] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + New Post
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-[#333]">
          <thead className="bg-[#F7FAF2] text-[#8FA489] uppercase text-xs sticky top-0">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8E8D0]">
            {!posts || posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#4A5E46]">
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F7FAF2]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#0D3D21]">{post.title}</td>
                  <td className="px-6 py-4">
                    {post.is_published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold uppercase">Published</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold uppercase">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(post.published_at || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
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
