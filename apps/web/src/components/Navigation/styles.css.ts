import { style, keyframes } from '@vanilla-extract/css';

// Animation for sliding header to top
const slideToTop = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
});

export const headerContentStyles = style({
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 10px 10px 10px',
  color: '#000',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  backgroundColor: '#fff',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '0 15px',
      background: `#fff`,
      height: '60px',
      maxWidth: '100%',
      overflowX: 'hidden',
    },
  },
});

export const contactInfoContainer = style({
  width: '100%',
  backgroundColor: '#7a7eed',
  color: '#fff',
  padding: '6px 0',
  maxWidth: '100vw',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  '@media': { 
    'screen and (max-width: 1024px)': { padding: '8px 0' } 
  },
});

export const contactInfoWrapper = style({
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 10px',
  width: '100%',
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      padding: '5px 15px',
      maxWidth: '100%',
      overflowX: 'hidden',
    },
  },
});

export const centerText = style({
  flex: '2',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '700',
  color: '#fff',
  lineHeight: '1.4',
  whiteSpace: 'nowrap',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 20px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 1400px)': {
      maxWidth: '700px',
      padding: '0 15px',
    },
    'screen and (max-width: 1200px)': {
      fontSize: '13px',
      maxWidth: '600px',
      padding: '0 10px',
    },
    'screen and (max-width: 1024px)': {
      fontSize: '12px',
      padding: '0 10px',
      whiteSpace: 'normal',
    },
    'screen and (max-width: 768px)': {
      fontSize: '12px', // Smaller on mobile to prevent overflow
      maxWidth: '100%',
      order: 2,
      whiteSpace: 'normal',
      padding: '0 10px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    },
    'screen and (max-width: 480px)': {
      fontSize: '11px',
      padding: '0 5px',
      lineHeight: '1.3',
    },
  },
});

export const contactInfoGroup = style({
  display: 'flex',
  gap: '20px',
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
});

export const contactInfoItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  gap: '5px',
  '@media': { 
    'screen and (max-width: 1024px)': { justifyContent: 'center' } 
  },
});

export const contactInfoLink = style({
  color: '#fff',
  textDecoration: 'none',
  ':hover': { textDecoration: 'underline' },
});

export const logoOuter = style({
  cursor: 'pointer',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      margin: '0',
      maxWidth: '120px',
    },
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
  '@media': {
    'screen and (max-width: 1200px)': { 
      fontSize: '16px',
      marginRight: '30px'
    },
    'screen and (max-width: 1024px)': { 
      fontSize: '18px',
      marginRight: '0',
      padding: '14px 30px',
      width: 'auto',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      borderRadius: '8px',
      ':hover': {
        color: '#7a7eed',
        backgroundColor: 'rgba(122, 126, 237, 0.05)',
      },
    },
    'screen and (max-width: 768px)': { 
      marginRight: '0',
      fontSize: '18px',
      padding: '14px 30px',
    }
  },
});

export const activeNavStyle = style([navStyle, { color: '#000' }]);

// Style for active nav items on mobile
export const mobileActiveNavStyle = style({
  '@media': {
    '(max-width: 1024px)': {
      backgroundColor: 'rgba(122, 126, 237, 0.08)',
      color: '#7a7eed',
      fontWeight: '600',
    },
  },
});

export const hamburger = style({
  display: 'none',
  flexDirection: 'column',
  cursor: 'pointer',
  zIndex: 10002,
  '@media': {
    // Large screens (1025px+) - Desktop: Hidden
    '(min-width: 1025px)': {
      display: 'none',
    },
    // Tablets and smaller - Show hamburger
    '(max-width: 1024px)': {
      display: 'flex',
      marginRight: '15px',
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
    // Large screens (1025px+) - Desktop: Horizontal menu
    '(min-width: 1025px)': {
      display: 'flex',
    },
    // Tablets and smaller - Hidden unless open
    '(max-width: 1024px)': {
      display: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'fixed',
      top: '60px',
      left: '0',
      width: '100%',
      backgroundColor: '#fff',
      height: 'calc(100vh - 60px)',
      gap: '25px',
      padding: '30px 20px',
      zIndex: 9999,
      boxSizing: 'border-box',
      overflowY: 'auto',
      overflowX: 'hidden',
      transform: 'translateY(-100vh)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderTop: '1px solid #ededef',
    },
  },
});

export const navMenuOpen = style({ 
  display: 'flex !important',
  '@media': {
    '(max-width: 1024px)': {
      transform: 'translateY(0) !important',
    },
  },
});

export const activeLinkStyle = style({
  content: '""',
  display: 'block',
  width: '100%',
  height: '5px',
  backgroundColor: '#7a7eed',
  position: 'absolute',
  bottom: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  '@media': { 
    'screen and (max-width: 1024px)': { 
      width: '60px',
      height: '3px',
      bottom: '-5px',
      borderRadius: '2px',
    },
    'screen and (max-width: 768px)': { 
      width: '60px',
      height: '3px',
      bottom: '-5px',
      borderRadius: '2px',
    } 
  },
});

export const closeButtonWrapper = style({
  width: '30px',
  cursor: 'pointer',
  display: 'none',
  zIndex: 10002,
  '@media': {
    // Large screens (1025px+) - Desktop: Hidden
    '(min-width: 1025px)': {
      display: 'none',
    },
    // Tablets and smaller - Show close button when menu is open
    '(max-width: 1024px)': {
      display: 'flex',
      marginRight: '15px',
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
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'none',
    },
  },
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

export const contactInfoDivider = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 1024px)': {
      display: 'block',
      width: '1px',
      height: '20px',
      backgroundColor: '#ffffff',
      opacity: 0.5,
    },
  },
});

export const loginButton = style({
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#7a7eed',
  background: 'transparent',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  ':hover': {
    color: '#6c6ee5',
    textDecoration: 'underline',
  },
  ':active': { transform: 'scale(0.98)' },
  '@media': {
    'screen and (max-width: 1024px)': { 
      padding: '12px 40px', 
      fontSize: '16px',
      width: '200px',
      border: '2px solid #7a7eed',
    },
    'screen and (max-width: 768px)': { 
      padding: '12px 40px', 
      fontSize: '16px',
      width: '200px',
    },
  },
});

export const tryForFreeButton = style({
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
  marginLeft: '15px',
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
    'screen and (max-width: 1024px)': { 
      padding: '14px 40px', 
      fontSize: '16px',
      marginLeft: '0',
      marginTop: '10px',
      width: '200px',
    },
    'screen and (max-width: 768px)': { 
      padding: '14px 40px', 
      fontSize: '16px',
      marginLeft: '0',
      width: '200px',
    },
  },
});

export const desktopLogo = style({
  display: 'block',
  '@media': {
    'screen and (max-width: 768px)': { display: 'none' },
  },
});

export const mobileLogo = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
      height: '40px',
    },
  },
});

// Fullscreen overlay background
export const mobileOverlay = style({
  display: 'none',
  '@media': {
    '(max-width: 1024px)': {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#fff',
      zIndex: 9997,
      opacity: 0,
      visibility: 'hidden',
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },
  },
});

export const mobileOverlayOpen = style({
  '@media': {
    '(max-width: 1024px)': {
      opacity: 1,
      visibility: 'visible',
      display: 'block',
    },
  },
});

// Mobile header wrapper that moves to top
export const mobileHeaderWrapper = style({
  '@media': {
    '(max-width: 1024px)': {
      position: 'relative',
      zIndex: 10000,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
});

export const mobileHeaderWrapperOpen = style({
  '@media': {
    '(max-width: 1024px)': {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
  },
});
