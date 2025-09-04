import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../styles/tokens.css';

export const heroSliderSection = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  minHeight: '600px',
  maxHeight: '800px',
  overflow: 'hidden',
  marginTop: '24px', // Account for fixed header (contact info + nav)
  backgroundColor: '#f8fafc', // Light background to prevent black flash
  '@media': {
    'screen and (max-width: 768px)': {
      height: '70vh',
      minHeight: '500px',
      maxHeight: '600px',
      marginTop: '128px', // Fixed header on mobile
    },
    'screen and (max-width: 480px)': {
      height: '60vh',
      minHeight: '400px',
      maxHeight: '500px',
      marginTop: '96px', // Fixed header on small mobile
    },
  },
});

export const heroSliderContainer = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const heroSliderContent = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Changed from center to flex-start
});

export const heroSliderImageWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});

export const heroSliderImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const heroSliderOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  // No background - overlay removed
  zIndex: 2,
});

export const heroSliderTextContent = style({
  position: 'relative',
  zIndex: 3,
  textAlign: 'left',
  color: colors.neutral[900],
  maxWidth: '800px',
  padding: `0 ${spacing.lg}`,
  marginLeft: '5%', // Add left margin to move content from edge
  marginRight: '5%', // Add right margin to prevent overlap with right button
  '@media': {
    'screen and (max-width: 1200px)': {
      maxWidth: '700px',
      marginLeft: '8%', // Increase margins on medium screens
      marginRight: '8%',
    },
    'screen and (max-width: 960px)': {
      maxWidth: '600px',
      marginLeft: '10%', // Further increase margins at 960px
      marginRight: '10%',
      padding: `0 ${spacing.md}`,
    },
    'screen and (max-width: 768px)': {
      maxWidth: '450px',
      padding: `0 ${spacing.md}`,
      marginLeft: '5%', // Reduce margins on mobile
      marginRight: '5%',
      textAlign: 'left',
    },
    'screen and (max-width: 480px)': {
      maxWidth: '320px',
      padding: `0 ${spacing.sm}`,
      marginLeft: '8%', // Small margins on mobile
      marginRight: '8%',
      textAlign: 'left',
    },
  },
});

export const heroSliderTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '2rem', // Set to 2rem as requested
      marginBottom: spacing.md,
    },
    'screen and (max-width: 480px)': {
      fontSize: '2rem', // Keep consistent 2rem on small mobile too
      marginBottom: spacing.sm,
    },
  },
});

export const heroSliderDescription = style({
  fontSize: typography.fontSize.xl,
  fontFamily: typography.fontFamily.body,
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing['2xl'],
  opacity: 0.9,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none', // Hide description on mobile
    },
  },
});

// Global styles for links and paragraphs in description
globalStyle(`${heroSliderDescription} a`, {
  color: `${colors.primary[600]} !important`,
  textDecoration: 'none !important',
  fontWeight: `${typography.fontWeight.bold} !important`,
  transition: 'all 0.2s ease',
});

globalStyle(`${heroSliderDescription} a:hover`, {
  color: `${colors.primary[700]} !important`,
});

globalStyle(`${heroSliderDescription} p`, {
  margin: 0,
});

export const heroSliderButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.md} ${spacing.xl}`,
  backgroundColor: colors.primary[600],
  color: colors.white,
  textDecoration: 'none',
  borderRadius: radius.lg,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.body,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: shadows.lg,
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-2px)',
    boxShadow: shadows.xl,
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      fontSize: typography.fontSize.base,
      padding: `${spacing.sm} ${spacing.md}`, // Reduced padding for iPad
    },
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      padding: `${spacing.xs} ${spacing.sm}`, // Further reduced padding for mobile
    },
    'screen and (max-width: 480px)': {
      fontSize: typography.fontSize.xs,
      padding: `${spacing.xs} ${spacing.sm}`, // Minimal padding for small mobile
      gap: spacing.xs,
    },
  },
});

export const heroSliderNavigation = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  zIndex: 4,
  display: 'flex',
  justifyContent: 'space-between',
  padding: `0 ${spacing.xl}`,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 1200px)': {
      padding: `0 ${spacing.lg}`,
    },
    'screen and (max-width: 960px)': {
      padding: `0 ${spacing.sm}`, // Reduce padding at 960px to avoid overlap
    },
    'screen and (max-width: 768px)': {
      padding: `0 ${spacing.xs}`, // Further reduce on tablet
    },
    'screen and (max-width: 480px)': {
      padding: `0 ${spacing.xs}`, // Minimal padding on mobile
    },
  },
});

const navigationButtonBase = style({
  width: '44px',
  height: '44px',
  borderRadius: radius.full,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: colors.neutral[700],
  boxShadow: shadows.md,
  transition: 'all 0.3s ease',
  pointerEvents: 'auto',
  ':hover': {
    backgroundColor: colors.white,
    color: colors.primary[600],
    transform: 'translateY(-50%) scale(1.05)',
    boxShadow: shadows.lg,
  },
  ':active': {
    transform: 'translateY(-50%) scale(0.95)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '40px',
      height: '40px',
    },
    'screen and (max-width: 480px)': {
      width: '36px',
      height: '36px',
    },
  },
});

export const heroSliderPrevButton = style([
  navigationButtonBase,
  {
    transform: 'translateY(-50%)',
  },
]);

export const heroSliderNextButton = style([
  navigationButtonBase,
  {
    transform: 'translateY(-50%)',
  },
]);

export const heroSliderIndicators = style({
  position: 'absolute',
  bottom: spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 4,
  display: 'flex',
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 768px)': {
      bottom: spacing.lg,
    },
    'screen and (max-width: 480px)': {
      bottom: spacing.md,
    },
  },
});

export const heroSliderIndicator = style({
  width: '12px',
  height: '12px',
  borderRadius: radius.full,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transform: 'scale(1.2)',
  },
});

export const heroSliderIndicatorActive = style({
  backgroundColor: colors.white,
  transform: 'scale(1.2)',
});
