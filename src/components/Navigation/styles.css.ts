import { style } from '@vanilla-extract/css';

export const headerContentStyles = style({
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  color: '#000',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '0',
      background: `#fff`,
    },
  },
});

export const contactInfoContainer = style({
  width: '100%',
  backgroundColor: '#7a7eed',
  color: '#fff',
  padding: '8px 0',
});

export const contactInfoWrapper = style({
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 10px',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '5px',
      padding: '5px 15px',
    },
  },
});

export const contactInfoItem = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  gap: '5px',
});

export const contactInfoLink = style({
  color: '#fff',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const logoOuter = style({
  cursor: 'pointer',
  '@media': {
    'screen and (max-width: 768px)': {
      margin: `10px 15px`,
      maxWidth: '120px',
    },
  },
});

export const logoImage = style({
  width: '100%',
  height: 'auto',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '140px',
    },
  },
});

export const navStyle = style({
  fontSize: '18px',
  color: '#474747',
  fontWeight: '400',
  textDecoration: 'none',
  marginRight: '50px',
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      marginRight: '0',
    },
  },
});

export const activeNavStyle = style([
  navStyle,
  {
    color: '#000',
  },
]);

export const hamburger = style({
  display: 'none',
  flexDirection: 'column',
  cursor: 'pointer',
  zIndex: 2,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'flex',
      marginRight: `15px`,
    },
  },
});

export const bar = style({
  width: '25px',
  height: '3px',
  backgroundColor: '#333',
  margin: '4px 0',
  transition: '0.3s',
});

export const navMenu = style({
  display: 'flex',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      top: '112px',
      width: '100%',
      backgroundColor: '#fff',
      borderTop: '1px solid #ededef',
      minHeight: '90vh',
      gap: '30px',
      padding: `30px 0`,
    },
  },
});

export const navMenuOpen = style({
  display: 'flex !important',
});

export const activeLinkStyle = style({
  content: '""',
  display: 'block',
  width: '52px',
  height: '5px',
  backgroundColor: '#7a7eed',
  position: 'absolute',
  bottom: '-47px',
  left: '50%',
  transform: 'translateX(-50%)',
  '@media': {
    'screen and (max-width: 768px)': {
      bottom: '-8px',
    },
  },
});

export const closeButtonWrapper = style({
  width: '30px',
  cursor: 'pointer',
  display: 'none',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'flex',
      marginRight: `15px`,
    },
  },
});

export const crossLine1 = style({
  height: '30px',
  width: '3px',
  marginLeft: '12px',
  backgroundColor: 'black',
  transform: 'rotate(45deg)',
  zIndex: 1,
});

export const crossLine2 = style({
  height: '30px',
  width: '3px',
  backgroundColor: 'black',
  transform: 'rotate(90deg)',
  zIndex: 2,
});
