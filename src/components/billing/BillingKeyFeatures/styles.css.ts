import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const keyFeaturesSection = style({
  padding: `${spacing.xl} 0 ${spacing.xl} 0`,
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.neutral[50]} 50%, ${colors.white} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 15% 30%, rgba(122, 126, 237, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 85% 70%, rgba(34, 211, 238, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 50% 90%, rgba(52, 211, 153, 0.04) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} 0 ${spacing.lg} 0`,
    },
  },
});

export const keyFeaturesContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  textAlign: 'center',
  marginBottom: spacing.sm,
  color: colors.neutral[900],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const sectionDescription = style({
  fontSize: typography.fontSize.xl,
  textAlign: 'center',
  color: colors.neutral[600],
  marginBottom: spacing['2xl'],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const featuresGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: spacing.md,
  marginTop: spacing.xl,
});

export const featureCard = style({
  padding: spacing.lg,
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.neutral[50]} 100%)`,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.lg,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    background: `radial-gradient(circle, rgba(122, 126, 237, 0.08) 0%, transparent 70%)`,
    borderRadius: '50%',
    transform: 'translate(25px, -25px)',
    transition: 'all 0.3s ease',
  },
  ':hover': {
    transform: 'translateY(-6px) scale(1.02)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    borderColor: colors.primary[300],
  },
  selectors: {
    '&:hover::before': {
      background: `radial-gradient(circle, rgba(122, 126, 237, 0.12) 0%, transparent 70%)`,
      transform: 'translate(20px, -20px) scale(1.1)',
    },
  },
});

export const featureIconWrapper = style({
  width: '48px',
  height: '48px',
  backgroundColor: colors.primary[100], // Fallback color
  borderRadius: radius.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.md,
  color: colors.primary[600],
  transition: 'all 0.3s ease',
  position: 'relative',
  zIndex: 1,
  border: '1px solid transparent',
  selectors: {
    [`${featureCard}:hover &`]: {
      transform: 'scale(1.1) rotate(3deg)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
  },
});

export const featureTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
});

export const featureDescription = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
});

// Legacy styles - to be removed
export const featuresWrapper = style({
  display: 'none',
});

export const featureBadge = style({
  display: 'none',
});

export const featureIcon = style({
  display: 'none',
});

export const featureText = style({
  display: 'none',
});

export const featureItem = style({
  display: 'none',
});

export const showMoreContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: spacing.xl,
});

export const showMoreButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.md} ${spacing.xl}`,
  backgroundColor: colors.white,
  border: `2px solid ${colors.primary[600]}`,
  borderRadius: radius.lg,
  color: colors.primary[600],
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.heading,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 12px rgba(122, 126, 237, 0.15)',
  position: 'relative',
  overflow: 'hidden',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(122, 126, 237, 0.1), transparent)`,
    transition: 'left 0.6s ease',
  },

  ':hover': {
    backgroundColor: colors.primary[600],
    color: colors.white,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(122, 126, 237, 0.25)',
  },

  selectors: {
    '&:hover::before': {
      left: '100%',
    },
  },

  ':active': {
    transform: 'translateY(0)',
  },

  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.sm} ${spacing.lg}`,
      fontSize: typography.fontSize.sm,
    },
  },
});
