import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import BlogArticle from '../../../components/Blog/BlogArticle';
import { getBlogPost, getStrapiImageUrl } from '../../../lib/strapi';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await getBlogPost(slug);
    
    if (!response.data || response.data.length === 0) {
      return {
        title: 'Blog Post Not Found | S Cubed',
        description: 'The requested blog post could not be found.',
      };
    }
    
    const post = response.data[0];
    
    // Use meta_title if available, otherwise use title with site branding
    const title = post.meta_title || `${post.title} | S Cubed Blog`;
    
    // Use meta_description if available, otherwise use excerpt
    const description = post.meta_description || post.excerpt || `Read about ${post.title} on the S Cubed blog.`;
    
    // Get featured image URL for social sharing
    const imageUrl = getStrapiImageUrl(post.featured_image || post.hero_image);
    
    // Build author name
    const authorName = post.author?.name || 'S Cubed Team';
    
    // Build category names for keywords
    const categories = post.categories?.map(cat => cat.name).join(', ') || '';
    const tags = post.tags?.map(tag => tag.name).join(', ') || '';
    
    const metadata: Metadata = {
      title,
      description,
      authors: post.author ? [{ name: post.author.name }] : [{ name: 'S Cubed Team' }],
      category: categories,
      keywords: `${categories}${tags ? `, ${tags}` : ''}, therapy software, practice management, S Cubed`,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [authorName],
        tags: post.tags?.map(tag => tag.name) || [],
        ...(imageUrl && {
          images: [
            {
              url: imageUrl,
              width: post.featured_image?.width || post.hero_image?.width || 1200,
              height: post.featured_image?.height || post.hero_image?.height || 630,
              alt: post.featured_image?.alternativeText || post.hero_image?.alternativeText || post.title,
            },
          ],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        ...(imageUrl && {
          images: [imageUrl],
        }),
      },
      // Structured data for rich snippets
      other: {
        'article:author': authorName,
        'article:published_time': post.publishedAt,
        'article:modified_time': post.updatedAt,
        'article:section': categories,
        'article:tag': tags,
      },
    };
    
    return metadata;
  } catch (error) {
    console.error('Error generating metadata for blog post:', error);
    return {
      title: 'Blog Post | S Cubed',
      description: 'Read the latest insights and updates from the S Cubed team.',
    };
  }
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
    
    // Debug the post data structure
    console.log('Blog post data:', JSON.stringify(post, null, 2));
    console.log('Author data:', post.author);
    console.log('Author avatar:', post.author?.avatar);
    
    return (
        <BlogArticle post={post} />
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
} 