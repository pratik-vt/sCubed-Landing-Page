import { keyframes, style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../styles/tokens.css';

// Keyframes for truly continuous scroll animation
// Strategy: Move exactly 50% (half the strip) since we have 2 identical sets
// When animation completes at -50%, it looks identical to 0%, creating seamless loop
const scrollAnimation = keyframes({
  '0%': {
    transform: 'translateX(0%)',
  },
  '100%': {
    transform: 'translateX(-50%)',
  },
});

export const container = style({
  width: '100%',
  padding: `${spacing.md} ${spacing.lg}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.sm} ${spacing.md}`,
    },
  },
});

export const contentWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: '0 auto',
  minHeight: '91px',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'column',
      gap: spacing.sm,
      minHeight: 'auto',
      padding: `${spacing.sm} 0`,
    },
  },
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  flexShrink: 0,
  position: 'relative',
  zIndex: 2,
  padding: `${spacing.sm} ${spacing.md}`,
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100%',
      justifyContent: 'center',
      zIndex: 'auto',
      background: 'transparent',
    },
  },
});

export const reviewText = style({
  fontSize: 'clamp(22px, 1.378rem + 1vw, 36px)',
  fontWeight: typography.fontWeight.medium,
  color: colors.primary[600],
  margin: 0,
  lineHeight: '1.2',
  fontFamily: typography.fontFamily.heading,
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const starsImage = style({
  display: 'flex',
  gap: '3px',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: '2px',
    },
  },
});

export const rightSection = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  position: 'relative',
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100%',
      overflow: 'hidden',
    },
  },
});

export const gradientOverlay = style({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '200px',
  background: `linear-gradient(to right, ${colors.neutral[50]} 0%, rgba(250, 250, 250, 0.8) 30%, transparent 100%)`,
  zIndex: 1,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100px',
      background: `linear-gradient(to right, ${colors.neutral[50]} 0%, rgba(250, 250, 250, 0.7) 20%, transparent 100%)`,
    },
  },
});

export const logoStripWrapper = style({
  overflow: 'hidden',
  width: '100%',
});

export const logoStrip = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  flexWrap: 'nowrap',
  animation: `${scrollAnimation} 15s linear infinite`,
  willChange: 'transform',
  width: 'max-content',
  '@media': {
    'screen and (max-width: 1024px)': {
      animation: `${scrollAnimation} 10s linear infinite`,
      gap: spacing.sm,
    },
    'screen and (max-width: 768px)': {
      animation: `${scrollAnimation} 10s linear infinite`,
      gap: '12px',
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const logoItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  textDecoration: 'none',
  flexShrink: 0,
  width: '220px',
  ':hover': {
    opacity: '1 !important',
    transform: 'scale(1.05)',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '180px',
    },
    'screen and (max-width: 768px)': {
      width: '140px',
    },
  },
});

export const logoItemDuplicate = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  textDecoration: 'none',
  flexShrink: 0,
  width: '220px',
  ':hover': {
    opacity: '1 !important',
    transform: 'scale(1.05)',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '180px',
    },
    'screen and (max-width: 768px)': {
      width: '140px',
    },
    '(prefers-reduced-motion: reduce)': {
      display: 'none', // Hide duplicates when animation is disabled
    },
  },
});
