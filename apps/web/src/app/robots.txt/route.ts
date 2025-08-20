import { NextResponse } from 'next/server';

export function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
  
  // Block crawling for staging and development environments
  if (appEnv === 'stage' || appEnv === 'dev') {
    return new NextResponse(
      `User-agent: *
Disallow: /`,
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
Allow: /`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
} 