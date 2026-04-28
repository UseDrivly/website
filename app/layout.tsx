import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

// ── Typography ──────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

// ── SEO Defaults ────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Drivly - Roadside Assistance, One Tap Away',
    template: '%s | Drivly',
  },
  description:
    "Nigeria's first app-based roadside assistance platform. Fixed pricing, real-time tracking, and verified providers launching in Lagos 2025.",
  keywords: [
    'roadside assistance Nigeria',
    'car breakdown Lagos',
    'towing service Lagos',
    'Drivly',
    'emergency car help Nigeria',
  ],
  authors: [{ name: 'Drivly Team' }],
  creator: 'Drivly',
  metadataBase: new URL('https://drivly.ng'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://drivly.ng',
    siteName: 'Drivly',
    title: 'Drivly - Roadside Assistance, One Tap Away',
    description:
      "Nigeria's first app-based roadside assistance platform. Fixed pricing, real-time tracking, and verified providers.",
    images: [
      {
        url: '/images/og-image.png',
        // IMAGE SLOT: Place your OG image at /public/images/og-image.png
        // Recommended size: 1200×630px
        width: 1200,
        height: 630,
        alt: 'Drivly - Help is one tap away',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@drivly_ng',
    creator: '@drivly_ng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/drivly-logo.svg',
    shortcut: '/drivly-logo.svg',
    apple: '/drivly-logo.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D3320',
  width: 'device-width',
  initialScale: 1,
};

// ── Root Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col bg-white text-brand-text-primary antialiased">
        <ConditionalLayout>
          {/* Page content — grows to fill viewport */}
          <main className="flex-1" id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ConditionalLayout>
      </body>
    </html>
  );
}
