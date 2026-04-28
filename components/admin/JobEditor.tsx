'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobEditor({ initialData, jobId }: { initialData?: any; jobId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    type: initialData?.type || '',
    is_published: initialData?.is_published || false,
  });

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/jobs', {
        method: jobId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: jobId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save job');
      }

      router.push('/admin/jobs');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!jobId || !confirm('Are you sure you want to delete this job?')) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/jobs?id=${jobId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete job');
      }

      router.push('/admin/jobs');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm p-6 lg:p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-[#D8E8D0] pb-4">
        <h2 className="text-xl font-bold text-[#0D3D21]">{jobId ? 'Edit Job' : 'New Job'}</h2>
        <div className="flex gap-3">
          {jobId && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-semibold transition"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => router.push('/admin/jobs')}
            className="px-4 py-2 text-[#4A5E46] bg-[#F7FAF2] hover:bg-[#D8E8D0] rounded-lg text-sm font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-[#7AB800] text-[#0D3D21] hover:opacity-90 rounded-lg text-sm font-bold transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="job-title" className="block text-sm font-bold text-[#0D3D21] mb-2">Title</label>
          <input
            id="job-title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800]"
          />
        </div>

        <div>
          <label htmlFor="job-location" className="block text-sm font-bold text-[#0D3D21] mb-2">Location</label>
          <input
            id="job-location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800]"
          />
        </div>

        <div>
          <label htmlFor="job-type" className="block text-sm font-bold text-[#0D3D21] mb-2">Type</label>
          <input
            id="job-type"
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800]"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer p-4 bg-[#F7FAF2] rounded-lg border border-[#D8E8D0]">
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="w-5 h-5 accent-[#7AB800]"
          />
          <span className="text-sm font-semibold text-[#0D3D21]">Published</span>
        </label>

        <div className="lg:col-span-2">
          <label htmlFor="job-description" className="block text-sm font-bold text-[#0D3D21] mb-2">Description</label>
          <textarea
            id="job-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full h-[160px] p-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] focus:border-[#7AB800] resize-none"
          />
        </div>
      </div>
    </div>
  );
}
