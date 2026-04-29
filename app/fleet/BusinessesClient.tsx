'use client';

import Link from 'next/link';
import Image from 'next/image';
import BlogPreview from '@/components/sections/BlogPreview';
import StatsBar from '@/components/sections/StatsBar';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data/services';
import { useState } from 'react';
import type { StatItem } from '@/types';

/* ── Stats — 4 visible (same as providers per spec) ── */
const businessStats: StatItem[] = [
  { value: '2M+', label: 'Registered vehicles in Lagos State' },
  { value: '8min', label: 'Target average provider arrival' },
  { value: '₦0', label: 'Negotiation on any job ever' },
  { value: '85%', label: 'Of every job fee goes to the provider' },
];

/* ── Industry cards per Figma spec ── */
const industries = [
  { label: 'Hospitality', img: '/images/industry-hospitality.jpg' },
  { label: 'Logistics', img: '/images/industry-logistics.jpg' },
  { label: 'Manufacturing', img: '/images/industry-manufacturing.jpg' },
  { label: 'School', img: '/images/industry-school.jpg' },
  { label: 'Corporate Fleet Operations', img: '/images/industry-corporate.jpg' },
  { label: 'Retail', img: '/images/industry-retail.jpg' },
];

/* ── Shared atoms ── */
const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Eyebrow pill ─────────────────────────────────────────── */
function EyebrowPill({ text, actionColor = false }: { text: string; actionColor?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', padding: '10px',
      background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)',
      fontFamily: 'Helvetica Neue, Inter, sans-serif', fontSize: '19px', lineHeight: '33px',
      color: actionColor ? '#7AB800' : '#0D3D21',
    }}>
      {text}
    </div>
  );
}

/* ── Section headline ─────────────────────────────────────── */
function SectionHeadline({ text, children, centered = false }: { text?: string; children?: React.ReactNode; centered?: boolean }) {
  return (
    <h2 style={{
      fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
      fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.04', letterSpacing: '-2.16px',
      color: '#5F9908', textAlign: centered ? 'center' : 'left',
    }}>
      {children || text}
    </h2>
  );
}


/* ── Business waitlist form (7 fields per spec) ── */
function BusinessForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [bizType, setBizType] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const inp: React.CSSProperties = { background: '#F7FAF2', border: '1.5px solid #D8E8D0', borderRadius: '10px', height: '44.5px', width: '100%', padding: '0 14px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 300, fontSize: '15px', color: '#333', outline: 'none', boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', lineHeight: '18px', letterSpacing: '0.88px', textTransform: 'uppercase', color: '#8FA489', display: 'block', marginBottom: '6px', textAlign: 'left' };
  const fld: React.CSSProperties = { marginBottom: '14px' };

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, company, email, phone, state, business_type: bizType, message, role: 'business' }) });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1.5px solid #D8E8D0', boxShadow: '0px 1px 4px rgba(13,61,33,0.04), 0px 4px 32px rgba(13,61,33,0.07)', borderRadius: '20px', width: '100%', maxWidth: '663px', margin: '0 auto' }} className="p-5 pb-8 sm:px-[57px] sm:pt-[34px] sm:pb-11">
      {/* Active tab — "For Business" */}
      <div style={{ background: '#F0F5EA', borderRadius: '10px', padding: '4px', display: 'inline-flex', gap: '4px', marginBottom: '24px' }}>
        <div style={{ padding: '10px 24px', borderRadius: '8px', background: '#0D3D21', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#FFFFFF' }}>For Business</div>
        <div style={{ padding: '10px 20px', borderRadius: '8px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#8FA489' }}>For Driver</div>
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#0D3D21' }}>Request received!</p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', color: '#4A5E46', marginTop: '8px' }}>We&apos;ll be in touch when Drivly launches in your area.</p>
        </div>
      ) : (
        <form onSubmit={submit} style={{ textAlign: 'left' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '18px', color: '#111810', marginBottom: '6px' }}>Get early access</p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', color: '#4A5E46', marginBottom: '24px' }}>Be among the first drivers in Lagos to use Drivly when we launch.</p>

          <div style={fld}><label style={lbl}>Full name</label><input style={inp} placeholder="Emeka Okafor" value={name} onChange={e => setName(e.target.value)} required /></div>
          <div style={fld}><label style={lbl}>Company name</label><input style={inp} placeholder="Your company name" value={company} onChange={e => setCompany(e.target.value)} required /></div>
          <div style={fld}><label style={lbl}>Company email</label><input style={inp} type="email" placeholder="Your company email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div style={fld}><label style={lbl}>Phone number</label><input style={inp} placeholder="+234 800 000 0000" value={phone} onChange={e => setPhone(e.target.value)} required /></div>
          <div style={fld}><label style={lbl}>State</label>
            <select style={{ ...inp, appearance: 'none' }} value={state} onChange={e => setState(e.target.value)}>
              <option value="">Select state</option>
              {['Lagos', 'Abuja', 'Rivers', 'Kano', 'Ogun', 'Oyo', 'Kaduna'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={fld}><label style={lbl}>Type of business</label>
            <select style={{ ...inp, appearance: 'none' }} value={bizType} onChange={e => setBizType(e.target.value)}>
              <option value="">Select type of business</option>
              {['Hospitality', 'Logistics', 'Manufacturing', 'Retail', 'School', 'Corporate Fleet', 'Construction', 'Other'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '28px' }}><label style={lbl}>Message (optional)</label><textarea style={{ ...inp, height: '89px', padding: '12px 14px', resize: 'none' }} placeholder="Tell us briefly what you're looking for" value={message} onChange={e => setMessage(e.target.value)} /></div>

          {status === 'error' && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-action hover:bg-brand-action-hover transition-colors duration-200"
            style={{ width: '100%', height: '48px', boxShadow: '0px 4px 16px rgba(122,184,0,0.3)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {status === 'loading' ? 'Submitting…' : <><span>Join the Waitlist</span><Arrow /></>}
          </button>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', color: '#8FA489', textAlign: 'center', marginTop: '12px' }}>We&apos;ll notify you the moment Drivly launches in your area. No spam, ever.</p>
        </form>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function BusinessesClient({ posts }: { posts: any[] }) {
  return (
    <>
      {/* ══ HERO — #0D3D21 bg, white centred headline ══ */}
      <section style={{ background: '#0D3D21', minHeight: '388px' }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-fleet.jpg" alt="Drivly fleet hero" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 sm:py-16 lg:py-24">
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '1.04', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '800px' }}>
            Real-Time Rescue and<br />
            <span style={{ color: '#7AB800' }}>Fleet Management</span>
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', marginTop: '16px' }}>
            Built for your business
          </p>
        </div>
      </section>

      {/* ══ STATS BAR — all 4 ══ */}
      <StatsBar stats={businessStats} />

      {/* ══ WE TAKE OVER — white bg, headline left, photo right ══ */}
      <section className="bg-white py-14 sm:py-16 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left */}
          <div className="flex-1 max-w-[506px]">
            <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 70px)', lineHeight: '1.04', letterSpacing: '-2.16px', marginBottom: '24px' }}>
              <span style={{ color: '#5F9908' }}>We Take Over</span><br />
              <span style={{ color: '#5F9908' }}>When</span> <span style={{ color: '#0D3D21' }}>Things</span><br />
              <span style={{ color: '#0D3D21' }}>Go Wrong</span>
            </h2>
            <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#111810', marginBottom: '32px' }}>
              We take over the moment something goes wrong dispatching rescue, coordinating fixes, and keeping your fleet moving without disruption.
            </p>
            <Link
              href="#waitlist"
              id="business-hero-cta"
              className="transition-opacity duration-200 hover:opacity-90"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 20px', background: '#0D3D21', border: '1px solid #DCDCDC', borderRadius: '12px', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF', textDecoration: 'none' }}
            >
              Join the Waitlist <Arrow />
            </Link>
          </div>

          {/* Right: photo (557×534 with 27px radius) */}
          <div style={{ flexShrink: 0, width: '100%', maxWidth: '557px' }}>
            <div style={{ width: '100%', aspectRatio: '557/534', background: '#D9D9D9', borderRadius: '27px', overflow: 'hidden', position: 'relative' }}>
              <Image src="/images/fleet-breakdown.jpg" alt="Fleet breakdown" fill sizes="(max-width: 768px) 100vw, 557px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ POWERING EVERY INDUSTRY — #F7FAF2 bg ══ */}
      <section style={{ background: '#F7FAF2' }} className="py-16 lg:py-20">
        <div className="max-w-[1208px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centred headline */}
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: '1.04', letterSpacing: '-2.16px', color: '#5F9908', textAlign: 'center', marginBottom: '8px' }}>
            Powering Every Industry
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '1.74', color: '#000000', textAlign: 'center', maxWidth: '506px', margin: '0 auto 40px' }}>
            Trusted across Lagos to keep operations running
          </p>

          {/* 2 rows × 3 industry photo cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {industries.map((ind) => (
              <div key={ind.label}>
                {/* Photo card (16px rounded corners) */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', aspectRatio: '363/168', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image src={ind.img} alt={ind.label} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                </div>
                {/* Label below */}
                <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '1.25', color: '#0E1510', marginTop: '12px', textAlign: 'center' }}>
                  {ind.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT WE COVER — white bg, centred, 3×2 service cards ══ */}
      <section className="bg-white py-14 sm:py-16 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <div className="flex justify-center mb-6">
            <EyebrowPill text="WHAT WE COVER" />
          </div>
          <div className="text-center mb-16">
            <SectionHeadline centered>
              Six ways Drivly<br className="hidden sm:block" />has you covered.
            </SectionHeadline>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {services.map((svc, i) => (
              <ServiceCard key={i} service={svc} />
            ))}
          </div>
          <p className="text-center" style={{ fontSize: '15px', fontWeight: 500, color: '#0D3D21', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            And many more
          </p>
        </div>
      </section>

      {/* ══ BLOGS & ARTICLES ══ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1512px] mx-auto px-6 lg:px-20">
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '1.08', letterSpacing: '-2.16px', color: '#5F9908', textAlign: 'center', marginBottom: '8px' }}>
            Blogs &amp; Articles
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#0D3D21', textAlign: 'center', maxWidth: '499px', margin: '0 auto 48px' }}>
            Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.
          </p>
          <BlogPreview posts={posts} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <a href="/blog" id="business-blog-view-all" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 20px', border: '1px solid #DCDCDC', borderRadius: '12px', background: 'transparent', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none' }}>
              View all articles <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ══ JOIN THE WAITLIST — dark green gradient, business form ══ */}
      <section id="waitlist" style={{ background: 'linear-gradient(180deg, #186839 -48.19%, #0D3D21 100.09%)', position: 'relative', overflow: 'hidden' }} className="py-14 sm:py-16 lg:py-28">
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1512px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#7AB800', marginBottom: '16px' }}>
            JOIN THE WAITLIST
          </div>
          {/* Headline */}
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '1.08', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '627px', marginBottom: '8px' }}>
            Join the network before we launch
          </h2>
          {/* Subtitle */}
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '669px', marginBottom: '48px' }}>
            Leave your details and you&apos;ll be the first to know when we go live in your area
          </p>
          {/* Business-specific form (663px, 7 fields) */}
          <div style={{ width: '100%' }}>
            <BusinessForm />
          </div>
        </div>
      </section>
    </>
  );
}
