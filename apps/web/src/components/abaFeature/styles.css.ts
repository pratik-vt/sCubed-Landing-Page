import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../styles/tokens.css';

export const abaFeatureSection = style({
  borderRadius: radius.lg,
  padding: spacing.md,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: spacing.md,
  boxShadow: shadows.purple,
  boxSizing: 'border-box',
  margin: `40px auto 0`,
  maxWidth: '1400px',
  width: 'auto',  
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '20px',
      margin: `30px 20px 0`,
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      textAlign: 'center',
      gap: spacing.md,
      padding: '15px',
      margin: `20px 15px 0`,
    },
  },
});

export const abaListingItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  paddingRight: '40px',
  marginRight: '40px',
  borderRight: `1px solid #e2e2e2`,
  ':last-child': {
    borderRight: `unset`,
    paddingRight: `0px`,
    marginRight: `0px`,
    borderBottom: `unset`,
    paddingBottom: `0px`,
  },      
  '@media': {
    'screen and (max-width: 1024px)': {
        borderRight: `unset`,
        paddingRight: `0px`,
        marginRight: `0px`,
        borderBottom: `1px solid #e2e2e2`,
        paddingBottom: spacing.md,
    },
    'screen and (max-width: 768px)': {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
});

export const abaNumber = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  marginBottom: spacing.xs,
  color: colors.primary[600],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const abaTitle = style({
  fontSize: '17px',
  fontWeight: typography.fontWeight.medium,
});

export const abaHighlight = style({
  
  fontSize: typography.fontSize['2xl'],
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});