import React from 'react';
import type { Metadata } from 'next';

import Layout from '../components/Layout';
import NotFoundButtons from '../components/NotFoundButtons';

export const metadata: Metadata = {
  title: 'Page Not Found | S Cubed',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <Layout>
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center' as const,
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
        }}>
          {/* 404 Number */}
          <div style={{
            fontSize: '8rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            lineHeight: 1,
          }}>
            404
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>
            Page Not Found
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}>
            Sorry, we couldn't find the page you're looking for. 
            The page may have been moved, deleted, or the URL might be incorrect.
          </p>

          {/* Action buttons - now using client component */}
          <NotFoundButtons />

          {/* Additional help text */}
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}>
              Need Help?
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              margin: 0,
            }}>
              If you believe this is an error, please contact our support team or try navigating from our homepage.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
