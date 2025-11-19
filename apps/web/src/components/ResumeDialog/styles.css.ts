import { style, keyframes } from '@vanilla-extract/css';

import { colors, typography, spacing } from '../../styles/tokens.css';

export const dialogContent = style({
  padding: `${spacing['3xl']} ${spacing['4xl']}`,
  textAlign: 'center',
  maxWidth: '420px',
});

export const dialogTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.md,
  marginTop: spacing['xl'],
});

export const dialogDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  marginBottom: spacing.xl,
  lineHeight: 1.6,
  padding: `0 ${spacing.sm}`,
});

export const dialogFooter = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  marginTop: spacing.sm,
});

export const primaryButton = style({
  width: '80%',
  margin: '0 auto',
  padding: `${spacing.sm} ${spacing.lg}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.white,
  backgroundColor: colors.primary[600],
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: colors.primary[700],
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const secondaryButton = style({
  width: '80%',
  margin: '0 auto',
  marginBottom: spacing['xl'],
  padding: `${spacing.sm} ${spacing.lg}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[600],
  backgroundColor: 'transparent',
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[900],
    color: colors.neutral[900],
  },
});

export const errorText = style({
  fontSize: typography.fontSize.sm,
  color: colors.accent.coral,
  marginBottom: spacing.md,
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '16px',
  height: '16px',
  border: `2px solid ${colors.white}`,
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
  marginRight: spacing.xs,
});
