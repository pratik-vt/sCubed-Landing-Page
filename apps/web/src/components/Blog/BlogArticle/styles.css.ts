import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../../styles/tokens.css';

export const articleContainer = style({
  backgroundColor: colors.neutral[50],
  minHeight: '100vh',
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
  maxWidth: '800px',
  padding: `0 ${spacing.xl}`,
  
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${spacing.lg}`,
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
    '(max-width: 768px)': {
      fontSize: '2.5rem',
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
  
  '@media': {
    '(max-width: 768px)': {
      padding: spacing.lg,
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



export const tableOfContents = style({
  backgroundColor: colors.neutral[50],
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.md,
  padding: spacing.lg,
  position: 'sticky',
  top: spacing.lg,
});

export const tocTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: spacing.md,
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

export const socialShare = style({
  marginTop: spacing.xl,
  padding: spacing.lg,
  backgroundColor: colors.white,
  borderRadius: radius.lg,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.sm,
});

export const socialShareTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[800],
  marginBottom: spacing.md,
});

export const socialShareButtons = style({
  display: 'flex',
  gap: spacing.sm,
  flexWrap: 'wrap',
});

export const socialButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.md}`,
  borderRadius: radius.md,
  textDecoration: 'none',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  transition: 'all 0.2s ease',
  
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: shadows.md,
  },
});

export const twitterButton = style([socialButton, {
  backgroundColor: '#1DA1F2',
  color: colors.white,
  
  ':hover': {
    backgroundColor: '#0d8bd9',
  },
}]);

export const linkedinButton = style([socialButton, {
  backgroundColor: '#0077B5',
  color: colors.white,
  
  ':hover': {
    backgroundColor: '#005885',
  },
}]);

export const facebookButton = style([socialButton, {
  backgroundColor: '#1877F2',
  color: colors.white,
  
  ':hover': {
    backgroundColor: '#0d61bf',
  },
}]);

export const contentLayout = style({
  display: 'flex',
  gap: spacing.xl,
  
  '@media': {
    '(max-width: 1024px)': {
      flexDirection: 'column',
      gap: spacing.lg,
    },
  },
});

export const mainContent = style({
  flex: '1',
  minWidth: '0',
});

export const sidebar = style({
  flex: '0 0 300px',
  
  '@media': {
    '(max-width: 1024px)': {
      flex: 'none',
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

export const scrollToTop = style({
  position: 'fixed',
  bottom: spacing.lg,
  right: spacing.lg,
  backgroundColor: colors.primary[600],
  color: colors.white,
  border: 'none',
  borderRadius: radius.full,
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: shadows.lg,
  transition: 'all 0.2s ease',
  zIndex: 10,
  
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-2px)',
    boxShadow: shadows.xl,
  },
  
  '@media': {
    '(max-width: 768px)': {
      bottom: spacing.md,
      right: spacing.md,
      width: '40px',
      height: '40px',
    },
  },
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

export const authorInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.lg,
  padding: spacing.lg,
  backgroundColor: colors.white,
  borderRadius: radius.lg,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.sm,
  marginTop: spacing.xl,
  marginBottom: spacing.lg,
});

export const authorAvatar = style({
  flexShrink: 0,
});

export const authorDetails = style({
  flex: 1,
});

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