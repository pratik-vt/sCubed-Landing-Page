import { style, keyframes } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../styles/tokens.css';

const float = keyframes({
  '0%, 100%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-20px)' },
});

const shimmer = keyframes({
  '0%': { backgroundPosition: '-1000px 0' },
  '100%': { backgroundPosition: '1000px 0' },
});

export const pageContainer = style({
  minHeight: '100vh',
  backgroundColor: colors.white,
  position: 'relative',
  overflow: 'hidden',
});

export const heroSection = style({
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 50%, #5a5fc7 100%)`,
  color: colors.white,
  padding: `${spacing['2xl']} ${spacing.sm} ${spacing['3xl']}`,
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    right: '-10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: `${float} 6s ease-in-out infinite`,
    pointerEvents: 'none',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} ${spacing.sm} ${spacing['2xl']}`,
    },
  },
});

export const heroContent = style({
  maxWidth: '64rem',
  margin: '0 auto',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
});

export const heroTitle = style({
  fontSize: typography.fontSize['6xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  marginBottom: spacing.md,
  marginTop: 0,
  background: 'linear-gradient(to right, #ffffff 0%, #f0f0ff 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 20px rgba(255,255,255,0.1)',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing.sm,
    },
  },
});

export const heroText = style({
  fontSize: typography.fontSize.xl,
  lineHeight: typography.lineHeight.relaxed,
  maxWidth: '48rem',
  margin: '0 auto',
  opacity: 0.95,
  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const section = style({
  padding: `${spacing['2xl']} ${spacing.sm}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} ${spacing.sm}`,
    },
  },
});

export const sectionAlt = style([
  section,
  {
    backgroundColor: colors.neutral[50],
  },
]);

export const sectionContent = style({
  maxWidth: '72rem',
  margin: '0 auto',
});

export const sectionTitle = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  marginBottom: spacing.sm,
  marginTop: 0,
  color: colors.neutral[900],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
      marginBottom: spacing.xs,
    },
  },
});

export const sectionSubtitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.normal,
  fontFamily: typography.fontFamily.body,
  textAlign: 'center',
  marginBottom: spacing.xl,
  marginTop: 0,
  color: colors.neutral[600],
  maxWidth: '48rem',
  margin: '0 auto',
  paddingBottom: spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
      paddingBottom: spacing.lg,
    },
  },
});

export const grid = style({
  display: 'grid',
  gap: spacing.lg,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: spacing.xl,
    },
  },
});

export const card = style({
  backgroundColor: colors.white,
  borderRadius: radius.lg,
  boxShadow: '0 4px 20px rgba(122, 126, 237, 0.08)',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(122, 126, 237, 0.1)',
  position: 'relative',
  ':hover': {
    boxShadow: '0 8px 30px rgba(122, 126, 237, 0.15)',
    transform: 'translateY(-8px)',
    borderColor: 'rgba(122, 126, 237, 0.2)',
  },
});

export const cardContent = style({
  padding: spacing.md,
});

export const cardTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.heading,
  marginBottom: spacing.sm,
  color: colors.primary[600],
});

export const cardText = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
});

export const teamGrid = style({
  display: 'grid',
  gap: spacing.xl,
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    'screen and (min-width: 1280px)': {
      gap: spacing['2xl'],
    },
  },
});

export const teamCard = style({
  backgroundColor: colors.white,
  borderRadius: radius.lg,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
  border: '1px solid rgba(122, 126, 237, 0.08)',
  ':hover': {
    boxShadow: '0 20px 60px rgba(122, 126, 237, 0.2)',
    transform: 'translateY(-5px) scale(1.01)',
    borderColor: colors.primary[200],
  },
});

export const teamCardLayout = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const teamCardHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  padding: spacing.md,
  gap: spacing.md,
  background: 'linear-gradient(135deg, rgba(122, 126, 237, 0.03) 0%, transparent 100%)',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

export const teamImageWrapper = style({
  width: '128px',
  height: '128px',
  borderRadius: radius.full,
  overflow: 'hidden',
  flexShrink: 0,
  border: `4px solid ${colors.primary[100]}`,
  boxShadow: '0 4px 20px rgba(122, 126, 237, 0.15)',
  transition: 'transform 0.3s ease',
});

export const teamImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const teamInfo = style({
  flex: 1,
});

export const teamName = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  color: colors.primary[600],
  marginBottom: spacing.xs,
});

export const teamTitle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.primary[500],
});

export const teamBio = style({
  padding: `0 ${spacing.md} ${spacing.md}`,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
});

export const ctaSection = style({
  background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 50%, #5a5fc7 100%)`,
  color: colors.white,
  padding: `${spacing['2xl']} ${spacing.sm}`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
    animation: `${float} 8s ease-in-out infinite`,
    pointerEvents: 'none',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: '-20%',
    right: '-20%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
    borderRadius: '50%',
    animation: `${float} 10s ease-in-out infinite reverse`,
    pointerEvents: 'none',
  },
});

export const ctaContent = style({
  maxWidth: '48rem',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
});

export const ctaTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  marginTop: 0,
  marginBottom: spacing.sm,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const ctaText = style({
  fontSize: typography.fontSize.lg,
  marginBottom: spacing.md,
  opacity: 0.9,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

export const ctaButton = style({
  display: 'inline-block',
  backgroundColor: colors.white,
  color: colors.primary[600],
  padding: `${spacing.sm} ${spacing.lg}`,
  borderRadius: radius.base,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.body,
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: colors.neutral[50],
    transform: 'translateY(-2px)',
    boxShadow: shadows.lg,
  },
});