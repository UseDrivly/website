import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy | Drivly',
  description: 'Learn how Drivly collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container width="narrow">
        <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.1', letterSpacing: '-1.5px', color: '#0E1510', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p className="text-brand-text-muted text-sm mb-12">Last Updated: June 2026</p>
        
        <div className="prose-drivly">
          <p>
            At Drivly, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and roadside assistance services.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us when signing up for the waitlist, applying to be a provider, or requesting help. This includes your name, email address, phone number, location, vehicle information, and details of any service type requests.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            2. How We Use Your Information
          </h2>
          <p>
            We use your data to coordinate roadside assistance, verify provider credentials, process transactions, communicate updates, and improve platform performance. We do not sell your personal data to third parties.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            3. Data Retention and Security
          </h2>
          <p>
            We implement industry-standard administrative, technical, and physical security measures to protect your personal data from unauthorized access or alteration. We retain data only as long as necessary to provide our services and comply with legal obligations.
          </p>

          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0E1510', marginTop: '32px', marginBottom: '16px' }}>
            4. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us at <a href="mailto:privacy@usedrivly.com">privacy@usedrivly.com</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
