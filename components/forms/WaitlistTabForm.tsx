'use client';

import React, { useState, useTransition, useEffect, useRef } from 'react';
import { submitWaitlist } from '@/actions/waitlist';

const ArrowRight = ({ size = 20, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type Role = 'driver' | 'provider';

interface WaitlistTabFormProps {
  id?: string;
}

export default function WaitlistTabForm({ id }: WaitlistTabFormProps) {
  const [role, setRole] = useState<Role>('driver');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Listen to hash changes so external CTA links can pre-select a tab
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.includes('provider')) setRole('provider');
      else if (hash.includes('driver')) setRole('driver');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const switchRole = (r: Role) => {
    setRole(r);
    setStatus('idle');
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('role', role);

    if (role === 'provider') {
      const serviceType = String(formData.get('service_type') ?? '').trim();
      const address = String(formData.get('address') ?? '').trim();
      if (!serviceType) { setStatus('error'); setMessage('Service type is required for providers.'); return; }
      if (!address) { setStatus('error'); setMessage('Address is required for providers.'); return; }
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
  };

  const fieldLabel = (text: string, htmlFor?: string) => (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        fontFamily: 'Helvetica Neue, Inter, sans-serif',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '18px',
        letterSpacing: '0.88px',
        color: '#8FA489',
        marginBottom: '4px',
        textTransform: 'uppercase',
      }}
    >
      {text}
    </label>
  );

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
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };

  if (status === 'success') {
    return (
      <div
        id={id}
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #D8E8D0',
          boxShadow: '0px 1px 4px rgba(13,61,33,0.04), 0px 4px 32px rgba(13,61,33,0.07)',
          borderRadius: '20px',
          padding: '48px 32px',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
        <p style={{ fontWeight: 600, fontSize: '18px', color: '#0D3D21' }}>You&apos;re on the list!</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#4A5E46' }}>{message}</p>
      </div>
    );
  }

  return (
    <div
      id={id}
      style={{
        background: '#FFFFFF',
        border: '1.5px solid #D8E8D0',
        boxShadow: '0px 1px 4px rgba(13,61,33,0.04), 0px 4px 32px rgba(13,61,33,0.07)',
        borderRadius: '20px',
        padding: '33.5px 7.98% 40px',
      }}
    >
      {/* ── Tab Toggle — lives OUTSIDE the <form> to prevent event interference ── */}
      <div
        role="tablist"
        aria-label="Choose your role"
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '4px',
          gap: '4px',
          background: '#F0F5EA',
          borderRadius: '10px',
          marginBottom: '24px',
        }}
      >
        {(['driver', 'provider'] as Role[]).map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={role === r}
            type="button"
            onMouseDown={(e) => {
              // Use onMouseDown to fire before any focus/blur events
              e.preventDefault();
              e.stopPropagation();
              switchRole(r);
            }}
            style={{
              flex: 1,
              height: '35.5px',
              background: role === r ? '#0D3D21' : 'transparent',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              lineHeight: '16px',
              color: role === r ? '#FFFFFF' : '#8FA489',
              transition: 'background 0.15s, color 0.15s',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            {r === 'driver' ? "I'm a Driver" : "I'm a Provider"}
          </button>
        ))}
      </div>

      {/* ── Form body ── */}
      <form ref={formRef} onSubmit={handleSubmit} style={{ textAlign: 'left' }} noValidate>
        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '18px', lineHeight: '29px', color: '#111810', marginBottom: '4px' }}>
            Get early access
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '20px', color: '#4A5E46' }}>
            {role === 'driver'
              ? 'Be among the first drivers in Lagos to use Drivly when we launch.'
              : 'Be among the first providers in Lagos to join the Drivly network.'}
          </p>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            {fieldLabel('Full name', 'wl-name')}
            <input id="wl-name" name="name" type="text" placeholder={role === 'driver' ? 'e.g. Emeka Okafor' : 'e.g. Chidi Eze'} required style={inputStyle} />
          </div>
          <div>
            {fieldLabel('Phone number', 'wl-phone')}
            <input id="wl-phone" name="phone" type="tel" placeholder="+234 800 000 0000" required style={inputStyle} />
          </div>
          <div>
            {fieldLabel('Email address', 'wl-email')}
            <input id="wl-email" name="email" type="email" placeholder={role === 'driver' ? 'emeka@email.com' : 'chidi@email.com'} required style={inputStyle} />
          </div>
          {role === 'provider' && (
            <div>
              {fieldLabel('Service type', 'wl-service')}
              <input id="wl-service" name="service_type" type="text" placeholder="e.g. Towing, Tyre repair, Battery jumpstart" required style={inputStyle} />
            </div>
          )}
          {role === 'provider' && (
            <div>
              {fieldLabel('Address / base location', 'wl-address')}
              <input id="wl-address" name="address" type="text" placeholder="Your workshop or base location" required style={inputStyle} />
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
            marginTop: '24px',
            width: '100%',
            height: '48px',
            background: '#7AB800',
            boxShadow: '0px 4px 16px rgba(122,184,0,0.3)',
            borderRadius: '12px',
            border: 'none',
            cursor: isPending ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: isPending ? 0.75 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          <span style={{ fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21' }}>
            {isPending ? 'Submitting…' : role === 'driver' ? 'Join the Waitlist' : 'Apply as Provider'}
          </span>
          {!isPending && <ArrowRight size={20} color="#0D3D21" strokeWidth={1.5} />}
        </button>

        <p style={{ textAlign: 'center', marginTop: '16px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', lineHeight: '18px', color: '#8FA489' }}>
          We&apos;ll notify you the moment Drivly launches in your area. No spam, ever.
        </p>
      </form>
    </div>
  );
}
