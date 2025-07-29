import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const featuresSection = style({
  padding: `${spacing.xl} 0 ${spacing.lg} 0`, // Reduced bottom padding from 2xl to lg for tighter spacing
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
      padding: `${spacing.lg} 0 ${spacing.md} 0`, // Reduced mobile bottom padding for consistency
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
  gridTemplateColumns: 'repeat(4, 1fr)', // Changed to 4 columns for single row
  gap: spacing.md, // Reduced gap for better horizontal fit
  '@media': {
    'screen and (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, 1fr)', // 2x2 grid on medium screens
      gap: spacing.lg,
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr', // Single column on mobile
      gap: spacing.md,
    },
  },
});

export const featureCard = style({
  position: 'relative',
  padding: spacing.lg, // Reduced padding to fit 4 cards horizontally
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.neutral[50]} 100%)`,
  borderRadius: radius.xl,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Slightly longer transition
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.08)`,
  border: `1px solid ${colors.neutral[100]}`,
  // Add subtle border fade effect between cards
  '::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '-1px',
    width: '1px',
    height: '80%',
    background: `linear-gradient(to bottom, transparent 0%, ${colors.neutral[200]} 20%, ${colors.neutral[200]} 80%, transparent 100%)`,
    opacity: 0.6,
    transition: 'opacity 0.3s ease',
  },
  // Add corner glow effect
  '::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle, rgba(122, 126, 237, 0.1) 0%, transparent 60%)`,
    borderRadius: '50%',
    transition: 'all 0.4s ease',
    opacity: 0,
  },
  ':hover': {
    transform: 'translateY(-12px) scale(1.03)', // Enhanced lift effect
    boxShadow: `0 20px 60px rgba(122, 126, 237, 0.2)`, // More dramatic shadow
    borderColor: colors.primary[300],
    zIndex: 10, // Ensure hovered card is on top
  },
  selectors: {
    '&:hover::before': {
      opacity: 0, // Hide border separator on hover
    },
    '&:hover::after': {
      opacity: 1,
      top: '-30%',
      right: '-30%',
      transform: 'scale(1.2)',
    },
    // Hide right border on last card
    '&:nth-child(4)::before': {
      display: 'none',
    },
  },
  '@media': {
    'screen and (max-width: 1200px)': {
      padding: spacing.lg,
      // Adjust border separators for 2x2 layout
      selectors: {
        '&:nth-child(2)::before, &:nth-child(4)::before': {
          display: 'none',
        },
      },
    },
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      // Hide all border separators on mobile
      selectors: {
        '&::before': {
          display: 'none',
        },
      },
    },
  },
});

export const featureIconWrapper = style({
  width: '56px', // Slightly smaller for better proportion in horizontal layout
  height: '56px',
  borderRadius: radius.lg,
  background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[50]} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.sm, // Reduced margin for tighter spacing
  color: colors.primary[600],
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  border: '2px solid transparent',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  selectors: {
    [`${featureCard}:hover &`]: {
      transform: 'scale(1.15) rotate(8deg)', // More dramatic hover animation
      boxShadow: '0 12px 30px rgba(122, 126, 237, 0.25)',
      borderColor: colors.primary[200],
    },
  },
  '@media': {
    'screen and (max-width: 1200px)': {
      width: '60px', // Restore larger size on medium screens
      height: '60px',
      marginBottom: spacing.md,
    },
  },
});

export const featureTitle = style({
  fontSize: typography.fontSize.lg, // Adjusted for horizontal layout
  fontWeight: typography.fontWeight.semibold,
  marginBottom: spacing.xs, // Tighter spacing for horizontal layout
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  position: 'relative',
  zIndex: 1,
  lineHeight: typography.lineHeight.tight,
  '@media': {
    'screen and (max-width: 1200px)': {
      fontSize: typography.fontSize.xl, // Larger on medium screens
      marginBottom: spacing.sm,
    },
  },
});

export const featureDescription = style({
  fontSize: typography.fontSize.sm, // Smaller for horizontal layout
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  position: 'relative',
  zIndex: 1,
  '@media': {
    'screen and (max-width: 1200px)': {
      fontSize: typography.fontSize.base, // Larger on medium screens
    },
  },
});
