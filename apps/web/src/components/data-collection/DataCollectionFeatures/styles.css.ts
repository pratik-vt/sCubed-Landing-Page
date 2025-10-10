import { globalStyle, style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  typography,
} from '../../../styles/tokens.css';

export const contentSection = style({
  padding: `${spacing['xl']} 0`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 0`,
    },
  },
});

export const container = style({
  maxWidth: '800px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  textAlign: 'center',
});

// New responsive grid container for image + content layout
export const gridContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing['2xl'],
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      // Single column already by default; reduce spacing on small screens
      gap: spacing.lg,
    },
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const title = style({
  marginTop: '0px',
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  lineHeight: typography.lineHeight.tight,
  marginBottom: spacing.md,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
    },
  },
});

export const description = style({
  fontSize: typography.fontSize.xl,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  margin: '0px',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const highlight = style({
  color: colors.primary[600],
  fontWeight: typography.fontWeight.semibold,
});

// Column wrappers
export const contentCol = style({
  textAlign: 'left',
});

export const imageCol = style({
  position: 'relative',
});

export const imageEl = style({
  width: '100%',
  height: 'auto',
  borderRadius: '12px',
  boxShadow:
    '0 10px 25px rgba(0,0,0,0.08), 0 6px 10px rgba(0,0,0,0.04)',
});

globalStyle(`${description} strong`, {
  color: colors.primary[700],
  fontWeight: typography.fontWeight.bold,
  background: `linear-gradient(120deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
  padding: '2px 6px',
  borderRadius: '4px',
});
