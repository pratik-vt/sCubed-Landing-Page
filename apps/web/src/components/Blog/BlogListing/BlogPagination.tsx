'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  paginationContainer,
  paginationButton,
  paginationButtonDisabled,
  pageNumbersContainer,
  pageNumber,
  pageNumberActive,
  ellipsis,
} from './pagination.css';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  categoryFilter?: string;
  tagFilter?: string;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  searchQuery,
  categoryFilter,
  tagFilter,
}) => {
  // Helper function to build URL with search params
  const buildUrl = (page: number): string => {
    const params = new URLSearchParams();
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    if (categoryFilter) {
      params.set('category', categoryFilter);
    }
    
    if (tagFilter) {
      params.set('tag', tagFilter);
    }

    const query = params.toString();
    return query ? `/blog?${query}` : '/blog';
  };

  // Generate page numbers to show
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Show 5 page numbers at most
    
    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={paginationContainer}>
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className={paginationButton}
        >
          <ChevronLeft size={16} style={{ marginRight: '0.25rem' }} />
          Previous
        </Link>
      ) : (
        <span className={paginationButtonDisabled}>
          <ChevronLeft size={16} style={{ marginRight: '0.25rem' }} />
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className={pageNumbersContainer}>
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={ellipsis}
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={`${pageNumber} ${isCurrentPage ? pageNumberActive : ''}`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className={paginationButton}
        >
          Next
          <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
        </Link>
      ) : (
        <span className={paginationButtonDisabled}>
          Next
          <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} />
        </span>
      )}
    </div>
  );
};

export default BlogPagination; 