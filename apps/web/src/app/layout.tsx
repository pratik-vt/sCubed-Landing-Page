import type { Metadata } from 'next';

import ConditionalLayout from '../components/ConditionalLayout';
import '../components/Container/fonts.css';
import '../components/Container/style.css';

// Get environment for robots meta tag and tracking scripts
const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
const shouldBlockIndexing = appEnv === 'stage' || appEnv === 'dev';
const isProduction = appEnv === 'prod';

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
        {/* Only load tracking scripts in production */}
        {isProduction && (
          <>
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WFFCJJSB');`,
              }}
            />
            {/* End Google Tag Manager */}
            
            {/* Google tag (gtag.js) */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-SLJ6PQXV8M" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SLJ6PQXV8M');
                `,
              }}
            />
            {/* End Google tag (gtag.js) */}
          </>
        )}
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

      </head>
      <body>
        {/* Google Tag Manager (noscript) - Only in production */}
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WFFCJJSB"
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
