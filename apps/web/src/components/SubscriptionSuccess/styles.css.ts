import { style, keyframes } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '@/styles/tokens.css';

// ============================================================================
// ANIMATIONS
// ============================================================================

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const fadeInUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const bounceIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.3)' },
  '50%': { opacity: 1, transform: 'scale(1.05)' },
  '70%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
  '50%': { opacity: 0.9, transform: 'scale(1.02)' },
});

// ============================================================================
// GRADIENTS
// ============================================================================

export const gradients = {
  primary: 'linear-gradient(135deg, #7C52FF 0%, #9370FF 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
};

// ============================================================================
// PAGE LAYOUT
// ============================================================================

export const pageWrapper = style({
  fontFamily: typography.fontFamily.body,
  minHeight: 'calc(100vh - 200px)',
  background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)',
  padding: `${spacing.xl} ${spacing.lg}`,
  animation: `${fadeIn} 0.6s ease-out`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} ${spacing.md}`,
    },
  },
});

export const container = style({
  maxWidth: '800px',
  width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: radius.xl,
  boxShadow: '0 4px 6px rgba(0,0,0,0.07), 0 12px 24px rgba(0,0,0,0.12)',
  padding: `${spacing['2xl']} ${spacing.xl}`,
  border: '1px solid rgba(124, 82, 255, 0.08)',
  animation: `${fadeInUp} 0.8s ease-out`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      borderRadius: radius.lg,
    },
  },
});

// ============================================================================
// SUCCESS CONTENT
// ============================================================================

export const successContainer = style({
  textAlign: 'center',
  padding: `${spacing.lg} 0`,
});

export const successIcon = style({
  width: '96px',
  height: '96px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  color: '#ffffff',
  background: gradients.success,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 0 8px rgba(16, 185, 129, 0.1), 0 10px 30px -10px rgba(16, 185, 129, 0.4)',
  animation: `${bounceIn} 0.8s ease-out`,
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: '3px solid rgba(16, 185, 129, 0.2)',
    animation: `${pulse} 2s ease-in-out infinite`,
  },
});

export const title = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: spacing.md,
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const message = style({
  fontSize: typography.fontSize.xl,
  color: '#6b7280',
  lineHeight: 1.7,
  maxWidth: '600px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  animation: `${fadeInUp} 0.8s ease-out 0.3s both`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

// ============================================================================
// LOADING & ERROR STATES
// ============================================================================

export const loadingIconWrapper = style({
  width: '96px',
  height: '96px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(124, 82, 255, 0.1) 0%, rgba(147, 112, 255, 0.1) 100%)',
  borderRadius: '50%',
  boxShadow: '0 0 0 8px rgba(124, 82, 255, 0.05)',
  animation: `${bounceIn} 0.8s ease-out`,
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '48px',
  height: '48px',
  border: '4px solid rgba(124, 82, 255, 0.2)',
  borderTopColor: colors.primary[600],
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

export const errorIconWrapper = style({
  width: '96px',
  height: '96px',
  margin: '0 auto',
  marginBottom: spacing.xl,
  color: '#ffffff',
  background: gradients.error,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 0 8px rgba(239, 68, 68, 0.1), 0 10px 30px -10px rgba(239, 68, 68, 0.4)',
  animation: `${bounceIn} 0.8s ease-out`,
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: '3px solid rgba(239, 68, 68, 0.2)',
  },
});

// ============================================================================
// ALERT CONTAINER
// ============================================================================

export const alertContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.md,
  padding: spacing.lg,
  borderRadius: radius.lg,
  marginBottom: spacing.xl,
  fontSize: typography.fontSize.base,
  textAlign: 'left',
  animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid rgba(59, 130, 246, 0.15)',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      gap: spacing.sm,
    },
  },
});

export const alertInfo = style({
  background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.8) 0%, rgba(191, 219, 254, 0.6) 100%)',
  color: '#1e40af',
});

export const alertWarning = style({
  background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.8) 0%, rgba(252, 211, 77, 0.6) 100%)',
  color: '#92400e',
  border: '1px solid rgba(245, 158, 11, 0.3)',
});

export const successList = style({
  listStyle: 'none',
  paddingLeft: 0,
  marginTop: spacing.md,
  lineHeight: 1.8,
});

export const successListItem = style({
  position: 'relative',
  paddingLeft: spacing.lg,
  marginBottom: spacing.sm,
  '::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '8px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
});

// ============================================================================
// SUCCESS DETAILS
// ============================================================================

export const successDetails = style({
  background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.6) 100%)',
  borderRadius: radius.lg,
  padding: spacing.xl,
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
  textAlign: 'left',
  border: '1px solid rgba(124, 82, 255, 0.08)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  animation: `${fadeInUp} 0.8s ease-out 0.5s both`,
});

export const successDetailsTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.lg,
  paddingBottom: spacing.md,
  borderBottom: '2px solid rgba(124, 82, 255, 0.15)',
});

export const successDetailsItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: spacing.md,
  paddingTop: spacing.md,
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  ':last-child': {
    borderBottom: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: spacing.xs,
    },
  },
});

export const label = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  fontWeight: typography.fontWeight.semibold,
});

export const value = style({
  fontSize: typography.fontSize.base,
  color: '#111827',
  fontWeight: typography.fontWeight.medium,
  textAlign: 'right',
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: 'left',
    },
  },
});

export const paymentPending = style({
  color: '#d97706',
  fontWeight: typography.fontWeight.bold,
});

export const paymentCompleted = style({
  color: '#059669',
  fontWeight: typography.fontWeight.bold,
});

// ============================================================================
// BUTTONS
// ============================================================================

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.md,
  marginTop: spacing.xl,
  animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
});

export const button = style({
  padding: '16px 40px',
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  borderRadius: radius.lg,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  fontFamily: typography.fontFamily.body,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  },
  selectors: {
    '&:hover::before': {
      transform: 'translateX(100%)',
    },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '14px 32px',
      fontSize: typography.fontSize.base,
    },
  },
});

export const buttonPrimary = style({
  background: gradients.primary,
  color: '#ffffff',
  boxShadow: '0 0 0 3px rgba(124, 82, 255, 0.1), 0 10px 30px -10px rgba(124, 82, 255, 0.4)',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 0 0 4px rgba(124, 82, 255, 0.15), 0 15px 40px -10px rgba(124, 82, 255, 0.5)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const buttonSecondary = style({
  backgroundColor: '#ffffff',
  color: '#374151',
  border: '2px solid #e5e7eb',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#d1d5db',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});
