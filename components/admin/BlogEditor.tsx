'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import for ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function BlogEditor({ initialData, postId }: { initialData?: any, postId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const uploadImage = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: uploadData,
    });
    
    if (!res.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await res.json();
    return data.url;
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    cover_image_url: initialData?.cover_image_url || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    is_published: initialData?.is_published || false,
  });


  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }), []);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/admin/blog', {
        method: postId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: postId }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save post');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!postId || !confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog?id=${postId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete post');
      
      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    try {
      setLoading(true);
      const imageUrl = await uploadImage(file);
      setFormData({ ...formData, cover_image_url: imageUrl });
    } catch (err) {
      setError('Failed to upload cover image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm p-6 lg:p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-[#D8E8D0] pb-4">
        <h2 className="text-xl font-bold text-[#0D3D21]">
          {postId ? 'Edit Blog Post' : 'New Blog Post'}
        </h2>
        <div className="flex gap-3">
          {postId && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-semibold transition"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => router.push('/admin/blog')}
            className="px-4 py-2 text-[#4A5E46] bg-[#F7FAF2] hover:bg-[#D8E8D0] rounded-lg text-sm font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-[#7AB800] text-[#0D3D21] hover:opacity-90 rounded-lg text-sm font-bold transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800]"
              placeholder="Post Title"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-2">Content</label>
            <div className="bg-white">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(val) => setFormData({ ...formData, content: val })}
                modules={modules}
                className="h-[400px] mb-12"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800]"
              placeholder="url-friendly-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800]"
              placeholder="e.g. Drivers, Business"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-2">Cover Image</label>
            {formData.cover_image_url && (
              <img src={formData.cover_image_url} alt="Cover preview" className="w-full h-32 object-cover rounded-lg mb-3 border border-[#D8E8D0]" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageUpload}
              className="w-full px-4 py-2 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800] text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#7AB800] file:text-[#0D3D21] hover:file:opacity-90"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-2">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full h-[120px] p-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800] resize-none"
              placeholder="Short description for preview cards..."
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-4 bg-[#F7FAF2] rounded-lg border border-[#D8E8D0]">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-5 h-5 accent-[#7AB800]"
            />
            <span className="text-sm font-bold text-[#0D3D21]">Publish this post</span>
          </label>
        </div>
      </div>
    </div>
  );
}
