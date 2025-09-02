import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../styles/tokens.css';

export const imageSliderSection = style({
  padding: `${spacing['2xl']} 0`,
  backgroundColor: colors.white,
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 0`,
    },
  },
});

export const sliderContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  boxSizing: 'border-box',
  width: '100%',
  '@media': {
    'screen and (max-width: 1279px)': {
      maxWidth: '1200px',
    },
    'screen and (max-width: 768px)': {
      padding: `0 ${spacing.sm}`,
      boxSizing: 'border-box',
    },
    'screen and (max-width: 480px)': {
      padding: `0 ${spacing.xs}`,
      boxSizing: 'border-box',
    },
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  textAlign: 'center',
  marginBottom: spacing.md,
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const sectionSubtitle = style({
  fontSize: typography.fontSize.xl,
  color: colors.neutral[600],
  textAlign: 'center',
  marginBottom: spacing['3xl'],
  fontFamily: typography.fontFamily.body,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      marginBottom: spacing['2xl'],
    },
  },
});

// Desktop carousel styles
export const desktopOnly = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 769px)': {
      display: 'block',
    },
  },
});

export const carouselWrapper = style({
  position: 'relative',
  marginBottom: spacing['2xl'],
});

export const navigationButton = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '48px',
  height: '48px',
  borderRadius: radius.full,
  backgroundColor: colors.white,
  border: `2px solid ${colors.neutral[200]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 5,
  color: colors.neutral[600],
  boxShadow: shadows.lg,
  transition: 'all 0.3s ease',
  opacity: 1,
  visibility: 'visible',
  ':hover': {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[300],
    color: colors.primary[600],
    transform: 'translateY(-50%) scale(1.05)',
    boxShadow: `0 6px 16px rgba(122, 126, 237, 0.2)`,
  },
});

export const navigationButtonHidden = style({
  opacity: 0,
  visibility: 'hidden',
  pointerEvents: 'none',
});

export const leftArrow = style([
  navigationButton,
  {
    left: '0px',
  },
]);

export const rightArrow = style([
  navigationButton,
  {
    right: '0px',
  },
]);

export const carouselContainer = style({
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  paddingBottom: spacing.sm,
});

export const carouselTrack = style({
  display: 'flex',
  gap: spacing.lg,
  paddingLeft: '40px',
  paddingRight: '40px',
});

export const sliderCard = style({
  flex: '0 0 auto',
  width: '360px',
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.base,
  scrollSnapAlign: 'center',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  boxSizing: 'border-box',
  overflow: 'hidden',
  ':hover': {
    borderColor: colors.primary[300],
    boxShadow: shadows.purple,
  },
  '@media': {
    'screen and (max-width: 1279px)': {
      width: '100%',
      maxWidth: '320px',
      margin: '0 auto',
      boxSizing: 'border-box',
    },
    'screen and (max-width: 768px)': {
      width: '100%',
      maxWidth: '100%',
      margin: '0',
      boxSizing: 'border-box',
    },
  },
});

export const sliderImageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '240px',
  overflow: 'hidden',
  borderRadius: `${radius.lg} ${radius.lg} 0 0`,
  '@media': {
    'screen and (max-width: 768px)': {
      height: '200px',
    },
  },
});

export const sliderImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
});

globalStyle(`${sliderCard}:hover ${sliderImage}`, {
  transform: 'scale(1.05)',
});

export const sliderTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  margin: `${spacing.lg} ${spacing.lg} ${spacing.sm} ${spacing.lg}`,
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,
});

export const sliderDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  margin: `0 ${spacing.lg} ${spacing.lg} ${spacing.lg}`,
});

export const sliderLink = style({
  margin: `0 ${spacing.lg} ${spacing.lg} ${spacing.lg}`,
});

globalStyle(`${sliderLink} a`, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  color: colors.primary[600],
  textDecoration: 'none',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  transition: 'color 0.2s ease',
});

globalStyle(`${sliderLink} a:hover`, {
  color: colors.primary[700],
});

// Progress bar styles
export const progressBarContainer = style({
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: spacing.xl,
  padding: `0 40px`,
});

export const progressBar = style({
  height: '4px',
  backgroundColor: colors.neutral[200],
  borderRadius: radius.full,
  overflow: 'hidden',
  position: 'relative',
});

export const progressIndicator = style({
  height: '100%',
  backgroundColor: colors.primary[600],
  borderRadius: radius.full,
  transition: 'width 0.2s ease-out',
  boxShadow: `0 0 8px rgba(122, 126, 237, 0.4)`,
});

// Mobile styles
export const mobileOnly = style({
  display: 'block',
  '@media': {
    'screen and (min-width: 769px)': {
      display: 'none',
    },
  },
});

export const mobileGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: spacing.lg,
  padding: `0 ${spacing.md}`,
  boxSizing: 'border-box',
  width: '100%',
  '@media': {
    'screen and (max-width: 992px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: spacing.md,
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
      padding: `0 ${spacing.sm}`,
    },
    'screen and (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.sm,
      padding: `0 ${spacing.xs}`,
    },
  },
});
