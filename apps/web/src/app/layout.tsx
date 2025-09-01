import type { Metadata } from 'next';

import ConditionalLayout from '../components/ConditionalLayout';
import '../components/Container/fonts.css';
import '../components/Container/style.css';

// Get environment for robots meta tag
const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
const shouldBlockIndexing = appEnv === 'stage' || appEnv === 'dev';

export const metadata: Metadata = {
  title:
    'Best Practice Management & Billing Software for Therapy Practices | S Cubed',
  description:
    'An easy-to-use, flexible practice management software designed for Speech, Occupational, Physical, and Applied Behavioral Analysis (ABA) therapy. Streamline data collection, billing, scheduling, document management, reporting, and more with automated alerts and a secure guardian portal.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    siteName: 'S Cubed',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    site: '@scubed_solutions',
    creator: '@scubed_solutions',
  },
  // Block indexing for staging and development environments
  robots: shouldBlockIndexing 
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : {
        index: true,
        follow: true,
      },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

      </head>
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
