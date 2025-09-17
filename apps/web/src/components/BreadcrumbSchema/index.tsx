import Script from 'next/script';
import React from 'react';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `${baseUrl}${item.item}`
    }))
  };

  return (
    <Script
      id={`breadcrumb-schema-${items[items.length - 1]?.name?.toLowerCase().replace(/\s+/g, '-') || 'page'}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema, null, 2)
      }}
    />
  );
};

export default BreadcrumbSchema;
