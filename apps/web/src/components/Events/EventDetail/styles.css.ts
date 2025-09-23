import { style, globalStyle } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../../styles/tokens.css';

export const articleContainer = style({
  backgroundColor: colors.neutral[50],
  minHeight: '100vh',
  marginTop: '-80px',
  paddingTop: '80px',
  position: 'relative',

  '@media': {
    '(max-width: 768px)': {
      marginTop: '-60px',
      paddingTop: '60px',
    },
  },
});

export const heroSection = style({
  position: 'relative',
  height: '60vh',
  minHeight: '400px',
  maxHeight: '600px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    '(max-width: 768px)': {
      height: '50vh',
      minHeight: '300px',
    },
    '(max-width: 414px)': {
      height: '60vh',
      minHeight: '300px',
    },
  },
});

export const heroImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'brightness(0.4)',
});

export const heroOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
});

export const heroContent = style({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: colors.white,
  maxWidth: '1000px',
  padding: `0 ${spacing.xl}`,

  '@media': {
    '(max-width: 768px)': {
      maxWidth: '100%',
      padding: `0 ${spacing.sm}`,
    },
  },
});

export const heroTitle = style({
  fontSize: '3.5rem',
  fontWeight: typography.fontWeight.bold,
  lineHeight: '1.2',
  marginBottom: spacing.lg,
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',

  '@media': {
    '(max-width: 1024px)': {
      fontSize: '3rem',
    },
    '(max-width: 768px)': {
      fontSize: '2.5rem',
    },
    '(max-width: 650px)': {
      fontSize: '2rem',
    },
    '(max-width: 576px)': {
      fontSize: '1.75rem',
    },
    '(max-width: 480px)': {
      fontSize: '1.5rem',
    },
  },
});

export const heroMeta = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.lg,
  marginTop: spacing.lg,
  flexWrap: 'wrap',

  '@media': {
    '(max-width: 768px)': {
      gap: spacing.md,
    },
  },
});

export const heroMetaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: typography.fontSize.lg,
  opacity: 0.9,
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
});

export const heroCta = style({
  marginTop: spacing.xl,
});

export const heroRegisterButton = style({
  display: 'inline-block',
  padding: '14px 32px',
  backgroundColor: colors.primary[600],
  color: colors.white,
  borderRadius: radius.lg,
  textDecoration: 'none',
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.lg,
  transition: 'all 0.2s',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',

  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 12px -2px rgba(0, 0, 0, 0.4)',
  },

  ':active': {
    transform: 'translateY(0)',
  }
});

export const contentWrapper = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: spacing.xl,
  backgroundColor: colors.white,
  position: 'relative',
  marginTop: '-2rem',
  borderRadius: `${radius.xl} ${radius.xl} 0 0`,
  boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
  zIndex: 1,

  '@media': {
    '(max-width: 768px)': {
      maxWidth: '100%',
      padding: spacing.sm,
      marginTop: '-1rem',
    },
  },
});

export const breadcrumbRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.xl,
  paddingBottom: spacing.lg,
  borderBottom: `1px solid ${colors.neutral[200]}`,

  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      gap: spacing.md,
      alignItems: 'flex-start',
    },
  },
});

export const breadcrumb = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
});

globalStyle(`${breadcrumb} a`, {
  color: colors.neutral[600],
  textDecoration: 'none',
  transition: 'color 0.2s',
});

globalStyle(`${breadcrumb} a:hover`, {
  color: colors.primary[600],
  textDecoration: 'underline',
});

globalStyle(`${breadcrumb} span`, {
  color: colors.neutral[800],
  fontWeight: typography.fontWeight.medium,
});

export const contentLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 360px',
  gap: spacing.xl,
  alignItems: 'start',

  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.lg,
    },
  },
});

export const mainContent = style({
  minWidth: 0,
});

export const articleContent = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
  marginBottom: spacing.xl,
});

globalStyle(`${articleContent} h2`, {
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginTop: spacing.xl,
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.heading,
});

globalStyle(`${articleContent} h3`, {
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
  marginTop: spacing.lg,
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
});

globalStyle(`${articleContent} p`, {
  marginBottom: spacing.md,
});

globalStyle(`${articleContent} ul, ${articleContent} ol`, {
  marginBottom: spacing.md,
  paddingLeft: spacing.xl,
});

globalStyle(`${articleContent} li`, {
  marginBottom: spacing.sm,
});

globalStyle(`${articleContent} a`, {
  color: colors.primary[600],
  textDecoration: 'underline',
  transition: 'color 0.2s',
});

globalStyle(`${articleContent} a:hover`, {
  color: colors.primary[700],
});

globalStyle(`${articleContent} blockquote`, {
  borderLeft: `4px solid ${colors.primary[400]}`,
  paddingLeft: spacing.lg,
  marginLeft: 0,
  marginRight: 0,
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  fontStyle: 'italic',
  color: colors.neutral[600],
});

export const categoriesTagsSection = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.xl,
  paddingTop: spacing.xl,
  borderTop: `1px solid ${colors.neutral[200]}`,
  marginTop: spacing.xl,
  marginBottom: spacing.xl,

  '@media': {
    '(max-width: 768px)': {
      gap: spacing.lg,
    },
  },
});

export const sectionWrapper = style({
  flex: '0 0 auto',
});

export const sectionLabel = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: colors.neutral[500],
  marginBottom: spacing.sm,
});

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.sm,
});

export const tag = style({
  display: 'inline-block',
  padding: `${spacing.xs} ${spacing.sm}`,
  backgroundColor: colors.neutral[100],
  color: colors.neutral[700],
  borderRadius: radius.md,
  fontSize: typography.fontSize.sm,
  textDecoration: 'none',
  transition: 'all 0.2s',
  border: `1px solid ${colors.neutral[200]}`,

  ':hover': {
    backgroundColor: colors.primary[100],
    color: colors.primary[700],
    borderColor: colors.primary[300],
    transform: 'translateY(-1px)',
  },
});

export const socialShare = style({
  backgroundColor: colors.neutral[50],
  borderRadius: radius.lg,
  padding: spacing.xl,
  marginTop: spacing.xl,
  border: `1px solid ${colors.neutral[200]}`,
});

export const shareHeader = style({
  marginBottom: spacing.lg,
});

export const socialShareTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
});

export const shareStats = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

export const socialShareGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.sm,

  '@media': {
    '(max-width: 480px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

const shareButtonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.md}`,
  borderRadius: radius.md,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  textDecoration: 'none',
  transition: 'all 0.2s',
  border: 'none',
  cursor: 'pointer',
});

export const copyLinkButton = style([
  shareButtonBase,
  {
    backgroundColor: colors.neutral[200],
    color: colors.neutral[700],

    ':hover': {
      backgroundColor: colors.neutral[300],
      transform: 'translateY(-1px)',
    },
  },
]);

export const twitterButton = style([
  shareButtonBase,
  {
    backgroundColor: '#1DA1F2',
    color: colors.white,

    ':hover': {
      backgroundColor: '#1a91da',
      transform: 'translateY(-1px)',
    },
  },
]);

export const linkedinButton = style([
  shareButtonBase,
  {
    backgroundColor: '#0077B5',
    color: colors.white,

    ':hover': {
      backgroundColor: '#006399',
      transform: 'translateY(-1px)',
    },
  },
]);

export const facebookButton = style([
  shareButtonBase,
  {
    backgroundColor: '#1877F2',
    color: colors.white,

    ':hover': {
      backgroundColor: '#166fe5',
      transform: 'translateY(-1px)',
    },
  },
]);

export const sidebar = style({
  position: 'sticky',
  top: '100px',

  '@media': {
    '(max-width: 1024px)': {
      position: 'relative',
      top: 'auto',
    },
  },
});

export const eventInfoCard = style({
  backgroundColor: colors.white,
  borderRadius: radius.lg,
  padding: spacing.xl,
  border: `2px solid ${colors.neutral[200]}`,
  boxShadow: shadows.sm,
});

export const eventInfoTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.lg,
});

export const infoSection = style({
  marginBottom: spacing.lg,
  paddingBottom: spacing.lg,
  borderBottom: `1px solid ${colors.neutral[200]}`,

  ':last-child': {
    borderBottom: 'none',
    marginBottom: 0,
    paddingBottom: 0,
  },
});

globalStyle(`${infoSection} h4`, {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: colors.neutral[600],
  marginBottom: spacing.sm,
});

globalStyle(`${infoSection} p`, {
  fontSize: typography.fontSize.base,
  color: colors.neutral[800],
  lineHeight: typography.lineHeight.relaxed,
});

export const infoSubtext = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  marginTop: spacing.xs,
});

export const statusBadge = style({
  display: 'inline-block',
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: radius.md,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'capitalize',
});

export const statusUpcoming = style({
  backgroundColor: colors.accent.green,
  color: colors.white,
});

export const statusOngoing = style({
  backgroundColor: colors.accent.coral,
  color: colors.white,
});

export const statusCompleted = style({
  backgroundColor: colors.neutral[200],
  color: colors.neutral[700],
});

export const ctaWrapper = style({
  marginTop: spacing.xl,
  paddingTop: spacing.xl,
  borderTop: `1px solid ${colors.neutral[200]}`,
});

export const registerButtonSidebar = style({
  display: 'block',
  width: '100%',
  padding: `${spacing.md} ${spacing.lg}`,
  backgroundColor: colors.primary[600],
  color: colors.white,
  borderRadius: radius.md,
  textAlign: 'center',
  textDecoration: 'none',
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.base,
  transition: 'all 0.2s',

  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: shadows.md,
  },

  ':active': {
    transform: 'translateY(0)',
  },
});