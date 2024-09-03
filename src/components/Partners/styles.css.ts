import { style } from '@vanilla-extract/css';

export const image = style({
  maxHeight: '380px',
  height: '100%',
});

export const content = style({
  fontSize: '20px',
  color: `#6e6e6e`,
  fontWeight: `400`,
  textAlign: `center`,
  maxWidth: `700px`,
  width: `100%`,
  margin: `0 auto 40px auto`,
  '@media': {
    'screen and (max-width: 600px)': {
      maxWidth: `350px`,
    },
  },
});

export const listItem = style({
  display: `flex`,
  alignItems: `baseline`,
  gap: `15px`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `0 20px`,
    },
  },
});

export const listItemContent = style({
  fontSize: '18px',
  color: `#6e6e6e`,
  fontWeight: `400`,
  maxWidth: `550px`,
  marginBottom: `40px`,
  width: `100%`,
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: `left`,
    },
    'screen and (max-width: 600px)': {
      maxWidth: `350px`,
    },
  },
});
