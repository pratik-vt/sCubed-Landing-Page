import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const heroSection = style({
  position: 'relative',
  width: '100%',
  padding: `${spacing['3xl']} 0 ${spacing['2xl']} 0`,
  marginTop: '-45px', // Account for fixed header like features page
  paddingTop: `calc(${spacing['3xl']} + 45px)`, // Add header height to padding
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

export const backgroundImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
});

export const backgroundOverlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  backgroundImage:
    'linear-gradient(to bottom right, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.88))', // Slightly stronger overlay for better text readability
});

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

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: '800', // Changed from typography.fontWeight.bold to match features page
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
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
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

// Bullet list card styles
export const bulletSection = style({
  padding: `${spacing.xl} 0 ${spacing['3xl']} 0`,
  background: `linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.primary[50]} 50%, ${colors.neutral[50]} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(122, 126, 237, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.06) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} 0 ${spacing['2xl']} 0`,
    },
  },
});

export const bulletCard = style({
  background: `linear-gradient(135deg, ${colors.white} 0%, rgba(248, 249, 255, 0.8) 100%)`,
  borderRadius: radius.xl,
  padding: spacing['2xl'],
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${colors.neutral[100]}`,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: '200px',
    background: `radial-gradient(circle, rgba(122, 126, 237, 0.05) 0%, transparent 70%)`,
    borderRadius: '50%',
    transform: 'translate(50px, -50px)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.xl,
    },
  },
});

globalStyle(`${bulletCard} > h3`, {
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xl,
  lineHeight: typography.lineHeight.normal,
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

globalStyle(`${bulletCard} > p`, {
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginTop: spacing.xl,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.medium,
  textAlign: 'center',
  maxWidth: '600px',
  margin: `${spacing.xl} auto 0 auto`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      maxWidth: '100%',
    },
  },
});

export const bulletGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

export const bulletItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.md,
  padding: spacing.md,
  borderRadius: radius.lg,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,

  ':hover': {
    transform: 'translateY(-2px)',
    background: `linear-gradient(135deg, rgba(122, 126, 237, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%)`,
    boxShadow: '0 8px 20px rgba(122, 126, 237, 0.1)',
  },
});

export const bulletIcon = style({
  flexShrink: 0,
  width: '48px',
  height: '48px',
  borderRadius: radius.full,
  background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[200]} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
  transition: 'all 0.3s ease',
  border: `2px solid ${colors.white}`,
  boxShadow: '0 4px 12px rgba(122, 126, 237, 0.15)',

  selectors: {
    [`${bulletItem}:hover &`]: {
      transform: 'scale(1.1) rotate(5deg)',
      background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
      color: colors.white,
      boxShadow: '0 6px 20px rgba(122, 126, 237, 0.3)',
    },
  },
});

export const bulletText = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[700],
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.medium,
  lineHeight: typography.lineHeight.relaxed,
  flex: 1,
  paddingTop: '2px', // Align with icon center
});
