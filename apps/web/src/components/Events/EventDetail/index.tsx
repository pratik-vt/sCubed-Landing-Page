'use client';

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Share2, Check, Copy } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

import type { Event } from '../../../types/event';
import { getStrapiImageUrl } from '../../../lib/strapi';
import {
  formatEventDate,
  formatEventTime,
  getEventLocationString,
  getEventStatus,
  isEventRegistrationOpen
} from '../../../lib/events-api';

import * as styles from './styles.css';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = memo(({ event }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const status = useMemo(() => getEventStatus(event), [event]);
  const registrationOpen = useMemo(() => isEventRegistrationOpen(event), [event]);
  const heroImageUrl = useMemo(() =>
    (event.hero_image || event.featured_image)
      ? getStrapiImageUrl(event.hero_image || event.featured_image)
      : '',
    [event.hero_image, event.featured_image]
  );
  const eventDate = useMemo(() => formatEventDate(event.start_date, event.end_date), [event.start_date, event.end_date]);
  const eventTime = useMemo(() => formatEventTime(event.start_date), [event.start_date]);
  const eventLocation = useMemo(() => getEventLocationString(event), [event]);
  const categories = event.categories || [];
  const eventTags = event.tags || [];

  // Fallback URL construction for social sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io';
  const fallbackUrl = `${baseUrl}/events/${event.slug}`;

  // Set current URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    const urlToCopy = currentUrl || fallbackUrl;
    if (urlToCopy) {
      try {
        await navigator.clipboard.writeText(urlToCopy);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch {
        // Silently handle clipboard errors
      }
    }
  }, [currentUrl, fallbackUrl]);


  return (
    <div className={styles.articleContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={event.title}
            fill
            className={styles.heroImage}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {event.title}
          </h1>
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaItem}>
              <Calendar size={20} />
              {eventDate}
            </span>
            <span className={styles.heroMetaItem}>
              <Clock size={20} />
              {eventTime}
            </span>
            <span className={styles.heroMetaItem}>
              <MapPin size={20} />
              {eventLocation}
            </span>
          </div>
          {registrationOpen && event.registration_url && (
            <div className={styles.heroCta}>
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroRegisterButton}
              >
                Register Now
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* Breadcrumb Row */}
        <div className={styles.breadcrumbRow}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link> / <Link href="/events">Events</Link>
            {' '} / <span>{event.title}</span>
          </nav>
        </div>

        <div className={styles.contentLayout}>
          {/* Main Content */}
          <main className={styles.mainContent}>
            <article>
              {/* Event Description - Sanitized */}
              <div className={styles.articleContent}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(event.description, {
                      ADD_TAGS: ['iframe'],
                      ADD_ATTR: ['allowfullscreen', 'frameborder', 'src']
                    })
                  }}
                />
              </div>

              {/* Categories and Tags */}
              {(categories.length > 0 || eventTags.length > 0) && (
                <div className={styles.categoriesTagsSection}>
                  {categories.length > 0 && (
                    <div className={styles.sectionWrapper}>
                      <h4 className={styles.sectionLabel}>
                        CATEGORIES
                      </h4>
                      <div className={styles.tags}>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/events?category=${category.slug}`}
                            className={styles.tag}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {eventTags.length > 0 && (
                    <div className={styles.sectionWrapper}>
                      <h4 className={styles.sectionLabel}>
                        TAGS
                      </h4>
                      <div className={styles.tags}>
                        {eventTags.map((tagItem) => (
                          <Link
                            key={tagItem.id}
                            href={`/events?tag=${tagItem.slug}`}
                            className={styles.tag}
                          >
                            #{tagItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Social Share Section */}
              <div className={styles.socialShare}>
                <div className={styles.shareHeader}>
                  <div>
                    <h3 className={styles.socialShareTitle}>
                      <Share2 size={24} />
                      Share this event
                    </h3>
                    <div className={styles.shareStats}>
                      Help others discover this event
                    </div>
                  </div>
                </div>

                <div className={styles.socialShareGrid}>
                  <button
                    onClick={handleCopyLink}
                    className={styles.copyLinkButton}
                  >
                    {copySuccess ? (
                      <>
                        <Check size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(currentUrl || fallbackUrl)}&via=scubed_solutions`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.twitterButton}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </a>

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl || fallbackUrl)}&title=${encodeURIComponent(event.title)}&summary=${encodeURIComponent(event.excerpt || '')}&source=${encodeURIComponent('S Cubed')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinButton}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl || fallbackUrl)}&quote=${encodeURIComponent(event.title + ' - ' + (event.excerpt || ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.facebookButton}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Event Info Card */}
            <div className={styles.eventInfoCard}>
              <h3 className={styles.eventInfoTitle}>Event Details</h3>

              {/* Date & Time */}
              <div className={styles.infoSection}>
                <h4><Calendar size={16} /> Date & Time</h4>
                <p>{eventDate}</p>
                <p className={styles.infoSubtext}>{eventTime}</p>
              </div>

              {/* Location */}
              {event.location && (
                <div className={styles.infoSection}>
                  <h4><MapPin size={16} /> Location</h4>
                  <p>{event.location}</p>
                </div>
              )}

              {/* Status */}
              <div className={styles.infoSection}>
                <h4>Status</h4>
                <span className={`${styles.statusBadge} ${status === 'upcoming' ? styles.statusUpcoming : status === 'ongoing' ? styles.statusOngoing : styles.statusCompleted}`}>
                  {status}
                </span>
              </div>

              {/* Registration CTA */}
              {registrationOpen && event.registration_url && (
                <div className={styles.ctaWrapper}>
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.registerButtonSidebar}
                  >
                    Register for Event
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
});

EventDetail.displayName = 'EventDetail';

export default EventDetail;