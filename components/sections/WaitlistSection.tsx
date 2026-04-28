import React from 'react';
import WaitlistForm from '@/components/forms/WaitlistForm';
import type { WaitlistFormConfig } from '@/types';

interface WaitlistSectionProps {
  config: WaitlistFormConfig;
  /** Section eyebrow label */
  eyebrow?: string;
  /** Main headline above the form card */
  headline?: string;
  /** Supporting text below the headline */
  subtitle?: string;
}

/**
 * WaitlistSection — dark green background section wrapping the WaitlistForm.
 * Pass a WaitlistFormConfig to control form fields and role.
 *
 * Usage:
 *   <WaitlistSection config={driverWaitlistConfig} />
 */
export default function WaitlistSection({
  config,
  eyebrow = 'JOIN THE WAITLIST',
  headline = 'Join the network before we launch',
  subtitle = `Leave your details and we'll reach out before launch day. No spam, ever.`,
}: WaitlistSectionProps) {
  return (
    <section
      id="waitlist"
      className="bg-brand-dark section-pad"
      aria-labelledby="waitlist-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          {eyebrow && (
            <p className="text-brand-action text-xs font-bold tracking-widest uppercase mb-3">
              {eyebrow}
            </p>
          )}
          <h2
            id="waitlist-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
          >
            {headline}
          </h2>
          {subtitle && (
            <p className="text-white/60 max-w-md mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* White form card — centred, max width constrained */}
        <div className="max-w-xl mx-auto">
          <WaitlistForm config={config} />
        </div>
      </div>
    </section>
  );
}
