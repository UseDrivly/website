import React from 'react';

type BadgeVariant = 'green-outline' | 'green-solid' | 'dark';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  'green-outline':
    'border border-brand-action text-brand-action bg-transparent',
  'green-solid':
    'bg-brand-action text-brand-dark',
  'dark':
    'bg-brand-dark text-white',
};

/**
 * Badge — small label chip used as section eyebrow labels.
 *
 * Usage:
 *   <Badge variant="green-outline">FOR DRIVERS</Badge>
 *   <Badge variant="green-solid">TRUST & SAFETY</Badge>
 */
export default function Badge({
  children,
  variant = 'green-outline',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
