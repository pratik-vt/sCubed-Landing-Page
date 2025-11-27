import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Serve landing page as raw HTML via API route (no Next.js layout)
  if (request.nextUrl.pathname === '/lp/aba-practice-management-software') {
    return NextResponse.rewrite(
      new URL('/api/lp/aba-practice-management-software', request.url)
    );
  }
  
  if (request.nextUrl.pathname === '/lp/practice-management-software') {
    return NextResponse.rewrite(
      new URL('/api/lp/practice-management-software', request.url)
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/lp/aba-practice-management-software',
    '/lp/practice-management-software',
  ],
};
