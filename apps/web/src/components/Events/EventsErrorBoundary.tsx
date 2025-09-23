'use client';

import React from 'react';
import Link from 'next/link';

import { ErrorBoundary } from '../ErrorBoundary';

export function EventsErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  const is404 = (error as any).statusCode === 404;

  return (
    <div style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {is404 ? 'Event Not Found' : 'Unable to Load Events'}
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        {is404
          ? 'The event you\'re looking for may have been moved or no longer exists.'
          : 'We\'re having trouble loading events right now. Please try again later.'}
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Try Again
        </button>
        <Link
          href="/events"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            display: 'inline-block'
          }}
        >
          View All Events
        </Link>
      </div>
    </div>
  );
}

export function EventsErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={EventsErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}