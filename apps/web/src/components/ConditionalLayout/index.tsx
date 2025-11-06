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
                         pathname === '/data-collection' ||
                         pathname === '/pricing' ||
                         pathname === '/events' ||
                         pathname.startsWith('/events/') ||
                         pathname === '/scheduling-and-appointments' ||
                         pathname === '/authorization' ||
                         pathname === '/subscribe' ||
                         pathname.startsWith('/subscribe/');

  // Determine if the page should use full width layout
  const shouldUseFullWidth = pathname === '/get-started' ||
                            pathname === '/billing' ||
                            pathname === '/features' ||
                            pathname === '/guardian-portal' ||
                            pathname === '/data-collection' ||
                            pathname === '/pricing' ||
                            pathname === '/events' ||
                            pathname === '/scheduling-and-appointments' ||
                            pathname === '/authorization';
  
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