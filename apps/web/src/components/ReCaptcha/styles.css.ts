import { style, globalStyle } from '@vanilla-extract/css';

import { colors } from '../../styles/tokens.css';

export const recaptchaContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
  marginBottom: '16px',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  position: 'relative',
  
  '@media': {
    'screen and (max-width: 768px)': {
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      margin: '16px auto',
    },
    'screen and (max-width: 480px)': {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export const recaptchaContainerInvisible = style({
  display: 'none',
});

// Style the direct child div of recaptcha container - the actual reCAPTCHA widget
globalStyle(`${recaptchaContainer} > div`, {
  maxWidth: '304px', // Standard reCAPTCHA width
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
});

// Ensure the reCAPTCHA iframe itself is contained
globalStyle(`${recaptchaContainer} iframe`, {
  maxWidth: '100%',
});

// Apply responsive adjustments for the reCAPTCHA container
globalStyle(`${recaptchaContainer} > div`, {
  '@media': {
    'screen and (max-width: 480px)': {
      // For compact size on mobile, no scaling needed
      transform: 'none',
    },
  },
});

export const recaptchaError = style({
  color: '#ef4444', // Red color for errors
  fontSize: '14px',
  marginTop: '8px',
  display: 'block',
});
