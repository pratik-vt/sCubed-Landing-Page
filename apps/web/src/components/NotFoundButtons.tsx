'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundButtons: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap' as const,
    }}>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4338ca';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#4f46e5';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Go Home
      </Link>

      <Link
        href="/blog"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'white',
          color: '#374151',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          border: '1px solid #d1d5db',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.borderColor = '#9ca3af';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
      >
        Visit Blog
      </Link>
    </div>
  );
};

export default NotFoundButtons; 