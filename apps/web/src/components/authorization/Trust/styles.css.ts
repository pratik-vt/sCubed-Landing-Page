import { style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  typography,
  radius,
} from '../../../styles/tokens.css';

export const trustSection = style({
  padding: `${spacing['xl']} 0`,
  backgroundColor: colors.neutral[50],
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 0`,
    },
  },
});

export const container = style({
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
  marginTop: '0px',
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing['xl'],
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
      marginBottom: spacing.md,
    },
  },
});

export const featuresGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.xl,
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.lg,
    },
  },
});

export const featureCard = style({
  padding: spacing.xl,
  borderRadius: radius.lg,
  backgroundColor: colors.white,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
    },
  },
});

export const featureContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
});

export const iconWrapper = style({
  width: '56px',
  height: '56px',
  borderRadius: radius.lg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const featureTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const featureDescription = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});
