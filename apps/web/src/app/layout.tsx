import type { Metadata, Viewport } from 'next';

import ConditionalLayout from '../components/ConditionalLayout';
import '../components/Container/fonts.css';
import '../components/Container/style.css';
import '../styles/global.css';

// Get environment for robots meta tag and tracking scripts
const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
const shouldBlockIndexing = appEnv === 'stage' || appEnv === 'dev';
const isProduction = appEnv === 'prod';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID; // GTM container ID (e.g., GTM-WFFCJJSB or GTM-NL5G2SKT)
const shouldLoadGTM = !!gtmId; // Load GTM if container ID is provided

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title:
    'Best Practice Management & Billing Software for Therapy Practices | S Cubed',
  description:
    'An easy-to-use, flexible practice management software designed for Speech, Occupational, Physical, and Applied Behavioral Analysis (ABA) therapy. Streamline data collection, billing, scheduling, document management, reporting, and more with automated alerts and a secure guardian portal.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
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
        {/* Google Tag Manager - Controlled by NEXT_PUBLIC_GTM_ID */}
        {shouldLoadGTM && (
          <>
            {/* Preconnect to Google domains for faster loading */}
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://www.google.com" />
            <link rel="preconnect" href="https://www.gstatic.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="dns-prefetch" href="https://www.google.com" />
            <link rel="dns-prefetch" href="https://www.gstatic.com" />
            
            {/* Google Tag Manager */}
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
              }}
            />
            {/* End Google Tag Manager */}
            
            {/* Google tag (gtag.js) - Deferred loading */}
            <script defer src="https://www.googletagmanager.com/gtag/js?id=G-SLJ6PQXV8M" />
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `
window.addEventListener('load', function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SLJ6PQXV8M');
});
                `,
              }}
            />
            {/* End Google tag (gtag.js) */}
          </>
        )}
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/HeaderLogo.png" as="image" />
        <link rel="preload" href="/fonts/your-main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

      </head>
      <body>
        {/* Google Tag Manager (noscript) - Controlled by NEXT_PUBLIC_GTM_ID */}
        {shouldLoadGTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
