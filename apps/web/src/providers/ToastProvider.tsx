'use client';

/**
 * Toast Provider
 * Wraps the application with Sonner toast notifications
 * Configured to match the S Cubed design system
 */

import { Toaster } from 'sonner';

import { colors, radius, shadows } from '@/styles/tokens.css';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      duration={4000}
      closeButton
      richColors
      expand={false}
      toastOptions={{
        style: {
          borderRadius: radius.md,
          boxShadow: shadows.lg,
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          padding: '12px 16px',
        },
        classNames: {
          toast: 'toast-base',
          title: 'toast-title',
          description: 'toast-description',
          success: 'toast-success',
          error: 'toast-error',
          warning: 'toast-warning',
          info: 'toast-info',
        },
      }}
      // Theme colors matching the design system
      theme="light"
    />
  );
}

// Note: Sonner uses CSS variables which we can customize via global styles
// The toast appearance will be refined in the global styles if needed
