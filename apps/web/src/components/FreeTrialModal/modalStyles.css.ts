import { style } from '@vanilla-extract/css';

// Global modal styles to ensure consistent behavior across all modals

export const modalOverlayBase = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999999,
  overflow: 'hidden',
});

export const modalContainerBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  inset: 0,
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
});

export const modalContentBase = style({
  maxWidth: '600px',
  width: '90%',
  maxHeight: '80vh',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '24px',
  position: 'relative',
  '@media': {
    '(max-width: 640px)': {
      width: '95%',
      maxHeight: '90vh',
      padding: '20px',
    },
  },
});

export const modalBodyNoScroll = style({
  selectors: {
    'body&': {
      overflow: 'hidden',
    },
  },
});