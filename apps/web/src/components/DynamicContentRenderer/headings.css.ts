import { style } from '@vanilla-extract/css';

export const h2Style = style({
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '1.25rem',
  color: '#111827',
  scrollMarginTop: '100px',

  '@media': {
    '(max-width: 768px)': {
      lineHeight: 1.35,
    },
  },
});

export const h3Style = style({
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '1rem',
  color: '#111827',

  '@media': {
    '(max-width: 768px)': {
      lineHeight: 1.35,
    },
  },
});
