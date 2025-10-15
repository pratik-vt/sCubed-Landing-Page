import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '../../styles/tokens.css';

// Container
export const container = style({
  width: '100%',
  maxWidth: '100%',
  padding: `${spacing.lg} ${spacing.md}`,
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.md} ${spacing.sm}`,
    },
  },
});

// Content wrapper
export const contentWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'column',
      gap: spacing.md,
    },
  },
});

// Heading wrapper
export const headingWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      marginBottom: spacing.md,
    },
  },
});

// Heading
export const heading = style({
  textAlign: 'center',
  margin: 0,
  fontSize: 'clamp(20px, 1.5rem + 0.5vw, 28px)',
  fontWeight: typography.fontWeight.bold,
  color: colors.black,
  fontFamily: typography.fontFamily.heading,
  lineHeight: '1.3',
  background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f1ff 100%)',
  padding: `${spacing.sm} ${spacing.lg}`,
  borderRadius: '12px',
  border: '2px solid #e8e9ff',
  boxShadow: '0 2px 8px rgba(122, 126, 237, 0.1)',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
      padding: `${spacing.xs} ${spacing.md}`,
    },
  },
});

// Highlight text
export const highlight = style({
  color: colors.primary[600],
});

// Left section (stars and rating)
export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
  flexShrink: 0,
  '@media': {
    'screen and (max-width: 1024px)': {
      justifyContent: 'center',
      width: '100%',
    },
  },
});

// Stars container
export const starsContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
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

// Rating text
export const ratingText = style({
  fontSize: 'clamp(18px, 1.25rem + 0.3vw, 24px)',
  fontWeight: typography.fontWeight.bold,
  color: colors.primary[600],
  margin: 0,
  fontFamily: typography.fontFamily.heading,
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

// Logo grid - flexbox layout
export const logoGrid = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 120px)',
      gridTemplateRows: 'repeat(2, 40px)',
      gap: spacing.md,
      justifyContent: 'center',
    },
  },
});

// Logo container - fixed dimensions
export const logoContainer = style({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Logo button
export const logoButton = style({
  background: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease',
  opacity: 0.9,
  ':hover': {
    opacity: 1,
  },
});

// Logo image - fixed dimensions with object-fit
export const logoImage = style({
  width: '100%',
  objectFit: 'contain',
  display: 'block',
});
