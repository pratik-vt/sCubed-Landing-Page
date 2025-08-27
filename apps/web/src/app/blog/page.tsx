import React from 'react';
import type { Metadata } from 'next';

import BlogListing from '../../components/Blog/BlogListing';
import { getBlogPosts } from '../../lib/strapi';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    tag?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Blog & Insights | S Cubed - Therapy Practice Management',
  description:
    'Discover the latest insights, tips, and best practices for therapy practice management. Learn how to streamline your ABA, Speech, OT/PT, and counseling practice with S Cubed.',
  keywords: 'therapy blog, practice management tips, ABA insights, speech therapy, occupational therapy, physical therapy, counseling, S Cubed blog',
  openGraph: {
    title: 'Blog & Insights | S Cubed',
    description: 'Discover the latest insights, tips, and best practices for therapy practice management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | S Cubed',
    description: 'Discover the latest insights, tips, and best practices for therapy practice management.',
  },
};

export default async function BlogPage({ searchParams }: Readonly<BlogPageProps>) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const search = params.search || '';
  const category = params.category || '';
  const tag = params.tag || '';

  try {
    // Fetch blog posts from Strapi on the server
    const response = await getBlogPosts({
      page,
      pageSize: 10,
      search: search || undefined,
      category: category || undefined,
      tag: tag || undefined,
    });

    return (
        <BlogListing 
          initialPosts={response.data}
          pagination={response.meta.pagination}
          currentPage={page}
          searchQuery={search}
          categoryFilter={category}
          tagFilter={tag}
        />
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // Return with empty data if fetch fails
    return (
        <BlogListing 
          initialPosts={[]}
          pagination={{
            page: 1,
            pageSize: 6,
            pageCount: 0,
            total: 0,
          }}
          currentPage={page}
          searchQuery={search}
          categoryFilter={category}
          tagFilter={tag}
          error="Failed to load blog posts. Please try again later."
        />
    );
  }
} 