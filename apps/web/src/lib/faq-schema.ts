import type { FAQItem } from '@/data/faq-data';

// Schema.org FAQ Page types
interface FAQAnswer {
  '@type': 'Answer';
  text: string;
}

interface FAQQuestion {
  '@type': 'Question';
  name: string;
  acceptedAnswer: FAQAnswer;
}

export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: FAQQuestion[];
}

/**
 * Generates JSON-LD structured data for FAQ page
 * Following Google's FAQ structured data guidelines
 * @param faqItems - Array of FAQ items to convert to schema
 * @returns FAQPageSchema object ready for JSON-LD
 */
export function generateFAQSchema(faqItems: FAQItem[]): FAQPageSchema {
  const mainEntity: FAQQuestion[] = faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  };
}

/**
 * Generates the JSON-LD script tag content
 * @param schema - FAQ schema object
 * @returns JSON string for script tag
 */
export function generateJSONLD(schema: FAQPageSchema): string {
  return JSON.stringify(schema, null, 2);
}