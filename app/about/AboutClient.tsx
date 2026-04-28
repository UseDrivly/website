'use client';

import Link from 'next/link';
import Image from 'next/image';

/* ── Shared ── */
const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── About body copy (from spec) ── */
const aboutCopy = [
  "Drivly is a Nigerian technology company building the country's first organised, app-based roadside assistance platform. We connect drivers with verified mechanics, tow operators, and roadside specialists at a fixed price, with real-time tracking, and full accountability from start to finish.",
  "Every driver in Nigeria knows the feeling. The engine cuts out. The car drifts to the side of the road. And then the silence because there is nobody to call, no dispatch, no organised service, just you, the road, and the task of figuring it out alone. It is a moment every Nigerian driver has lived through at least once. Most have lived through it more.",
  "We started Drivly because that moment should not exist the way it does. Not in a country with thousands of skilled mechanics and tow operators who are ready to work. Not with the technology available today to connect a distressed driver to the right person in minutes.",
  "Drivly is that connection. A driver breaks down, opens the app, and within minutes a verified specialist is on the way at a price agreed before anyone moves, tracked live until they arrive. No strangers. No guesswork. No cash negotiations on the side of a busy road.",
  "We are building what Nigerian roads have never had a system that makes help certain, not a gamble. A platform where every provider is checked before they join, every price is fixed before anyone pays, and every job is tracked from the moment it begins to the moment the driver is back on the road.",
  "We are launching in Nigeria in 2026. And we are just getting started.",
  "Join the waitlist now.",
];

/* ── Team data per Figma spec ── */
const teamRow1 = [
  { name: 'Oriabure Alfred', role: 'Founder & CEO', initials: 'OA', img: '/images/team-alfred.jpg' },
  { name: 'Evbuomwan Victoria', role: 'Head of Product', initials: 'EV', img: '/images/team-victoria.jpg' },
  { name: 'Divine Igbinoba', role: 'Head of Engineering', initials: 'DI', img: '/images/team-divine.jpg' },
];
const teamRow2 = [
  { name: 'Temiloluwa Ajayi', role: 'Social Media Marketer', initials: 'TA', img: '/images/team-temi.jpg' },
  { name: 'Evbuomwan Micheal', role: 'Head of Strategy', initials: 'EM', img: '/images/team-micheal.jpg' },
];

/* ── Avatar circle — client-side img with fallback ── */
function Avatar({ name, role, img, initials, size = 180 }: { name: string; role: string; img: string; initials: string; size?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: `${size}px` }}>
      <div style={{ width: size, height: size, borderRadius: '50%', border: '1px solid #0D3D21', background: '#D9D9D9', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
        <Image src={img} alt={name} fill sizes={`${size}px`} className="object-cover" />
      </div>
      <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '30px', lineHeight: '37px', letterSpacing: '-1px', color: '#0D3D21', textAlign: 'center', margin: 0 }}>
        {name}
      </p>
      <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '24px', lineHeight: '37px', letterSpacing: '-1px', color: '#0D3D21', textAlign: 'center', margin: 0, marginTop: '-4px' }}>
        {role}
      </p>
    </div>
  );
}

export default function AboutClient() {
  return (
    <>
      {/* ══ HERO — #0D3D21 bg, centred "About us" white 72px ══ */}
      <section style={{ background: '#0D3D21', minHeight: '388px', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0">
          <Image src="/images/hero-about.jpg" alt="Drivly about hero" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(80px,12vw,113px) 24px' }}>
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(40px,6vw,72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '1133px', margin: 0 }}>
            About us
          </h1>
        </div>
      </section>

      {/* ══ ABOUT BODY — white bg, 913px centred, 19px/33px justified ══ */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '913px', margin: '0 auto', padding: '0 24px' }}>
          {aboutCopy.map((para, i) => (
            <p key={i} style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#000000', textAlign: 'justify', marginBottom: '24px', marginTop: 0 }}>
              {para}
            </p>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <Link href="/#waitlist" id="about-waitlist-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '241px', height: '47px', background: '#7AB800', border: '1px solid #DCDCDC', borderRadius: '12px', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none' }}>
              Join the waitlist <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ QUOTE SECTION — #F7FAF2 bg ══ */}
      <section style={{ background: '#F7FAF2', padding: '60px 24px' }}>
        <div style={{ maxWidth: '913px', margin: '0 auto' }}>
          {/* Quote mark — 128px #7AB800 */}
          <div style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '128px', lineHeight: '37px', letterSpacing: '-1px', color: '#7AB800', marginBottom: '24px' }}>
            &ldquo;
          </div>
          {/* Quote body — 32px #0D3D21 */}
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '32px', lineHeight: '37px', letterSpacing: '-1px', color: '#0D3D21', maxWidth: '667px', margin: '32px 0 40px' }}>
            The problem we&apos;re solving is not technical. It&apos;s structural. Nigeria has thousands of skilled mechanics and tow operators, and millions of drivers who need them. What has never existed is the organised infrastructure connecting them. That is what Drivly is building and there has never been a better time to build it.
          </p>
          {/* Founder row — 128px circle + name + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '128px', height: '128px', borderRadius: '50%', border: '1px solid #0D3D21', background: '#EFF7DB', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 4px rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative' }}>
              <Image src="/images/team-alfred.jpg" alt="Oriabure Alfred" fill sizes="128px" className="object-cover" />
            </div>
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '30px', lineHeight: '37px', letterSpacing: '-1px', color: '#0D3D21', margin: 0 }}>
                Oriabure Alfred
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '24px', lineHeight: '37px', letterSpacing: '-1px', color: '#0D3D21', margin: 0 }}>
                Founder &amp; CEO, Drivly App Ltd
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE TEAM — white bg, #5F9908 headline (72px) ══ */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(40px,6vw,72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#5F9908', textAlign: 'center', marginBottom: '64px' }}>
            The Team
          </h2>
          {/* Row 1 — 3 members */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '60px', marginBottom: '60px' }}>
            {teamRow1.map((m) => <Avatar key={m.name} {...m} size={180} />)}
          </div>
          {/* Row 2 — 2 members */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '60px' }}>
            {teamRow2.map((m) => <Avatar key={m.name} {...m} size={180} />)}
          </div>
        </div>
      </section>

      {/* ══ MEDIA ENQUIRIES — #12502C bg ══ */}
      <section style={{ background: '#12502C', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1512px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Eyebrow pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 16px', background: 'rgba(122,184,0,0.15)', border: '1px solid rgba(122,184,0,0.3)', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#7AB800', marginBottom: '24px' }}>
            PRESS &amp; MEDIA
          </div>
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px,6vw,72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#FFFFFF', margin: '0 0 8px' }}>
            Media enquiries
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', marginBottom: '32px' }}>
            For press and media enquiries, contact us directly
          </p>
          <a href="mailto:hello@drivly.ng" id="about-media-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '241px', height: '47px', background: '#7AB800', border: '1px solid #DCDCDC', borderRadius: '12px', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none' }}>
            hello@drivly.ng
          </a>
        </div>
      </section>
    </>
  );
}
