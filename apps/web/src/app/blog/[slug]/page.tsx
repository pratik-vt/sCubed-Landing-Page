import React from 'react';
import { notFound } from 'next/navigation';

import Layout from '../../../components/Layout';
import BlogArticle from '../../../components/Blog/BlogArticle';
import { getBlogPost } from '../../../lib/strapi';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  
  try {
    // Fetch the blog post from Strapi
    const response = await getBlogPost(slug);
    
    if (!response.data || response.data.length === 0) {
      notFound();
    }
    
    const post = response.data[0];
    
    return (
      <Layout>
        <BlogArticle post={post} />
      </Layout>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
} 