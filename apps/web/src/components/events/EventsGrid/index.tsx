'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import {
  formatEventDate,
  formatEventTime,
  getEventLocationString,
} from '../../../lib/events-api';
import { getStrapiImageUrl } from '../../../lib/strapi';
import type { Event } from '../../../types/event';

import {
  eventCard,
  eventCardContent,
  eventDate,
  eventDescription,
  eventDetails,
  eventDetailsInfo,
  eventDetailsItem,
  eventGrid,
  eventIcon,
  eventImageWrapper,
  eventLink,
  eventLocation,
  eventsSection,
  eventThumbnail,
  eventTime,
  eventTitle,
  eventType,
} from './styles.css';

interface EventsGridProps {
  initialEvents: Event[];
  error?: string;
}

const EventsGrid: React.FC<EventsGridProps> = ({ initialEvents, error }) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardHoverVariants: Variants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const getEventTypeFromCategories = (event: Event): string => {
    if (event.categories && event.categories.length > 0) {
      const category = event.categories[0].name.toLowerCase();
      if (category.includes('conference')) return 'conference';
      if (category.includes('webinar')) return 'webinar';
      if (category.includes('workshop')) return 'workshop';
      if (category.includes('training')) return 'training';
      if (category.includes('announcement')) return 'announcement';
      return event.categories[0].name;
    }
    return 'event';
  };

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

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Component for event image with loading state
  const EventImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
      <>
        {isImageLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              zIndex: 1,
            }}
          />
        )}
        <Image
          src={src}
          alt={alt}
          width={400}
          height={200}
          className={eventThumbnail}
          unoptimized
          onLoad={() => setIsImageLoading(false)}
          style={{
            opacity: isImageLoading ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
        />
      </>
    );
  };

  // Error state
  if (error && initialEvents.length === 0) {
    return (
      <section className={eventsSection}>
        <div className={eventGrid}>
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem 0',
            }}
          >
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '2rem',
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              <h3
                style={{
                  color: '#991b1b',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                Unable to Load Events
              </h3>
              <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>
              <a
                href="/events"
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'background 0.2s',
                }}
              >
                Refresh Page
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (initialEvents.length === 0) {
    return (
      <section className={eventsSection}>
        <div className={eventGrid}>
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem 0',
            }}
          >
            <h3>No events available</h3>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
              Please check back later for upcoming events.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={eventsSection} ref={sectionRef}>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      <motion.div
        className={eventGrid}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {initialEvents.map((event, index) => {
          const eventTypeValue = getEventTypeFromCategories(event);
          const imageUrl = getStrapiImageUrl(event.featured_image);
          const dateStr = formatEventDate(event.start_date, event.end_date);
          const timeStr = formatEventTime(event.time);
          const location = getEventLocationString(event);

          return (
            <motion.article
              key={event.id}
              className={eventCard}
              whileHover="hover"
              custom={index}
              onClick={() => router.push(`/events/${event.slug}`)}
            >
              <motion.div variants={cardHoverVariants}>
                <div className={eventImageWrapper}>
                  {imageUrl ? (
                    <EventImage src={imageUrl} alt={event.title} />
                  ) : (
                    <div
                      className={eventThumbnail}
                      style={{
                        background: `linear-gradient(135deg, ${getEventTypeStyle(eventTypeValue).background} 0%, rgba(107, 114, 128, 0.9) 100%)`,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      <span>{eventTypeValue}</span>
                    </div>
                  )}
                  <span
                    className={eventType}
                    style={getEventTypeStyle(eventTypeValue)}
                  >
                    {eventTypeValue.charAt(0).toUpperCase() +
                      eventTypeValue.slice(1)}
                  </span>
                </div>

                <div className={eventCardContent}>
                  <h3 className={eventTitle}>{event.title}</h3>
                  <p className={eventDescription}>
                    {truncateDescription(event.excerpt || event.description)}
                  </p>

                  <div className={eventDetails}>
                    <div className={eventDetailsInfo}>
                      <div className={eventDetailsItem}>
                        <Calendar className={eventIcon} size={16} />
                        <span className={eventDate}>{dateStr}</span>
                      </div>
                      {timeStr && (
                        <div className={eventDetailsItem}>
                          <Clock className={eventIcon} size={16} />
                          <span className={eventTime}>{timeStr}</span>
                        </div>
                      )}
                      <div className={eventDetailsItem}>
                        <MapPin className={eventIcon} size={16} />
                        <span className={eventLocation} title={location}>
                          {location}
                        </span>
                      </div>
                    </div>

                    <motion.a
                      href={`/events/${event.slug}`}
                      className={eventLink}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`View details for ${event.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>View More</span>
                      <ArrowRight size={14} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default EventsGrid;
