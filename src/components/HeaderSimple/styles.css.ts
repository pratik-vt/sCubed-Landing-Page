import { style } from '@vanilla-extract/css';

export const headerWrapperStyles = style({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid #ededef',
  transition: 'background-color 0.3s ease',
  backgroundColor: '#fff',
});

export const pageStyles = style({
  position: 'relative',
  width: '100%',
  marginTop: '150px',
  '@media': {
    'screen and (max-width: 820px)': { marginTop: '170px' },
    'screen and (max-width: 800px)': { marginTop: '170px' },
    'screen and (max-width: 767px)': { marginTop: '220px' },
  },
});
