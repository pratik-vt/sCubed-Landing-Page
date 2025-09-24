'use client';

import { Check, Copy, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import {
  formatEventDate,
  formatEventTime,
  getEventLocationString,
  isEventRegistrationOpen,
} from '../../../lib/events-api';
import { getStrapiImageUrl } from '../../../lib/strapi';
import type { Event } from '../../../types/event';
import BlogContactForm from '../../Blog/BlogContactForm';
import Button from '../../Button/button';

import * as blogTableStyles from '../../Blog/DynamicContentRenderer/table.css';
import * as styles from './styles.css';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = memo(({ event }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const registrationOpen = useMemo(
    () => isEventRegistrationOpen(event),
    [event],
  );
  const heroImageUrl = useMemo(
    () =>
      event.hero_image || event.featured_image
        ? getStrapiImageUrl(event.hero_image || event.featured_image)
        : '',
    [event.hero_image, event.featured_image],
  );
  const eventDate = useMemo(
    () => formatEventDate(event.start_date, event.end_date),
    [event.start_date, event.end_date],
  );
  const eventTime = useMemo(
    () => formatEventTime(event.start_date),
    [event.start_date],
  );
  const eventLocation = useMemo(() => getEventLocationString(event), [event]);
  const categories = event.categories || [];
  const eventTags = event.tags || [];

  // Type for markdown component props
  type ComponentProps = {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  };

  // Custom markdown components for rich text rendering
  const markdownComponents: Components = {
    h1: ({ children, ...props }: ComponentProps) => (
      <h1 className={styles.markdownH1} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentProps) => (
      <h2 className={styles.markdownH2} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentProps) => (
      <h3 className={styles.markdownH3} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: ComponentProps) => (
      <h4 className={styles.markdownH4} {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }: ComponentProps) => (
      <p className={styles.markdownP} {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: ComponentProps) => (
      <ul className={styles.markdownUl} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: ComponentProps) => (
      <ol className={styles.markdownOl} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: ComponentProps) => (
      <li className={styles.markdownLi} {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }: ComponentProps) => (
      <a
        className={styles.markdownA}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: ComponentProps) => (
      <blockquote className={styles.markdownBlockquote} {...props}>
        {children}
      </blockquote>
    ),
    strong: ({ children, ...props }: ComponentProps) => (
      <strong className={styles.markdownStrong} {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: ComponentProps) => (
      <em className={styles.markdownEm} {...props}>
        {children}
      </em>
    ),
    hr: ({ ...props }: ComponentProps) => (
      <hr className={styles.markdownHr} {...props} />
    ),
    table: ({ children, ...props }: ComponentProps) => (
      <div className={blogTableStyles.tableWrapper}>
        <table className={blogTableStyles.table} {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: ComponentProps) => (
      <thead className={blogTableStyles.tableHeader} {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }: ComponentProps) => (
      <th className={blogTableStyles.headerCell} {...props}>
        {children}
      </th>
    ),
    tbody: ({ children, ...props }: ComponentProps) => (
      <tbody className={blogTableStyles.tableBody} {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: ComponentProps) => (
      <tr className={blogTableStyles.bodyRow} {...props}>
        {children}
      </tr>
    ),
    td: ({ children, ...props }: ComponentProps) => (
      <td className={blogTableStyles.bodyCell} {...props}>
        <div className={blogTableStyles.cellContent}>{children}</div>
      </td>
    ),
  };

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
      {/* Hero Section - Image only, no overlays or text */}
      <section className={styles.heroSection}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={event.title}
            fill
            className={styles.heroImage}
            priority
          />
        ) : null}
      </section>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* Breadcrumb Row */}
        <div className={styles.breadcrumbRow}>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link> / <Link href="/events">Events</Link> /{' '}
            <span>{event.title}</span>
          </nav>
        </div>

        <div className={styles.contentLayout}>
          {/* Main Content */}
          <main className={styles.mainContent}>
            <article>
              {/* Event Description - Rendered with Markdown */}
              <div className={styles.articleContent}>
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {event.description || ''}
                </ReactMarkdown>
              </div>

              {/* Categories and Tags */}
              {(categories.length > 0 || eventTags.length > 0) && (
                <div className={styles.categoriesTagsSection}>
                  {categories.length > 0 && (
                    <div className={styles.sectionWrapper}>
                      <h4 className={styles.sectionLabel}>CATEGORIES</h4>
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
                      <h4 className={styles.sectionLabel}>TAGS</h4>
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
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X (Twitter)
                  </a>

                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl || fallbackUrl)}&title=${encodeURIComponent(event.title)}&summary=${encodeURIComponent(event.excerpt || '')}&source=${encodeURIComponent('S Cubed')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinButton}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl || fallbackUrl)}&quote=${encodeURIComponent(event.title + ' - ' + (event.excerpt || ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.facebookButton}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Event Details Card */}
            <div className={styles.eventDetailsCard}>
              <div className={styles.cardContent}>
                <span className={styles.eventLabel}>Event Details</span>

                <h2 className={styles.eventCardTitle}>{event.title}</h2>

                <div className={styles.eventDetails}>
                  {/* Date */}
                  <div className={styles.detailItem}>
                    <div className={styles.iconContainer}>
                      <svg
                        className={styles.icon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="20"
                        height="20"
                      >
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                      </svg>
                    </div>
                    <div className={styles.detailText}>
                      <div className={styles.detailLabel}>Date</div>
                      <div className={styles.detailValue}>{eventDate}</div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className={styles.detailItem}>
                    <div className={styles.iconContainer}>
                      <svg
                        className={styles.icon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="20"
                        height="20"
                      >
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                    </div>
                    <div className={styles.detailText}>
                      <div className={styles.detailLabel}>Time</div>
                      <div className={styles.detailValue}>{eventTime}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className={styles.detailItem}>
                    <div className={styles.iconContainer}>
                      <svg
                        className={styles.icon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="20"
                        height="20"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className={styles.detailText}>
                      <div className={styles.detailLabel}>Location</div>
                      <div className={styles.detailValue}>{eventLocation}</div>
                    </div>
                  </div>
                </div>

                {/* Registration Status */}
                {registrationOpen && event.registration_url ? (
                  <Button
                    onClick={() =>
                      window.open(event.registration_url, '_blank')
                    }
                    className={styles.registerButton}
                    style={{
                      width: '100%',
                      height: 'auto',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                    aria-label="Register for this event"
                  >
                    Register for Event
                  </Button>
                ) : (
                  <div className={styles.registrationStatusClosed}>
                    <svg
                      className={styles.statusIcon}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Registration is currently closed
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <BlogContactForm />
          </aside>
        </div>
      </div>
    </div>
  );
});

EventDetail.displayName = 'EventDetail';

export default EventDetail;
