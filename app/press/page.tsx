import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Press & Newsroom | Drivly',
  description: 'The latest news, press releases, and announcements from Drivly.',
};

export default function PressPage() {
  return (
    <section className="bg-brand-bg-light min-h-[70vh] py-16 sm:py-24">
      <Container width="narrow">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-extrabold tracking-widest uppercase bg-[#0D3D21] text-[#7AB800] rounded-full mb-4">
            PRESSROOM
          </span>
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '1.1', letterSpacing: '-1.8px', color: '#0E1510' }}>
            Press &amp; Announcements
          </h1>
        </div>
        <div className="bg-white rounded-[20px] p-8 sm:p-12 shadow-xl border border-brand-border text-center">
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '24px' }}>📰</span>
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginBottom: '16px' }}>
            Newsroom Coming Soon
          </h2>
          <p className="text-brand-body text-base mb-8 leading-relaxed max-w-md mx-auto">
            We are preparing our official press kit, brand logos, and launch announcements. Check back soon for the latest news from Drivly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:press@usedrivly.com"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-brand-dark text-white font-semibold transition-opacity hover:opacity-90"
              style={{ textDecoration: 'none' }}
            >
              Contact Press Team
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl border border-brand-border text-brand-dark font-semibold transition-all hover:bg-brand-bg-light"
              style={{ textDecoration: 'none' }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
