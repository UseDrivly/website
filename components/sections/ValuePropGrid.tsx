import React from 'react';
import type { ValuePropCard } from '@/types';

interface ValuePropGridProps {
  cards: ValuePropCard[];
  /** Layout variant */
  layout?: '2col' | '3col';
  /** Whether to show an accent highlight card (e.g. "8 min" big number) */
  accentHighlight?: {
    value: string;
    label: string;
  };
  /** Secondary metric shown alongside accent (e.g. "4.9 ★") */
  secondaryMetric?: {
    value: string;
    label: string;
  };
}

/**
 * ValuePropGridCard — individual card with dark/light/accent variants.
 */
function ValuePropGridCard({ card }: { card: ValuePropCard }) {
  const bgMap = {
    dark:   'bg-brand-dark text-white',
    light:  'bg-white border border-brand-border text-brand-text-primary',
    accent: 'bg-brand-mid text-white',
  };

  const variant = card.variant ?? 'light';
  const cardBg = bgMap[variant];
  const eyebrowColor = variant === 'light' ? 'text-brand-action' : 'text-brand-action';
  const bodyColor = variant === 'light' ? 'text-brand-text-muted' : 'text-white/70';

  return (
    <div className={`flex flex-col gap-3 p-7 rounded-2xl ${cardBg}`}>
      {card.eyebrow && (
        <span className={`text-xs font-bold tracking-widest uppercase ${eyebrowColor}`}>
          {card.eyebrow}
        </span>
      )}
      <h3 className="text-lg font-bold leading-snug">{card.heading}</h3>
      <p className={`text-sm leading-relaxed ${bodyColor}`}>{card.body}</p>
    </div>
  );
}

/**
 * ValuePropGrid — flexible grid of benefit cards.
 * Used on Providers page ("Keep 85%", "You choose when", "Build a reputation")
 * and can be reused on any page requiring a key-value highlight grid.
 */
export default function ValuePropGrid({
  cards,
  layout = '2col',
  accentHighlight,
  secondaryMetric,
}: ValuePropGridProps) {
  const colClass = layout === '3col'
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className="flex flex-col gap-6">
      {/* Cards grid */}
      <div className={`grid ${colClass} gap-5`}>
        {cards.map((card, i) => (
          <ValuePropGridCard key={i} card={card} />
        ))}
      </div>

      {/* Optional big-number accent row */}
      {(accentHighlight || secondaryMetric) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {accentHighlight && (
            <div className="bg-brand-dark rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-7xl font-extrabold text-brand-action leading-none">
                {accentHighlight.value}
              </span>
              <span className="mt-2 text-white/60 text-sm font-medium">
                {accentHighlight.label}
              </span>
            </div>
          )}
          {secondaryMetric && (
            <div className="bg-brand-mid rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-extrabold text-white leading-none">
                {secondaryMetric.value}
              </span>
              <span className="mt-2 text-white/60 text-sm font-medium">
                {secondaryMetric.label}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
