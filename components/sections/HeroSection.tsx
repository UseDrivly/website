import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface HeroSectionProps {
  /**
   * IMAGE SLOT — pass the path to your hero image.
   * Place the file in: /public/images/<filename>.jpg
   * Then pass: backgroundImage="/images/<filename>.jpg"
   * Recommended dimensions: 1440 × 800px
   * If omitted, the hero shows the brand dark green gradient.
   */
  backgroundImage?: string;
  /** Small eyebrow text above the headline */
  eyebrow?: string;
  /** Main headline — accepts JSX for coloured words */
  headline: React.ReactNode;
  /** Supporting paragraph below the headline */
  subheadline?: string;
  /** Up to 2 CTA buttons */
  ctas?: HeroCTA[];
  /** Controls headline alignment */
  align?: 'left' | 'center';
  /** Extra height for taller hero sections */
  tall?: boolean;
}

/**
 * HeroSection — full-width dark hero used on every page.
 * The dark overlay ensures text is always readable even before
 * the user adds a background image.
 */
export default function HeroSection({
  backgroundImage,
  eyebrow,
  headline,
  subheadline,
  ctas = [],
  align = 'left',
  tall = false,
}: HeroSectionProps) {
  const isCenter = align === 'center';
  const minH = tall ? 'min-h-[700px] md:min-h-[800px]' : 'min-h-[520px] md:min-h-[640px]';

  return (
    <section
      className={`relative w-full ${minH} flex items-center bg-brand-dark overflow-hidden`}
      aria-label="Page hero"
    >
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      )}

      {/* Dark gradient overlay — always present for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/65 to-brand-dark/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
          {/* Eyebrow */}
          {eyebrow && (
            <p className="text-brand-action text-sm font-semibold tracking-widest uppercase mb-4">
              {eyebrow}
            </p>
          )}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            {headline}
          </h1>

          {/* Subheadline */}
          {subheadline && (
            <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          {ctas.length > 0 && (
            <div className={`flex flex-wrap gap-3 ${isCenter ? 'justify-center' : ''}`}>
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={[
                    'inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-2',
                    cta.variant === 'secondary'
                      ? 'bg-transparent text-white border border-white/40 hover:bg-white/10'
                      : 'bg-brand-action text-brand-dark hover:bg-brand-action-hover shadow-lg shadow-brand-action/20',
                  ].join(' ')}
                >
                  {cta.label}
                  {cta.variant !== 'secondary' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
