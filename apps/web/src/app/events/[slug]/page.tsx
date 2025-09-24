import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import EventDetail from '@/components/Events/EventDetail';
import EventSchema from '@/components/Events/EventSchema';
import { getEvent } from '@/lib/events-api';
import { getStrapiImageUrl } from '@/lib/strapi';

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getEvent(slug);

    if (!response.data || response.data.length === 0) {
      return {
        title: 'Event Not Found | S Cubed',
        description: 'The requested event could not be found.',
      };
    }

    const event = response.data[0];
    const title = event.meta_title || `${event.title} | S Cubed Events`;
    const description =
      event.meta_description || event.excerpt || `Join us for ${event.title}`;
    const imageUrl = getStrapiImageUrl(
      event.featured_image || event.hero_image,
    );
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const absoluteUrl = `${baseUrl}/events/${slug}`;
    const absoluteImageUrl =
      imageUrl && !imageUrl.startsWith('http')
        ? `${baseUrl}${imageUrl}`
        : imageUrl;

    const metadata: Metadata = {
      title,
      description,
      keywords: `therapy events, ABA therapy, ${event.categories?.map((c) => c.name).join(', ')}`,
      alternates: {
        canonical: `/events/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: absoluteUrl,
        siteName: 'S Cubed',
        ...(absoluteImageUrl && {
          images: [
            {
              url: absoluteImageUrl,
              width:
                event.featured_image?.width || event.hero_image?.width || 1200,
              height:
                event.featured_image?.height || event.hero_image?.height || 630,
              alt:
                event.featured_image?.alternativeText ||
                event.hero_image?.alternativeText ||
                event.title,
            },
          ],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        site: '@scubed_solutions',
        ...(absoluteImageUrl && {
          images: [absoluteImageUrl],
        }),
      },
      other: {
        'event:start_date': event.start_date,
        'event:end_date': event.end_date,
        'event:location': event.location || 'Online',
      },
    };

    return metadata;
  } catch (error) {
    console.error('Error generating metadata for event:', error);
    return {
      title: 'Event | S Cubed',
      description: 'Join our upcoming events and workshops.',
    };
  }
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  try {
    const response = await getEvent(slug);

    if (!response.data || response.data.length === 0) {
      notFound();
    }

    const event = response.data[0];
    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io'}/events/${slug}`;

    return (
      <>
        <EventSchema event={event} url={currentUrl} />
        <BreadcrumbSchema
          items={[
            { name: 'Home', item: '/' },
            { name: 'Events', item: '/events' },
            { name: event.title, item: `/events/${slug}` },
          ]}
        />
        <EventDetail event={event} />
      </>
    );
  } catch (error) {
    console.error('Error fetching event:', error);
    notFound();
  }
}
