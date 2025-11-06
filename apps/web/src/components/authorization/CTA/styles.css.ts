import { style } from '@vanilla-extract/css';

import {
    colors,
    spacing,
    typography,
} from '../../../styles/tokens.css';

export const ctaSection = style({
  padding: `${spacing['xl']} 0`,
  background: `
    linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.white} 50%, ${colors.primary[50]} 100%),
    radial-gradient(ellipse at top, rgba(122, 126, 237, 0.1) 0%, transparent 60%)
  `,
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing['2xl']} 0`,
    },
  },
});

export const ctaContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 20px',
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
  },
});

export const ctaContent = style({
  textAlign: 'center',
  margin: '0 auto',
  padding: '40px 40px',
  position: 'relative',
  overflow: 'hidden',
  ':before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-25%',
    width: '600px',
    height: '600px',
  },
  '@media': {
    'screen and (min-width: 768px)': {
      padding: '50px 60px',
    },
  },
});

export const ctaTitle = style({
  fontSize: '36px',
  fontWeight: '700',
  color: '#111827',
  marginTop: '0px',
  marginBottom: '24px',
  lineHeight: 1.3,
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (min-width: 768px)': {
      fontSize: '48px',
    },
  },
});

export const ctaDescription = style({
  fontSize: '20px',
  color: '#374151',
  marginBottom: '20px',
  lineHeight: 1.6,
  position: 'relative',
  zIndex: 1,
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.normal,
});

export const ctaButtonWrapper = style({
  marginTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
});

// Removed ctaButton - now using primaryButton from CalendlyButton/styles.css

export const backgroundPattern = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0.1,
  background: `
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.1) 10px,
      rgba(255, 255, 255, 0.1) 20px
    )
  `,
});