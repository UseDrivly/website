import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import StatsBar from '@/components/sections/StatsBar';
import BlogPreview from '@/components/sections/BlogPreview';
import WaitlistTabForm from '@/components/forms/WaitlistTabForm';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data/services';
import { homeStats } from '@/lib/data/stats';
import { getPosts } from '@/lib/supabase/posts';

/* Inline SVG icons — no lucide dependency needed */
const ArrowRight = ({ size = 18, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const Check = ({ size = 10, color = 'currentColor', strokeWidth = 2.5 }: { size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const metadata: Metadata = {
  title: 'Drivly - Roadside Help. Fixed Price. One Tap Away.',
  description:
    "Nigeria's first app-based roadside assistance platform. Verified mechanics, tow operators, and specialists dispatched to you at a fixed price, in minutes. Launching in Lagos 2025.",
};

/* ── Reusable step badge (numbered) ──────────────────────── */
function StepBadge({ n, label, light = false }: { n: string; label: string; light?: boolean }) {
  return (
    <div className="flex items-start gap-3.5 w-full">
      <div
        style={{
          minWidth: '36px', height: '36px',
          background: light ? '#FFFFFF' : '#EFF7DB', border: light ? 'none' : '1px solid #C8E99A',
          borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: 'Syne, Inter, sans-serif', fontWeight: 800, fontSize: '12px', lineHeight: '14px', color: '#0D3D21' }}>{n}</span>
      </div>
      <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: light ? '#FFFFFF' : '#0E1510', paddingTop: '8px' }}>{label}</p>
    </div>
  );
}

/* ── Benefit check row ────────────────────────────────────── */
function BenefitRow({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div style={{
        width: '20px', height: '20px', flexShrink: 0,
        background: dark ? 'rgba(122,184,0,0.15)' : '#EFF7DB',
        border: dark ? '1px solid rgba(122,184,0,0.25)' : '1px solid #D4EDAA',
        borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check size={10} color={dark ? '#7AB800' : '#0D3D21'} strokeWidth={2.5} />
      </div>
      <span style={{ fontSize: '14px', lineHeight: '22px', color: dark ? 'rgba(255,255,255,0.7)' : '#4A5E46' }}>{text}</span>
    </div>
  );
}

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

function DarkBtn({ href, label, id }: { href: string; label: string; id?: string }) {
  return (
    <Link href={href} id={id} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      height: '48px', padding: '0 20px',
      background: '#0D3D21', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
      fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF',
      textDecoration: 'none',
    }}>
      {label} <ArrowRight size={18} strokeWidth={1.5} color="#FFFFFF" />
    </Link>
  );
}

/* ── Green CTA button ─────────────────────────────────────── */
function GreenBtn({ href, label, id }: { href: string; label: string; id?: string }) {
  return (
    <Link href={href} id={id} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      height: '48px', padding: '0 20px',
      background: '#7AB800', border: '1px solid rgba(122,184,0,0.2)', borderRadius: '12px',
      fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21',
      textDecoration: 'none',
    }}>
      {label} <ArrowRight size={18} strokeWidth={1.5} color="#0D3D21" />
    </Link>
  );
}

export default async function HomePage() {
  const posts = await getPosts({ limit: 3 });

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — split layout: left text + right form card
          bg: dark green overlay on image
          ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[860px] flex items-stretch overflow-hidden">
        {/*
          IMAGE SLOT — Hero background photo
          File: /public/images/hero-home.jpg  |  Size: 1440×800px
          Subject: Nigerian road, car in background
        */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#07140A]" />
          <Image src="/images/hero-home.jpg" alt="Drivly home hero" fill sizes="100vw" className="object-cover" priority />
        </div>

        <div className="relative z-10 w-full max-w-[1512px] mx-auto px-6 lg:px-12 xl:pl-[150px] xl:pr-[172px] pt-[120px] lg:pt-[103px] pb-[134px] flex flex-col lg:flex-row items-center xl:items-start justify-between gap-12 lg:gap-8">

          {/* ── Left: Headline + CTAs ─────────────────────── */}
          <div className="flex-1 flex flex-col w-full max-w-[600px] mt-0 xl:mt-[22px]">
            {/* Headline */}
            <h1 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
              fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px',
              color: '#FFFFFF',
              marginBottom: '32px',
            }}>
              Roadside help.<br />Fixed price.<br />
              <span style={{ color: '#7AB800' }}>One tap away.</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400,
              fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '520px',
              marginBottom: '32px',
            }}>
              Nigeria&apos;s first app-based roadside assistance platform. <br className="hidden sm:block" />
              <span style={{ fontWeight: 700 }}>Verified mechanics, tow operators</span>, and <span style={{ fontWeight: 700 }}>specialists</span> <br className="hidden sm:block" />
              dispatched to you at a fixed price, in minutes.
            </p>

            {/* Two CTA buttons */}
            <div className="flex flex-wrap gap-[10px]">
              {/* Primary: dark green */}
              <Link href="/#waitlist" id="hero-driver-cta" className="w-full sm:w-[286px]" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: '48px',
                background: '#0D3D21', border: '1px solid rgba(220,220,220,0.3)', borderRadius: '12px',
                fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF',
                textDecoration: 'none',
              }}>
                I&apos;m a Driver – Join the Waitlist
              </Link>
              {/* Secondary: border only */}
              <Link href="/#waitlist" id="hero-provider-cta" className="w-full sm:w-[246px]" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: '48px',
                background: 'transparent', border: '1px solid #DCDCDC', borderRadius: '12px',
                fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF',
                textDecoration: 'none',
              }}>
                I&apos;m a Provider – Apply Now
              </Link>
            </div>
          </div>

          {/* ── Right: Waitlist form card ─────────────────── */}
          <div className="w-full lg:w-[421px] flex-shrink-0 mt-[40px] lg:mt-0">
            <WaitlistTabForm id="hero-form" />
          </div>
        </div>

        {/* Scroll hint absolute at bottom center */}
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 z-10">
          <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 200, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF' }}>SCROLL</span>
          <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 200, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', transform: 'rotate(90deg)' }}>›</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR — #0D3D21 bg, 4 stats with dividers
          ══════════════════════════════════════════════════════ */}
      <StatsBar stats={homeStats} />

      {/* ══════════════════════════════════════════════════════
          THE PROBLEM — near-black bg #0E1510
          Left: text, Right: photo
          ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#0E1510' }}>
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-5 max-w-[521px]">
            <h2 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
              fontSize: 'clamp(40px, 4.5vw, 65px)', lineHeight: '68px', letterSpacing: '-1.97px',
              color: '#FFFFFF',
            }}>
              Every driver fears this moment
            </h2>
            <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '520px' }}>
              Breaking down leaves drivers completely on their own no emergency number, no organised service, no way to verify who shows up or what they&apos;ll charge. The experience is universal, unpredictable, and has never been properly solved.
            </p>
            <div className="mt-2">
              <GreenBtn href="/#how-it-works" label="See how Drivly fixes it" />
            </div>
          </div>

          {/* Right: photo */}
          <div className="flex-1 max-w-[557px] w-full">
            {/*
              IMAGE SLOT — Distressed driver photo
              File: /public/images/driver-distressed.jpg  |  Size: 680×454px
              Subject: African person looking distressed at broken-down car
            */}
            <div style={{ width: '100%', aspectRatio: '557/397', background: '#1A2018', borderRadius: '27px', overflow: 'hidden', position: 'relative' }}>
              <Image src="/images/driver-distressed.jpg" alt="Driver distressed" fill sizes="(max-width: 768px) 100vw, 557px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHO IT'S FOR — white bg, two cards side by side
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <EyebrowPill text="WHO IT'S FOR" />
          <div className="mt-4 mb-3">
            <h2 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px',
            }}>
              <span style={{ color: '#111810' }}>Built for drivers</span><br />
              <span style={{ color: '#5F9908' }}>Built for providers</span>
            </h2>
          </div>
          <p style={{ fontSize: '19px', lineHeight: '33px', color: '#000000', maxWidth: '626px', marginBottom: '40px' }}>
            Two audiences. One platform. Everyone benefits when jobs are done right.
          </p>

          {/* Cards row */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[68px]">

            {/* ── DRIVER CARD — white ── */}
            <div style={{ flex: 1, maxWidth: '540px', background: '#FFFFFF', border: '1px solid #D8E8D0', borderRadius: '20px', padding: '40px 36px 70px' }}>
              {/* Icon */}
              <div style={{ width: '50px', height: '50px', background: '#EFF7DB', border: '1px solid #D4EDAA', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>🚗</span>
              </div>
              <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '23px', lineHeight: '37px', color: '#111810', margin: '8px 0 4px' }}>For drivers</h3>
              <p style={{ fontSize: '15px', lineHeight: '26px', color: '#4A5E46', marginBottom: '20px' }}>
                Whether you drive a saloon, an SUV, or a commercial vehicle, Drivly has you covered when things go wrong on the road.
              </p>
              <div className="flex flex-col gap-2.5 mb-8">
                <BenefitRow text="Fixed price shown before you pay, no surprises" />
                <BenefitRow text="Every provider is verified and carries a Drivly ID card" />
                <BenefitRow text="Real-time tracking from dispatch to arrival" />
                <BenefitRow text="Subscribers get workshop access and priority dispatch" />
              </div>
              <DarkBtn href="/drivers" label="Join the Driver Waitlist" id="driver-card-cta" />
            </div>

            {/* ── PROVIDER CARD — dark green ── */}
            <div style={{ flex: 1, maxWidth: '540px', background: '#0D3D21', border: '1px solid #D8E8D0', borderRadius: '20px', padding: '40px 36px' }}>
              {/* Icon */}
              <div style={{ width: '50px', height: '50px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.2)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>🔧</span>
              </div>
              <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '23px', lineHeight: '37px', color: '#FFFFFF', margin: '8px 0 4px' }}>For providers</h3>
              <p style={{ fontSize: '15px', lineHeight: '26px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
                Drivly sends paying jobs directly to your phone filling the hours when you&apos;d otherwise be waiting for walk-ins.
              </p>
              <div className="flex flex-col gap-2.5 mb-8">
                <BenefitRow text="Keep 85% of every job. Drivly takes only 15%" dark />
                <BenefitRow text="Payment straight to your bank account after every job" dark />
                <BenefitRow text="No joining fee, zero cost to get started" dark />
                <BenefitRow text="Set your own availability, work when it suits you" dark />
                <BenefitRow text="Build your reputation with verified ratings from every job" dark />
              </div>
              <GreenBtn href="/providers" label="Apply to be a Provider" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOR DRIVERS — light green bg #F7FAF2
          Left: phone mockup, Right: 4 steps
          ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ background: '#F7FAF2' }} className="py-20 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: phone */}
          <div className="flex justify-center lg:justify-start flex-shrink-0">
            {/*
              IMAGE SLOT — Driver app screen
              File: /public/images/driver-screen.png  |  Size: 313×660px
            */}
            <div style={{ width: '238px', height: '501px', borderRadius: '42px', overflow: 'hidden', position: 'relative', boxShadow: '0 28px 72px rgba(0,0,0,0.22)' }}>
              <Image src="/images/driver-screen.png" alt="Driver app screen" fill sizes="238px" className="object-cover" />
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1 max-w-[600px]">
            <EyebrowPill text="FOR DRIVERS" />
            <h2 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4.5vw, 72px)',
              lineHeight: '75px',
              letterSpacing: '-2.16px',
              color: '#5F9908',
              margin: '16px 0 24px',
            }}>
              From stuck to sorted<br />in four steps
            </h2>
            <p style={{ fontSize: '19px', lineHeight: '33px', color: '#111810', maxWidth: '626px', marginBottom: '32px' }}>
              Whether you drive a saloon, an SUV, or a commercial vehicle.<br className="hidden sm:block" />
              Drivly has you covered the moment something goes wrong on the road.
            </p>
            <div className="flex flex-col">
              {[
                { n: '01', label: 'Fixed price shown before you pay, no roadside surprises' },
                { n: '02', label: 'You know who is coming. Every provider is verified' },
                { n: '03', label: 'Real-time map tracking from dispatch to arrival' },
                { n: '04', label: 'Back on the road. Like it never happened' },
              ].map((step, idx, arr) => (
                <div key={idx} className={`py-[18px] ${idx !== arr.length - 1 ? 'border-b border-[#E3ECD5]' : ''}`}>
                  <StepBadge n={step.n} label={step.label} />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <DarkBtn href="/drivers" label="Join the Driver Waitlist" id="driver-showcase-cta" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOR SERVICE PROVIDERS — dark green bg #0D3D21
          Left: 4 steps, Right: phone mockup
          ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#0D3D21' }} className="py-20 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: content */}
          <div className="flex-1 max-w-[600px]">
            <EyebrowPill text="FOR SERVICE PROVIDER" actionColor />
            <h2 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
              fontSize: 'clamp(36px, 4.5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px',
              color: '#FFFFFF', margin: '16px 0 24px',
            }}>
              Earn more from<br />your skills
            </h2>
            <p style={{ fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '485px', marginBottom: '32px' }}>
              Drivly sends paying jobs directly to your phone filling the hours when you&apos;d otherwise be waiting for walk-ins at your workshop or motor park.
            </p>
            <div className="flex flex-col">
              {[
                { n: '01', label: 'Keep 85% of every job Drivly takes only 15%' },
                { n: '02', label: 'Payment goes straight to your bank account after every job' },
                { n: '03', label: 'No joining fee, zero cost to get started on the platform' },
                { n: '04', label: 'Set your own availability work the hours that suit you' },
              ].map((step, idx, arr) => (
                <div key={idx} className={`py-[18px] ${idx !== arr.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <StepBadge n={step.n} label={step.label} light />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <GreenBtn href="/providers" label="Apply to be a Provider" />
            </div>
          </div>

          {/* Right: phone */}
          <div className="flex justify-center flex-shrink-0">
            {/*
              IMAGE SLOT — Provider app screen
              File: /public/images/provider-screen.png  |  Size: 307×656px
            */}
            <div style={{ width: '238px', height: '508px', borderRadius: '42px', overflow: 'hidden', position: 'relative', boxShadow: '0 28px 72px rgba(0,0,0,0.3)' }}>
              <Image src="/images/provider-screen.png" alt="Provider app screen" fill sizes="238px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT WE COVER — light green bg, 3×2 services grid
          ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#F7FAF2' }} className="py-20 lg:py-28">
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

      {/* ══════════════════════════════════════════════════════
          BLOGS & ARTICLES
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-3">
            <SectionHeadline text="Blogs &amp; Articles" centered />
          </div>
          <p className="text-center mb-12" style={{ fontSize: '19px', lineHeight: '33px', color: '#0D3D21', maxWidth: '485px', margin: '0 auto 48px' }}>
            Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.
          </p>
          <BlogPreview posts={posts} headline="" subtitle="" />
          <div className="flex justify-center mt-10">
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              height: '48px', padding: '0 20px',
              border: '1px solid #DCDCDC', borderRadius: '12px',
              fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21',
              textDecoration: 'none',
            }}>
              View all articles <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          JOIN THE WAITLIST — dark green bg #0D3D21
          Centred: eyebrow + headline + large form card
          ══════════════════════════════════════════════════════ */}
      <section id="waitlist" style={{ background: '#0D3D21' }} className="py-20 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <EyebrowPill text="JOIN THE WAITLIST" actionColor />
          <h2 style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px',
            color: '#FFFFFF', margin: '16px 0 8px', maxWidth: '627px',
          }}>
            Join the network<br />before we launch
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', maxWidth: '807px', marginBottom: '48px' }}>
            We&apos;re launching in Lagos. Sign up now and we&apos;ll reach out the moment we go live in your area.
          </p>

          {/* Large form card — 741px max width as per spec */}
          <div className="w-full" style={{ maxWidth: '741px' }}>
            <WaitlistTabForm id="bottom-waitlist-form" />
          </div>
        </div>
      </section>
    </>
  );
}
