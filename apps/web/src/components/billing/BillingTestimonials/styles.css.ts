import { style } from '@vanilla-extract/css';

import {
  colors,
  typography,
  spacing,
  shadows,
  radius,
} from '../../../styles/tokens.css';

export const testimonialsSection = style({
  padding: `${spacing['3xl']} 0`,
  backgroundColor: colors.neutral[50],
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing['2xl']} 0`,
    },
  },
});

export const testimonialsContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
});

export const sectionTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  textAlign: 'center',
  marginBottom: spacing['3xl'],
  color: colors.neutral[900],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing['2xl'],
    },
  },
});

export const testimonialsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const testimonialCard = style({
  backgroundColor: colors.white,
  padding: spacing.xl,
  borderRadius: radius.xl,
  boxShadow: shadows.base,
  position: 'relative',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.lg,
  },
});

export const quoteIcon = style({
  position: 'absolute',
  top: spacing.md,
  right: spacing.md,
  color: colors.primary[200],
  opacity: 0.5,
});

export const testimonialStars = style({
  display: 'flex',
  gap: '4px',
  marginBottom: spacing.md,
  color: colors.accent.coral,
});

export const testimonialContent = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.lg,
  fontStyle: 'italic',
});

export const testimonialQuote = style({
  borderTop: `1px solid ${colors.neutral[200]}`,
  paddingTop: spacing.md,
});

export const testimonialAuthor = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: '4px',
});

export const testimonialRole = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});
