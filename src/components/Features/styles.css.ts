import { style } from '@vanilla-extract/css';
export const featureContainer = style({
  width: '100%',
  padding: '40px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    'screen and (max-width: 1192px)': {
      flexWrap: `wrap`,
      alignItems: 'center',
      gap: '30px',
      justifyContent: `center`,
    },
  },
});
