import { style } from '@vanilla-extract/css';

import {
  colors,
  typography
} from '../../../styles/tokens.css';

export const benefitsSection = style({
  padding: '80px 20px',
  backgroundColor: colors.neutral[50],
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '60px 20px',
    },
  },
});

export const benefitsContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
});

export const benefitsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '40px',
  '@media': {
    'screen and (max-width: 968px)': {
      gridTemplateColumns: '1fr',
      gap: '50px',
    },
    'screen and (min-width: 769px) and (max-width: 1199px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '30px'
    }
  },
});

export const benefitHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '20px',
  '@media': {
    'screen and (min-width: 769px) and (max-width: 1199px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
    },
  },
});

export const benefitCard = style({
  backgroundColor: colors.white,
  borderRadius: '16px',
  padding: '40px 30px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
});

export const benefitIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[400]} 100%)`,
  color: colors.white,
  flexShrink: 0,
});

export const benefitTitle = style({
  fontSize: '24px',
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  margin: 0,
  lineHeight: '1.3',
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '22px',
    },
  },
});

export const benefitList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const benefitItem = style({
  position: 'relative',
  paddingLeft: '28px',
  marginBottom: '12px',
  fontSize: '16px',
  lineHeight: '1.6',
  color: colors.neutral[600],
  fontFamily: typography.fontFamily.body,
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '8px',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: colors.primary[600],
    },
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:first-child::before': {
      display: 'none',
    }
  }
});