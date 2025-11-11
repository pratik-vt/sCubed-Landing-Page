import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const tooltipWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const tooltipIcon = style({
  cursor: 'help',
  color: '#9ca3af',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#6b7280',
  },
});

export const tooltipContent = style({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: '8px',
  padding: '12px 16px',
  backgroundColor: '#1f2937',
  color: '#ffffff',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  whiteSpace: 'normal',
  maxWidth: '280px',
  width: 'max-content',
  zIndex: 1000,
  animation: `${fadeIn} 0.2s ease`,
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '240px',
      fontSize: '0.8125rem',
      padding: '10px 14px',
    },
  },
});

export const tooltipArrow = style({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '6px solid #1f2937',
});

