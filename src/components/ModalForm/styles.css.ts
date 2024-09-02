import { style } from '@vanilla-extract/css';

export const buttonStyle = style({
  fontSize: "18px",
  color: "#333",
  fontWeight: "700",
  background:"#a0f5d1"
});

export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  alignItems: 'center',
  width: '500px',
  '@media':{
    'screen and (max-width: 600px)': {
      width: '350px',
    },
     'screen and (max-width: 400px)': {
      width: '250px',
    }
    
  }
})

export const formGroupStyle = style({
  marginBottom: '20px',
  width: '100%',
})



export const labelStyle = style({
  color: 'black',
  fontSize: '14px',
  paddingBottom: '10px',
  display: 'block',
  opacity: '0.7',
  textAlign: 'left',
  textTransform: 'capitalize',
})


export const inputControlStyle = style({
  width: '-webkit-fill-available',
  borderRadius: '5px',
  paddingBlock: '10px',
  border: '1px solid #ccc',
  display: 'inline-block',
  padding: '12px',
  // paddingInline: 0,
  // padding: '10px',
  // border: 'none',
  maxHeight: 'inherit',
  textAlign: 'left',
  fontSize: '14px',
  letterSpacing: '0.5px',
  color:'black',
  // ':focus': {
  //   outline:'none'
  // },
})

export const requiredIndicatorStyle = style({
  color: 'red',
  marginLeft: '2px'
})


export const errorMessageStyle = style({
  fontSize: '14px',
  display: 'block',
  color: 'red',
  textAlign: 'left',
  marginTop: '2px'
})

export const textAreaControlStyle = style({
  width: '-webkit-fill-available',
  borderRadius: '5px',
  //padding: '20px',
  maxHeight: 'inherit',
  textAlign: 'left',
  fontSize: '14px',
  letterSpacing: '0.5px',
  color: 'gray',
  paddingBlock: '10px',
  border: '1px solid #ccc',
  display: 'inline-block',
  padding: '12px',
})

export const submitButtonStyle = style({
  width: '-webkit-fill-available',
  backgroundColor: '#7a7eed',
  color: 'white',
  fontSize: '14px',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
})