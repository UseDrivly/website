'use client';

import dynamic from 'next/dynamic';

const WaitlistTabForm = dynamic(() => import('@/components/forms/WaitlistTabForm'), {
  ssr: false,
  loading: () => <div style={{ background: '#FFF', border: '1.5px solid #D8E8D0', borderRadius: '20px', padding: '33.5px 7.98% 40px', height: '400px' }} />
});

interface WaitlistTabFormClientProps {
  id?: string;
  defaultRole?: 'driver' | 'provider';
}

export default function WaitlistTabFormClient({ id, defaultRole = 'driver' }: WaitlistTabFormClientProps) {
  return <WaitlistTabForm id={id} defaultRole={defaultRole} />;
}
