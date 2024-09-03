import { style } from '@vanilla-extract/css';

export const heroStyles = style({
  position: 'relative',
});

export const heroImage = style({
  width: `100%`,

  '@media': {
    'screen and (max-width: 768px)': {
      height: `50vh`,
    },
  },
});

export const textBlockStyles = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  borderRadius: '5px',
  maxWidth: '1400px',
  width: '100%',
  marginBottom: '100px',
  paddingBottom: `20px`,
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: 'center',
    },
    'screen and (min-width: 768px) and (max-width: 1480px)': {
      maxWidth: '1000px',
    },
    'screen and (min-width: 768px) and (max-width: 1200px)': {
      textAlign: `center`,
    },
  },
});

export const heroHeading = style({
  fontSize: `60px`,
  color: `#fff`,
  fontWeight: `700`,
  textAlign: `left`,
  maxWidth: `1200px`,
  marginTop: `0`,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: `24px`,
      textAlign: `center`,
    },
    'screen and (min-width: 768px) and (max-width: 1200px)': {
      fontSize: `20px`,
      textAlign: `center`,
    },
  },
});
