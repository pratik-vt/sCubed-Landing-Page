import Script from 'next/script';
import type { Metadata } from 'next';

import { getAllFAQItems } from '@/data/faq-data';
import { generateFAQSchema, generateJSONLD } from '@/lib/faq-schema';

export const metadata: Metadata = {
  title: 'FAQs - S Cubed',
  description: 'Frequently Asked Questions about S Cubed ABA Practice Management Software',
};

export default function FAQsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // Generate FAQ structured data
  const faqItems = getAllFAQItems();
  const faqSchema = generateFAQSchema(faqItems);
  const jsonLd = generateJSONLD(faqSchema);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {children}
    </>
  );
}
