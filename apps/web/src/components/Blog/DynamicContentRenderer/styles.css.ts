import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../../styles/tokens.css';

// Module container
export const moduleContainer = style({
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
});

// Player container base
export const playerContainer = style({
  borderRadius: radius.lg,
  border: `1px solid ${colors.neutral[200]}`,
  position: 'relative',
  overflow: 'hidden',
});

// Player style variants
export const minimalStyle = style({
  backgroundColor: colors.white,
  padding: spacing.md,
});

export const standardStyle = style({
  backgroundColor: colors.neutral[50],
  padding: spacing.lg,
});

export const featuredStyle = style({
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
  borderColor: colors.primary[200],
  borderRadius: radius.xl,
  padding: spacing.xl,
  boxShadow: shadows.lg,
});

// Header layout
export const headerContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.md,
  marginBottom: spacing.md,
  
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

// Cover artwork
export const coverArtwork = style({
  flexShrink: 0,
  width: '64px',
  height: '64px',
  borderRadius: radius.md,
  overflow: 'hidden',
  boxShadow: shadows.sm,
  
  '@media': {
    '(max-width: 640px)': {
      width: '80px',
      height: '80px',
    },
  },
});

// Title container
export const titleContainer = style({
  flexGrow: 1,
  minWidth: 0,
});

// Module titles
export const moduleTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: '0.25rem',
  lineHeight: typography.lineHeight.tight,
});

export const featuredTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: '0.25rem',
  lineHeight: typography.lineHeight.tight,
});

// Metadata container
export const metadataContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  flexWrap: 'wrap',
  
  '@media': {
    '(max-width: 640px)': {
      justifyContent: 'center',
    },
  },
});

// Metadata items
export const metadataItem = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

export const metadataIcon = style({
  width: '16px',
  height: '16px',
  marginRight: '0.25rem',
  flexShrink: 0,
});

// Download button
export const downloadButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: `${spacing.xs} ${spacing.sm}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[700],
  backgroundColor: colors.white,
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.base,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  
  ':hover': {
    backgroundColor: colors.neutral[50],
    borderColor: colors.neutral[400],
    color: colors.neutral[900],
  },
  
  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.primary[100]}`,
  },
});

// Description
export const description = style({
  color: colors.neutral[700],
  marginBottom: spacing.md,
  lineHeight: typography.lineHeight.relaxed,
  fontSize: typography.fontSize.base,
});

// Audio player wrapper
export const audioPlayerWrapper = style({
  marginBottom: spacing.md,
});

// Audio player styling
export const audioPlayer = style({
  width: '100%',
  height: '40px',
  backgroundColor: colors.white,
  borderRadius: radius.base,
  border: `1px solid ${colors.neutral[200]}`,
  outline: 'none',
  
  ':focus': {
    boxShadow: `0 0 0 3px ${colors.primary[100]}`,
    borderColor: colors.primary[400],
  },
});

// Controls info
export const controlsInfo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: typography.fontSize.xs,
  color: colors.neutral[500],
  
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column',
      gap: spacing.xs,
      textAlign: 'center',
    },
  },
});

export const controlsLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
});

export const controlsRight = style({
  textAlign: 'right',
  
  '@media': {
    '(max-width: 640px)': {
      textAlign: 'center',
    },
  },
});

// Loop indicator
export const loopIndicator = style({
  display: 'flex',
  alignItems: 'center',
  color: colors.primary[600],
  fontWeight: typography.fontWeight.medium,
});

// Transcript styles
export const transcriptContainer = style({
  marginTop: spacing.xl,
});

export const transcriptSummary = style({
  cursor: 'pointer',
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  fontSize: typography.fontSize.base,
  display: 'flex',
  alignItems: 'center',
  transition: 'color 0.2s ease',
  outline: 'none',
  
  ':hover': {
    color: colors.primary[600],
  },
  
  ':focus': {
    color: colors.primary[600],
    textDecoration: 'underline',
  },
});

export const transcriptIcon = style({
  width: '16px',
  height: '16px',
  marginRight: spacing.xs,
  flexShrink: 0,
});

export const transcriptContent = style({
  marginTop: spacing.md,
  padding: spacing.md,
  backgroundColor: colors.white,
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.lg,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
});

// Error state
export const errorState = style({
  backgroundColor: colors.neutral[50],
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.lg,
  padding: spacing.lg,
  textAlign: 'center',
  color: colors.neutral[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
});

// Loading state
export const loadingState = style({
  backgroundColor: colors.neutral[50],
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: radius.lg,
  padding: spacing.lg,
  textAlign: 'center',
  color: colors.neutral[500],
  fontSize: typography.fontSize.sm,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
}); 