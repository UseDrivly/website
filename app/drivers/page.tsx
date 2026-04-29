import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import StatsBar from '@/components/sections/StatsBar';
import BlogPreview from '@/components/sections/BlogPreview';
import WaitlistTabForm from '@/components/forms/WaitlistTabForm';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data/services';
import { getPosts } from '@/lib/supabase/posts';
import type { StatItem } from '@/types';

export const metadata: Metadata = {
  title: 'For Drivers -s Roadside Help, Fixed Price, One Tap Away | Drivly',
  description:
    'Drivly gives Nigerian drivers access to verified roadside assistance at a fixed price. No bargaining, no strangers, no surprises. Launching in Lagos 2025.',
};

/* ── Drivers-specific stats (only 3 shown per Figma spec) ── */
const driverStats: StatItem[] = [
  { value: '2M+', label: 'Registered vehicles in Lagos State' },
  { value: '8min', label: 'Target average provider arrival' },
  { value: '₦0', label: 'Negotiation on any job ever' },
];

/* ── Inline SVG arrow ─────────────────────────────────────── */
const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Step badge (numbered, light) ────────────────────────── */
function StepBadge({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <div style={{
        minWidth: '36px', height: '36px', flexShrink: 0,
        background: '#EFF7DB', border: '1px solid #C8E99A',
        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'Syne, Inter, sans-serif', fontWeight: 800, fontSize: '12px', lineHeight: '14px', color: '#0D3D21' }}>{n}</span>
      </div>
      <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: '#0E1510', paddingTop: '8px' }}>{label}</p>
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


/* ── Dark button (#0D3D21) ───────────────────────────────── */
function DarkBtn({ href, label, id }: { href: string; label: string; id?: string }) {
  return (
    <Link href={href} id={id} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      height: '48px', padding: '0 20px',
      background: '#0D3D21', border: '1px solid #DCDCDC', borderRadius: '12px',
      fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#FFFFFF',
      textDecoration: 'none',
    }}>
      {label} <Arrow />
    </Link>
  );
}

/* ── Green button (#7AB800) ──────────────────────────────── */
function GreenBtn({ href, label, id }: { href: string; label: string; id?: string }) {
  return (
    <Link href={href} id={id} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      height: '48px', padding: '0 20px',
      background: '#7AB800', border: '1px solid #DCDCDC', borderRadius: '12px',
      fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21',
      textDecoration: 'none',
    }}>
      {label} <Arrow />
    </Link>
  );
}

/* ── Eyebrow pill ────────────────────────────────────────── */
function EyebrowPill({ text }: { text: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', padding: '10px',
      background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)',
      fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400,
      fontSize: '19px', lineHeight: '33px', color: '#0D3D21',
    }}>
      {text}
    </div>
  );
}

/* ── "View all articles" outline button ─────────────────── */
function OutlineBtn({ href, label, id }: { href: string; label: string; id?: string }) {
  return (
    <Link href={href} id={id} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      height: '48px', padding: '0 20px',
      border: '1px solid #DCDCDC', borderRadius: '12px', background: 'transparent',
      fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21',
      textDecoration: 'none',
    }}>
      {label} <Arrow />
    </Link>
  );
}

export default async function DriversPage() {
  const posts = await getPosts({ limit: 3 });

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — dark green (#0D3D21) full-width bar
          Centred: headline in #7AB800, subtitle in white
          Matches spec: left 0, top 88, width 1512, height 388
          ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#0D3D21', minHeight: '388px' }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-drivers.jpg" alt="Drivly drivers hero" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14 sm:py-16 lg:py-24">
          {/* Headline — "Help is one tap away" in #7AB800 */}
          <h1 style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(48px, 5vw, 72px)',
            lineHeight: '1.08',
            letterSpacing: '-2.16px',
            color: '#7AB800',
            maxWidth: '674px',
          }}>
            Help is one tap away
          </h1>

          {/* Subtitle — "Drivly is built for you" in white */}
          <p style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '33px',
            color: '#FFFFFF',
            marginTop: '8px',
          }}>
            Drivly is built for you
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR — 3 stats only (4th hidden per spec)
          ══════════════════════════════════════════════════════ */}
      <StatsBar stats={driverStats} />

      {/* ══════════════════════════════════════════════════════
          "YOU'VE BEEN HERE BEFORE" — white bg
          Left: headline + body + CTA | Right: photo (557×534px)
          Matches spec: top 716 headline in #5F9908
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-16 lg:py-24">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: text */}
          <div className="flex-1 flex flex-col gap-5" style={{ maxWidth: '530px' }}>
            <h2 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: '1.08',
              letterSpacing: '-2.16px',
              color: '#5F9908',
            }}>
              You&apos;ve been here before
            </h2>
            <p style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '19px',
              lineHeight: '33px',
              color: '#000000',
              maxWidth: '459px',
            }}>
              Your car stops, you&apos;re stranded, vulnerable, and exposed with no one to call and no way to know who will show up. Every stranger who approaches is a risk you didn&apos;t sign up for. Every price named is one you have no power to question. 
              <br />
              <br />
              <b>We built Drivly to change exactly that.</b>
            </p>
            <div className="mt-2">
              <DarkBtn href="#waitlist" label="Join the Driver Waitlist" id="driver-hero-cta" />
            </div>
          </div>

          {/* Right: photo (557×534 with 27px radius per spec) */}
          <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '557px' }}>
            {/*
              IMAGE SLOT — Stressed driver photo
              File: /public/images/driver-stressed.jpg  |  Size: 828×575px
              Subject: Black woman with car problem headache, stress on road
            */}
            <div style={{
              width: '100%', aspectRatio: '557/534',
              background: '#D9D9D9', borderRadius: '27px',
              overflow: 'hidden', position: 'relative',
            }}>
              <Image src="/images/driver-stressed.jpg" alt="Stressed driver" fill sizes="(max-width: 768px) 100vw, 557px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          "FROM STUCK TO SORTED" — #F7FAF2 bg (light green)
          Left: phone mockup (313×660) | Right: FOR DRIVERS eyebrow + headline + 4 steps
          Matches spec: bg Rectangle 4833 at top 1301, height 824
          ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ background: '#F7FAF2' }} className="py-14 sm:py-16 lg:py-28">
        <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: phone */}
          <div className="flex justify-center lg:justify-start flex-shrink-0">
            {/*
              IMAGE SLOT — Driver app screen
              File: /public/images/driver-screen.png  |  Size: 313×660px
            */}
            <div className="relative overflow-hidden flex-shrink-0 w-[238px] h-[501px] sm:w-[280px] sm:h-[590px] lg:w-[313px] lg:h-[660px] rounded-[42px]" style={{ boxShadow: '0 28px 72px rgba(0,0,0,0.22)' }}>
              <Image src="/images/driver-screen.png" alt="Driver app screen" fill sizes="(max-width: 640px) 238px, (max-width: 1024px) 280px, 313px" className="object-contain" />
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1 max-w-[700px]">
            <EyebrowPill text="FOR DRIVERS" />
            <h2 style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 72px)',
              lineHeight: '1.1',
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
          WHAT WE COVER — white bg, centred, 3×2 grid
          Matches spec: "WHAT WE COVER" eyebrow, "Six ways Drivly has you covered."
          ══════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════
          BLOGS & ARTICLES — white bg, centred headline
          Matches spec: "Blogs & Articles" in #5F9908, subtitle in #0D3D21
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1512px] mx-auto px-6 lg:px-20">
          {/* Centred headline */}
          <h2 style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: '1.08',
            letterSpacing: '-2.16px',
            color: '#5F9908',
            textAlign: 'center',
            marginBottom: '8px',
          }}>
            Blogs &amp; Articles
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '33px',
            color: '#0D3D21',
            textAlign: 'center',
            maxWidth: '499px',
            margin: '0 auto 48px',
          }}>
            Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.
          </p>

          {/* Blog cards grid */}
          <BlogPreview posts={posts} />

          {/* "View all articles" outline button */}
          <div className="flex justify-center mt-10">
            <OutlineBtn href="/blog" label="View all articles" id="drivers-blog-view-all" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          JOIN THE WAITLIST — dark green gradient bg
          Matches spec: linear-gradient(180deg, #186839 -48.19%, #0D3D21 100.09%)
          Centred: eyebrow + headline + subtitle + form card (759px)
          ══════════════════════════════════════════════════════ */}
      <section id="waitlist" className="py-14 sm:py-16 lg:py-28" style={{ background: 'linear-gradient(180deg, #186839 -48.19%, #0D3D21 100.09%)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative angled white strips (background pattern from spec) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              height: '30px',
              left: `${-597 + i * 341}px`,
              top: `${4424 - 3733 + i * 90}px`,
              width: '1503px',
              background: 'repeating-linear-gradient(90deg, #fff 0, #fff 158px, transparent 158px, transparent 193px)',
            }} />
          ))}
        </div>

        <div className="relative z-10 max-w-[1512px] mx-auto px-6 lg:px-20 flex flex-col items-center text-center">
          {/* Eyebrow pill — "JOIN THE WAITLIST" */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', padding: '10px',
            background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)',
            fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400,
            fontSize: '19px', lineHeight: '33px', color: '#7AB800',
            marginBottom: '16px',
          }}>
            JOIN THE WAITLIST
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: '1.08',
            letterSpacing: '-2.16px',
            color: '#FFFFFF',
            maxWidth: '627px',
            marginBottom: '8px',
          }}>
            Join the network before we launch
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '33px',
            color: '#FFFFFF',
            maxWidth: '669px',
            marginBottom: '48px',
          }}>
            Leave your details and you&apos;ll be the first to know when we go live in your area
          </p>

          {/* Waitlist form card — 759px max width per spec */}
          <div className="w-full" style={{ maxWidth: '759px' }}>
            <WaitlistTabForm id="drivers-waitlist-form" />
          </div>
        </div>
      </section>
    </>
  );
}
