import React from 'react';
import type { Metadata } from 'next';

import Layout from '@/components/Layout';
import FAQSection from '@/components/FAQSection';
import { FAQItem } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ Demo - S Cubed',
  description: 'Frequently Asked Questions Demo Page',
};

// Example of custom FAQ data
const customFAQs: FAQItem[] = [
  {
    question: 'How do I get started with S Cubed?',
    answer: 'Getting started is easy! Simply book a demo through our website, and our team will walk you through the entire platform. We\'ll help you understand which features best suit your practice needs and guide you through the setup process.',
  },
  {
    question: 'What pricing plans are available?',
    answer: 'We offer flexible pricing plans designed for practices of all sizes. Our Basic plan starts at $99/month for solo practitioners, Professional at $299/month for small practices, and Enterprise plans with custom pricing for larger organizations. All plans include core features with varying levels of support and advanced capabilities.',
  },
  {
    question: 'Do you offer training for my staff?',
    answer: 'Yes! We provide comprehensive training for your entire team. This includes initial onboarding sessions, video tutorials, documentation, and ongoing webinars. Premium plans also include personalized training sessions tailored to your practice\'s specific workflows.',
  },
];

export default function FAQDemoPage() {
  return (
    <Layout>
      {/* Example 1: Using default props with mock data */}
      <FAQSection />
      
      {/* Example 2: Using custom title and FAQ data */}
      <FAQSection 
        title="Custom FAQ Section"
        faqs={customFAQs}
        className="custom-faq-section"
      />
    </Layout>
  );
}