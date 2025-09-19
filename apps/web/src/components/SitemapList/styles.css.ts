import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '@/styles/tokens.css';

export const container = style({
  minHeight: '50vh',
  backgroundColor: colors.white,
  paddingTop: spacing['3xl'],
  paddingBottom: spacing['4xl'],
});

export const wrapper = style({
  maxWidth: '980px',
  margin: '0 auto',
  padding: `0 ${spacing.lg}`,
});

export const pageTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.heading,
  color: colors.neutral[900],
  marginBottom: spacing['3xl'],
  paddingBottom: spacing.lg,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  '@media': {
    '(min-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
    },
  },
});

export const columnsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing['2xl'],
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: spacing['3xl'],
    },
  },
});

export const column = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing['2xl'],
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const sectionTitle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  fontFamily: typography.fontFamily.heading,
  color: colors.neutral[900],
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: spacing.xs,
});

export const linkList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const linkItem = style({
  margin: 0,
});

export const link = style({
  display: 'inline-block',
  fontSize: typography.fontSize.base,
  color: colors.primary[600],
  textDecoration: 'none',
  padding: `${spacing.xs} 0`,
  transition: 'color 0.2s ease, text-decoration 0.2s ease',
  ':hover': {
    color: colors.primary[700],
    textDecoration: 'underline',
  },
});

export const divider = style({
  marginTop: spacing['3xl'],
  marginBottom: spacing.lg,
  height: '1px',
  backgroundColor: colors.neutral[200],
});

export const footer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing.sm,
});

export const footerText = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
});

export const footerLink = style({
  color: colors.primary[600],
  textDecoration: 'none',
  transition: 'color 0.2s ease, text-decoration 0.2s ease',
  ':hover': {
    color: colors.primary[700],
    textDecoration: 'underline',
  },
});
