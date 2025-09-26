import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const heroContainer = style({
  paddingTop: '2rem',
  paddingBottom: spacing['2xl'],
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, rgba(122, 126, 237, 0.03) 100%)`,
  '@media': {
    'screen and (max-width: 768px)': {
      paddingBottom: spacing.xl,
    },
  },
});

export const heroContent = style({
  maxWidth: '900px',
  margin: '0 auto',
  textAlign: 'center',
  padding: `0 ${spacing.md}`,
});

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: '800',
  fontFamily: typography.fontFamily.heading,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.md,
  '::after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    background: colors.primary[600],
    margin: `${spacing.md} auto`,
    borderRadius: radius.full,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const heroDescription = style({
  fontSize: typography.fontSize.xl,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.lg,
  maxWidth: '700px',
  margin: `0 auto ${spacing.lg}`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const trustBadges = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.lg,
  flexWrap: 'wrap',
  marginTop: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      gap: spacing.sm,
    },
  },
});

export const trustBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.xs} ${spacing.md}`,
  background: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.full,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[700],
  boxShadow: shadows.sm,
  transition: 'all 0.2s ease',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
});
