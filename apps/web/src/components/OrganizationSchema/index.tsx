import Script from 'next/script';
import React from 'react';

const OrganizationSchema: React.FC = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'S Cubed',
    url: 'https://scubed.io/',
    logo: 'https://scubed.io/logo.png',
    description:
      'S Cubed empowers providers to manage ABA, OT, PT, speech, and counseling with ease - streamlining scheduling, billing, documentation, and compliance in one platform.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3000 Illinois Ave',
      addressLocality: 'Killeen',
      addressRegion: 'TX',
      postalCode: '76543',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '5',
      ratingCount: '10',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-254-434-4959',
      contactType: 'Customer Service',
      email: 'info@scubed.io',
    },
    sameAs: [
      'https://www.facebook.com/people/Spectrum-Solutions/61571781968975/',
      'https://www.instagram.com/scubed_solutions/',
      'https://www.youtube.com/@SpectrumSolutionsSoftware',
      'https://www.linkedin.com/company/spectrum-solutions-software/',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema, null, 2),
      }}
    />
  );
};

export default OrganizationSchema;
