import type { Metadata } from 'next';

import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - S Cubed ABA Practice Management',
  description:
    'Find answers to common questions about S Cubed ABA practice management software. Learn about features, pricing, security, billing, scheduling, and more.',
  alternates: {
    canonical: '/faqs',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}