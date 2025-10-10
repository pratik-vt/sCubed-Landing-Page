import { style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const ctaSection = style({
  padding: `${spacing['xl']} 0`,
  background: `
    linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.white} 50%, ${colors.primary[50]} 100%),
    radial-gradient(ellipse at top, rgba(122, 126, 237, 0.1) 0%, transparent 60%)
  `,
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing['2xl']} 0`,
    },
  },
});

export const container = style({
  maxWidth: '900px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  textAlign: 'center',
});

export const ctaTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.md,
  marginTop: '0px',
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const ctaDescription = style({
  fontSize: typography.fontSize.xl,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing['xl'],
  fontFamily: typography.fontFamily.body,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      marginBottom: spacing.xl,
    },
  },
});

export const ctaButtonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.md,
  marginTop: spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      marginTop: spacing.lg,
    },
  },
});
