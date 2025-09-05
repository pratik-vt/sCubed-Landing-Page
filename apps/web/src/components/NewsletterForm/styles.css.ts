import { style, keyframes } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../styles/tokens.css';

export const container = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.md,
  width: '100%',
  position: 'relative',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing.xs,
      padding: `${spacing.sm} 0`,
      flexWrap: 'nowrap',
    },
  },
});

export const label = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[700],
  fontFamily: typography.fontFamily.heading,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '4px',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      textAlign: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: spacing.xs,
    },
  },
});

export const labelText = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const labelSubtext = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.normal,
  color: colors.neutral[600],
  lineHeight: 1.4,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
      maxWidth: '320px',
    },
  },
});

export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  maxWidth: '500px',
  width: '100%',
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});

export const form = style({
  display: 'flex',
  gap: spacing.sm,
  width: '100%',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
});

export const inputStyle = style({
  flex: '1 1 200px',
  minWidth: '200px',
  padding: `10px ${spacing.md}`,
  fontSize: typography.fontSize.sm,
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.md,
  backgroundColor: colors.white,
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.body,
  transition: 'all 0.2s ease',
  outline: 'none',
  '::placeholder': {
    color: colors.neutral[400],
  },
  ':focus': {
    borderColor: colors.primary[500],
    boxShadow: `0 0 0 2px ${colors.primary[100]}`,
  },
  ':disabled': {
    backgroundColor: colors.neutral[50],
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      flex: '1 1 100%',
      fontSize: typography.fontSize.base,
      padding: `14px ${spacing.md}`,
      textAlign: 'center',
      '::placeholder': {
        textAlign: 'center',
      },
    },
    'screen and (max-width: 414px)': {
      fontSize: typography.fontSize.base,
      padding: `12px ${spacing.sm}`,
    },
    'screen and (max-width: 320px)': {
      fontSize: typography.fontSize.sm,
      padding: `10px ${spacing.sm}`,
    },
  },
});

export const submitButton = style({
  padding: `10px ${spacing.lg}`,
  backgroundColor: colors.primary[600],
  color: colors.white,
  border: 'none',
  borderRadius: radius.md,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  fontFamily: typography.fontFamily.body,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '120px',
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: shadows.md,
  },
  ':active': {
    transform: 'translateY(0)',
  },
  ':disabled': {
    backgroundColor: colors.neutral[400],
    cursor: 'not-allowed',
    transform: 'none',
    opacity: 0.7,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      padding: `12px ${spacing.lg}`,
      fontSize: typography.fontSize.base,
    },
  },
});

const spin = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

const fadeIn = keyframes({
  '0%': { 
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  '100%': { 
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const loadingSpinner = style({
  animation: `${spin} 1s ease-in-out infinite`,
});

export const errorMessage = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.body,
  padding: `10px ${spacing.md}`,
  borderRadius: radius.md,
  marginTop: spacing.sm,
  width: 'fit-content',
  maxWidth: '100%',
  animation: `${fadeIn} 0.3s ease-in-out`,
  color: '#dc2626',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
      width: 'auto',
      maxWidth: '100%',
      justifyContent: 'center',
      textAlign: 'center' as const,
      marginTop: spacing.sm,
      alignSelf: 'center',
    },
  },
});

export const successMessage = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: typography.fontSize.sm,
  fontFamily: typography.fontFamily.body,
  padding: `10px ${spacing.md}`,
  borderRadius: radius.md,
  marginTop: spacing.sm,
  width: 'fit-content',
  maxWidth: '100%',
  animation: `${fadeIn} 0.3s ease-in-out`,
  color: '#16a34a',
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
      width: 'auto',
      maxWidth: '100%',
      justifyContent: 'center',
      textAlign: 'center' as const,
      marginTop: spacing.sm,
      alignSelf: 'center',
    },
  },
});