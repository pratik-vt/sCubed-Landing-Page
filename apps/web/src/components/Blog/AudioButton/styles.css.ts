import { style } from '@vanilla-extract/css';

import { colors, typography, spacing } from '../../../styles/tokens.css';

const breakpoints = {
  mobile: 'screen and (max-width: 1024px)',
};

export const audioContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  // width: '100%',
  maxWidth: '360px', // Increased from 300px
  padding: '14px 12px', // Increased padding
  backgroundColor: colors.neutral[50],
  borderRadius: '10px', // Slightly larger radius
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',

  '@media': {
    [breakpoints.mobile]: {
      maxWidth: '100%',
      padding: '12px 10px',
    },
  },
});

export const audioButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px', // Increased gap
  padding: '10px 18px', // Increased padding
  backgroundColor: colors.primary[600],
  color: colors.white,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '15px', // Increased font size
  fontWeight: typography.fontWeight.medium,
  textDecoration: 'none',
  boxShadow: '0 2px 6px rgba(59, 130, 246, 0.18)',
  width: '100%',

  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)',
  },

  ':active': {
    transform: 'translateY(0)',
    boxShadow: '0 1px 4px rgba(59, 130, 246, 0.15)',
  },

  ':disabled': {
    backgroundColor: colors.neutral[400],
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
    opacity: 0.5,
  },

  selectors: {
    '&:disabled:hover': {
      backgroundColor: colors.neutral[400],
      transform: 'none',
      boxShadow: 'none',
    },
  },

  '@media': {
    [breakpoints.mobile]: {
      padding: '8px 14px', // Increased mobile padding
      fontSize: '14px', // Increased mobile font size
    },
  },
});

export const audioButtonContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
});

export const audioIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px', // Increased from 20px
  height: '24px', // Increased from 20px
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '50%',
  padding: '3px',

  '@media': {
    [breakpoints.mobile]: {
      width: '22px', // Increased from 18px
      height: '22px', // Increased from 18px
    },
  },
});

export const audioText = style({
  letterSpacing: '0.025em',
});

export const progressWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const progressBar = style({
  width: '100%',
  height: '6px', // Increased from 5px
  cursor: 'pointer',
  appearance: 'none',
  background: `linear-gradient(to right, ${colors.neutral[400]} 0%, ${colors.neutral[400]} var(--progress, 0%), ${colors.neutral[200]} var(--progress, 0%), ${colors.neutral[200]} 100%)`,
  borderRadius: '3px', // Adjusted to match new height
  outline: 'none',
  WebkitTapHighlightColor: 'transparent',
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.08)',

  '::-webkit-slider-thumb': {
    appearance: 'none',
    width: '14px', // Increased from 12px
    height: '14px', // Increased from 12px
    backgroundColor: colors.neutral[500], // Changed to gray
    border: `2px solid ${colors.white}`,
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
    cursor: 'grab',
    transition: 'all 0.15s ease-out',
  },

  '::-moz-range-thumb': {
    width: '14px', // Increased from 12px
    height: '14px', // Increased from 12px
    backgroundColor: colors.neutral[500], // Changed to gray
    border: `2px solid ${colors.white}`,
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
    cursor: 'grab',
    appearance: 'none',
  },

  '::-moz-range-track': {
    background: colors.neutral[200],
    height: '6px', // Updated to match new height
    borderRadius: '3px', // Updated to match new radius
    border: 'none',
  },

  selectors: {
    '&:hover::-webkit-slider-thumb': {
      transform: 'scale(1.15)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)',
    },

    '&:active::-webkit-slider-thumb': {
      cursor: 'grabbing',
      transform: 'scale(1.05)',
    },
  },
});


export const timeDisplay = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '13px', // Increased from 12px
  color: colors.neutral[600],
  fontFamily: 'system-ui, -apple-system, "SF Mono", "Monaco", monospace',
  fontWeight: typography.fontWeight.medium,
  userSelect: 'none',
  padding: '2px 4px', // Increased padding

  '@media': {
    [breakpoints.mobile]: {
      fontSize: '12px', // Increased from 11px
    },
  },
});

export const currentTimeSpan = style({
  color: colors.primary[600],
  fontWeight: typography.fontWeight.semibold,
});

export const durationSpan = style({
  color: colors.neutral[500],
});