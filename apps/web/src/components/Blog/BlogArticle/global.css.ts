import { globalStyle } from '@vanilla-extract/css';

import { colors, typography, spacing } from '../../../styles/tokens.css';

import { 
  breadcrumb, 
  contentSection, 
  quoteBlock, 
  responsiveTable, 
  tocItem, 
  relatedPostCard, 
  authorDetails 
} from './styles.css';

// Breadcrumb styles
globalStyle(`${breadcrumb} a`, {
  color: colors.primary[600],
  textDecoration: 'none',
  transition: 'color 0.2s ease',
});

globalStyle(`${breadcrumb} a:hover`, {
  color: colors.primary[700],
});

// Content section styles  
globalStyle(`${contentSection} p`, {
  marginBottom: spacing.md,
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
});

globalStyle(`${contentSection} p:last-child`, {
  marginBottom: 0,
});

globalStyle(`${contentSection} strong`, {
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
});

globalStyle(`${contentSection} ul`, {
  marginBottom: spacing.md,
  paddingLeft: spacing.lg,
});

// Quote block styles
globalStyle(`${quoteBlock} p`, {
  marginBottom: spacing.sm,
  fontStyle: 'italic',
});

globalStyle(`${quoteBlock} p:last-child`, {
  marginBottom: 0,
});

// Table styles
globalStyle(`${responsiveTable} th`, {
  backgroundColor: colors.neutral[100],
  padding: spacing.md,
  textAlign: 'left',
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[900],
  borderBottom: `1px solid ${colors.neutral[200]}`,
});

globalStyle(`${responsiveTable} td`, {
  padding: spacing.md,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  fontSize: typography.fontSize.sm,
});

globalStyle(`${responsiveTable} tr:last-child td`, {
  borderBottom: 'none',
});

// Table of contents styles
globalStyle(`${tocItem} button`, {
  background: 'none',
  border: 'none',
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  cursor: 'pointer',
  textAlign: 'left',
  padding: 0,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
});

globalStyle(`${tocItem} button:hover`, {
  color: colors.primary[700],
  textDecoration: 'underline',
});

// Related post card styles
globalStyle(`${relatedPostCard} h4`, {
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  marginBottom: spacing.sm,
});

globalStyle(`${relatedPostCard} h4 a`, {
  color: colors.neutral[900],
  textDecoration: 'none',
  transition: 'color 0.2s ease',
});

globalStyle(`${relatedPostCard} h4 a:hover`, {
  color: colors.primary[600],
});

globalStyle(`${relatedPostCard} p`, {
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  marginBottom: spacing.sm,
  lineHeight: typography.lineHeight.normal,
});

// Author details styles
globalStyle(`${authorDetails} h4`, {
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: '0.25rem',
});

globalStyle(`${authorDetails} p`, {
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  marginBottom: '0.5rem',
});

globalStyle(`${authorDetails} p:last-child`, {
  marginBottom: 0,
}); 