import React from 'react';
import type { StatItem } from '@/types';

interface StatsBarProps {
  stats: StatItem[];
}

/**
 * StatsBar — dark green full-width bar with 4 stats separated by vertical dividers.
 * Matches Figma spec: #0D3D21 bg, #7AB800 value text, white/60 label text.
 * Stats are separated by thin white vertical lines (not column gaps).
 */
export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="w-full" style={{ background: '#0D3D21' }} aria-label="Platform statistics">
      <div className="max-w-[1208px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap sm:flex-nowrap items-stretch justify-center">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              {/* Stat item */}
              <div className="flex flex-col items-center justify-center py-6 px-4 sm:py-7 sm:px-10 text-center flex-1 w-1/2 sm:w-1/4">
                <span className="font-bold leading-none tracking-tight" style={{ color: '#7AB800', fontSize: 'clamp(28px, 2.8vw, 36px)', letterSpacing: '-1.34px' }}>
                  {stat.value}
                </span>
                <span className="mt-1.5 text-white/70 text-center max-w-[150px] sm:max-w-[130px] min-h-[28px]" style={{ fontSize: '11px', lineHeight: '14px' }}>
                  {stat.label}
                </span>
              </div>
              {/* Vertical divider — between stats only */}
              {index < stats.length - 1 && (
                <div className="hidden sm:block w-px h-14 md:h-16 bg-white/25 flex-shrink-0 self-center" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
