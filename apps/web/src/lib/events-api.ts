import type {
  Event,
  EventsResponse,
  EventFilters
} from '../types/event';

import { StrapiResponse } from './strapi';

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;

  // Check if we're on the client side
  const isClient = typeof window !== 'undefined';

  // Use different defaults for client vs server
  const defaultOptions: RequestInit = isClient
    ? {
        // Client-side options
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_TOKEN && STRAPI_TOKEN.length < 100 && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      }
    : {
        // Server-side options with optimized caching
        cache: 'force-cache',
        next: { revalidate: 60 }, // Revalidate cache every minute for events
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_TOKEN && STRAPI_TOKEN.length < 100 && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      let errorMessage = `Strapi API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage += ` - ${errorData.error.message || JSON.stringify(errorData.error)}`;
        }
      } catch {
        // If we can't parse the error response, use the original message
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // Re-throw with context for better error tracking in production
    if (error instanceof Error) {
      error.message = `Failed to fetch from ${endpoint}: ${error.message}`;
    }
    throw error;
  }
}

export async function getEvents(filters: EventFilters = {}): Promise<EventsResponse> {
  const {
    page = 1,
    pageSize = 10,
    featured,
    category,
    tag,
    search,
    start_date_after,
    start_date_before
  } = filters;

  const queryParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'populate[featured_image][fields][0]': 'url',
    'populate[featured_image][fields][1]': 'alternativeText',
    'populate[featured_image][fields][2]': 'width',
    'populate[featured_image][fields][3]': 'height',
    'populate[categories][fields][0]': 'name',
    'populate[categories][fields][1]': 'slug',
    'populate[categories][fields][2]': 'color',
    'populate[tags][fields][0]': 'name',
    'populate[tags][fields][1]': 'slug',
    'sort': 'start_date:asc'
  });

  // Only published events
  queryParams.set('filters[publishedAt][$notNull]', 'true');

  // Featured filter
  if (featured !== undefined) {
    queryParams.set('filters[featured][$eq]', featured.toString());
  }

  // Category filter
  if (category) {
    queryParams.set('filters[categories][slug][$eq]', category);
  }

  // Tag filter
  if (tag) {
    queryParams.set('filters[tags][slug][$eq]', tag);
  }

  // Date range filters
  if (start_date_after) {
    queryParams.set('filters[start_date][$gte]', start_date_after);
  }

  if (start_date_before) {
    queryParams.set('filters[start_date][$lte]', start_date_before);
  }

  // Search filter
  if (search) {
    queryParams.set('filters[$or][0][title][$containsi]', search);
    queryParams.set('filters[$or][1][description][$containsi]', search);
    queryParams.set('filters[$or][2][excerpt][$containsi]', search);
  }

  return fetchAPI(`/events?${queryParams}`);
}

export async function getEvent(slug: string): Promise<StrapiResponse<Event[]>> {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid event slug provided');
  }

  const queryParams = new URLSearchParams();

  // Filters
  queryParams.set('filters[slug][$eq]', slug);
  queryParams.set('filters[publishedAt][$notNull]', 'true');

  // Population - use wildcard for all relations
  queryParams.set('populate', '*');

  const response = await fetchAPI(`/events?${queryParams}`);

  if (!response.data || response.data.length === 0) {
    const error = new Error('Event not found');
    (error as any).statusCode = 404;
    throw error;
  }

  return response;
}

export async function getUpcomingEvents(limit: number = 5): Promise<EventsResponse> {
  const today = new Date().toISOString();

  return getEvents({
    pageSize: limit,
    start_date_after: today
  });
}

export async function getFeaturedEvents(limit: number = 3): Promise<EventsResponse> {
  return getEvents({
    pageSize: limit,
    featured: true
  });
}

export async function getRelatedEvents(event: Event, limit: number = 3): Promise<EventsResponse> {
  // Get events with similar categories or tags
  const categorySlug = event.categories?.[0]?.slug;
  const tagSlug = event.tags?.[0]?.slug;

  const queryParams = new URLSearchParams({
    'pagination[pageSize]': limit.toString(),
    'populate': '*',
    'filters[publishedAt][$notNull]': 'true',
    'filters[slug][$ne]': event.slug,
    'sort': 'start_date:asc'
  });

  if (categorySlug) {
    queryParams.set('filters[$or][0][categories][slug][$eq]', categorySlug);
  }

  if (tagSlug) {
    queryParams.set('filters[$or][1][tags][slug][$eq]', tagSlug);
  }

  return fetchAPI(`/events?${queryParams}`);
}

// Helper functions
export function formatEventDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };

  if (start.toDateString() === end.toDateString()) {
    // Same day event
    return start.toLocaleDateString('en-US', options);
  } else if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    // Same month
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${start.getFullYear()}`;
  } else {
    // Different months
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  }
}

export function formatEventTime(date: string): string {
  const eventDate = new Date(date);

  return eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function getEventStatus(event: Event): 'upcoming' | 'ongoing' | 'completed' {
  const now = new Date();
  const start = new Date(event.start_date);
  const end = new Date(event.end_date);

  if (now < start) {
    return 'upcoming';
  } else if (now >= start && now <= end) {
    return 'ongoing';
  } else {
    return 'completed';
  }
}

export function isEventRegistrationOpen(event: Event): boolean {
  const status = getEventStatus(event);
  return status === 'upcoming' && !!event.registration_url;
}

export function getEventLocationString(event: Event): string {
  return event.location || 'Online Event';
}

export function getEventPriceRange(event: Event): string {
  // Since we don't have pricing in the simplified schema,
  // this would need to be parsed from the description or removed
  return '';
}