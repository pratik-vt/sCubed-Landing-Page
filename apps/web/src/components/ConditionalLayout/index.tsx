'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import Layout from '../Layout';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({ children }: Readonly<ConditionalLayoutProps>) {
  const pathname = usePathname();
  
  // Only wrap specific pages with Layout component
  const shouldUseLayout = pathname === '/blog' || 
                         pathname.startsWith('/blog/') || 
                         pathname === '/privacy-policy' || 
                         pathname === '/terms-conditions';
  
  if (shouldUseLayout) {
    return <Layout>{children}</Layout>;
  }
  
  // All other pages (including home) render without Layout
  return <>{children}</>;
}