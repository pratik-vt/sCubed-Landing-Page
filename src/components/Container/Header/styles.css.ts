import { style } from '@vanilla-extract/css';

export const navStyle = style({
  fontSize: '18px',
  color: '#474747',
  fontWeight: '400',
  textDecoration: 'none',
  marginRight: '50px',
  position: 'relative',
});

export const activeNavStyle = style([
  navStyle,
  {
    color: '#000',
  },
]);

export const headerWrapperStyles = style({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 1,
  borderBottom: '1px solid #ededef',
  transition: 'background-color 0.3s ease',
});

export const pageStyles = style({
  position: 'relative',
  width: '100%',
});
