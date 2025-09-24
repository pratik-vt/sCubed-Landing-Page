'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Event } from '../../../types/event';
import { getStrapiImageUrl } from '../../../lib/strapi';
import { formatEventDate, formatEventTime, getEventLocationString, getEventStatus } from '../../../lib/events-api';

import * as styles from './styles.css';

// Helper to determine event type from categories or tags
const getEventType = (event: Event): string => {
  // Check categories first
  if (event.categories && event.categories.length > 0) {
    const category = event.categories[0].name.toLowerCase();
    if (category.includes('conference')) return 'conference';
    if (category.includes('webinar')) return 'webinar';
    if (category.includes('workshop')) return 'workshop';
    if (category.includes('training')) return 'training';
    if (category.includes('announcement')) return 'announcement';
    return event.categories[0].name;
  }
  // Check tags as fallback
  if (event.tags && event.tags.length > 0) {
    const tag = event.tags[0].name.toLowerCase();
    if (tag.includes('conference')) return 'conference';
    if (tag.includes('webinar')) return 'webinar';
    if (tag.includes('workshop')) return 'workshop';
    if (tag.includes('training')) return 'training';
    if (tag.includes('announcement')) return 'announcement';
  }
  // Default to 'event'
  return 'event';
};

// Helper to get event type badge color
const getEventTypeStyle = (type: string) => {
  switch (type.toLowerCase()) {
    case 'conference':
      return { background: 'rgba(122, 126, 237, 0.9)', color: '#ffffff' };
    case 'webinar':
      return { background: 'rgba(6, 182, 212, 0.9)', color: '#ffffff' };
    case 'workshop':
      return { background: 'rgba(16, 185, 129, 0.9)', color: '#ffffff' };
    case 'announcement':
      return { background: 'rgba(245, 158, 11, 0.9)', color: '#ffffff' };
    case 'training':
      return { background: 'rgba(139, 92, 246, 0.9)', color: '#ffffff' };
    default:
      return { background: 'rgba(107, 114, 128, 0.9)', color: '#ffffff' };
  }
};

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = memo(({ event, featured = false }) => {
  const imageUrl = getStrapiImageUrl(event.featured_image);
  const status = getEventStatus(event);
  const location = getEventLocationString(event);
  const dateRange = formatEventDate(event.start_date, event.end_date);
  const startTime = formatEventTime(event.start_date);
  const eventType = getEventType(event);

  const getStatusBadge = () => {
    switch (status) {
      case 'ongoing':
        return <span className={styles.statusBadge.ongoing}>Happening Now</span>;
      case 'completed':
        return <span className={styles.statusBadge.completed}>Past Event</span>;
      default:
        return null;
    }
  };

  return (
    <Link href={`/events/${event.slug}`} className={featured ? styles.featuredCard : styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className={styles.image}
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>EVENT</span>
          </div>
        )}
        <div className={styles.badgesContainer}>
          <span
            className={styles.eventTypeBadge}
            style={getEventTypeStyle(eventType)}
          >
            {eventType.toUpperCase()}
          </span>
          {getStatusBadge()}
          {event.featured && <span className={styles.featuredBadge}>FEATURED</span>}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.dateTime}>
          <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>{dateRange}</span>
          <span className={styles.separator}>•</span>
          <span>{startTime}</span>
        </div>

        <h3 className={styles.title}>{event.title}</h3>

        <p className={styles.excerpt}>{event.excerpt}</p>

        <div className={styles.metadata}>
          <div className={styles.location}>
            <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{location}</span>
          </div>

          <div className={styles.pricing}>
            <span className={styles.registerLink}>View More →</span>
          </div>
        </div>


      </div>
    </Link>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;