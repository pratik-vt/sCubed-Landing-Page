import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../../styles/tokens.css';

export const listingContainer = style({
  minHeight: '100vh',
  backgroundColor: colors.neutral[50],
});

export const postsWrapper = style({
  maxWidth: '100%',
  padding: `${spacing.xl} 0 ${spacing['3xl']}`,
  
  '@media': {
    '(max-width: 768px)': {
      padding: `${spacing.lg} 0 ${spacing['2xl']}`,
    },
  },
});

export const postsContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${spacing.xl}`,
  
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${spacing.sm}`,
    },
  },
});

export const headerSection = style({
  textAlign: 'center',
  marginBottom: spacing.xl,
  paddingBottom: spacing.lg,
});

export const pageTitle = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const pageSubtitle = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  maxWidth: '600px',
  margin: '0 auto',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

export const filterTabs = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: spacing.xl,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  
  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'flex-start',
      overflowX: 'auto',
      paddingBottom: 0,
    },
  },
});

export const filterTab = style({
  padding: `${spacing.md} ${spacing.lg}`,
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '3px solid transparent',
  color: colors.neutral[600],
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  
  ':hover': {
    color: colors.primary[600],
    borderBottomColor: colors.primary[200],
  },
});

export const activeTab = style({
  color: colors.primary[600],
  borderBottomColor: colors.primary[600],
  fontWeight: typography.fontWeight.semibold,
});

export const filtersSection = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: spacing.xl,
});

export const searchBar = style({
  position: 'relative',
  maxWidth: '500px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});

export const searchInput = style({
  width: '100%',
  padding: `${spacing.md} ${spacing.lg} ${spacing.md} 3.5rem`,
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.lg,
  fontSize: typography.fontSize.base,
  backgroundColor: colors.white,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[100]}`,
  },
  
  '::placeholder': {
    color: colors.neutral[400],
  },
});

export const heroSection = style({
  marginBottom: spacing['3xl'],
});

export const heroCard = style({
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  overflow: 'hidden',
  boxShadow: shadows.lg,
  transition: 'all 0.3s ease',
  
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.xl,
  },
});

export const heroImage = style({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  
  '@media': {
    '(max-width: 768px)': {
      height: '250px',
    },
  },
});

export const heroContent = style({
  padding: spacing['2xl'],
  
  '@media': {
    '(max-width: 768px)': {
      padding: spacing.xl,
    },
  },
});

export const heroTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.lg,
  fontFamily: typography.fontFamily.heading,
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const heroExcerpt = style({
  fontSize: typography.fontSize.lg,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.xl,
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

export const heroMeta = style({
  display: 'flex',
  gap: spacing.lg,
  flexWrap: 'wrap',
});

export const newsletterSection = style({
  marginBottom: spacing['3xl'],
});

export const newsletterCard = style({
  backgroundColor: colors.primary[50],
  borderRadius: radius.xl,
  padding: spacing['2xl'],
  textAlign: 'center',
  border: `1px solid ${colors.primary[200]}`,
  
  '@media': {
    '(max-width: 768px)': {
      padding: spacing.xl,
    },
  },
});

export const newsletterTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
});

export const newsletterDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.xl,
  maxWidth: '500px',
  margin: `0 auto ${spacing.xl} auto`,
});

export const newsletterForm = style({
  display: 'flex',
  maxWidth: '400px',
  margin: '0 auto',
  gap: spacing.sm,
  
  '@media': {
    '(max-width: 480px)': {
      flexDirection: 'column',
    },
  },
});

export const newsletterInput = style({
  flex: 1,
  padding: `${spacing.md} ${spacing.lg}`,
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.md,
  fontSize: typography.fontSize.base,
  backgroundColor: colors.white,
  
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[100]}`,
  },
  
  '::placeholder': {
    color: colors.neutral[400],
  },
});

export const newsletterButton = style({
  backgroundColor: colors.primary[600],
  color: colors.white,
  border: 'none',
  borderRadius: radius.md,
  padding: `${spacing.md} ${spacing.lg}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  ':hover': {
    backgroundColor: colors.primary[700],
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xl,
  fontFamily: typography.fontFamily.heading,
  textAlign: 'center',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.xl,
      textAlign: 'left',
    },
  },
});

export const postsGrid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing['2xl'],
});

export const postCard = style({
  backgroundColor: colors.white,
  borderRadius: radius.xl,
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${colors.neutral[100]}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  height: '340px', // Increased height for better image display
  position: 'relative',
  
  ':hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    borderColor: colors.primary[300],
  },
  
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '@media': {
    '(max-width: 1024px)': {
      height: '340px', // Increased height for better image display on tablets
    },
    '(max-width: 768px)': {
      flexDirection: 'column',
      height: 'auto',
      minHeight: '320px',
    },
  },
});

export const postImage = style({
  position: 'relative',
  width: '300px',
  height: '100%', // Take full height of the card
  overflow: 'hidden',
  backgroundColor: colors.neutral[100],
  flexShrink: 0,
  
  '@media': {
    '(max-width: 1024px)': {
      width: '280px', // Increased width for better image display on tablets
    },
    '(max-width: 768px)': {
      width: '100%',
      height: '320px', // Slightly increased height on mobile for better proportion
    },
    '(max-width: 568px)': {
      width: '100%',
      height: '220px', // Slightly increased height on mobile for better proportion
    },
  },
});

export const featuredBadge = style({
  position: 'absolute',
  top: spacing.md,
  left: spacing.md,
  backgroundColor: colors.accent.teal,
  color: colors.white,
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: radius.base,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const postContent = style({
  padding: `${spacing.xl} ${spacing.xl} ${spacing.lg}`, // Reduced bottom padding for better balance
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  minWidth: 0, // Prevents flex item from overflowing
  height: 'auto',// Take full height of the card
  overflow: 'visible', // Ensure content is not clipped
  
  '@media': {
    '(max-width: 1024px)': {
      padding: `${spacing.xl} ${spacing.lg} ${spacing.md}`, // Increased top padding for better balance with larger card
    },
    '(max-width: 768px)': {
      padding: spacing.lg,
      height: 'auto', // Auto height on mobile
      flex: 'none', // Remove flex behavior on mobile
      minHeight: '150px', // Ensure minimum height for content
    },
  },
});

export const postTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.md,
  marginTop: 0,
  fontFamily: typography.fontFamily.heading,
  
  // Clamp to 2 lines with ellipsis
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  hyphens: 'auto',
  
  // Hover effect for better UX
  ':hover': {
    color: colors.primary[600],
    cursor: 'default',
  },
  
  '@media': {
    '(max-width: 1024px)': {
      fontSize: typography.fontSize.xl,
    },
    '(max-width: 640px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const postExcerpt = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.lg, // Increased margin for better spacing
  flex: 1, // Allow to grow but not shrink
  
  // Clamp to 3 lines for better content balance
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  
  '@media': {
    '(max-width: 1024px)': {
      WebkitLineClamp: 2, // Reduce to 2 lines on smaller screens
      marginBottom: spacing.md,
    },
    '(max-width: 768px)': {
      marginBottom: spacing.sm,
      WebkitLineClamp: 2,
    },
  },
});

export const postMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: spacing.lg,
  marginTop: 'auto', // Push to bottom with flexbox
  paddingTop: spacing.md, // Increased padding for better visibility
  borderTop: `1px solid ${colors.neutral[200]}`,
  flexShrink: 0, // Prevent shrinking
  
  '@media': {
    '(max-width: 1024px)': {
      paddingTop: spacing.sm,
      gap: spacing.md,
    },
    '(max-width: 768px)': {
      gap: spacing.md,
      marginTop: spacing.sm,
      paddingTop: spacing.xs,
    },
  },
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: typography.fontSize.sm,
  color: colors.neutral[700],
  fontWeight: typography.fontWeight.medium,
  whiteSpace: 'nowrap',
});

export const readMoreLink = style({
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  transition: 'color 0.2s ease',
});



export const filterDropdown = style({
  position: 'relative',
  display: 'inline-block',
});

export const filterButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.md}`,
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.md,
  backgroundColor: colors.white,
  color: colors.neutral[700],
  fontSize: typography.fontSize.sm,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  
  ':hover': {
    borderColor: colors.primary[400],
    backgroundColor: colors.primary[50],
  },
}); 