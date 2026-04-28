'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from './Container';

const navLinks = [
  { label: 'For Drivers', href: '/drivers' },
  { label: 'For Providers', href: '/providers' },
  { label: 'For Businesses', href: '/fleet' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

/**
 * Navbar — sticky, white background.
 * - Logo: "Drivly" in brand-action green (left)
 * - Nav links: center/right
 * - CTA button: "Join the Waitlist" (brand-action, far right)
 * - On scroll: adds a shadow to the white bar
 * - Mobile: hamburger toggles a slide-down drawer
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white transition-shadow duration-300"
      style={{
        borderBottom: scrolled ? 'none' : '0.2px solid #505050',
        boxShadow: scrolled ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
      }}
      role="banner"
    >
      <Container width="wide">
        <div className="flex items-center justify-between" style={{ height: '88px' }}>

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-1.5"
            aria-label="Drivly - home"
          >
            <Image src="/images/logo.svg" alt="Drivly" width={102} height={35} priority />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <div key={link.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'Helvetica Neue, Inter, sans-serif',
                      fontWeight: isActive ? 500 : 400,
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: '#0D0404',
                      textDecoration: 'none',
                      padding: '0 6px',
                      transition: 'color 0.15s',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                  {/* Active underline — 2px green bar per Figma spec "Rectangle 1" */}
                  {isActive && (
                    <div style={{ width: '100%', height: '2px', background: '#047857', borderRadius: '1px' }} aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden lg:block">
            <Link
              href="/#waitlist"
              id="navbar-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '149px', height: '48px',
                background: '#0D3D21', border: '1px solid #DCDCDC', borderRadius: '12px',
                fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', lineHeight: '24px',
                color: '#FFFFFF', textDecoration: 'none',
                transition: 'background 0.15s',
              }}
            >
              Join the Waitlist
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-lg text-brand-text-primary hover:bg-brand-action-light transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              /* X icon */
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* ── Mobile Drawer ── */}
      <div
        id="mobile-menu"
        className={[
          'lg:hidden bg-white border-t border-brand-border overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-action-light text-brand-action'
                    : 'text-brand-text-primary hover:bg-brand-action-light hover:text-brand-action',
                ].join(' ')}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <Link
            href="/#waitlist"
            className="
              mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center
              bg-brand-dark text-white hover:bg-brand-mid transition-colors
            "
          >
            Join the Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
