import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const heroSection = style({
  position: 'relative',
  width: '100%',
  padding: `${spacing['3xl']} 0 ${spacing['2xl']} 0`,
  marginTop: '-45px',
  paddingTop: `calc(${spacing['3xl']} + 45px)`,
  backgroundColor: colors.white,
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 820px)': {
      marginTop: '-70px',
      paddingTop: `calc(${spacing['3xl']} + 70px)`,
    },
    'screen and (max-width: 800px)': {
      marginTop: '-100px',
      paddingTop: `calc(${spacing['3xl']} + 100px)`,
    },
    'screen and (max-width: 768px)': {
      padding: `${spacing['2xl']} 0 ${spacing.xl} 0`,
      paddingTop: `calc(${spacing['2xl']} + 100px)`,
    },
    'screen and (max-width: 767px)': {
      marginTop: '-220px',
      paddingTop: `calc(${spacing['2xl']} + 220px + 40px)`,
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

export const heroDescription = style({
  fontSize: typography.fontSize.xl,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.xl,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
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
  },
});

// Removed primaryCTA and secondaryCTA - using CalendlyButton instead

export const heroImageContent = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      order: -1,
      maxWidth: '400px',
      margin: '0 auto',
    },
  },
});