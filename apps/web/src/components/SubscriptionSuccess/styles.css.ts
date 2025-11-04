import { style, keyframes } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '@/styles/tokens.css';

// ============================================================================
// ANIMATIONS
// ============================================================================

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// ============================================================================
// PAGE LAYOUT
// ============================================================================

export const pageWrapper = style({
  fontFamily: typography.fontFamily.body,
  minHeight: 'calc(100vh - 200px)',
  backgroundColor: '#f9fafb',
  padding: `${spacing.xl} 0`,
  animation: `${fadeIn} 0.6s ease-out`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} 0`,
    },
  },
});

export const container = style({
  maxWidth: '700px',
  width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: radius.lg,
  boxShadow: shadows.base,
  padding: spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
      borderRadius: radius.md,
    },
  },
});

// ============================================================================
// SUCCESS CONTENT
// ============================================================================

export const successContainer = style({
  textAlign: 'center',
  padding: spacing.lg,
});

export const successIcon = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  color: colors.accent.green,
  backgroundColor: '#d1fae5',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const message = style({
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  marginBottom: spacing.lg,
  lineHeight: 1.6,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

// ============================================================================
// LOADING & ERROR STATES
// ============================================================================

export const loadingIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '48px',
  height: '48px',
  border: '4px solid #e5e7eb',
  borderTopColor: colors.primary[600],
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

export const errorIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  color: '#ef4444',
  backgroundColor: '#fee2e2',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ============================================================================
// ALERT CONTAINER
// ============================================================================

export const alertContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.md,
  padding: spacing.md,
  borderRadius: radius.md,
  marginBottom: spacing.lg,
  fontSize: typography.fontSize.sm,
  textAlign: 'left',
});

export const alertInfo = style({
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  border: '1px solid #93c5fd',
});

export const successList = style({
  listStyle: 'disc',
  paddingLeft: spacing.lg,
  marginTop: spacing.sm,
  lineHeight: 1.6,
});

// ============================================================================
// SUCCESS DETAILS
// ============================================================================

export const successDetails = style({
  backgroundColor: '#f9fafb',
  borderRadius: radius.md,
  padding: spacing.lg,
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  textAlign: 'left',
});

export const successDetailsTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.md,
});

export const successDetailsItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: spacing.sm,
  paddingTop: spacing.sm,
  borderBottom: '1px solid #e5e7eb',
  ':last-child': {
    borderBottom: 'none',
  },
});

export const label = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  fontWeight: typography.fontWeight.semibold,
});

export const value = style({
  fontSize: typography.fontSize.sm,
  color: '#111827',
  fontWeight: typography.fontWeight.normal,
  textAlign: 'right',
});

// ============================================================================
// BUTTONS
// ============================================================================

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.md,
  marginTop: spacing.xl,
});

export const button = style({
  padding: '14px 32px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  borderRadius: radius.md,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  fontFamily: typography.fontFamily.body,
});

export const buttonPrimary = style({
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  boxShadow: shadows.purple,
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: '0 12px 40px -10px rgba(124, 82, 255, 0.5)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const buttonSecondary = style({
  backgroundColor: '#ffffff',
  color: '#374151',
  border: '2px solid #d1d5db',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#9ca3af',
  },
});
