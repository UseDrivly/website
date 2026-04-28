import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import type { ShowcaseStep } from '@/types';

interface AppShowcaseProps {
  /** Optional id for anchor linking (e.g. id="how-it-works") */
  id?: string;
  /** Small badge label e.g. "HOW IT WORKS" */
  eyebrow?: string;
  /** Section headline */
  headline: string;
  /** Optional supporting paragraph */
  description?: string;
  /** List of numbered steps */
  steps: ShowcaseStep[];
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button href */
  ctaHref?: string;
  /**
   * IMAGE SLOT — path to the phone/app mockup image.
   * Place the file at: /public/images/app-mockup.png
   * Then pass: appImage="/images/app-mockup.png"
   * Recommended dimensions: 320×640px (portrait phone)
   */
  appImage?: string;
  /** Which side the phone mockup appears on */
  imagePosition?: 'left' | 'right';
  /** Background colour of the section */
  background?: 'white' | 'light';
}

/**
 * AppShowcase — split-layout section.
 * Left or right: phone mockup image.
 * Opposite side: eyebrow, headline, numbered steps, CTA.
 * Stacks vertically on mobile (image always on top).
 */
export default function AppShowcase({
  id,
  eyebrow,
  headline,
  description,
  steps,
  ctaLabel,
  ctaHref = '/#waitlist',
  appImage,
  imagePosition = 'left',
  background = 'white',
}: AppShowcaseProps) {
  const isPhoneLeft = imagePosition === 'left';
  const bgClass = background === 'light' ? 'bg-brand-bg-light' : 'bg-white';

  const PhoneCol = (
    <div className="flex items-center justify-center order-first lg:order-none">
      {/* Phone mockup container */}
      <div className="relative w-64 h-[500px] sm:w-72 sm:h-[560px]">
        {appImage ? (
          <Image
            src={appImage}
            alt="Drivly app interface"
            fill
            sizes="(max-width: 640px) 256px, 288px"
            className="object-contain drop-shadow-2xl"
          />
        ) : (
          /* Placeholder frame shown when no image is provided */
          <div className="w-full h-full rounded-[3rem] bg-brand-dark/5 border-2 border-dashed border-brand-dark/20 flex flex-col items-center justify-center gap-3 text-center p-6">
            <div className="text-4xl">📱</div>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              {/* IMAGE SLOT */}
              Place your app mockup at:<br />
              <code className="text-brand-action font-mono">/public/images/app-mockup.png</code>
              <br />320 × 640px recommended
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const ContentCol = (
    <div className="flex flex-col gap-6 max-w-xl">
      {eyebrow && <Badge variant="green-outline">{eyebrow}</Badge>}

      <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary leading-tight">
        {headline}
      </h2>

      {description && (
        <p className="text-brand-text-muted leading-relaxed">{description}</p>
      )}

      {/* Numbered steps */}
      <ol className="flex flex-col gap-4" role="list">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4 items-start">
            {/* Step indicator */}
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-action flex items-center justify-center text-brand-dark font-bold text-sm mt-0.5">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-brand-text-primary leading-snug">
                {step.label}
              </p>
              {step.description && (
                <p className="text-sm text-brand-text-muted mt-0.5">{step.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* CTA */}
      {ctaLabel && (
        <div>
          <Link
            href={ctaHref}
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-brand-action text-brand-dark font-semibold text-sm
              hover:bg-brand-action-hover transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-2
            "
          >
            {ctaLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <section id={id} className={`${bgClass} section-pad`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {isPhoneLeft ? (
            <>
              {PhoneCol}
              {ContentCol}
            </>
          ) : (
            <>
              {ContentCol}
              {PhoneCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
