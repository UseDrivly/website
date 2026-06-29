'use client';

import dynamic from 'next/dynamic';

const WaitlistTabForm = dynamic(() => import('./WaitlistTabForm'), {
  ssr: false,
  loading: () => <div style={{ background: '#FFF', border: '1.5px solid #D8E8D0', borderRadius: '20px', padding: '33.5px 7.98% 40px', height: '400px' }} />
});

export default function WaitlistTabFormWrapper({ id, defaultRole = 'driver' }: { id?: string; defaultRole?: 'driver' | 'provider' }) {
  return <WaitlistTabForm id={id} defaultRole={defaultRole} />;
}
