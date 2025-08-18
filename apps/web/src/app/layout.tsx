import type { Metadata } from 'next';
import '../components/Container/fonts.css';
import '../components/Container/style.css';

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
      <body>{children}</body>
    </html>
  );
}
