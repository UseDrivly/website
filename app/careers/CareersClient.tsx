'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CareerJob } from '@/types';

/* ── Arrow icon ── */
const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Shared input styles ── */
const inp: React.CSSProperties = {
  background: '#F7FAF2',
  border: '1.5px solid #D8E8D0',
  borderRadius: '10px',
  height: '44.5px',
  width: '100%',
  padding: '0 14px',
  fontFamily: 'Helvetica Neue, Inter, sans-serif',
  fontWeight: 300,
  fontSize: '15px',
  color: '#333',
  outline: 'none',
  boxSizing: 'border-box',
};
const lbl: React.CSSProperties = {
  fontFamily: 'Helvetica Neue, Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '18px',
  letterSpacing: '0.88px',
  textTransform: 'uppercase',
  color: '#8FA489',
  display: 'block',
  marginBottom: '6px',
  textAlign: 'left',
};
const fld: React.CSSProperties = { marginBottom: '14px' };

/* ── Application Form ── */
function ApplicationForm({ jobs }: { jobs: CareerJob[] }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [why, setWhy] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, role, why, portfolio }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1.5px solid #D8E8D0', boxShadow: '0px 1px 4px rgba(13,61,33,0.04), 0px 4px 32px rgba(13,61,33,0.07)', borderRadius: '20px', width: '100%', maxWidth: '592px', margin: '0 auto', padding: '36px 40px 40px' }}>
      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#0D3D21' }}>Application received!</p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', color: '#4A5E46', marginTop: '8px' }}>We&apos;ll respond within one week.</p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ textAlign: 'left' }}>
          <div style={fld}><label style={lbl}>Full name</label><input style={inp} placeholder="Emeka Okafor" value={name} onChange={e => setName(e.target.value)} required /></div>
          <div style={fld}><label style={lbl}>Phone number</label><input style={inp} placeholder="+234 800 000 0000" value={phone} onChange={e => setPhone(e.target.value)} required /></div>
          <div style={fld}><label style={lbl}>Email address</label><input style={inp} type="email" placeholder="emeka@email.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div style={fld}>
            <label htmlFor="career-role" style={lbl}>Role you&apos;re applying for</label>
            <select id="career-role" style={{ ...inp, appearance: 'none' }} value={role} onChange={e => setRole(e.target.value)} required>
              <option value="">Select a role</option>
              {jobs.map(j => <option key={j.id} value={j.title}>{j.title}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={lbl}>Why do you want to work at Drivly?</label>
            <textarea style={{ ...inp, height: '82px', padding: '12px 14px', resize: 'none' }} placeholder="Tell us what excites you about this and what you bring to the team" value={why} onChange={e => setWhy(e.target.value)} />
          </div>
          <div style={fld}><label style={lbl}>LinkedIn or Portfolio (optional)</label><input style={inp} placeholder="emeka@email.com" value={portfolio} onChange={e => setPortfolio(e.target.value)} /></div>

          {status === 'error' && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}

          <button type="submit" disabled={status === 'loading'} style={{ width: '100%', height: '48px', background: '#7AB800', boxShadow: '0px 4px 16px rgba(122,184,0,0.3)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {status === 'loading' ? 'Submitting…' : <><span>Send Application</span><Arrow /></>}
          </button>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', color: '#8FA489', textAlign: 'center', marginTop: '12px' }}>
            We respond to every application within one week.
          </p>
        </form>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
  MAIN CAREERS PAGE
  ════════════════════════════════════════════════ */
export default function CareersClient({ jobs }: { jobs: CareerJob[] }) {
  return (
    <>
      {/* ══ HERO — #0D3D21 bg, "Build something..." 72px white centred ══ */}
      <section style={{ background: '#0D3D21', minHeight: '388px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0">
          <Image src="/images/hero-careers.jpg" alt="Drivly careers hero" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(80px,12vw,113px) 24px' }}>
          {/* "Build something that matters to millions of Nigerians." */}
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(30px,5.5vw,72px)', lineHeight: '1.1', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '1191px', margin: 0 }}>
            Build something that matters <br />
            to <span style={{ color: '#7AB800' }}>millions</span> of Nigerians.
          </h1>
        </div>
      </section>

      {/* ══ "WE'RE LOOKING FOR…" — white bg, #5F9908 headline ══ */}
      <section className="bg-white" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1512px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(28px,5.5vw,72px)', lineHeight: '1.1', letterSpacing: '-2.16px', color: '#5F9908', margin: '0 0 16px' }}>
            We&apos;re looking for<br />a few good people
          </h2>
          {/* Tagline */}
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#000000', maxWidth: '849px', margin: '0 auto 48px', textAlign: 'center' }}>
            We are a small team moving fast. Every person who joins early has real ownership and real impact. This is not a place to maintain something, it is a place to build it.
          </p>
        </div>
      </section>

      {/* ══ JOB CARDS — white bg ══ */}
      <section className="bg-white" style={{ paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1199px', margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {jobs.map((job) => (
            <div key={job.id} style={{ background: '#F7FAF2', border: '3px solid rgba(122,184,0,0.15)', borderRadius: '20px', padding: 'clamp(20px,4vw,40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              {/* Left: title + description + pills */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: '34px', color: '#0D3D21', margin: '0 0 10px' }}>
                  {job.title}
                </h3>
                <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#0F172A', margin: '0 0 14px', maxWidth: '584px' }}>
                  {job.description}
                </p>
                {/* Pills */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[job.location, job.type].map((tag) => (
                    <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', background: 'rgba(122,184,0,0.15)', border: '0.665px solid rgba(122,184,0,0.3)', borderRadius: '12px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '12.63px', lineHeight: '22px', color: '#0D3D21' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Right: Apply button */}
              <a href="#apply" id={`apply-${job.id}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '146px', height: '47px', border: '1px solid #DCDCDC', borderRadius: '12px', background: 'transparent', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0C0B0B', textDecoration: 'none', flexShrink: 0 }}>
                Apply
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SEND YOUR APPLICATION — #12502C bg ══ */}
      <section id="apply" style={{ background: '#12502C', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1512px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Headline */}
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(28px,5.5vw,72px)', lineHeight: '1.1', letterSpacing: '-2.16px', color: '#FFFFFF', margin: '0 0 8px' }}>
            Send your application
          </h2>
          {/* Subtitle */}
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '677px', margin: '0 0 40px' }}>
            We read every application personally and respond to everyone within one week
          </p>
          {/* Form */}
          <div style={{ width: '100%' }}>
            <ApplicationForm jobs={jobs} />
          </div>
        </div>
      </section>
    </>
  );
}
