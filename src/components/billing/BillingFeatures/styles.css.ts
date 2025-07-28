import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const featuresSection = style({
  padding: `${spacing.xl} 0 ${spacing['2xl']} 0`,
  background: `linear-gradient(135deg, ${colors.neutral[50]} 0%, ${colors.primary[50]} 50%, ${colors.neutral[50]} 100%)`, // Fixed color reference
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
      radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `, // Fixed with rgba values
    pointerEvents: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} 0 ${spacing.xl} 0`,
    },
  },
});

export const featuresContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  textAlign: 'center',
  marginBottom: spacing.xl, // Reduced from 3xl to xl
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px', // Reduced from -16px to bring underline closer
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: `linear-gradient(90deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
    borderRadius: radius.full,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing.lg, // Reduced mobile margin
    },
  },
});

export const featuresGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.lg, // Reduced from xl to lg for tighter layout
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md, // Reduced mobile gap
    },
  },
});

export const featureCard = style({
  position: 'relative',
  padding: spacing.xl,
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.neutral[50]} 100%)`, // Fixed gradient
  borderRadius: radius.xl,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.08)`,
  border: `1px solid ${colors.neutral[100]}`,
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: `radial-gradient(circle, rgba(122, 126, 237, 0.1) 0%, transparent 70%)`,
    borderRadius: '50%',
    transform: 'translate(30px, -30px)',
    transition: 'all 0.3s ease',
  },
  ':hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 12px 40px rgba(122, 126, 237, 0.15)`,
    borderColor: colors.primary[200],
  },
  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, ${colors.primary[50]} 0%, transparent 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  selectors: {
    '&:hover::after': {
      opacity: 0.3,
    },
    '&:hover::before': {
      background: `radial-gradient(circle, rgba(122, 126, 237, 0.15) 0%, transparent 70%)`,
      transform: 'translate(20px, -20px) scale(1.2)',
    },
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
    },
  },
});

export const featureIconWrapper = style({
  width: '64px',
  height: '64px',
  borderRadius: radius.lg,
  background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[50]} 100%)`, // Default fallback
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.md,
  color: colors.primary[600],
  transition: 'all 0.3s ease',
  position: 'relative',
  zIndex: 1,
  border: '2px solid transparent',
  selectors: {
    [`${featureCard}:hover &`]: {
      transform: 'scale(1.1) rotate(5deg)', // Enhanced hover animation
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    },
  },
});

export const featureTitle = style({
  fontSize: typography.fontSize.xl, // Reduced from 2xl to xl for better proportion
  fontWeight: typography.fontWeight.semibold,
  marginBottom: spacing.sm, // Reduced from md to sm
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  position: 'relative',
  zIndex: 1,
});

export const featureDescription = style({
  fontSize: typography.fontSize.base, // Reduced from lg to base for better density
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  position: 'relative',
  zIndex: 1,
});
