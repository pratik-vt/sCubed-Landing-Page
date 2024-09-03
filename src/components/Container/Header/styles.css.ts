import { style } from '@vanilla-extract/css';

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

export const textBlockStyle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  borderRadius: '5px',
  maxWidth: '80%',
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: `90%`,
      width: `100%`,
    },
  },
});

export const bannerImg = style({
  width: `100%`,
  maxHeight: `800px`,

  '@media': {
    'screen and (max-width: 768px)': {
      height: `65vh`,
    },
    'screen and (max-width: 414px)': {
      height: `70vh`,
    },
    'screen and (max-width: 375px)': {
      height: `90vh`,
    },
    'screen and (min-width: 768px) and (max-width: 1370px)': {
      minHeight: `800px`,
    },
  },
});
