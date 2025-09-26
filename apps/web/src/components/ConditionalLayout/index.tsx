'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import Layout from '../Layout';

import { FreeTrialModalProvider } from '@/contexts/FreeTrialModalContext';

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
                         pathname === '/guardian-portal' ||
                         pathname === '/pricing' ||
                         pathname === '/events' ||
                         pathname.startsWith('/events/');

  // Determine if the page should use full width layout
  const shouldUseFullWidth = pathname === '/get-started' ||
                            pathname === '/billing' ||
                            pathname === '/features' ||
                            pathname === '/guardian-portal' ||
                            pathname === '/pricing' ||
                            pathname === '/events';
  
  return (
    <FreeTrialModalProvider>
      {shouldUseLayout ? (
        <Layout fullWidth={shouldUseFullWidth}>{children}</Layout>
      ) : (
        <>{children}</>
      )}
    </FreeTrialModalProvider>
  );
}