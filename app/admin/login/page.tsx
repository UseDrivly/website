'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loginAdmin } from '@/actions/admin';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginAdmin(password);
      if (res.success) {
        router.push('/admin');
        router.refresh(); // Refresh to ensure middleware catches the new cookie
      } else {
        setError(res.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF2] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#D8E8D0] p-8">
        
        <div className="flex justify-center mb-8">
          <div className="bg-[#0D3D21] p-3 rounded-xl inline-block">
            <Image src="/images/logo-white.svg" alt="Drivly" width={102} height={35} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-[#0D3D21] mb-2 font-['Helvetica_Neue',Inter,sans-serif]">
          Admin Portal
        </h1>
        <p className="text-center text-[#4A5E46] mb-8 text-sm">
          Enter the master password to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.88px] text-[#8FA489] mb-2 font-['Helvetica_Neue',Inter,sans-serif]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#333] font-['Helvetica_Neue',Inter,sans-serif] focus:border-[#7AB800] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] mt-2 bg-[#7AB800] text-[#0D3D21] font-semibold rounded-xl shadow-[0px_4px_16px_rgba(122,184,0,0.3)] hover:opacity-90 transition-opacity disabled:opacity-50 font-['Poppins',Inter,sans-serif]"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
}
