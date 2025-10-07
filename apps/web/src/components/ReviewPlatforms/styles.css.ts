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
  maxWidth: '100%',
  padding: `${spacing.md} ${spacing.md}`,
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.sm} ${spacing.sm}`,
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
      gap: 0,
      minHeight: 'auto',
      padding: `0`,
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
      padding: `0`,
      width: '100%',
      justifyContent: 'center',
      zIndex: 'auto',
      background: 'transparent',
    },
  },
});

export const headingWrapper = style({
  display: 'inline-block',
  background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f1ff 100%)',
  padding: `${spacing.sm} ${spacing.lg}`,
  borderRadius: '12px',
  border: '2px solid #e8e9ff',
  boxShadow: '0 2px 8px rgba(122, 126, 237, 0.1)',
  marginBottom: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xs} ${spacing.md}`,
      marginBottom: spacing.md,
    },
  },
});

export const heading = style({
  textAlign: 'center',
  margin: 0,
  fontSize: 'clamp(20px, 1.25rem + 0.5vw, 28px)',
  fontWeight: typography.fontWeight.bold,
  color: '#000000',
  fontFamily: typography.fontFamily.heading,
  lineHeight: '1.3',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const highlight = style({
  color: '#7a7eed',
});

export const reviewText = style({
  fontSize: 'clamp(18px, 1.125rem + 0.5vw, 28px)',
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
  margin: 0,
  lineHeight: '1.2',
  fontFamily: typography.fontFamily.heading,
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const starsImage = style({
  display: 'flex',
  gap: '3px',
  alignItems: 'center',
  border: `2px solid ${colors.primary[600]}`,
  borderRadius: '8px',
  padding: '6px 10px',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: '2px',
      padding: '4px 8px',
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
  background: `linear-gradient(to right, ${colors.white} 0%, rgba(255, 255, 255, 0.8) 30%, transparent 100%)`,
  zIndex: 1,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100px',
      background: `linear-gradient(to right, ${colors.white} 0%, rgba(255, 255, 255, 0.7) 20%, transparent 100%)`,
    },
  },
});

export const logoStripWrapper = style({
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
});

export const logoStrip = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  flexWrap: 'nowrap',
  animation: `${scrollAnimation} 8s linear infinite`,
  willChange: 'transform',
  width: 'max-content',
  transform: 'translateZ(0)', // Force hardware acceleration
  backfaceVisibility: 'hidden',
  '@media': {
    'screen and (max-width: 1024px)': {
      animation: `${scrollAnimation} 6s linear infinite`,
      gap: spacing.sm,
    },
    'screen and (max-width: 768px)': {
      animation: `${scrollAnimation} 5s linear infinite`,
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
