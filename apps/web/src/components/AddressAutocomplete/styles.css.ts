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

export const formField = style({
  marginBottom: '24px',
});

export const label = style({
  display: 'block',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: '#374151',
  marginBottom: '8px',
  fontFamily: typography.fontFamily.body,
});

export const requiredIndicator = style({
  color: '#ef4444',
  marginLeft: '2px',
});

export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const inputIcon = style({
  position: 'absolute',
  left: '16px',
  color: '#9ca3af',
  pointerEvents: 'none',
  zIndex: 1,
});

// Matches SubscriptionFlow input + inputLarge styles exactly
export const input = style({
  width: '100%',
  height: '56px',
  padding: '16px 20px',
  paddingLeft: '44px', // Space for icon
  paddingRight: '44px', // Space for clear button/loader
  fontSize: typography.fontSize.lg,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  '::placeholder': {
    color: '#6b7280',
  },
  '@media': {
    '(max-width: 640px)': {
      fontSize: '16px', // Prevent zoom on iOS
    },
  },
});

export const inputCompact = style({
  height: '42px',
  padding: '0 40px 0 40px',
  fontSize: typography.fontSize.sm,
});

export const inputError = style({
  borderColor: '#dc2626',
  boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.15)',
  ':focus': {
    borderColor: '#dc2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.15)',
  },
});

export const inputDisabled = style({
  backgroundColor: '#f9fafb',
  cursor: 'not-allowed',
  color: '#9ca3af',
});

export const clearButton = style({
  position: 'absolute',
  right: '40px',
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

export const loadingIcon = style({
  position: 'absolute',
  right: '16px',
  color: '#9ca3af',
  animation: `${spin} 1s linear infinite`,
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
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
});

export const optionActive = style({
  backgroundColor: `${colors.primary[600]}10`,
});

export const optionIcon = style({
  color: colors.primary[600],
  flexShrink: 0,
  marginTop: '2px',
});

export const optionContent = style({
  flex: 1,
  minWidth: 0,
});

export const optionMain = style({
  display: 'block',
  fontWeight: typography.fontWeight.medium,
  color: '#111827',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const optionSecondary = style({
  display: 'block',
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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

export const errorItem = style({
  padding: '16px',
  textAlign: 'center',
  color: '#dc2626',
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.body,
  backgroundColor: '#fef2f2',
});
