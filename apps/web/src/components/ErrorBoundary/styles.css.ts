import { style } from '@vanilla-extract/css';

import { colors } from '../../styles/tokens.css';

export const errorContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  padding: '2rem',
  backgroundColor: '#f9fafb',
  borderRadius: '0.5rem',
  margin: '2rem 0',
});

export const errorContent = style({
  textAlign: 'center',
  maxWidth: '500px',
});

export const errorIcon = style({
  width: '48px',
  height: '48px',
  color: '#ef4444',
  marginBottom: '1rem',
});

export const errorTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: '0.5rem',
});

export const errorMessage = style({
  fontSize: '1rem',
  color: '#6b7280',
  marginBottom: '1.5rem',
  lineHeight: 1.6,
});

export const retryButton = style({
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  borderRadius: '0.375rem',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: colors.primary[700],
  },

  ':active': {
    transform: 'scale(0.98)',
  },
});