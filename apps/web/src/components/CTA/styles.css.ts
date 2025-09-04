import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../styles/tokens.css';

export const ctaSection = style({
  background: 'linear-gradient(135deg, #7a7eed 100%, #fff 100%)',
  borderRadius: radius.lg,
  padding: spacing.lg,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: shadows.purple,
  boxSizing: 'border-box',
  margin: `${spacing['3xl']} auto`,
  maxWidth: '1400px',
  width: 'auto',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: spacing.md,
      padding: '15px',
      margin: `${spacing['2xl']} 15px`,
    },
  },
});

export const ctaContent = style({
  color: colors.white,
});

export const ctaTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  marginBottom: spacing.xs,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const ctaDescription = style({
  fontSize: typography.fontSize.base,
  opacity: 0.95,
});

export const ctaButton = style({
  padding: `${spacing.sm} ${spacing.lg}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
  background: colors.white,
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: shadows.md,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  ':hover': {
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: shadows.lg,
  },
  ':active': {
    transform: 'scale(1.02)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
});

export const iconStyle = style({
  width: '20px',
  height: '20px',
  flexShrink: 0,
});
