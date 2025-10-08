import { globalStyle, style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../styles/tokens.css';

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
  paddingTop: spacing.lg,
  paddingBottom: spacing.md,
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100%',
      overflow: 'hidden',
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    'screen and (max-width: 768px)': {
      paddingTop: spacing.sm,
      paddingBottom: spacing.xs,
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

export const gradientOverlayRight = style({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  width: '200px',
  background: `linear-gradient(to left, ${colors.white} 0%, rgba(255, 255, 255, 0.8) 30%, transparent 100%)`,
  zIndex: 1,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 1024px)': {
      width: '100px',
      background: `linear-gradient(to left, ${colors.white} 0%, rgba(255, 255, 255, 0.7) 20%, transparent 100%)`,
    },
  },
});

// Individual logo strip - no animation, just layout
export const logoStrip = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xl,
  '@media': {
    'screen and (max-width: 1024px)': {
      gap: spacing.lg,
      paddingRight: spacing.lg,
    },
    'screen and (max-width: 768px)': {
      gap: spacing.md,
      paddingRight: spacing.md,
    },
  },
});

globalStyle(`${logoStrip} a:last-child img`, {
  marginLeft: '-50px',
  '@media': {
    'screen and (max-width: 1024px)': {
      marginLeft: '0',
    },
    'screen and (max-width: 768px)': {
      marginLeft: '0',
    },
  },
});

globalStyle(`${logoStrip} img`, {
  height: '30px',
  maxHeight: '30px',
});

export const logoItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  textDecoration: 'none',
  flexShrink: 0,
  height: '100%',
  minWidth: '100px',
  opacity: 0.7,
  marginRight: spacing.xl,
  ':hover': {
    opacity: 1,
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      minWidth: '120px',
    },
    'screen and (max-width: 768px)': {
      minWidth: '100px',
    },
  },
});
