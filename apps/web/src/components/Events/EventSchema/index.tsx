import Script from 'next/script';
import React from 'react';

import { getStrapiImageUrl } from '../../../lib/strapi';
import type { Event } from '../../../types/event';

interface EventSchemaProps {
  event: Event;
  url: string;
}

const EventSchema: React.FC<EventSchemaProps> = ({ event, url }) => {
  const imageUrl = getStrapiImageUrl(event.featured_image || event.hero_image);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io';
  const absoluteImageUrl =
    imageUrl && !imageUrl.startsWith('http')
      ? `${baseUrl}${imageUrl}`
      : imageUrl;

  // Determine event attendance mode based on location
  const getEventAttendanceMode = () => {
    if (!event.location || event.location.toLowerCase().includes('online')) {
      return 'https://schema.org/OnlineEventAttendanceMode';
    }
    return 'https://schema.org/OfflineEventAttendanceMode';
  };

  // Get event status for Schema.org
  const getEventStatus = () => {
    const now = new Date();
    const end = new Date(event.end_date);

    if (now > end) {
      return 'https://schema.org/EventScheduled';
    }
    return 'https://schema.org/EventScheduled';
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt || '',
    startDate: event.start_date,
    endDate: event.end_date,
    eventAttendanceMode: getEventAttendanceMode(),
    eventStatus: getEventStatus(),
    url: url,

    ...(absoluteImageUrl && {
      image: [
        absoluteImageUrl,
        {
          '@type': 'ImageObject',
          url: absoluteImageUrl,
          width: event.featured_image?.width || event.hero_image?.width,
          height: event.featured_image?.height || event.hero_image?.height,
        },
      ],
    }),

    ...(event.location && {
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          name: event.location,
        },
      },
    }),

    ...(event.registration_url && {
      offers: {
        '@type': 'Offer',
        url: event.registration_url,
      },
    }),

    // Additional metadata
    isAccessibleForFree: false,

    ...(event.categories &&
      event.categories.length > 0 && {
        about: event.categories.map((cat) => ({
          '@type': 'Thing',
          name: cat.name,
        })),
      }),

    ...(event.tags &&
      event.tags.length > 0 && {
        keywords: event.tags.map((tag) => tag.name).join(', '),
      }),
  };

  return (
    <Script
      id="event-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default EventSchema;
