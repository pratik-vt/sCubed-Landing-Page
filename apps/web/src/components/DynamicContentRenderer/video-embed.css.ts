import { style } from '@vanilla-extract/css';

/**
 * Responsive video container with 16:9 aspect ratio
 * Uses padding-bottom technique for maintaining aspect ratio
 */
export const videoContainer = style({
  position: 'relative',
  width: '100%',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#f3f4f6',
});

/**
 * Video iframe styles
 * Positioned absolutely to fill the container
 */
export const videoIframe = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 0,
  borderRadius: '8px',
});

/**
 * Wrapper for the entire video embed
 * Provides consistent spacing
 */
export const videoWrapper = style({
  margin: '2rem 0',
  '@media': {
    'screen and (max-width: 768px)': {
      margin: '1.5rem 0',
    },
  },
});

