import type { Metadata } from 'next';
import { Suspense } from 'react';

import SubscriptionSuccess from '@/components/SubscriptionSuccess';

export const metadata: Metadata = {
  title: 'Success | S Cubed - Welcome to Your New Practice Management System',
  description:
    'Thank you for subscribing to S Cubed! Your account is being set up and will be ready soon.',
  alternates: {
    canonical: '/subscribe/success',
  },
};

/**
 * Success Page
 * Displayed after:
 * 1. Free plan submission (pending admin approval)
 * 2. Paid plan payment completion (via Stripe webhook redirect)
 */
export default function SubscribeSuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>}>
      <SubscriptionSuccess />
    </Suspense>
  );
}
