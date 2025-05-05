import { style } from '@vanilla-extract/css';

export const headerWrapperStyles = style({
  width: '100%',
  position: 'fixed',
  top: 0,
  zIndex: 1,
  borderBottom: '1px solid #ededef',
  transition: 'background-color 0.3s ease',
  backgroundColor: '#fff',
});

export const pageStyles = style({
  position: 'relative',
  width: '100%',
  marginTop: '45px',
  '@media': {
    'screen and (max-width: 820px)': {
      marginTop: '70px',
    },
    'screen and (max-width: 800px)': {
      marginTop: '100px',
    },
    'screen and (max-width: 767px)': {
      marginTop: '220px',
      paddingTop: '40px',
    },
  },
});

export const textBlockStyle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  borderRadius: '5px',
  maxWidth: '80%',
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: `90%`,
      width: `100%`,
    },
  },
});

export const bannerImg = style({
  width: `100%`,
  maxHeight: `800px`,

  '@media': {
    'screen and (max-width: 768px)': {
      height: `65vh`,
    },
    'screen and (min-width: 700px) and (max-width: 760px)': {
      height: `150vh`,
    },
    'screen and (max-width: 430px)': {
      height: `95vh`,
    },
    'screen and (max-width: 414px)': {
      height: `100vh`,
    },
    'screen and (max-width: 375px)': {
      height: `105vh`,
    },
    'screen and (max-width: 360px)': {
      height: `110vh`,
    },
    'screen and (max-width: 320px)': {
      height: `160vh`,
    },
    'screen and (min-width: 768px) and (max-width: 1023px)': {
      minHeight: `950px`,
    },
    'screen and (min-width: 1024px) and (max-width: 1370px)': {
      minHeight: `800px`,
    },
    'screen and (min-width: 1024px) and (max-width: 1600px)': {
      minHeight: `900px`,
    },
  },
});
