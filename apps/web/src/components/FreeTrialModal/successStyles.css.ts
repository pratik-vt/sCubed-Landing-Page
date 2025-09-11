import { style, keyframes } from '@vanilla-extract/css';

import { colors, shadows, radius, typography } from '@/styles/tokens.css';

// Animations
const fadeInScale = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.95) translateY(10px)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1) translateY(0)',
  },
});

const slideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const checkBounce = keyframes({
  '0%': {
    transform: 'scale(0)',
  },
  '50%': {
    transform: 'scale(1.1)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

// Overlay with light purple blur
export const celebrationOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(139, 92, 246, 0.05)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  zIndex: -1,
  animation: `${fadeInScale} 150ms ease-out`,
  pointerEvents: 'none',
});

// Modal backdrop for centering - FIXED POSITIONING
export const modalBackdrop = style({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  padding: '16px',
  zIndex: 99999999,
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

// Main modal card - PROPERLY CENTERED
export const successModalCard = style({
  position: 'relative',
  maxWidth: '600px',
  width: '90%',
  maxHeight: 'calc(100vh - 40px)',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflowY: 'visible',
  overflowX: 'hidden',
  '@media': {
    '(max-width: 640px)': {
      width: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - 32px)',
      padding: '20px',
      gap: '14px',
    },
  },
});

// Modal enter animation
export const modalEnter = style({
  animation: `${fadeInScale} 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
});

// Close button
export const closeButton = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  padding: '6px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  color: '#9ca3af',
  transition: 'all 0.15s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    color: '#6b7280',
  },
  ':focus': {
    outline: '2px solid rgba(139, 92, 246, 0.4)',
    outlineOffset: '2px',
  },
});

// Header section - CENTER ALIGNED
export const successHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  textAlign: 'center',
  paddingBottom: '2px',
  '@media': {
    '(max-height: 600px)': {
      gap: '2px',
      paddingBottom: 0,
    },
  },
});

// Title row with emoji and badge - CENTER ALIGNED
export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '100%',
});

// Main title
export const successTitle = style({
  fontSize: '22px',
  fontWeight: 600,
  color: '#111827',
  lineHeight: 1.1,
  fontFamily: typography.fontFamily.heading,
  letterSpacing: '-0.01em',
  margin: 0,
  '@media': {
    '(max-width: 640px)': {
      fontSize: '18px',
    },
    '(max-height: 600px)': {
      fontSize: '18px',
    },
  },
});

// Success badge
export const successBadge = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  color: 'white',
  marginLeft: '10px',
  flexShrink: 0,
  animation: `${checkBounce} 300ms ease-out 400ms both`,
  '@media': {
    '(max-width: 640px)': {
      width: '20px',
      height: '20px',
      marginLeft: '8px',
    },
  },
});

// Subtext - CENTER ALIGNED
export const successSubtext = style({
  fontSize: '15px',
  color: '#6b7280',
  lineHeight: 1.5,
  margin: 0,
  fontWeight: 400,
  textAlign: 'center',
});

// Info row for status pills
export const infoRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '8px',
  animation: `${slideUp} 200ms ease-out 100ms both`,
  width: '100%',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '5px',
    },
    '(max-width: 380px)': {
      gridTemplateColumns: '1fr',
      gap: '5px',
    },
    '(max-height: 600px)': {
      gap: '5px',
    },
  },
});

// Status pill container - COMPACT
export const statusPill = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 10px',
  backgroundColor: 'rgba(139, 92, 246, 0.04)',
  border: '1px solid rgba(139, 92, 246, 0.16)',
  borderRadius: '10px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  minHeight: '44px',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
    backgroundColor: 'rgba(139, 92, 246, 0.07)',
    borderColor: 'rgba(139, 92, 246, 0.22)',
  },
  '@media': {
    '(max-width: 640px)': {
      minHeight: '40px',
      padding: '6px 8px',
      gap: '4px',
    },
    '(max-height: 600px)': {
      minHeight: '38px',
      padding: '5px 7px',
    },
  },
});

// Chip icon (emoji)
export const chipIcon = style({
  fontSize: '16px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  '@media': {
    '(max-width: 640px)': {
      fontSize: '14px',
      width: '16px',
      height: '16px',
    },
  },
});

// Info chip content
export const infoChip = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: 1,
  minWidth: 0,
  justifyContent: 'center',
});

// Chip label - IMPROVED CONTRAST
export const chipLabel = style({
  fontSize: '10px',
  fontWeight: 600,
  color: '#7c3aed',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  lineHeight: 1,
  '@media': {
    '(max-width: 640px)': {
      fontSize: '9px',
    },
  },
});

// Chip value
export const chipValue = style({
  fontSize: '13px',
  fontWeight: 500,
  color: '#1f2937',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.2,
  '@media': {
    '(max-width: 640px)': {
      fontSize: '12px',
    },
  },
});

// Success content
export const successContent = style({
  padding: '2px 8px 0',
  animation: `${slideUp} 200ms ease-out 150ms both`,
  fontSize: '13px',
  lineHeight: 1.5,
  color: '#4b5563',
  textAlign: 'center',
  '@media': {
    '(max-height: 600px)': {
      fontSize: '12px',
      lineHeight: 1.4,
    },
  },
});

// Highlighted text - ENHANCED STYLING
export const successHighlight = style({
  display: 'block',
  marginTop: '3px',
  color: '#7c3aed',
  fontWeight: 600,
  fontSize: '14px',
  '@media': {
    '(max-height: 600px)': {
      fontSize: '13px',
      marginTop: '2px',
    },
  },
});

// Login section
export const loginSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  paddingTop: '6px',
  borderTop: '1px solid rgba(139, 92, 246, 0.1)',
  animation: `${slideUp} 200ms ease-out 200ms both`,
  '@media': {
    '(max-height: 600px)': {
      gap: '6px',
      paddingTop: '4px',
    },
  },
});

// Login text
export const loginText = style({
  fontSize: '13px',
  color: '#6b7280',
  margin: 0,
});

// Login button
export const loginButton = style({
  padding: '9px 22px',
  backgroundColor: '#7c3aed',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#6d28d9',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    '(max-width: 640px)': {
      padding: '8px 18px',
      fontSize: '12px',
    },
    '(max-height: 600px)': {
      padding: '7px 16px',
      fontSize: '12px',
    },
  },
});