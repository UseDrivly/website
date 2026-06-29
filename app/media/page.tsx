import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Media Enquiries | Drivly',
  description: 'Get in touch with the Drivly media and communications team.',
};

export default function MediaPage() {
  return (
    <section className="bg-brand-bg-light min-h-[70vh] py-16 sm:py-24">
      <Container width="narrow">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-extrabold tracking-widest uppercase bg-[#0D3D21] text-[#7AB800] rounded-full mb-4">
            PRESS & MEDIA
          </span>
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '1.1', letterSpacing: '-1.8px', color: '#0E1510' }}>
            Media Enquiries
          </h1>
        </div>
        <div className="bg-white rounded-[20px] p-8 sm:p-12 shadow-xl border border-brand-border text-center">
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '24px' }}>📢</span>
          <p className="text-brand-body text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            Thank you for your interest in Drivly. For all press inquiries, interview requests, or media assets, please contact our communications team.
          </p>
          <a
            href="mailto:press@usedrivly.com"
            className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-brand-dark text-white font-semibold transition-opacity hover:opacity-90"
            style={{ textDecoration: 'none' }}
          >
            press@usedrivly.com
          </a>
          <p className="text-xs text-brand-text-muted mt-8">
            We aim to respond to all qualified media inquiries within 24 hours.
          </p>
        </div>
      </Container>
    </section>
  );
}
