import { style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  typography
} from '../../../styles/tokens.css';

export const heroSection = style({
  position: 'relative',
  width: '100%',
  padding: `${spacing.lg} 0`,
  backgroundColor: colors.white,
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.md} 0`,
    },
  },
});

// Removed background image and overlay - not needed anymore

export const heroContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  position: 'relative',
  zIndex: 10,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const heroContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing['3xl'],
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: spacing['2xl'],
    },
  },
});

export const heroTextContent = style({
  '@media': {
    'screen and (max-width: 968px)': {
      textAlign: 'center',
    },
  },
});

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: '800',
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const heroTitleHighlight = style({
  color: colors.primary[600],
});

export const heroBanner = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.normal,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.normal,
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.body,
  maxWidth: '90%',
  '@media': {
    'screen and (max-width: 968px)': {
      maxWidth: '100%',
      textAlign: 'center',
    },
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      marginBottom: spacing.md,
    },
  },
});

export const heroSubheadline = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[500],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: '2rem',
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  maxWidth: '95%',
  '@media': {
    'screen and (max-width: 968px)': {
      maxWidth: '100%',
      textAlign: 'center',
    },
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      marginBottom: spacing.lg,
    },
  },
});

export const actionWord = style({
  fontWeight: typography.fontWeight.bold,
});

export const brandHighlight = style({
  color: colors.primary[600],
  fontWeight: typography.fontWeight.semibold,
});

export const mobileButton = style({
  fontSize: '18px',
  textDecoration: 'none',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
});

export const ctaSection = style({
  display: 'flex',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 968px)': {
      justifyContent: 'center',
    },
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
});

// Removed primaryCTA and secondaryCTA - using CalendlyButton instead

export const heroImageContent = style({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',
  aspectRatio: '6/5',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      maxWidth: '400px',
      aspectRatio: '4/3.33',
    },
    'screen and (max-width: 480px)': {
      maxWidth: '320px',
    },
  },
});