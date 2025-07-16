import { style } from '@vanilla-extract/css';

export const headerContentStyles = style({
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 10px 10px 10px',
  color: '#000',
  '@media': {
    'screen and (max-width: 768px)': { padding: '0', background: `#fff` },
  },
});

export const contactInfoContainer = style({
  width: '100%',
  backgroundColor: '#7a7eed',
  color: '#fff',
  padding: '6px 0',
  '@media': { 'screen and (max-width: 768px)': { padding: '8px 0' } },
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
      alignItems: 'center',
      gap: '15px',
      padding: '5px 15px',
    },
  },
});

export const contactInfoGroup = style({
  display: 'flex',
  gap: '20px',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      textAlign: 'center',
    },
  },
});

export const contactInfoItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  gap: '5px',
  '@media': { 'screen and (max-width: 768px)': { justifyContent: 'center' } },
});

export const contactInfoLink = style({
  color: '#fff',
  textDecoration: 'none',
  ':hover': { textDecoration: 'underline' },
});

export const logoOuter = style({
  '@media': {
    'screen and (max-width: 768px)': { margin: `10px 15px`, maxWidth: '120px' },
  },
});

export const logoImage = style({
  width: '100%',
  height: 'auto',
  '@media': { 'screen and (max-width: 768px)': { maxWidth: '140px' } },
});

export const navStyle = style({
  fontSize: '18px',
  color: '#474747',
  fontWeight: '400',
  textDecoration: 'none',
  marginRight: '50px',
  position: 'relative',
  '@media': { 'screen and (max-width: 768px)': { marginRight: '0' } },
});

export const activeNavStyle = style([navStyle, { color: '#000' }]);

export const hamburger = style({
  display: 'none',
  flexDirection: 'column',
  cursor: 'pointer',
  zIndex: 1002,
  '@media': {
    'screen and (max-width: 768px)': { display: 'flex', marginRight: `15px` },
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
      zIndex: 1001,
    },
  },
});

export const navMenuOpen = style({ display: 'flex !important' });

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
  '@media': { 'screen and (max-width: 768px)': { bottom: '-8px' } },
});

export const closeButtonWrapper = style({
  width: '30px',
  cursor: 'pointer',
  display: 'none',
  zIndex: 1002,
  '@media': {
    'screen and (max-width: 768px)': { display: 'flex', marginRight: `15px` },
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

export const socialIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
});

export const socialIconsContainer = style({
  display: 'flex',
  gap: '15px',
  '@media': { 'screen and (max-width: 768px)': { marginTop: '5px' } },
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  ':hover': { transform: 'scale(1.1)', opacity: 0.9 },
});

export const loginButton = style({
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#ffffff',
  background: 'linear-gradient(135deg, #7a7eed 0%, #9f7aea 100%)',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(122, 126, 237, 0.3)',
  ':hover': {
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: '0 6px 20px rgba(122, 126, 237, 0.4)',
    background: 'linear-gradient(135deg, #6c6ee5 0%, #9171e8 100%)',
  },
  ':active': { transform: 'scale(1.02)' },
  ':before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.6s, height 0.6s',
  },
  selectors: { '&:hover:before': { width: '300px', height: '300px' } },
  '@media': {
    'screen and (max-width: 768px)': { padding: '10px 24px', fontSize: '14px' },
  },
});
