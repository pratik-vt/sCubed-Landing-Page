import { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';

import { getBlogPosts } from '@/lib/strapi';
import { getEvents } from '@/lib/events-api';

// Next.js route segment config: controls how often this route is regenerated (ISR)
// Note: must be a literal number — Next.js statically analyzes this value
export const revalidate = 86400; // 24 hours

// Cache TTL for unstable_cache (matches revalidate above)
const CACHE_TTL = 86400;

const getCachedBlogSlugs = unstable_cache(
  async () => {
    const response = await getBlogPosts({ page: 1, pageSize: 5000 });
    return response.data.map((post) => ({
      slug: post.slug,
      updatedAt: post.updatedAt || post.publish_date,
    }));
  },
  ['sitemap-blog-slugs'],
  { revalidate: CACHE_TTL },
);

const getCachedEventSlugs = unstable_cache(
  async () => {
    const response = await getEvents({ page: 1, pageSize: 5000 });
    return response.data.map((event) => ({
      slug: event.slug,
      updatedAt: event.updatedAt,
    }));
  },
  ['sitemap-event-slugs'],
  { revalidate: CACHE_TTL },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aba-practice-management-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aba-authorization-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/billing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aba-data-collection-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guardian-portal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telehealth-platform`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scheduling-and-appointments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Fetch dynamic blog posts and events in parallel (cached for 1 hour)
  const [blogSlugs, eventSlugs] = await Promise.all([
    getCachedBlogSlugs().catch((error) => {
      console.error('Failed to fetch blog posts for sitemap:', error);
      return [] as { slug: string; updatedAt: string }[];
    }),
    getCachedEventSlugs().catch((error) => {
      console.error('Failed to fetch events for sitemap:', error);
      return [] as { slug: string; updatedAt: string }[];
    }),
  ]);

  const blogPostPages: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const eventPages: MetadataRoute.Sitemap = eventSlugs.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPostPages, ...eventPages];
}
