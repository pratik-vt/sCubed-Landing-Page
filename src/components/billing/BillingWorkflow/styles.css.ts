import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const workflowSection = style({
  padding: `${spacing['3xl']} 0 ${spacing.xl} 0`, // Reduced bottom padding from 3xl to xl
  backgroundColor: colors.neutral[50],
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing['2xl']} 0 ${spacing.lg} 0`, // Reduced mobile bottom padding
    },
  },
});

export const workflowContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  '@media': {
    'screen and (max-width: 1279px)': {
      maxWidth: '1200px',
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
    'screen and (min-width: 1280px)': {
      display: 'block',
    },
  },
});

export const carouselWrapper = style({
  position: 'relative',
  marginBottom: spacing['2xl'],
});

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

export const workflowCard = style({
  flex: '0 0 auto',
  width: '320px',
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  padding: spacing.xl,
  border: `4px solid ${colors.neutral[100]}`,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  scrollSnapAlign: 'center',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  ':hover': {
    borderColor: colors.primary[600],
    boxShadow: `0 8px 24px rgba(122, 126, 237, 0.15)`,
  },
  '@media': {
    'screen and (max-width: 1279px)': {
      width: '280px',
    },
  },
});

export const workflowNumber = style({
  position: 'absolute',
  top: spacing.md, // Changed from -12px to positive value within card
  right: spacing.md, // Changed from left to right for better design
  backgroundColor: colors.primary[600],
  color: colors.white,
  width: '36px', // Slightly larger for better visibility
  height: '36px',
  borderRadius: radius.full,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  boxShadow: `0 3px 12px rgba(122, 126, 237, 0.4)`, // Enhanced shadow
  border: `2px solid ${colors.white}`, // White border for better contrast
  zIndex: 10, // Ensure it's above other content
  transition: 'all 0.3s ease',
});

export const workflowIconWrapper = style({
  width: '56px',
  height: '56px',
  borderRadius: radius.lg,
  backgroundColor: colors.primary[50],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.md,
  color: colors.primary[600],
  transition: 'all 0.3s ease',
});

globalStyle(`${workflowCard}:hover ${workflowIconWrapper}`, {
  backgroundColor: colors.primary[100],
  transform: 'scale(1.05)',
});

globalStyle(`${workflowCard}:hover ${workflowNumber}`, {
  transform: 'scale(1.1)',
  boxShadow: `0 4px 16px rgba(122, 126, 237, 0.6)`,
});

export const workflowTitle = style({
  fontSize: typography.fontSize['xl'],
  fontWeight: typography.fontWeight.semibold,
  marginBottom: spacing.sm,
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,
});

export const workflowDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
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
    'screen and (min-width: 1280px)': {
      display: 'none',
    },
  },
});

export const mobileGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

// CTA section
export const workflowCTA = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: spacing['3xl'],
  '@media': {
    'screen and (max-width: 768px)': {
      marginTop: spacing['2xl'],
    },
  },
});

// Legacy styles - kept for backward compatibility
export const workflowGrid = style({
  display: 'none',
});

export const workflowConnector = style({
  display: 'none',
});

export const workflowList = style({
  display: 'none',
});

export const workflowItem = style({
  display: 'none',
});

export const workflowContent = style({
  display: 'none',
});
