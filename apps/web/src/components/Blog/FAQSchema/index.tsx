import React from 'react';
import Script from 'next/script';

import { BlogPost, FAQItem } from '../../../lib/strapi';

interface FAQSchemaProps {
  post: BlogPost;
  url: string;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ post, url }) => {
  // Return null if no FAQ data exists
  if (!post.faq_schema || !Array.isArray(post.faq_schema) || post.faq_schema.length === 0) {
    return null;
  }

  // Validate FAQ items and filter out invalid ones
  const validFAQs = post.faq_schema.filter((faq: FAQItem) => {
    return (
      faq &&
      typeof faq === 'object' &&
      typeof faq.question === 'string' &&
      typeof faq.answer === 'string' &&
      faq.question.trim().length > 0 &&
      faq.answer.trim().length > 0
    );
  });

  // Return null if no valid FAQs after filtering
  if (validFAQs.length === 0) {
    return null;
  }

  // Build FAQ schema according to schema.org specification
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFAQs.map((faq: FAQItem) => ({
      "@type": "Question",
      "name": faq.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.trim()
      }
    }))
  };

  return (
    <Script
      id={`faq-schema-${post.slug}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema, null, 2)
      }}
    />
  );
};

export default FAQSchema;
