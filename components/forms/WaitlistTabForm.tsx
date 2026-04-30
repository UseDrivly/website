'use client';

import React, { useState, useTransition } from 'react';
import { submitWaitlist } from '@/actions/waitlist';

const ArrowRight = ({ size = 20, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type Role = 'driver' | 'provider';

interface WaitlistTabFormProps {
  /** Form card ID for anchor links */
  id?: string;
}

/**
 * WaitlistTabForm — the tabbed Driver / Provider form card.
 * Matches Figma spec exactly:
 * - Toggle bar: #F0F5EA bg, active tab #0D3D21 dark green
 * - Fields: Full name, Phone number, Email address
 * - Submit: #7AB800 action green button with shadow
 * - Label text: uppercase, 11px, #8FA489 sage
 * - Input bg: #F7FAF2, border #D8E8D0
 */
export default function WaitlistTabForm({ id }: WaitlistTabFormProps) {
  const [role, setRole] = useState<Role>('driver');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('role', role);

    if (role === 'provider') {
      const serviceType = String(formData.get('service_type') ?? '').trim();
      const address = String(formData.get('address') ?? '').trim();
      if (!serviceType) {
        setStatus('error');
        setMessage('Service type is required for providers.');
        return;
      }
      if (!address) {
        setStatus('error');
        setMessage('Address is required for providers.');
        return;
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
  };

  const fieldLabel = (text: string) => (
    <label
      className="block uppercase"
      style={{
        fontFamily: 'Helvetica Neue, Inter, sans-serif',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '18px',
        letterSpacing: '0.88px',
        color: '#8FA489',
        marginBottom: '4px',
        textAlign: 'left',
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
    lineHeight: '18px',
    color: '#111810',
    paddingLeft: '14.5px',
    paddingRight: '14.5px',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  if (status === 'success') {
    return (
      <div
        id={id}
        className="flex flex-col items-center justify-center text-center"
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #D8E8D0',
          boxShadow: '0px 1px 4px rgba(13,61,33,0.04), 0px 4px 32px rgba(13,61,33,0.07)',
          borderRadius: '20px',
          padding: '48px 32px',
          minHeight: '300px',
        }}
      >
        <div className="text-4xl mb-4">🎉</div>
        <p className="font-semibold text-lg" style={{ color: '#0D3D21' }}>You&apos;re on the list!</p>
        <p className="mt-2 text-sm" style={{ color: '#4A5E46' }}>{message}</p>
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
      {/* Tab toggle */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
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
            type="button"
            onClick={() => { setRole(r); setStatus('idle'); }}
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
              transition: 'all 0.15s',
            }}
          >
            {r === 'driver' ? `I'm a Driver` : `I'm a Provider`}
          </button>
        ))}
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        {/* Title + subtitle */}
        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '29px',
              color: '#111810',
              marginBottom: '4px',
            }}
          >
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
            {fieldLabel('Full name')}
            <input
              name="name"
              type="text"
              placeholder={role === 'driver' ? 'e.g. Emeka Okafor' : 'e.g. Chidi Eze'}
              required
              style={inputStyle}
            />
          </div>
          <div>
            {fieldLabel('Phone number')}
            <input
              name="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              required
              style={inputStyle}
            />
          </div>
          <div>
            {fieldLabel('Email address')}
            <input
              name="email"
              type="email"
              placeholder={role === 'driver' ? 'emeka@email.com' : 'chidi@email.com'}
              required
              style={inputStyle}
            />
          </div>
          {role === 'provider' && (
            <div>
              {fieldLabel('Service type')}
              <input
                name="service_type"
                type="text"
                placeholder="e.g. Towing, Tyre repair, Battery jumpstart"
                required
                style={inputStyle}
              />
            </div>
          )}
          {role === 'provider' && (
            <div>
              {fieldLabel('Address')}
              <input
                name="address"
                type="text"
                placeholder="Your address"
                required
                style={inputStyle}
              />
            </div>
          )}
        </div>

        {/* Hidden city field */}
        <input type="hidden" name="city" value="Lagos" />

        {/* Error message */}
        {status === 'error' && (
          <p className="mt-3 text-sm" style={{ color: '#B91C1C' }}>{message}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-action hover:bg-brand-action-hover transition-colors duration-200"
          style={{
            marginTop: '24px',
            width: '100%',
            height: '48px',
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
          <span
            style={{
              fontFamily: 'Poppins, Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#0D3D21',
            }}
          >
            {isPending ? 'Submitting…' : 'Join the Waitlist'}
          </span>
          {!isPending && <ArrowRight size={20} color="#0D3D21" strokeWidth={1.5} />}
        </button>

        {/* Consent note */}
        <p
          className="text-center mt-4"
          style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            lineHeight: '18px',
            color: '#8FA489',
          }}
        >
          We&apos;ll notify you the moment Drivly launches in your area. No spam, ever.
        </p>
      </form>
    </div>
  );
}
