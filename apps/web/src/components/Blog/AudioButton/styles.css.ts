import { style } from '@vanilla-extract/css';

import { colors, typography, spacing } from '../../../styles/tokens.css';

const breakpoints = {
  mobile: 'screen and (max-width: 768px)',
};

export const audioButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `${spacing.sm} ${spacing.md}`,
  backgroundColor: colors.primary[600],
  color: colors.white,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  textDecoration: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  minWidth: 'fit-content',
  whiteSpace: 'nowrap',

  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },

  ':active': {
    transform: 'translateY(0)',
  },

  ':disabled': {
    backgroundColor: colors.neutral[400],
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    opacity: 0.6,
  },

  ':disabled:hover': {
    backgroundColor: colors.neutral[400],
    transform: 'none',
  },

  '@media': {
    [breakpoints.mobile]: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSize.xs,
    },
  },
});

export const audioButtonContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
});

export const audioIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  
  '@media': {
    [breakpoints.mobile]: {
      width: '20px',
      height: '20px',
    },
  },
});

export const audioText = style({
  // Text is always visible on all screen sizes
});