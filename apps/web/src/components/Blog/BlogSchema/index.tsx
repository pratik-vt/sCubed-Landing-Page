import React from 'react';
import Script from 'next/script';

import { BlogPost, getStrapiImageUrl } from '../../../lib/strapi';

interface BlogSchemaProps {
  post: BlogPost;
  url: string;
}

const BlogSchema: React.FC<BlogSchemaProps> = ({ post, url }) => {
  // Calculate word count from content blocks
  const calculateWordCount = (contentBlocks: any[]): number => {
    if (!contentBlocks || contentBlocks.length === 0) return 0;
    
    let totalWords = 0;
    contentBlocks.forEach(block => {
      if (block.__component === 'blog.text-module' && block.content) {
        const words = block.content.trim().split(/\s+/).length;
        totalWords += words;
      }
    });
    
    return totalWords;
  };

  // Extract plain text content from content blocks for articleBody
  const extractArticleBody = (contentBlocks: any[]): string => {
    if (!contentBlocks || contentBlocks.length === 0) return '';
    
    let content = '';
    contentBlocks.forEach(block => {
      if (block.__component === 'blog.text-module' && block.content) {
        // Remove markdown formatting for a cleaner articleBody
        const cleanContent = block.content
          .replace(/#{1,6}\s/g, '') // Remove markdown headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
          .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
          .replace(/\n\s*\n/g, '\n\n') // Clean up extra newlines
          .trim();
        
        content += cleanContent + '\n\n';
      }
    });
    
    return content.trim();
  };

  // Build keywords array from categories and tags
  const buildKeywords = (): string[] => {
    const keywords: string[] = [];
    
    // Add category names
    if (post.categories) {
      post.categories.forEach(category => {
        keywords.push(category.name);
      });
    }
    
    // Add tag names
    if (post.tags) {
      post.tags.forEach(tag => {
        keywords.push(tag.name);
      });
    }
    
    // Add some default keywords
    keywords.push('Therapy Software', 'Practice Management', 'S Cubed');
    
    return keywords;
  };

  // Get image URL for the post
  const getImageUrl = (): string => {
    const image = post.hero_image || post.featured_image;
    if (image) {
      const imageUrl = getStrapiImageUrl(image);
      // Make sure it's an absolute URL
      return imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io'}${imageUrl}`;
    }
    return '';
  };

  // Get logo URL (we'll use a default S Cubed logo)
  const getLogoUrl = (): string => {
    return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io'}/images/scubed-logo-small.png`;
  };

  // Build article section from categories
  const getArticleSection = (): string => {
    if (post.categories && post.categories.length > 0) {
      return post.categories.map(cat => cat.name).join(', ');
    }
    return 'Healthcare Technology';
  };

  // Calculate reading time in ISO 8601 duration format
  const getReadingTime = (): string => {
    const readTimeMinutes = post.estimated_read_time || 5;
    return `PT${readTimeMinutes}M`;
  };

  // Get word count
  const wordCount = calculateWordCount(post.content_blocks || []);
  
  // Get article body
  const articleBody = extractArticleBody(post.content_blocks || []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "alternativeHeadline": post.excerpt || `Learn more about ${post.title}`,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "S Cubed Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "S Cubed",
      "logo": {
        "@type": "ImageObject",
        "url": getLogoUrl()
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "articleSection": getArticleSection(),
    "wordcount": wordCount.toString(),
    "timeRequired": getReadingTime(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(getImageUrl() && { "image": getImageUrl() }),
    "keywords": buildKeywords(),
    "description": post.meta_description || post.excerpt || `Read about ${post.title} on the S Cubed blog.`,
    ...(articleBody && { "articleBody": articleBody })
  };

  return (
    <Script
      id={`blog-schema-${post.slug}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2)
      }}
    />
  );
};

export default BlogSchema; 