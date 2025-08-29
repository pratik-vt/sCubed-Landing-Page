import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../../styles/tokens.css';

// Table wrapper with clean styling
export const tableWrapper = style({
  overflowX: 'auto',
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
  border: `2px solid ${colors.neutral[200]}`,
  backgroundColor: colors.white,
});

// Main table
export const table = style({
  width: '100%',
  minWidth: '100%',
  borderCollapse: 'collapse',
});

// Table header
export const tableHeader = style({
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.neutral[50]} 50%, ${colors.primary[50]} 100%)`,
  borderBottom: `2px solid ${colors.neutral[200]}`,
});

// Header cells
export const headerCell = style({
  padding: '1rem',
  textAlign: 'left',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  borderRight: `1px solid ${colors.neutral[200]}`,
  position: 'relative',
  
  selectors: {
    '&:last-child': {
      borderRight: 'none',
    },
  },
});

// Table body
export const tableBody = style({
  backgroundColor: colors.white,
});

// Body rows
export const bodyRow = style({
  borderBottom: `1px solid ${colors.neutral[100]}`,
  transition: 'background-color 0.2s ease',
  
  ':hover': {
    backgroundColor: colors.primary[50],
  },
  
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

// Body cells
export const bodyCell = style({
  padding: '1rem',
  fontSize: typography.fontSize.sm,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  verticalAlign: 'top',
  borderRight: `1px solid ${colors.neutral[100]}`,
  position: 'relative',
  
  selectors: {
    '&:last-child': {
      borderRight: 'none',
    },
  },
});

// Cell content wrapper
export const cellContent = style({
  position: 'relative',
  zIndex: 1,
}); 