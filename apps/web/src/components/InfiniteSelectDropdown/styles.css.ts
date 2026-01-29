import { keyframes, style } from '@vanilla-extract/css';

import { colors, radius, shadows, typography } from '@/styles/tokens.css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
  position: 'relative',
  width: '100%',
});

// Matches SubscriptionFlow select + inputLarge styles exactly
export const trigger = style({
  width: '100%',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  paddingRight: '44px', // Extra space for dropdown arrow
  fontSize: typography.fontSize.lg,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  boxSizing: 'border-box',
  cursor: 'pointer',
  textAlign: 'left',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  '@media': {
    '(max-width: 640px)': {
      fontSize: '16px', // Prevent zoom on iOS
    },
  },
});

export const triggerCompact = style({
  height: '42px',
  padding: '0 40px 0 16px',
  fontSize: typography.fontSize.sm,
});

export const triggerOpen = style({
  borderColor: colors.primary[600],
  boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
});

export const triggerError = style({
  borderColor: '#dc2626',
  boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.15)',
});

export const triggerDisabled = style({
  backgroundColor: '#f9fafb',
  cursor: 'not-allowed',
  color: '#9ca3af',
});

export const selectedText = style({
  color: '#111827',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

export const placeholderText = style({
  color: '#6b7280',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  boxShadow: shadows.lg,
  zIndex: 1000,
  animation: `${fadeIn} 0.15s ease-out`,
  overflow: 'hidden',
});

export const searchContainer = style({
  position: 'relative',
  padding: '12px',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#f9fafb',
});

export const searchIcon = style({
  position: 'absolute',
  left: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  pointerEvents: 'none',
});

export const searchInput = style({
  width: '100%',
  height: '40px',
  padding: '0 36px',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.body,
  backgroundColor: '#ffffff',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  '::placeholder': {
    color: '#9ca3af',
  },
  '@media': {
    '(max-width: 640px)': {
      fontSize: '16px', // Prevent zoom on iOS
    },
  },
});

export const clearButton = style({
  position: 'absolute',
  right: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
  color: '#9ca3af',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.15s ease',
  ':hover': {
    backgroundColor: '#e5e7eb',
    color: '#374151',
  },
});

export const optionsList = style({
  maxHeight: '280px',
  overflowY: 'auto',
  padding: '4px 0',
  margin: 0,
  listStyle: 'none',
  WebkitOverflowScrolling: 'touch',
});

export const option = style({
  padding: '12px 16px',
  cursor: 'pointer',
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.body,
  color: '#374151',
  transition: 'background-color 0.1s ease',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
});

export const optionSelected = style({
  backgroundColor: `${colors.primary[600]}10`,
  color: colors.primary[700],
  fontWeight: typography.fontWeight.medium,
  ':hover': {
    backgroundColor: `${colors.primary[600]}15`,
  },
});

export const loadingItem = style({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  color: '#6b7280',
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.body,
});

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
});

export const emptyItem = style({
  padding: '24px 16px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: typography.fontSize.base,
  fontFamily: typography.fontFamily.body,
});
