import Script from 'next/script';
import React from 'react';

const LocalBusinessSchema: React.FC = () => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://scubed.io/#localbusiness',
    name: 'S Cubed',
    alternateName: 'Spectrum Solutions Software',
    url: 'https://scubed.io/',
    logo: 'https://scubed.io/logo.png',
    image:
      'https://scubed.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdata-collection.6b65a3ee.png&w=750&q=75',
    description:
      'S Cubed empowers providers to manage ABA, OT, PT, speech, and counseling with ease by streamlining scheduling, billing, documentation, and compliance in one unified platform.',
    foundingDate: '2024',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3000 Illinois Ave',
      addressLocality: 'Killeen',
      addressRegion: 'TX',
      postalCode: '76543',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.0911035,
      longitude: -97.7095732,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-254-434-4959',
      contactType: 'Customer Service',
      email: 'info@scubed.io',
      availableLanguage: ['English'],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United States',
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
      id="local-business-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema, null, 2),
      }}
    />
  );
};

export default LocalBusinessSchema;
