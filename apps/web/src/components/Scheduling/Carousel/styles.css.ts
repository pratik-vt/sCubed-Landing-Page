import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const carouselSection = style({
  padding: `${spacing['xl']} 0`,
  background: `
    linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.primary[50]} 30%, ${colors.neutral[50]} 70%, ${colors.primary[50]} 100%),
    radial-gradient(ellipse at top, rgba(122, 126, 237, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse at bottom, rgba(34, 211, 238, 0.08) 0%, transparent 60%)
  `,
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 0`,
    },
  },
});

export const carouselContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  position: 'relative',
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const sectionTitle = style({
  marginTop: '0px',
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing['xl'],
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
      marginBottom: spacing.xl,
    },
  },
});

export const carouselWrapper = style({
  position: 'relative',
  background: `
    linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 255, 0.9) 100%)
  `,
  borderRadius: '32px',
  padding: spacing['xl'],
  boxShadow: `
    0 32px 64px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.9)
  `,
  border: `2px solid rgba(255, 255, 255, 0.7)`,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      borderRadius: '24px',
    },
  },
});

export const slideContainer = style({
  width: '100%',
  minHeight: '400px',
  position: 'relative',
  '@media': {
    'screen and (max-width: 968px)': {
      minHeight: '500px',
    },
    'screen and (max-width: 768px)': {
      minHeight: 'auto',
    },
  },
});

export const slideContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing['3xl'],
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.xl,
    },
  },
});

export const slideImageWrapper = style({
  position: 'relative',
  width: '100%',
  margin: '0 auto',
  borderRadius: radius.xl,
  overflow: 'hidden',
  background: 'linear-gradient(135deg, rgba(122, 126, 237, 0.05) 0%, rgba(34, 211, 238, 0.05) 100%)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.02)',
  },
  '@media': {
    'screen and (max-width: 968px)': {
      maxWidth: '100%',
    },
  },
});

export const slideImage = style({
  objectFit: 'contain',
  padding: spacing.md,
  maxHeight: '700px',
});


export const navigationControls = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  transform: 'translateY(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  pointerEvents: 'none',
  padding: `0 ${spacing.md}`,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
});

export const navButton = style({
  pointerEvents: 'all',
  width: '48px',
  height: '48px',
  borderRadius: radius.full,
  background: 'rgba(255, 255, 255, 0.95)',
  border: '2px solid rgba(122, 126, 237, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: colors.primary[600],
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  ':hover': {
    background: colors.primary[600],
    color: colors.white,
    transform: 'scale(1.1)',
    boxShadow: '0 8px 24px rgba(122, 126, 237, 0.3)',
  },
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus-visible': {
    outline: `3px solid ${colors.primary[400]}`,
    outlineOffset: '4px',
  },
});

export const progressBar = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '4px',
  background: 'rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  borderRadius: '0 0 32px 32px',
});

export const progressFill = style({
  height: '100%',
  transition: 'width 0.05s linear',
  background: colors.primary[600],
});

export const dotsContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.sm,
  marginTop: spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      marginTop: spacing.lg,
    },
  },
});

export const dot = style({
  width: '12px',
  height: '12px',
  borderRadius: radius.full,
  background: 'rgba(0, 0, 0, 0.2)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: 0,
  ':hover': {
    transform: 'scale(1.2)',
    background: 'rgba(122, 126, 237, 0.5)',
  },
  ':focus-visible': {
    outline: `3px solid ${colors.primary[400]}`,
    outlineOffset: '3px',
    transform: 'scale(1.2)',
  },
});

export const activeDot = style({
  width: '32px',
  borderRadius: '6px',
  background: colors.primary[600],
});

export const ctaButtonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      marginTop: spacing.lg,
    },
  },
});

