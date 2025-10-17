import Script from 'next/script';
import React from 'react';

/**
 * ProductReviewSchema Component
 *
 * Adds structured data (JSON-LD) for product reviews to improve SEO
 * and display aggregate ratings in search results.
 *
 * This schema is based on Schema.org Product type with AggregateRating.
 * @see https://schema.org/Product
 * @see https://schema.org/AggregateRating
 */
const ProductReviewSchema: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'S Cubed - ABA Practice Management Software',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '5',
      ratingCount: '10',
    },
  };

  return (
    <Script
      id="product-review-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2),
      }}
    />
  );
};

export default ProductReviewSchema;
