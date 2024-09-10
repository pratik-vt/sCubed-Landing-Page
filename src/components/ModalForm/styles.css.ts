import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  textAlign: 'center',
});

export const heading = style({
  margin: 0,
  fontSize: '22px',
  fontWeight: '700',
});

export const content = style({
  fontSize: '16px',
  color: '#6e6e6e',
  fontWeight: '400',
  textAlign: 'center',
  width: '100%',
});

export const buttonStyle = style({
  fontSize: '18px',
  color: '#333',
  fontWeight: '700',
  background: '#a0f5d1',
});

export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  alignItems: 'center',
  width: '500px',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '350px',
    },
    'screen and (max-width: 430px)': {
      width: '250px',
    },
    'screen and (max-width: 360px)': {
      width: '220px',
    },
  },
});

export const formGroupStyle = style({
  marginBottom: '20px',
  width: '100%',
});

export const labelStyle = style({
  color: '#000000',
  fontSize: '14px',
  paddingBottom: '10px',
  display: 'block',
  opacity: '0.7',
  textAlign: 'left',
  textTransform: 'capitalize',
});

export const inputControlStyle = style({
  width: '-webkit-fill-available',
  borderRadius: '5px',
  paddingBlock: '10px',
  border: '1px solid #ccc',
  display: 'inline-block',
  padding: '12px',
  maxHeight: 'inherit',
  textAlign: 'left',
  fontSize: '14px',
  letterSpacing: '0.5px',
  color: '#000000',
  opacity: '0.8',
  fontFamily: 'Poppins, sans-serif',
  // ':focus': {
  //   outline:'none'
  // },
});

export const requiredIndicatorStyle = style({
  color: 'red',
  marginLeft: '2px',
});

export const errorMessageStyle = style({
  fontSize: '14px',
  display: 'block',
  color: 'red',
  textAlign: 'left',
  marginTop: '2px',
  width: '100%',
});

export const successMessageStyle = style([
  {
    color: '#333',
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
]);

export const textAreaControlStyle = style({
  width: '-webkit-fill-available',
  borderRadius: '5px',
  maxHeight: 'inherit',
  textAlign: 'left',
  fontSize: '14px',
  letterSpacing: '0.5px',
  color: '#000000',
  opacity: '0.8',
  paddingBlock: '10px',
  border: '1px solid #ccc',
  display: 'inline-block',
  padding: '12px',
  fontFamily: 'Poppins, sans-serif',
});

export const submitButtonStyle = style({
  width: '-webkit-fill-available',
  backgroundColor: '#7a7eed',
  color: 'white',
  fontSize: '18px',
  padding: '11px',
  marginTop: '8px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 400,
});
