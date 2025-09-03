import React from 'react';
import Script from 'next/script';

import { BlogPost } from '../../../lib/strapi';

interface BreadcrumbSchemaProps {
  post: BlogPost;
  url: string;
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ post, url }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": url
      }
    ]
  };

  return (
    <Script
      id={`breadcrumb-schema-${post.slug}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema, null, 2)
      }}
    />
  );
};

export default BreadcrumbSchema;
