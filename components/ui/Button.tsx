import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline-light';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
  /** Render as an anchor tag (pass href separately outside) */
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  /** Bright action green — primary CTA */
  primary:
    'bg-brand-action text-brand-dark hover:bg-brand-action-hover font-semibold shadow-sm',
  /** Dark green background — secondary actions on light backgrounds */
  secondary:
    'bg-brand-dark text-white hover:bg-brand-mid font-semibold shadow-sm',
  /** Transparent with border — ghost style on dark backgrounds */
  ghost:
    'bg-transparent text-white border border-white/40 hover:bg-white/10 font-medium',
  /** White border on dark bg (for dark sections) */
  'outline-light':
    'bg-transparent text-brand-action border border-brand-action hover:bg-brand-action hover:text-brand-dark font-medium',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:  'px-4 py-2 text-sm rounded-lg',
  md:  'px-6 py-3 text-sm rounded-xl',
  lg:  'px-8 py-4 text-base rounded-xl',
};

/**
 * Button — primary UI primitive.
 *
 * Usage:
 *   <Button variant="primary" size="lg">Join the Waitlist</Button>
 *   <Button variant="secondary" isLoading>Submitting...</Button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
