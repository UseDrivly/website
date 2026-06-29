import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Terms of Use | Drivly',
  description: 'Read the terms of use governing the use of the Drivly platform and services.',
};

export default function TermsPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container width="narrow">
        <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-1.5px', color: '#0E1510', marginBottom: '8px' }}>
          Terms of Use
        </h1>
        <p className="text-brand-text-muted text-sm mb-12">Last Updated: June 2026</p>
        
        <div className="prose-drivly">
          <p>
            Welcome to Drivly. These Terms of Use govern your access to and use of our website, mobile applications, and roadside assistance services. By using our platform, you agree to comply with and be bound by these terms.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            1. Scope of Service
          </h2>
          <p>
            Drivly provides a technology platform connecting drivers in need of roadside assistance with independent service providers. Drivly acts strictly as an intermediary and does not operate workshops or towing fleets directly.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            2. User Accounts and Verification
          </h2>
          <p>
            Users requesting service must provide accurate information, including a valid name, email, and phone number. Providers on Drivly must undergo background checks and credentials verification before taking jobs.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            3. Pricing and Payments
          </h2>
          <p>
            All fees on the Drivly platform are calculated at a fixed price and presented to the user before they commit. Providers receive 85% of the transaction value, and Drivly retains 15% as a platform service fee.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, Drivly shall not be liable for any direct, indirect, incidental, or consequential damages arising from services provided by independent mechanics or tow operators.
          </p>
        </div>
      </Container>
    </section>
  );
}
