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
  const shouldUseLayout = pathname === '/blog' ||  pathname === '/faqs' ||
                         pathname.startsWith('/blog/') || 
                         pathname === '/privacy-policy' || 
                         pathname === '/terms-conditions' ||
                         pathname === '/get-started' ||
                         pathname === '/billing' ||
                         pathname === '/features' ||
                         pathname === '/guardian-portal';
  
  // Determine if the page should use full width layout
  const shouldUseFullWidth = pathname === '/get-started' || 
                            pathname === '/billing' || 
                            pathname === '/features' || 
                            pathname === '/guardian-portal';
  
  if (shouldUseLayout) {
    return <Layout fullWidth={shouldUseFullWidth}>{children}</Layout>;
  }
  
  // All other pages (including home) render without Layout
  return <>{children}</>;
}