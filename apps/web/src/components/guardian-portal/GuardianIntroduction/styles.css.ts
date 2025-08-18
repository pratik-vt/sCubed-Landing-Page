import { style } from '@vanilla-extract/css';

import {
  colors,
  spacing,
  typography
} from '../../../styles/tokens.css';

export const introSection = style({
  padding: `${spacing.lg} ${spacing.md}`,
  backgroundColor: colors.white,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} ${spacing.md}`,
    },
  },
});

export const introContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center',
});

export const introContent = style({
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px 60px 40px',
  background: 'linear-gradient(135deg, #f8f9ff 0%, #e8e6ff 100%)',
  borderRadius: '32px',
  boxShadow: '0 20px 40px rgba(122, 126, 237, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${colors.primary[100]}`,
  ':before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-25%',
    width: '600px',
    height: '600px',
    background:
      'radial-gradient(circle, rgba(122, 126, 237, 0.05) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  ':after': {
    content: '""',
    position: 'absolute',
    bottom: '-30%',
    left: '-20%',
    width: '400px',
    height: '400px',
    background:
      'radial-gradient(circle, rgba(34, 211, 238, 0.03) 0%, transparent 60%)',
    borderRadius: '50%',
  },
  '@media': {
    'screen and (min-width: 768px)': {
      padding: '40px 80px 80px 80px',
    },
    'screen and (max-width: 768px)': {
      padding: '50px 30px',
      borderRadius: '24px',
    },
  },
});

export const introTitle = style({
  fontSize: typography.fontSize['5xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.lg,
  lineHeight: typography.lineHeight.tight,
  fontFamily: typography.fontFamily.heading,
  position: 'relative',
  zIndex: 1,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['4xl'],
      marginBottom: spacing.md,
    },
  },
});

export const introText = style({
  fontSize: typography.fontSize.xl,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[700],
  maxWidth: '750px',
  margin: '0 auto',
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
  position: 'relative',
  zIndex: 1,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});