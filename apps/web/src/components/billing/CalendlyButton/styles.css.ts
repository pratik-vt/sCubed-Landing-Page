import { style } from '@vanilla-extract/css';

export const primaryButton = style({
  padding: '20px 40px',
  background: 'linear-gradient(135deg, #7a7eed 0%, #6c6ee5 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 20px rgba(122, 126, 237, 0.35), 0 2px 8px rgba(122, 126, 237, 0.25)',
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ':hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 28px rgba(122, 126, 237, 0.4), 0 4px 12px rgba(122, 126, 237, 0.3)',
  },
  ':active': {
    transform: 'translateY(-1px)',
  },
  ':focus-visible': {
    outline: '3px solid rgba(122, 126, 237, 0.5)',
    outlineOffset: '4px',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      padding: '18px 32px',
      fontSize: '17px',
    },
  },
});
