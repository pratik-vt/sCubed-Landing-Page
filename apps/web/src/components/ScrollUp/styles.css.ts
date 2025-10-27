import { style } from '@vanilla-extract/css';

export const btnScrollToTop = style({
  position: 'fixed',
  right: '96px',
  bottom: '24px',
  width: '50px',
  border: 'none',
  zIndex: 99,
  background: '#7a7eed',
  borderRadius: '50%',
  height: '50px',
  paddingTop: '10px',
  cursor: 'pointer',
});

export const arrow = style({
  border: 'solid white',
  borderWidth: '0 4px 4px 0',
  display: 'inline-block',
  padding: '8px',
  transform: 'rotate(-135deg)',
});
