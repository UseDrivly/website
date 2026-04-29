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
    <section className="w-full bg-brand-dark" aria-label="Platform statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-stretch justify-center">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              {/* Stat item */}
              <div className="flex flex-col items-center justify-center py-6 px-4 sm:py-7 sm:px-12 text-center flex-1 w-1/2 sm:w-auto">
                <span className="text-3xl sm:text-4xl font-bold leading-none text-brand-action tracking-tight" style={{ letterSpacing: '-1.34px' }}>
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs text-white/60 leading-tight text-center max-w-[140px] sm:max-w-[110px] min-h-[30px]">
                  {stat.label}
                </span>
              </div>
              {/* Vertical divider — between stats only */}
              {index < stats.length - 1 && (
                <div className="hidden sm:block w-px h-16 bg-white/20 flex-shrink-0" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
