'use client';

import Link from 'next/link';
import Image from 'next/image';
import BlogPreview from '@/components/sections/BlogPreview';
import StatsBar from '@/components/sections/StatsBar';
import { useState } from 'react';
import type { StatItem } from '@/types';

/* ── Provider stats — all 4 visible per spec ── */
const providerStats: StatItem[] = [
  { value: '2M+',  label: 'Registered vehicles in Lagos State' },
  { value: '8min', label: 'Target average provider arrival' },
  { value: '₦0',   label: 'Negotiation on any job ever' },
  { value: '85%',  label: 'Of every job fee goes to the provider' },
];

const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function EyebrowPill({ text, color = '#0D3D21' }: { text: string; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color }}>
      {text}
    </div>
  );
}

function StepBadge({ n, label, textColor = '#F7FAF2' }: { n: string; label: string; textColor?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
      <div style={{ minWidth: '36px', height: '36px', flexShrink: 0, background: '#EFF7DB', border: '1px solid #C8E99A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Syne, Inter, sans-serif', fontWeight: 800, fontSize: '12px', color: '#0D3D21' }}>{n}</span>
      </div>
      <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: textColor, paddingTop: '8px' }}>{label}</p>
    </div>
  );
}

function GreenBtn({ href, label, id }: { href: string; label: string; id?: string }) {
  return (
    <Link href={href} id={id} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 20px', background: '#7AB800', border: '1px solid #DCDCDC', borderRadius: '12px', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none', whiteSpace: 'nowrap' }}>
      {label} <Arrow />
    </Link>
  );
}

/* ── Provider-specific waitlist form ── */
function ProviderForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const inputStyle: React.CSSProperties = { background: '#F7FAF2', border: '1.5px solid #D8E8D0', borderRadius: '10px', height: '44.5px', width: '100%', padding: '0 14px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 300, fontSize: '15px', color: '#333', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', lineHeight: '18px', letterSpacing: '0.88px', textTransform: 'uppercase', color: '#8FA489', display: 'block', marginBottom: '6px' };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, role: 'provider', service_type: service }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1.5px solid #D8E8D0', boxShadow: '0px 1px 4px rgba(13,61,33,0.04), 0px 4px 32px rgba(13,61,33,0.07)', borderRadius: '20px', width: '100%', maxWidth: '597px', padding: '34px 54px 40px', margin: '0 auto' }}>
      {/* Tab toggle — provider pre-selected */}
      <div style={{ background: '#F0F5EA', borderRadius: '10px', padding: '4px', display: 'inline-flex', gap: '4px', marginBottom: '24px' }}>
        <div style={{ padding: '10px 20px', borderRadius: '8px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#8FA489' }}>I&apos;m a Driver</div>
        <div style={{ padding: '10px 20px', borderRadius: '8px', background: '#0D3D21', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#FFFFFF' }}>I&apos;m a Provider</div>
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 600, fontSize: '18px', color: '#0D3D21' }}>Application received!</p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', color: '#4A5E46', marginTop: '8px' }}>We&apos;ll reach out when Drivly launches in your area.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '18px', color: '#111810', marginBottom: '6px' }}>Earn more from your skills</p>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '13px', color: '#4A5E46', marginBottom: '24px' }}>Get paying jobs sent directly to your phone. No joining fee.</p>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full name</label>
            <input style={inputStyle} placeholder="Emeka Okafor" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Phone number</label>
            <input style={inputStyle} placeholder="+234 800 000 0000" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email address</label>
            <input style={inputStyle} type="email" placeholder="emeka@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Service type</label>
            <input style={inputStyle} placeholder="Input your services" value={service} onChange={e => setService(e.target.value)} />
          </div>

          {status === 'error' && (
            <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>Something went wrong. Please try again.</p>
          )}

          <button type="submit" disabled={status === 'loading'} style={{ width: '100%', height: '48px', background: '#7AB800', boxShadow: '0px 4px 16px rgba(122,184,0,0.3)', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {status === 'loading' ? 'Submitting…' : <><span>Apply to Join</span><Arrow /></>}
          </button>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', color: '#8FA489', textAlign: 'center', marginTop: '12px' }}>We&apos;ll notify you the moment Drivly launches in your area. No spam, ever.</p>
        </form>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function ProvidersClient({ posts }: { posts: any[] }) {
  return (
    <>
      {/* ══ HERO ── #0D3D21 bg, centred white headline ══ */}
      <section style={{ background: '#0D3D21', minHeight: '388px' }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-providers.jpg" alt="Drivly providers hero" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-24">
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '1191px' }}>
            Whether you own a <span style={{ color: '#7AB800' }}>workshop</span>,<br />
            <span style={{ color: '#7AB800' }}>manage a fleet</span>, or <span style={{ color: '#7AB800' }}>run a company</span>
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', marginTop: '14px' }}>
            Drivly is built for you
          </p>
        </div>
      </section>

      {/* ══ STATS BAR — 4 stats (including 85%) ══ */}
      <StatsBar stats={providerStats} />

      {/* ══ BENTO BENEFIT CARDS ══ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            
            {/* Left Column (2 Cards) */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* Card 1 — Earnings (#F7FAF2) */}
              <div style={{ background: '#F7FAF2', borderRadius: '20px', padding: '40px', minHeight: '220px' }}>
                <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.15)', borderRadius: '18px', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', color: '#7AB800' }}>Earnings</span>
                </div>
                <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '34px', color: '#0D3D21', marginBottom: '16px' }}>Keep 85% of every job.</h3>
                <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#111810', maxWidth: '400px' }}>
                  Drivly takes only 15%. The rest goes straight to your linked bank account after every completed job automatically, no cash involve
                </p>
              </div>

              {/* Card 2 — Flexibility (#88B537 green) */}
              <div style={{ background: '#88B537', borderRadius: '20px', padding: '40px', flex: 1, minHeight: '220px' }}>
                <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(0,0,0,0.08)', borderRadius: '18px', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', color: '#0D3D21' }}>Flexibility</span>
                </div>
                <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '34px', color: '#FFFFFF', marginBottom: '16px' }}>You choose when you work</h3>
                <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#FFFFFF', maxWidth: '440px' }}>
                  Set your own availability. Accept jobs when it suits you and decline when it doesn&apos;t. Drivly works around your schedule, not the other way around
                </p>
              </div>
            </div>

            {/* Right Column (1 Tall Card) */}
            <div className="flex-1 flex flex-col">
              {/* Card 3 — Work (#1C3C24 dark) */}
              <div style={{ background: '#1C3C24', borderRadius: '20px', padding: '40px', flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'inline-flex', padding: '6px 16px', border: '1px solid #5F9908', borderRadius: '18px', marginBottom: '20px', alignSelf: 'flex-start' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', color: '#7AB800' }}>Work</span>
                </div>
                <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '34px', color: '#FFFFFF', marginBottom: '16px' }}>Jobs come directly to you</h3>
                <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#FFFFFF', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
                  No more waiting at the motor park or relying on personal contacts. Set yourself available on the app and job requests come in based on your location.
                </p>
                
                {/* Space filler */}
                <div className="flex-1" style={{ minHeight: '60px' }} />

                {/* Large "8 min" display */}
                <div className="mt-auto">
                  <div aria-hidden="true" style={{ fontFamily: 'Helvetica, sans-serif', fontWeight: 700, fontSize: 'clamp(100px, 10vw, 140px)', lineHeight: '1', color: 'transparent', WebkitTextStroke: '2px #5F9908', letterSpacing: '-4px', pointerEvents: 'none', userSelect: 'none' }}>
                    8 min
                  </div>
                  <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '14px', color: '#A8C3AF', marginTop: '16px' }}>Average dispatch time from job request</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: 1 Full-Width Card */}
          {/* Card 4 — Reputation (#F7FAF2 with right green accent) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8" style={{ background: '#F7FAF2', border: '1px solid #D8E8D0', borderRadius: '20px', padding: '40px', minHeight: '220px', position: 'relative', overflow: 'hidden' }}>
            {/* Right green accent border line */}
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '4px', background: '#7AB800' }} />
            
            <div className="flex-1 max-w-[600px]">
              <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.15)', borderRadius: '18px', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', color: '#0D3D21' }}>Reputation</span>
              </div>
              <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '34px', color: '#0D3D21', marginBottom: '16px' }}>Build a verified reputation that follows you.</h3>
              <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#111810' }}>
                Every completed job earns you a rating from the driver. High ratings bring more job requests. Your track record on Drivly is permanent, verifiable, and yours.
              </p>
            </div>

            {/* 4.9★ large display */}
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7AB800' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7AB800' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7AB800' }} />
              </div>
              <div style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '72px', lineHeight: '1', letterSpacing: '-2.16px', color: '#7AB800', display: 'flex', alignItems: 'center' }}>
                4.9<span style={{ fontSize: '64px', marginLeft: '4px' }}>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EARN MORE — #0D3D21 dark bg, steps left, phone right ══ */}
      <section style={{ background: '#0D3D21' }} className="py-20 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: content */}
          <div className="flex-1 max-w-[517px]">
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', border: '1px solid #7AB800', borderRadius: '4px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', color: '#7AB800', marginBottom: '16px' }}>
              FOR SERVICE PROVIDER
            </div>
            <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#FFFFFF', margin: '0 0 16px' }}>
              Earn more from<br />your skills
            </h2>
            <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#FFFFFF', marginBottom: '32px' }}>
              Drivly sends paying jobs directly to your phone filling the hours when you&apos;d otherwise be waiting for walk-ins at your workshop or motor park.
            </p>
            <div className="flex flex-col mb-10">
              {[
                { n: '01', label: 'Keep 85% of every job, Drivly takes only 15%' },
                { n: '02', label: 'Payment goes straight to your bank account after every job' },
                { n: '03', label: 'No joining fee, zero cost to get started on the platform' },
                { n: '04', label: 'Set your own availability. Work the hours that suit you' },
              ].map((step, idx, arr) => (
                <div key={idx} className={`py-[16px] ${idx !== arr.length - 1 ? 'border-b border-white/20' : ''}`}>
                  <StepBadge n={step.n} label={step.label} textColor="#FFFFFF" />
                </div>
              ))}
            </div>
            <GreenBtn href="#waitlist" label="Apply to be a Provider" id="provider-earn-cta" />
          </div>

          {/* Right: phone mockup */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: '238px', height: '508px', borderRadius: '42px', overflow: 'hidden', position: 'relative', boxShadow: '0 28px 72px rgba(0,0,0,0.3)' }}>
              <Image src="/images/provider-screen.png" alt="Provider app screen" fill sizes="238px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICE CENTRE — light green bg, text left, photo right ══ */}
      <section style={{ background: '#F7FAF2' }} className="py-20 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: text */}
          <div className="flex-1 max-w-[529px]">
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.15)', borderRadius: '4px', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', color: '#0D3D21', marginBottom: '16px' }}>
              FOR SERVICE PROVIDER
            </div>
            <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '1.04', letterSpacing: '-2.16px', margin: '0 0 24px' }}>
              <span style={{ color: '#5F9908' }}>Become a Drivly</span><br />
              <span style={{ color: '#0D3D21' }}>Service Centre</span>
            </h2>
            <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: '#111810', marginBottom: '32px' }}>
              A Drivly Service Centre is a vetted mechanic workshop listed in our app and recommended to drivers when they need professional repair work. Drivers can book drive-in appointments, route tow trucks to your bay, or be referred to you after a mobile mechanic assessment.
            </p>
            <GreenBtn href="#waitlist" label="Apply to be a Provider" id="provider-centre-cta" />
          </div>

          {/* Right: photo */}
          <div style={{ flexShrink: 0, width: '100%', maxWidth: '557px' }}>
            <div style={{ width: '100%', aspectRatio: '557/534', background: '#D9D9D9', border: '1px solid rgba(122,184,0,0.15)', borderRadius: '27px', overflow: 'hidden', position: 'relative' }}>
              <Image src="/images/service-centre.jpg" alt="Service centre workshop" fill sizes="(max-width: 768px) 100vw, 557px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ BLOGS & ARTICLES ══ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1512px] mx-auto px-6 lg:px-20">
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#5F9908', textAlign: 'center', marginBottom: '8px' }}>
            Blogs &amp; Articles
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#0D3D21', textAlign: 'center', maxWidth: '499px', margin: '0 auto 48px' }}>
            Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.
          </p>
          <BlogPreview posts={posts} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <a href="/blog" id="providers-blog-view-all" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 20px', border: '1px solid #DCDCDC', borderRadius: '12px', background: 'transparent', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none' }}>
              View all articles
            </a>
          </div>
        </div>
      </section>

      {/* ══ JOIN THE WAITLIST — dark green gradient ══ */}
      <section id="waitlist" style={{ background: 'linear-gradient(180deg, #186839 -48.19%, #0D3D21 100.09%)', position: 'relative', overflow: 'hidden' }} className="py-20 lg:py-28">
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1512px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#7AB800', marginBottom: '16px' }}>
            JOIN THE WAITLIST
          </div>
          {/* Headline */}
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '627px', marginBottom: '8px' }}>
            Join the network before we launch
          </h2>
          {/* Subtitle */}
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '807px', marginBottom: '48px' }}>
            We&apos;re launching in Lagos. Sign up now and we&apos;ll reach out the moment we go live in your area.
          </p>
          {/* Provider waitlist form */}
          <div style={{ width: '100%' }}>
            <ProviderForm />
          </div>
        </div>
      </section>
    </>
  );
}
