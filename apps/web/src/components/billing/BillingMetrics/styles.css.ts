import { style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const featuresSection = style({
  padding: `${spacing.xl} 0 ${spacing.xl} 0`,
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
      radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} 0 ${spacing.md} 0`,
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
  marginTop: '0',
  marginBottom: '24px',
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing.lg,
    },
  },
});

export const featuresGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(24, 1fr)',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: spacing.lg,
      justifyContent: 'center',
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: spacing.md,
    },
    'screen and (max-width: 575px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },    
  },
});

export const featureCard = style({
  position: 'relative',
  padding: spacing.lg,
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.neutral[50]} 100%)`,
  borderRadius: radius.xl,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.08)`,
  border: `1px solid ${colors.neutral[100]}`,
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
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: `0 20px 60px rgba(122, 126, 237, 0.2)`,
    borderColor: colors.primary[300],
    zIndex: 10,
  },
  selectors: {
    '&:hover::before': {
      opacity: 0,
    },
    '&:hover::after': {
      opacity: 1,
      top: '-30%',
      right: '-30%',
      transform: 'scale(1.2)',
    },
    '&:nth-child(1)': {
      gridColumn: '4 / span 6',
    },
    '&:nth-child(2)': {
      gridColumn: '10 / span 6',
    },
    '&:nth-child(3)': {
      gridColumn: '16 / span 6',
    },
    '&:nth-child(n+4):nth-child(-n+7)': {
      gridColumn: 'span 6',
    },
    '&:nth-child(3)::before, &:nth-child(7)::before': {
      display: 'none',
    },
  },
  '@media': {
    'screen and (max-width: 1200px)': {
      padding: spacing.lg,
      gridColumn: 'span 1 !important',
      selectors: {
        '&:nth-child(2)::before, &:nth-child(4)::before': {
          display: 'none',
        },
      },
    },
    'screen and (max-width: 768px)': {
      padding: spacing.lg,
      gridColumn: 'span 1 !important',
      selectors: {
        '&::before': {
          display: 'none',
        },
      },
    },    
    'screen and (min-width: 1201px) and (max-width: 1480px)': {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    'screen and (min-width: 769px) and (max-width: 991px)': {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

export const featureIconWrapper = style({
  width: '56px',
  height: '56px',
  minWidth: '56px',
  minHeight: '56px',
  borderRadius: radius.lg,
  background: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[50]} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 0,
  color: colors.primary[600],
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  border: '2px solid transparent',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  selectors: {
    [`${featureCard}:hover &`]: {
      transform: 'scale(1.15) rotate(8deg)',
      boxShadow: '0 12px 30px rgba(122, 126, 237, 0.25)',
      borderColor: colors.primary[200],
    },
  },
  '@media': {
    'screen and (max-width: 1200px)': {
      width: '60px',
      height: '60px',
    },
  },
});

export const featureTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: typography.fontWeight.semibold,
  marginBottom: 0,
  marginTop: '0',
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.heading,
  position: 'relative',
  zIndex: 1,
  lineHeight: typography.lineHeight.tight,
  '@media': {
    'screen and (max-width: 1200px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const featureDescription = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  padding: 0,
  margin: '20px 0 0 0',
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  position: 'relative',
  zIndex: 1,
  '@media': {
    'screen and (max-width: 1200px)': {
      fontSize: typography.fontSize.base,
    },
    'screen and (min-width: 1201px) and (max-width: 1480px)': {
      marginTop: '0px',
    },
    'screen and (min-width: 769px) and (max-width: 991px)': {
      marginTop: '0px',
    },
  },
});

export const featureContentTopValues = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.md,
  '@media': {
    'screen and (min-width: 1201px) and (max-width: 1480px)': {
      flexDirection: 'column',
    },
    'screen and (min-width: 769px) and (max-width: 991px)': {
      flexDirection: 'column',
    },
  },
})

export const sectionSubtitle = style({
     fontSize: typography.fontSize.lg,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: spacing['lg'],
})
