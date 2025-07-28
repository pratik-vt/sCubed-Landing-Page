import { style } from '@vanilla-extract/css';

export const primaryButton = style({
  padding: '16px 32px',
  backgroundColor: '#7a7eed',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px -1px rgba(122, 126, 237, 0.4)',
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ':hover': {
    backgroundColor: '#6c6ee5',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 15px -3px rgba(122, 126, 237, 0.4)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '14px 28px',
      fontSize: '15px',
    },
  },
});
