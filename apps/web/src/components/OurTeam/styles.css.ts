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

// Mesh gradient animations
const meshMove = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
  '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
});

const meshMoveReverse = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  '33%': { transform: 'translate(-30px, 30px) scale(1.1)' },
  '66%': { transform: 'translate(20px, -20px) scale(0.9)' },
});

const meshRotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const pageContainer = style({
  minHeight: '100vh',
  backgroundColor: colors.white,
  position: 'relative',
  overflow: 'visible',
  display: 'flex',
  flexDirection: 'column',
});

export const heroSection = style({
  color: colors.white,
  padding: `clamp(${spacing.sm}, 2vh, ${spacing.lg}) ${spacing.sm}`,
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'clamp(180px, 25vh, 350px)',
  height: 'auto',
  maxHeight: '35vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  // Base gradient background
  background: `
    linear-gradient(125deg, #667eea 0%, #764ba2 100%)
  `,
  
  // Mesh gradient overlay
  backgroundImage: `
    radial-gradient(at 40% 20%, hsla(248, 68%, 65%, 1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189, 65%, 73%, 0.8) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355, 65%, 78%, 0.6) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(240, 68%, 62%, 0.7) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(22, 65%, 73%, 0.5) 0px, transparent 50%),
    radial-gradient(at 80% 100%, hsla(242, 68%, 66%, 0.8) 0px, transparent 50%),
    radial-gradient(at 0% 0%, hsla(343, 65%, 73%, 0.6) 0px, transparent 50%),
    linear-gradient(125deg, #667eea 0%, #764ba2 100%)
  `,
  backgroundSize: '200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 200% 200%, 100% 100%',
  backgroundPosition: '0% 0%, 100% 0%, 100% 100%, 0% 100%, 50% 50%, 50% 50%, 50% 50%, 0% 0%',
  
  // Grain texture overlay for premium feel
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
    opacity: 0.4,
    mixBlendMode: 'overlay',
  },
  
  // Animated gradient blobs
  '::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `
      radial-gradient(circle at 20% 30%, hsla(280, 70%, 70%, 0.3) 0px, transparent 50%),
      radial-gradient(circle at 80% 70%, hsla(200, 70%, 70%, 0.3) 0px, transparent 50%)
    `,
    pointerEvents: 'none',
    opacity: 0.5,
  },
  
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `clamp(${spacing.sm}, 2vh, ${spacing.md}) ${spacing.sm}`,
      minHeight: 'clamp(160px, 25vh, 300px)',
      maxHeight: '35vh',
    },
    'screen and (min-width: 769px) and (max-width: 1024px)': {
      padding: `clamp(${spacing.sm}, 2vh, ${spacing.md}) ${spacing.sm}`,
      minHeight: 'clamp(180px, 28vh, 320px)',
      maxHeight: '35vh',
    },
    'screen and (min-width: 1025px) and (max-width: 1440px)': {
      padding: `clamp(${spacing.sm}, 2.5vh, ${spacing.lg}) ${spacing.sm}`,
      minHeight: 'clamp(200px, 30vh, 350px)',
      maxHeight: '38vh',
    },
    'screen and (min-width: 1441px)': {
      padding: `${spacing.lg} ${spacing.sm}`,
      minHeight: '280px',
      maxHeight: '350px',
    },
    'screen and (max-height: 700px)': {
      minHeight: '180px',
      maxHeight: '30vh',
      padding: `${spacing.sm} ${spacing.sm}`,
    },
    'screen and (max-height: 600px)': {
      minHeight: '160px',
      maxHeight: '28vh',
      padding: `${spacing.xs} ${spacing.sm}`,
    },
  },
});

export const heroContent = style({
  maxWidth: '64rem',
  margin: '0 auto',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: spacing.xs,
});

export const heroTitle = style({
  fontSize: `clamp(${typography.fontSize['2xl']}, 4vw, ${typography.fontSize['4xl']})`,
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  marginBottom: spacing.xs,
  marginTop: 0,
  color: '#ffffff',
  textShadow: '0 4px 30px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.3)',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: `clamp(${typography.fontSize['xl']}, 4vw, ${typography.fontSize['2xl']})`,
      marginBottom: spacing.xs,
    },
    'screen and (min-width: 1441px)': {
      fontSize: typography.fontSize['4xl'],
    },
    'screen and (max-height: 700px)': {
      fontSize: `clamp(${typography.fontSize['xl']}, 3.5vw, ${typography.fontSize['2xl']})`,
      marginBottom: spacing.xs,
    },
    'screen and (max-height: 600px)': {
      fontSize: typography.fontSize['xl'],
      marginBottom: '4px',
    },
  },
});

export const heroText = style({
  fontSize: `clamp(${typography.fontSize.sm}, 1.5vw, ${typography.fontSize.base})`,
  lineHeight: '1.5',
  maxWidth: '48rem',
  margin: '0 auto',
  color: 'rgba(255, 255, 255, 0.95)',
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  fontWeight: typography.fontWeight.medium,
  marginBottom: 0,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: `clamp(${typography.fontSize.xs}, 1.8vw, ${typography.fontSize.sm})`,
      color: 'rgba(255, 255, 255, 0.92)',
      maxWidth: '100%',
      padding: `0 ${spacing.xs}`,
      lineHeight: '1.4',
    },
    'screen and (min-width: 1441px)': {
      fontSize: typography.fontSize.lg,
      lineHeight: '1.6',
    },
    'screen and (max-height: 700px)': {
      fontSize: typography.fontSize.sm,
      lineHeight: '1.4',
      maxWidth: '90%',
    },
    'screen and (max-height: 600px)': {
      fontSize: typography.fontSize.xs,
      lineHeight: '1.3',
      maxWidth: '85%',
    },
  },
});

export const section = style({
  padding: `clamp(${spacing.sm}, 3vh, ${spacing.lg}) ${spacing.sm}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `clamp(${spacing.xs}, 2vh, ${spacing.md}) ${spacing.sm}`,
    },
    'screen and (max-height: 700px)': {
      padding: `${spacing.sm} ${spacing.sm}`,
    },
    'screen and (max-height: 600px)': {
      padding: `${spacing.xs} ${spacing.sm}`,
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
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  marginBottom: spacing.sm,
  marginTop: 0,
  color: colors.neutral[900],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
      marginBottom: spacing.xs,
    },
    'screen and (min-width: 769px) and (max-width: 1024px)': {
      fontSize: typography.fontSize['2xl'],
      marginBottom: spacing.xs,
    },
    'screen and (min-width: 1025px) and (max-width: 1440px)': {
      fontSize: typography.fontSize['3xl'],
      marginBottom: spacing.sm,
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
  gap: spacing.lg,
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
  maxHeight: '600px',
  overflowY: 'auto',
  ':hover': {
    boxShadow: '0 20px 60px rgba(122, 126, 237, 0.2)',
    transform: 'translateY(-5px) scale(1.01)',
    borderColor: colors.primary[200],
  },
  '@media': {
    'screen and (min-width: 769px) and (max-width: 1440px)': {
      maxHeight: '500px',
    },
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
  padding: spacing.sm,
  gap: spacing.sm,
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
  width: '100px',
  height: '100px',
  borderRadius: radius.full,
  overflow: 'hidden',
  flexShrink: 0,
  border: `4px solid ${colors.primary[100]}`,
  boxShadow: '0 4px 20px rgba(122, 126, 237, 0.15)',
  transition: 'transform 0.3s ease',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '120px',
      height: '120px',
    },
    'screen and (min-width: 1441px)': {
      width: '128px',
      height: '128px',
    },
  },
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
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  color: colors.primary[600],
  marginBottom: spacing.xs,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
    'screen and (min-width: 1441px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const teamTitle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.primary[500],
});

export const teamBio = style({
  padding: `0 ${spacing.sm} ${spacing.sm}`,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  '@media': {
    'screen and (min-width: 769px) and (max-width: 1440px)': {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.lineHeight.normal,
    },
  },
});

export const ctaSection = style({
  background: `linear-gradient(125deg, #667eea 0%, #764ba2 100%)`,
  backgroundImage: `
    radial-gradient(at 20% 50%, hsla(280, 70%, 70%, 0.6) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(200, 70%, 70%, 0.5) 0px, transparent 50%),
    radial-gradient(at 50% 0%, hsla(355, 65%, 75%, 0.4) 0px, transparent 50%),
    linear-gradient(125deg, #667eea 0%, #764ba2 100%)
  `,
  color: colors.white,
  padding: `clamp(${spacing.sm}, 3vh, ${spacing.lg}) ${spacing.sm}`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: '150% 150%, 150% 150%, 150% 150%, 100% 100%',
  
  // Grain texture for consistency
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
    opacity: 0.3,
    mixBlendMode: 'overlay',
  },
  
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `clamp(${spacing.sm}, 4vh, ${spacing.lg}) ${spacing.sm}`,
    },
    'screen and (max-height: 700px)': {
      padding: `${spacing.md} ${spacing.sm}`,
    },
    'screen and (max-height: 600px)': {
      padding: `${spacing.sm} ${spacing.sm}`,
    },
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