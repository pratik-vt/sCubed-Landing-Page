import { style } from '@vanilla-extract/css';

export const headerWrapperStyles = style({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  borderBottom: '1px solid #ededef',
  transition: 'background-color 0.3s ease',
  backgroundColor: '#fff',
});

export const contentStyle = style({
  position: 'relative',
  width: '80%',
  margin: '0 auto',
  marginTop: '80px',
  '@media': {
    'screen and (max-width: 768px)': {
      marginTop: '60px',
    },
  },
});
