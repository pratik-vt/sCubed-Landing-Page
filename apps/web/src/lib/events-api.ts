import type { Event, EventsResponse } from '../types/event';

import { StrapiResponse } from './strapi';

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'http://localhost:1337';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
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
      } catch (parseError) {
        // If we can't parse the error response, use the original message
      }
      console.error('API URL:', url);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi API fetch error:', error);
    throw error;
  }
}

export async function getEvents(
  params: {
    page?: number;
    pageSize?: number;
    featured?: boolean;
    category?: string;
    tag?: string;
    search?: string;
    start_date_after?: string;
    start_date_before?: string;
  } = {},
): Promise<EventsResponse> {
  const {
    page = 1,
    pageSize = 10,
    featured,
    category,
    tag,
    search,
    start_date_after,
    start_date_before,
  } = params;

  const queryParams = new URLSearchParams({
    'pagination[page]': page.toString(),
    'pagination[pageSize]': pageSize.toString(),
    'populate[0]': 'featured_image',
    'populate[1]': 'hero_image',
    'populate[2]': 'categories',
    'populate[3]': 'tags',
    sort: 'start_date:desc',
  });

  // Add publishedAt filter to only get published content
  queryParams.set('filters[publishedAt][$notNull]', 'true');

  // Add featured filter if specified
  if (featured !== undefined) {
    queryParams.set('filters[featured][$eq]', featured.toString());
  }

  // Add category filter if specified
  if (category) {
    queryParams.set('filters[categories][slug][$eq]', category);
  }

  // Add tag filter if specified
  if (tag) {
    queryParams.set('filters[tags][slug][$eq]', tag);
  }

  // Add date range filters if specified
  if (start_date_after) {
    queryParams.set('filters[start_date][$gte]', start_date_after);
  }

  if (start_date_before) {
    queryParams.set('filters[start_date][$lte]', start_date_before);
  }

  // Add search filter if specified
  if (search) {
    queryParams.set('filters[$or][0][title][$containsi]', search);
    queryParams.set('filters[$or][1][description][$containsi]', search);
    queryParams.set('filters[$or][2][excerpt][$containsi]', search);
  }

  return fetchAPI(`/events?${queryParams}`);
}

export async function getEvent(slug: string): Promise<StrapiResponse<Event[]>> {
  try {
    const queryParams = new URLSearchParams();

    // Filters
    queryParams.set('filters[slug][$eq]', slug);
    queryParams.set('filters[publishedAt][$notNull]', 'true');

    // Basic population with all fields
    queryParams.set('populate[categories]', 'true');
    queryParams.set('populate[tags]', 'true');
    queryParams.set('populate[featured_image]', 'true');
    queryParams.set('populate[hero_image]', 'true');

    return await fetchAPI(`/events?${queryParams}`);
  } catch (error) {
    console.warn(
      'Failed to fetch event with advanced population, falling back to basic population:',
      error,
    );

    // Fallback to basic population if the advanced syntax fails
    const fallbackParams = new URLSearchParams();
    fallbackParams.set('filters[slug][$eq]', slug);
    fallbackParams.set('filters[publishedAt][$notNull]', 'true');
    fallbackParams.set('populate', '*');

    return await fetchAPI(`/events?${fallbackParams}`);
  }
}

export async function getUpcomingEvents(
  limit: number = 5,
): Promise<EventsResponse> {
  const today = new Date().toISOString();

  return getEvents({
    pageSize: limit,
    start_date_after: today,
  });
}

export async function getFeaturedEvents(
  limit: number = 3,
): Promise<EventsResponse> {
  return getEvents({
    pageSize: limit,
    featured: true,
  });
}

export async function getRelatedEvents(
  event: Event,
  limit: number = 3,
): Promise<EventsResponse> {
  // Get events with similar categories or tags
  const categorySlug = event.categories?.[0]?.slug;
  const tagSlug = event.tags?.[0]?.slug;

  const queryParams = new URLSearchParams({
    'pagination[pageSize]': limit.toString(),
    populate: '*',
    'filters[publishedAt][$notNull]': 'true',
    'filters[slug][$ne]': event.slug,
    sort: 'start_date:desc',
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
    year: 'numeric',
  };

  if (start.toDateString() === end.toDateString()) {
    // Same day event
    return start.toLocaleDateString('en-US', options);
  } else if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    // Same month
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${start.getFullYear()}`;
  } else {
    // Different months
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  }
}

export function formatEventTime(time?: string): string {
  if (!time) return '';

  // Handle HH:mm format
  const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

  if (isNaN(hours) || isNaN(minutes)) return '';

  // Convert to 12-hour format with AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for midnight

  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function getEventTimeRange(event: Event): string {
  if (!event.time) return '';

  const startTime = formatEventTime(event.time);
  if (!startTime) return '';

  // For single-day events or when no end time is specified, just show start time
  if (event.start_date === event.end_date) {
    return startTime;
  }

  // For multi-day events, we might want to show just the start time
  // or handle it differently based on business requirements
  return startTime;
}

export function getEventStatus(
  event: Event,
): 'upcoming' | 'ongoing' | 'completed' {
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
  if (!event.registration_url) return false;

  const now = new Date();
  const end = new Date(event.end_date);

  // Check if registration deadline has passed
  if (event.registration_deadline) {
    const deadline = new Date(event.registration_deadline);
    if (now > deadline) return false;
  }

  // Registration is open if current date is before or during the event
  return now <= end;
}

export type RegistrationStatus =
  | 'open'
  | 'deadline_passed'
  | 'event_ended'
  | 'no_registration';

export function getRegistrationStatus(event: Event): RegistrationStatus {
  if (!event.registration_url) return 'no_registration';

  const now = new Date();
  const start = new Date(event.start_date);
  const end = new Date(event.end_date);

  // Check if event has ended
  if (now > end) return 'event_ended';

  // Check if registration deadline has passed
  if (event.registration_deadline) {
    const deadline = new Date(event.registration_deadline);
    if (now > deadline) return 'deadline_passed';
  }

  return 'open';
}

export function getEventLocationString(event: Event): string {
  return event.location || 'Online Event';
}

export function getEventPriceRange(event: Event): string {
  // Since we don't have pricing in the simplified schema,
  // this would need to be parsed from the description or removed
  return '';
}
