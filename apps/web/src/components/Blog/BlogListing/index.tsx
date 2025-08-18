'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';

// Import blog placeholder image
import BlogPlaceholder from '../../../images/blog-placeholder.png';



// Import Strapi utilities
import { 
  getBlogPosts, 
  BlogPost, 
  getStrapiImageUrl, 
  formatDate, 
  calculateReadTime 
} from '../../../lib/strapi';

import {
  listingContainer,
  postsWrapper,
  postsGrid,
  postCard,
  postImage,
  postContent,
  featuredBadge,
  postTitle,
  postExcerpt,
  postMeta,
  metaItem,
  loadMoreButton,
} from './styles.css';
import './global.css';

const BlogListing: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch blog posts from Strapi
  const fetchPosts = async (pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      const response = await getBlogPosts({
        page: pageNum,
        pageSize: 6
      });

      if (response.data) {
        if (append) {
          setBlogPosts(prev => [...prev, ...response.data]);
        } else {
          setBlogPosts(response.data);
        }

        // Update pagination info
        const pagination = response.meta.pagination;
        if (pagination) {
          setTotalPosts(pagination.total);
          setHasMorePosts(pagination.page < pagination.pageCount);
        }
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Load more posts
  const loadMorePosts = async () => {
    if (!hasMorePosts || loading) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPosts(nextPage, true);
  };

  // Helper function to get read time
  const getReadTime = (post: BlogPost): string => {
    const readTime = post.estimated_read_time || 
                     calculateReadTime(post.content_blocks || []);
    return `${readTime} min read`;
  };

  // Error state
  if (error && blogPosts.length === 0) {
    return (
      <div className={listingContainer}>
        <div className={postsWrapper}>
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load Blog Posts
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchPosts()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={listingContainer}>
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 0 3rem',
        marginBottom: '3rem',
        borderRadius: '0 0 24px 24px',
        color: 'white',
        textAlign: 'center' as const
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 className="hero-title">
            S Cubed Insights & Updates
          </h1>
          <p className="hero-subtitle">
            Stay updated with the latest developments in therapy practice management, 
            industry insights, and expert guidance from our team.
          </p>
          {totalPosts > 0 && (
            <p className="hero-count">
              {totalPosts} article{totalPosts !== 1 ? 's' : ''} available
            </p>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className={postsWrapper}>
        {loading && blogPosts.length === 0 ? (
          // Initial loading state
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          // No posts state
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Blog Posts Yet
              </h3>
              <p className="text-gray-600">
                Check back soon for our latest insights and updates!
              </p>
            </div>
          </div>
        ) : (
          // Posts grid
          <div className={postsGrid}>
            {blogPosts.map((post) => {
              const featuredImageUrl = post.featured_image 
                ? getStrapiImageUrl(post.featured_image) 
                : '';
              const authorName = post.author?.name || 'S Cubed Team';
              const publishDate = formatDate(post.publishedAt);
              const readTime = getReadTime(post);

              return (
                <article key={post.id} className={postCard}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className={postImage}>
                      {featuredImageUrl ? (
                        <Image
                          src={featuredImageUrl}
                          alt={post.title}
                          width={400}
                          height={280}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <Image
                          src={BlogPlaceholder}
                          alt="S Cubed Blog Placeholder"
                          width={400}
                          height={280}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      )}
                                              {post.featured && (
                        <span className={featuredBadge}>FEATURED</span>
                      )}
                    </div>
                    
                    <div className={postContent}>
                      <div>
                        <h2 
                          className={postTitle}
                          title={post.title}
                        >
                          {post.title}
                        </h2>
                        <p className={postExcerpt}>{post.excerpt}</p>
                      </div>
                      
                      <div className={postMeta}>
                        <span className={metaItem}>
                          <User size={16} />
                          {authorName}
                        </span>
                        <span className={metaItem}>
                          <Calendar size={16} />
                          {publishDate}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {hasMorePosts && blogPosts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              onClick={loadMorePosts} 
              className={loadMoreButton}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </span>
              ) : (
                'Load More Articles'
              )}
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default BlogListing; 