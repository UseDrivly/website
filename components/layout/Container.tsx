import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use 'narrow' for blog/article pages (max-w-3xl) */
  width?: 'ultra' | 'wide' | 'narrow' | 'default';
}

/**
 * Container — standard max-width wrapper.
 * All pages use this to ensure consistent horizontal bounds.
 *
 * ultra:   max-w-[1512px] — matches Figma outer bounds (e.g., Navbar)
 * wide:    max-w-[1208px] — matches Figma Navbar/Footer inner bounds
 * default: max-w-[1148px] — matches Figma main content/card grids
 * narrow:  max-w-[768px]  — blog articles, legal pages
 */
export default function Container({
  children,
  className = '',
  width = 'default',
}: ContainerProps) {
  const widthClass = {
    ultra: 'max-w-[1512px]',
    wide: 'max-w-[1208px]',
    default: 'max-w-[1148px]',
    narrow: 'max-w-[768px]',
  }[width];

  return (
    <div
      className={`${widthClass} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}