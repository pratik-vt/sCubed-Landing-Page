import { style } from '@vanilla-extract/css';

export const hidePanel = style({
  display: `none`,
});

export const tab = style({
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  fontSize: `24px`,
  color: `#333`,
  fontWeight: `500`,
  '@media': {
    'screen and (max-width: 768px)': {
      position: `relative`,
      marginBottom: `10px`,
    },
  },
});
export const tabsList = style({
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  borderBottom: `1px solid #ededef`,
  marginBottom: `35px`,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: `column`,
    },
  },
});
export const tabData = style({
  maxWidth: `240px`,
  width: `100%`,
  textAlign: `center`,
});

export const panelHeading = style({
  fontSize: `36px`,
  fontWeight: `700`,
  color: `#333`,
  maxWidth: `464px`,
  marginBottom: `34px`,
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: `center`,
      fontSize: `24px`,
      marginBottom: `15px`,
    },
    'screen and (min-width: 768px) and (max-width: 1200px)': {
      maxWidth: `100%`,
    },
  },
});

export const sectionDescription = style({
  fontSize: '20px',
  color: `#6e6e6e`,
  fontWeight: `400`,
  maxWidth: `464px`,
  marginBottom: `40px`,
  width: `100%`,
  '@media': {
    'screen and (max-width: 768px)': {
      textAlign: `center`,
    },
    'screen and (max-width: 600px)': {
      maxWidth: `350px`,
    },
  },
});

export const tabPanelImage = style({
  maxWidth: '820px',
  width: '100%',
  padding: `0 20px`,
});
