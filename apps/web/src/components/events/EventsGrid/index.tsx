'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

import { eventsData, formatEventDate } from '../../../lib/eventsData';

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
  eventsSection,
  eventThumbnail,
  eventTime,
  eventTitle,
  eventType,
  eventLocation,
} from './styles.css';

const EventsGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
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

  const getEventTypeStyle = (type: string) => {
    switch (type) {
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

  return (
    <section className={eventsSection} ref={sectionRef}>
      <motion.div
        className={eventGrid}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {eventsData.map((event, index) => (
          <motion.article
            key={event.id}
            className={eventCard}
            variants={itemVariants}
            whileHover="hover"
            custom={index}
          >
            <motion.div variants={cardHoverVariants}>
              <div className={eventImageWrapper}>
                <Image
                  src={`https://picsum.photos/400/200?random=${event.id}`}
                  alt={event.title}
                  width={400}
                  height={200}
                  className={eventThumbnail}
                  unoptimized
                />
                <span
                  className={eventType}
                  style={getEventTypeStyle(event.type)}
                >
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>

              <div className={eventCardContent}>
                <h3 className={eventTitle}>{event.title}</h3>
                <p className={eventDescription}>
                  {truncateDescription(event.description)}
                </p>

                <div className={eventDetails}>
                  <div className={eventDetailsInfo}>
                    <div className={eventDetailsItem}>
                      <Calendar className={eventIcon} size={16} />
                      <span className={eventDate}>{formatEventDate(event.date)}</span>
                    </div>
                    <div className={eventDetailsItem}>
                      <Clock className={eventIcon} size={16} />
                      <span className={eventTime}>{event.time}</span>
                    </div>
                    <div className={eventDetailsItem}>
                      <MapPin className={eventIcon} size={16} />
                      <span className={eventLocation} title={event.location}>
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {event.registrationLink && (
                    <motion.a
                      href={event.registrationLink}
                      className={eventLink}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`View details for ${event.title}`}
                    >
                      <span>View More</span>
                      <ArrowRight size={14} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default EventsGrid;