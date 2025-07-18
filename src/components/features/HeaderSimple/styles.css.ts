import { style } from '@vanilla-extract/css';

export const headerWrapperStyles = style({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid transparent',
  transition: 'all 0.3s ease',
});

export const pageStyles = style({
  position: 'relative',
  width: '100%',
  marginTop: '45px',
  '@media': {
    'screen and (max-width: 820px)': { marginTop: '70px' },
    'screen and (max-width: 800px)': { marginTop: '100px' },
    'screen and (max-width: 767px)': { marginTop: '220px', paddingTop: '40px' },
  },
});
