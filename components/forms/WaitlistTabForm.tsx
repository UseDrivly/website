'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitWaitlist } from '@/actions/waitlist';

const ArrowRight = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type Role = 'driver' | 'provider';

interface WaitlistTabFormProps {
  id?: string;
  defaultRole?: Role;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '44.5px',
  background: '#F7FAF2',
  border: '1.5px solid #D8E8D0',
  borderRadius: '10px',
  fontFamily: 'Helvetica Neue, Inter, sans-serif',
  fontWeight: 300,
  fontSize: '15px',
  color: '#111810',
  paddingLeft: '14.5px',
  paddingRight: '14.5px',
  outline: 'none',
  boxSizing: 'border-box',
};

function FieldLabel({ text }: { text: string }) {
  return (
    <span style={{
      display: 'block',
      fontFamily: 'Helvetica Neue, Inter, sans-serif',
      fontWeight: 400,
      fontSize: '11px',
      letterSpacing: '0.88px',
      color: '#8FA489',
      marginBottom: '4px',
      textTransform: 'uppercase',
    }}>
      {text}
    </span>
  );
}

export default function WaitlistTabForm({ id, defaultRole = 'driver' }: WaitlistTabFormProps) {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>(defaultRole);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Switch tab when ?role=provider appears in the URL (e.g. from hero CTA click)
  useEffect(() => {
    const urlRole = searchParams.get('role');
    if (urlRole === 'provider' || urlRole === 'driver') {
      setRole(urlRole as Role);
      setStatus('idle');
      setMessage('');
    }
  }, [searchParams]);

  function handleTabClick(newRole: Role) {
    setRole(newRole);
    setStatus('idle');
    setMessage('');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('role', role);

    if (role === 'provider') {
      if (!String(formData.get('service_type') ?? '').trim()) {
        setStatus('error'); setMessage('Service type is required.'); return;
      }
      if (!String(formData.get('address') ?? '').trim()) {
        setStatus('error'); setMessage('Address is required.'); return;
      }
    }

    startTransition(async () => {
      const result = await submitWaitlist(formData);
      if (result.success) {
        setStatus('success');
        setMessage(result.message ?? `You're on the ${role} waitlist!`);
        form.reset();
      } else {
        setStatus('error');
        setMessage(result.error ?? 'Something went wrong. Please try again.');
      }
    });
  }

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div id={id} style={{ background: '#FFF', border: '1.5px solid #D8E8D0', boxShadow: '0 4px 32px rgba(13,61,33,0.07)', borderRadius: '20px', padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
        <p style={{ fontWeight: 600, fontSize: '18px', color: '#0D3D21' }}>You&apos;re on the list!</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#4A5E46' }}>{message}</p>
      </div>
    );
  }

  return (
    <div id={id} style={{ background: '#FFF', border: '1.5px solid #D8E8D0', boxShadow: '0 4px 32px rgba(13,61,33,0.07)', borderRadius: '20px', padding: '33.5px 7.98% 40px' }}>

      {/* ── Tab toggle ── */}
      <div style={{ display: 'flex', padding: '4px', gap: '4px', background: '#F0F5EA', borderRadius: '10px', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => handleTabClick('driver')}
          style={{
            flex: 1, height: '35.5px', borderRadius: '8px', border: 'none',
            cursor: 'pointer',
            background: role === 'driver' ? '#0D3D21' : 'transparent',
            color: role === 'driver' ? '#FFFFFF' : '#8FA489',
            fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '13px',
          }}
        >
          I&apos;m a Driver
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('provider')}
          style={{
            flex: 1, height: '35.5px', borderRadius: '8px', border: 'none',
            cursor: 'pointer',
            background: role === 'provider' ? '#0D3D21' : 'transparent',
            color: role === 'provider' ? '#FFFFFF' : '#8FA489',
            fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '13px',
          }}
        >
          I&apos;m a Provider
        </button>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '18px', color: '#111810', marginBottom: '4px' }}>
            {role === 'driver' ? 'Get early access' : 'Earn more from your skills'}
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '20px', color: '#4A5E46' }}>
            {role === 'driver'
              ? 'Be among the first drivers in Lagos to use Drivly when we launch.'
              : 'Get paying jobs sent directly to your phone. No joining fee.'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <FieldLabel text="Full name" />
            <input name="name" type="text" placeholder={role === 'driver' ? 'e.g. Emeka Okafor' : 'e.g. Chidi Eze'} required style={inputStyle} />
          </div>
          <div>
            <FieldLabel text="Phone number" />
            <input name="phone" type="tel" placeholder="+234 800 000 0000" required style={inputStyle} />
          </div>
          <div>
            <FieldLabel text="Email address" />
            <input name="email" type="email" placeholder={role === 'driver' ? 'emeka@email.com' : 'chidi@email.com'} required style={inputStyle} />
          </div>
          {role === 'provider' && (
            <div>
              <FieldLabel text="Service type" />
              <input name="service_type" type="text" placeholder="e.g. Towing, Tyre repair, Battery jumpstart" required style={inputStyle} />
            </div>
          )}
          {role === 'provider' && (
            <div>
              <FieldLabel text="Address / base location" />
              <input name="address" type="text" placeholder="Your workshop or base location" required style={inputStyle} />
            </div>
          )}
        </div>

        <input type="hidden" name="city" value="Lagos" />

        {status === 'error' && (
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#B91C1C' }}>{message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{
            marginTop: '24px', width: '100%', height: '48px',
            background: '#7AB800',
            boxShadow: '0 4px 16px rgba(122,184,0,0.3)',
            borderRadius: '12px', border: 'none',
            cursor: isPending ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            opacity: isPending ? 0.75 : 1,
          }}
        >
          <span style={{ fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21' }}>
            {isPending ? 'Submitting…' : role === 'driver' ? 'Join the Waitlist' : 'Apply to Join'}
          </span>
          {!isPending && <ArrowRight />}
        </button>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#8FA489', fontFamily: 'Helvetica Neue, Inter, sans-serif' }}>
          We&apos;ll notify you the moment Drivly launches in your area. No spam, ever.
        </p>
      </form>
    </div>
  );
}
