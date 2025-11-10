import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  radius,
  shadows,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const articleContainer = style({
  backgroundColor: colors.neutral[50],
  minHeight: '100vh',
  marginTop: '-80px', // Compensate for layout margin
  paddingTop: '80px', // Add padding to push content below header
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
  background:
    'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
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

export const breadcrumb = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  marginBottom: spacing.lg,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
  minWidth: 0, // Allow proper flex shrinking
  flex: 1, // Take available space but allow shrinking
  overflow: 'hidden', // Prevent text overflow
  textOverflow: 'ellipsis', // Add ellipsis for long text
});

export const categoryTag = style({
  backgroundColor: colors.primary[100],
  color: colors.primary[700],
  padding: '0.25rem 0.5rem',
  borderRadius: radius.sm,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
});

export const articleHeader = style({
  marginBottom: spacing.xl,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  paddingBottom: spacing.lg,
});

export const articleTitle = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
  color: colors.neutral[900],
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.heading,

  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const articleMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.lg,
  flexWrap: 'wrap',
  marginBottom: spacing.md,
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

export const audioPlayer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: colors.primary[50],
  color: colors.primary[700],
  padding: `${spacing.sm} ${spacing.md}`,
  borderRadius: radius.md,
  border: `1px solid ${colors.primary[200]}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,

  ':hover': {
    backgroundColor: colors.primary[100],
    borderColor: colors.primary[300],
  },
});

export const articleContent = style({
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
  scrollPaddingTop: '100px', // Account for fixed header

  '@media': {
    '(max-width: 768px)': {
      scrollPaddingTop: '80px',
    },
  },
});

export const contentSection = style({
  marginBottom: spacing['3xl'],
});

export const sectionTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.heading,
  lineHeight: typography.lineHeight.tight,

  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const sectionContent = style({});

export const listItem = style({
  marginBottom: spacing.sm,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  paddingLeft: spacing.sm,
  position: 'relative',

  '::before': {
    content: '•',
    color: colors.primary[600],
    fontWeight: typography.fontWeight.bold,
    position: 'absolute',
    left: 0,
  },
});

export const quoteBlock = style({
  backgroundColor: colors.neutral[50],
  borderLeft: `4px solid ${colors.primary[600]}`,
  padding: spacing.lg,
  margin: `${spacing.lg} 0`,
  borderRadius: radius.md,
});

export const tableWrapper = style({
  margin: `${spacing.lg} 0`,
  overflowX: 'auto',
  borderRadius: radius.md,
  border: `1px solid ${colors.neutral[200]}`,
});

export const responsiveTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: colors.white,
});

// Content Divider
export const contentDivider = style({
  width: '100%',
  height: '1px',
  background: `linear-gradient(90deg, transparent 0%, ${colors.neutral[200]} 50%, transparent 100%)`,
  margin: `${spacing.xl} 0`,
  position: 'relative',

  '::after': {
    content: '',
    position: 'absolute',
    top: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '8px',
    height: '8px',
    backgroundColor: colors.primary[200],
    borderRadius: '50%',
  },
});

export const tableOfContents = style({
  backgroundColor: colors.neutral[50],
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.md,
  padding: spacing.md,
  marginBottom: spacing.lg,
  // maxHeight: '300px',
  overflowY: 'auto',

  '@media': {
    '(max-width: 768px)': {
      // maxHeight: '250px',
      marginBottom: spacing.md,
    },
  },
});

export const tocTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: spacing.sm,
});

export const tocList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const tocItem = style({
  marginBottom: spacing.sm,
});

export const relatedPosts = style({
  marginTop: spacing.xl,
  backgroundColor: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.md,
  padding: spacing.lg,
});

export const relatedPostCard = style({
  marginBottom: spacing.lg,
  paddingBottom: spacing.lg,
  borderBottom: `1px solid ${colors.neutral[200]}`,

  ':last-child': {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: 'none',
  },
});

// Enhanced Author Section
export const authorCard = style({
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  boxShadow: shadows.md,
  overflow: 'hidden',
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
  border: `1px solid ${colors.neutral[100]}`,
  transition: 'all 0.3s ease',

  ':hover': {
    boxShadow: shadows.lg,
    transform: 'translateY(-2px)',
  },
});

export const authorInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.lg,
  padding: spacing.lg,

  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: spacing.lg,
    },
  },
});

export const authorAvatar = style({
  flexShrink: 0,
  position: 'relative',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  overflow: 'hidden',

  '::after': {
    content: '',
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    right: '-3px',
    bottom: '-3px',
    background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.accent.teal})`,
    borderRadius: '50%',
    zIndex: -1,
  },
});

export const authorAvatarFallback = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: colors.neutral[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[600],
  fontFamily: typography.fontFamily.heading,
  textTransform: 'uppercase',
});

export const authorContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});

export const authorDetails = style({
  flex: 1,
});

globalStyle(`${authorDetails} h3`, {
  margin: 0,
});

export const authorName = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
  fontFamily: typography.fontFamily.heading,
});

export const authorPosition = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.medium,
  color: colors.primary[600],
  marginBottom: spacing.sm,
});

export const authorBio = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  margin: 0,
});

export const authorMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',

  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'center',
    },
  },
});

export const authorStats = style({
  display: 'flex',
  gap: spacing.lg,

  '@media': {
    '(max-width: 768px)': {
      gap: spacing.md,
    },
  },
});

export const authorStat = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const authorStatLabel = style({
  fontSize: typography.fontSize.xs,
  color: colors.neutral[500],
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontWeight: typography.fontWeight.medium,
});

export const authorStatValue = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[900],
  fontWeight: typography.fontWeight.semibold,
});

// Enhanced Social Share
export const socialShare = style({
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  boxShadow: shadows.md,
  overflow: 'hidden',
  marginTop: spacing.xl,
  border: `1px solid ${colors.neutral[100]}`,
});

export const shareHeader = style({
  padding: spacing.xl,
  paddingBottom: spacing.lg,
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.neutral[50]} 100%)`,
  borderBottom: `1px solid ${colors.neutral[100]}`,
});

export const socialShareTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  fontFamily: typography.fontFamily.heading,
  margin: 0,
});

export const shareStats = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  fontStyle: 'italic',
});

export const socialShareGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: spacing.sm,
  padding: spacing.xl,
  paddingTop: spacing.lg,

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.md,
    },
  },
});

export const socialButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm}`,
  borderRadius: radius.lg,
  textDecoration: 'none',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  transition: 'all 0.3s ease',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.lg,
  },

  ':active': {
    transform: 'translateY(0)',
  },
});

export const copyLinkButton = style([
  socialButton,
  {
    backgroundColor: colors.neutral[100],
    color: colors.neutral[700],
    border: `2px solid ${colors.neutral[200]}`,

    ':hover': {
      backgroundColor: colors.neutral[200],
      borderColor: colors.neutral[300],
      color: colors.neutral[800],
    },
  },
]);

export const copySuccess = style({
  color: colors.accent.green,
});

// X (formerly Twitter) button
export const twitterButton = style([
  socialButton,
  {
    backgroundColor: '#000000', // X's official black color
    color: colors.white,

    ':hover': {
      backgroundColor: '#333333',
    },
  },
]);

export const linkedinButton = style([
  socialButton,
  {
    backgroundColor: '#0077B5',
    color: colors.white,

    ':hover': {
      backgroundColor: '#005885',
    },
  },
]);

export const facebookButton = style([
  socialButton,
  {
    backgroundColor: '#1877F2',
    color: colors.white,

    ':hover': {
      backgroundColor: '#0d61bf',
    },
  },
]);

export const contentLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 354px',
  gap: spacing.xl,

  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.lg,
    },
  },
});

export const mainContent = style({
  minWidth: '0',
  marginTop: `-${spacing['4xl']}`,
  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
      marginTop: `-${spacing['xl']}`,
    },
  },
});

export const sidebar = style({
  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
    },
  },
});

export const breadcrumbRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: spacing.md,
  flexWrap: 'wrap',
  gridColumn: '1 / -1',
  marginBottom: 0,
  minWidth: 0, // Allow flex items to shrink properly

  '@media': {
    '(max-width: 1024px)': {
      flexDirection: 'column',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
  },
});

export const audioButtonInline = style({
  flexShrink: 0,
  marginLeft: 'auto',
  minWidth: 0, // Prevent overflow
  maxWidth: '354px', // Keep at 300px as requested
  width: '100%',
  marginTop: '-20px',
  '@media': {
    '(max-width: 1024px)': {
      maxWidth: '100%',
      marginLeft: 0,
      marginTop: '0px',
    },
  },
});

export const categoriesTagsSection = style({
  marginTop: spacing.xl,
  paddingTop: spacing.lg,
  borderTop: `1px solid ${colors.neutral[200]}`,
});

export const sectionWrapper = style({
  marginBottom: spacing.lg,
});

export const sectionLabel = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[500],
  marginBottom: spacing.sm,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const codeBlock = style({
  backgroundColor: colors.neutral[900],
  color: colors.neutral[100],
  padding: spacing.lg,
  borderRadius: radius.md,
  overflow: 'auto',
  fontSize: typography.fontSize.sm,
  fontFamily: 'monospace',
  margin: `${spacing.lg} 0`,
  border: `1px solid ${colors.neutral[300]}`,
});

// Legacy author styles (keeping for backward compatibility)
// authorDetails is already declared above

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.sm,
  marginTop: spacing.lg,
});

export const tag = style({
  backgroundColor: colors.primary[100],
  color: colors.primary[700],
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: radius.base,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  textDecoration: 'none',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: colors.primary[200],
    color: colors.primary[800],
  },
});
