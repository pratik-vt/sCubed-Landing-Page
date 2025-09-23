'use client';

import { motion, useInView, Variants } from 'framer-motion';
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';

import { getEvents } from '../../../lib/events-api';
import EventCard from '../../Events/EventCard';
import EventCardSkeleton from '../../Events/EventCardSkeleton';
import type { Event } from '../../../types/event';

import {
  eventGrid,
  eventsSection,
} from './styles.css';

const EventsGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const fetchEvents = useCallback(async () => {
    try {
      const response = await getEvents({ pageSize: 12 });

      if (response?.data && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      // Silently handle errors and show empty state
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants: Variants = useMemo(
    () => ({
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
    }),
    []
  );

  if (isLoading) {
    return (
      <section className={eventsSection}>
        <div className={eventGrid}>
          {[...Array(6)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  // If no events from API, show a better empty state
  if (events.length === 0) {
    return (
      <section className={eventsSection}>
        <div className={eventGrid}>
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>
            <h3>No events available</h3>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Please check back later for upcoming events.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={eventsSection} ref={sectionRef}>
      <motion.div
        className={eventGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            variants={itemVariants}
            custom={index}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default EventsGrid;