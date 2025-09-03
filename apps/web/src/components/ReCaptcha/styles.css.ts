import { style } from '@vanilla-extract/css';

import { colors } from '../../styles/tokens.css';

export const recaptchaContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '16px',
  marginBottom: '16px',
});

export const recaptchaError = style({
  color: '#ef4444', // Red color for errors
  fontSize: '14px',
  marginTop: '8px',
  display: 'block',
});
