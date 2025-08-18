import React from 'react';
import type { Metadata } from 'next';

import Layout from '../../components/Layout';
import BlogListing from '../../components/Blog/BlogListing';

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

export default function BlogPage() {
  return (
    <Layout zeroHeaderMargin={true}>
      <BlogListing />
    </Layout>
  );
} 