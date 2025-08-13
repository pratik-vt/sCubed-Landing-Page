'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, ChevronUp } from 'lucide-react';

// Import Strapi types and utilities
import { 
  BlogPost, 
  getStrapiImageUrl, 
  formatDate, 
  calculateReadTime 
} from '../../../lib/strapi';
import DynamicContentRenderer from '../DynamicContentRenderer';

import {
  articleContainer,
  heroSection,
  heroImage,
  heroOverlay,
  heroContent,
  heroTitle,
  heroMeta,
  heroMetaItem,
  contentWrapper,
  articleContent,
  tableOfContents,
  tocTitle,
  tocList,
  tocItem,
  sidebar,
  relatedPosts,
  socialShare,
  breadcrumb,
  categoryTag,
  scrollToTop,
  authorInfo,
  authorAvatar,
  authorDetails,
  tags,
  tag,
  socialShareTitle,
  socialShareButtons,
  twitterButton,
  linkedinButton,
  facebookButton,
  contentLayout,
  mainContent,
  categoriesTagsSection,
  sectionWrapper,
  sectionLabel,
} from './styles.css';
import './global.css';

interface BlogArticleProps {
  post: BlogPost;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ post }) => {
  // Get post data
  const title = post.title;
  const heroImageUrl = (post.hero_image || post.featured_image) 
    ? getStrapiImageUrl(post.hero_image || post.featured_image) 
    : '';
  const authorName = post.author?.name || 'S³ Team';
  const authorAvatarImage = post.author?.avatar;
  const authorAvatarUrl = authorAvatarImage ? getStrapiImageUrl(authorAvatarImage) : null;
  const authorPosition = post.author?.position;
  const authorBio = post.author?.bio;
  const publishDate = formatDate(post.publishedAt);
  const readTime = post.estimated_read_time || calculateReadTime(post.content_blocks || []);
  const categories = post.categories || [];
  const postTags = post.tags || [];
  const contentBlocks = post.content_blocks || [];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get primary category for breadcrumb
  const primaryCategory = categories.length > 0 ? categories[0] : null;

  return (
    <div className={articleContainer}>
      {/* Hero Section */}
      <section className={heroSection}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className={heroImage}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700" />
        )}
        <div className={heroOverlay} />
        <div className={heroContent}>
          <h1 className={heroTitle}>
            {title}
          </h1>
          <div className={heroMeta}>
            <span className={heroMetaItem}>
              <Calendar size={20} />
              {publishDate}
            </span>
            <span className={heroMetaItem}>
              <User size={20} />
              {authorName}
            </span>
            <span className={heroMetaItem}>
              <Clock size={20} />
              {readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content Wrapper */}
      <div className={contentWrapper}>
        {/* Breadcrumb */}
        <nav className={breadcrumb}>
          <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
          {primaryCategory && (
            <>
              {' '} / <span className={categoryTag}>{primaryCategory.name}</span>
            </>
          )}
          {' '} / <span>{title}</span>
        </nav>

        <div className={contentLayout}>
          {/* Main Content */}
          <main className={mainContent}>
            <article>
              {/* Audio Player - Optional for podcast-style content */}
              {/* You can add this back if you have audio content in Strapi */}
              {/* <div className={audioPlayer} style={{ marginBottom: '2rem' }}>
                <Play size={20} />
                <span>Listen to Audio Version</span>
              </div> */}

              {/* Dynamic Content Blocks */}
              <div className={articleContent}>
                <DynamicContentRenderer content_blocks={contentBlocks} />
              </div>

              {/* Categories and Tags */}
              {(categories.length > 0 || postTags.length > 0) && (
                <div className={categoriesTagsSection}>
                  {categories.length > 0 && (
                    <div className={sectionWrapper}>
                      <h4 className={sectionLabel}>
                        CATEGORIES
                      </h4>
                      <div className={tags}>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/blog?category=${category.slug}`}
                            className={tag}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {postTags.length > 0 && (
                    <div className={sectionWrapper}>
                      <h4 className={sectionLabel}>
                        TAGS
                      </h4>
                      <div className={tags}>
                        {postTags.map((tagItem) => (
                          <Link
                            key={tagItem.id}
                            href={`/blog?tag=${tagItem.slug}`}
                            className={tag}
                          >
                            #{tagItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Author Information */}
              {post.author && (
                <div className={authorInfo}>
                  {authorAvatarUrl && (
                    <div className={authorAvatar}>
                      <Image
                        src={authorAvatarUrl}
                        alt={authorName}
                        width={80}
                        height={80}
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                  )}
                  <div className={authorDetails}>
                    <h4>{authorName}</h4>
                    {authorPosition && <p>{authorPosition}</p>}
                    {authorBio && (
                      <p>{authorBio}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Social Share */}
              {post.social_share && (
                <div className={socialShare}>
                  <h4 className={socialShareTitle}>Share this article</h4>
                  <div className={socialShareButtons}>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twitterButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkedinButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={facebookButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                  </div>
                </div>
              )}
            </article>
          </main>

          {/* Sidebar */}
          <aside className={sidebar}>
            {/* Table of Contents - if enabled */}
            {post.table_of_contents && contentBlocks.length > 0 && (
              <div className={tableOfContents}>
                <h3 className={tocTitle}>Table of Contents</h3>
                <ul className={tocList}>
                  {contentBlocks
                    .filter(block => block.__component === 'blog.text-module' && block.content)
                    .slice(0, 5) // Limit to first 5 text modules
                    .map((block, index) => {
                      // Extract heading from content (simple approach)
                      const headingMatch = block.content.match(/^#+\s(.+)$/m);
                      const heading = headingMatch ? headingMatch[1] : `Section ${index + 1}`;
                      return (
                        <li key={block.id || index} className={tocItem}>
                          <button onClick={() => scrollToSection(`section-${index}`)}>
                            {heading}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {/* Related Posts Placeholder */}
            <div className={relatedPosts}>
              <h3>Related Articles</h3>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '1rem' }}>
                Related articles will be available soon.
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Scroll to Top */}
      <button className={scrollToTop} onClick={handleScrollToTop}>
        <ChevronUp size={20} />
      </button>
    </div>
  );
};

export default BlogArticle; 