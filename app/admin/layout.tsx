'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { logoutAdmin } from '@/actions/admin';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Waitlist', href: '/admin/waitlist', icon: '📋' },
  { name: 'Jobs', href: '/admin/jobs', icon: '💼' },
  { name: 'Careers', href: '/admin/careers', icon: '�' },
  { name: 'Blog', href: '/admin/blog', icon: '✍️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not show the admin layout on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F7FAF2] flex flex-col md:flex-row font-['Helvetica_Neue',Inter,sans-serif]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D3D21] text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <Link href="/admin">
            <Image src="/images/logo-white.svg" alt="Drivly Admin" width={102} height={35} />
          </Link>
          <div className="mt-2 text-xs text-[#7AB800] uppercase tracking-wider font-semibold">
            Admin Panel
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#7AB800] text-[#0D3D21] font-semibold' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-white hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Topbar (Mobile mainly) */}
        <header className="bg-white border-b border-[#D8E8D0] h-16 flex items-center px-8 shadow-sm flex-shrink-0">
          <h1 className="text-xl font-bold text-[#0D3D21]">
            {navItems.find(item => pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin'))?.name || 'Dashboard'}
          </h1>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
