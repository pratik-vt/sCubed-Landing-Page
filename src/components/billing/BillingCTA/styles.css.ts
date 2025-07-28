import { style } from '@vanilla-extract/css';

import { typography } from '../../../styles/tokens.css';

export const ctaSection = style({
  padding: '48px 0 80px 0', // Reduced top padding from 80px to 48px, kept bottom padding for footer spacing
  backgroundColor: '#ffffff',
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
  background: 'linear-gradient(135deg, #f8f9ff 0%, #e8e6ff 100%)',
  borderRadius: '32px',
  boxShadow: '0 20px 40px rgba(122, 126, 237, 0.08)',
  position: 'relative',
  overflow: 'hidden',
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
