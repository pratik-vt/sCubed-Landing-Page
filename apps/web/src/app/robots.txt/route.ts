import { NextResponse } from 'next/server';

export function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Block crawling for staging and development environments
  if (appEnv === 'stage' || appEnv === 'dev') {
    return new NextResponse(
      `User-agent: *
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml`,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }

  // Allow crawling for production
  return new NextResponse(
    `User-agent: *
Allow: /
Disallow: /?tag*

Sitemap: ${siteUrl}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
} 