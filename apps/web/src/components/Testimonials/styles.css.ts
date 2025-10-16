import { globalStyle, style } from '@vanilla-extract/css';
import {
  colors,
  radius,
} from '../../styles/tokens.css';

export const sliderWrapper = style({
  maxWidth: '1400px',
  margin: '4rem auto',
  padding: '0 10px',
});

export const carouselViewport = style({
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  borderRadius: '10px',
});



export const carouselTrack = style({
  display: 'flex',
  willChange: 'transform',
  borderRadius: '10px',
});

export const slide = style({
  flex: '0 0 auto',
  boxSizing: 'border-box',
});

export const arrowButton = style({
  opacity: 0,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '48px',
  height: '48px',
  borderRadius: radius.full,
  background: 'rgba(255, 255, 255, 0.95)',
  border: '2px solid rgba(122, 126, 237, 0.2)',
  color: colors.primary[600],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  zIndex: 1,
  transition: 'opacity 150ms ease, background 150ms ease, color 150ms ease, box-shadow 150ms ease',
  selectors: {
    [`${carouselViewport}:hover &`]: { opacity: 1 },
    [`${carouselViewport}:focus-within &`]: { opacity: 1 },
  },
  ':hover': {
    background: colors.primary[600],
    color: colors.white,
    boxShadow: '0 8px 24px rgba(122, 126, 237, 0.3)',
  },
  ':focus-visible': {
    outline: `3px solid ${colors.primary[400]}`,
    outlineOffset: '4px',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      opacity: 1,
    },
  },
});

export const arrowPrev = style({
  left: '0px',
});

export const arrowNext = style({
  right: '0px',
});

export const testimonialBox = style({
  background: 'linear-gradient(135deg, #f8f9ff 0%, #e8e6ff 100%)',
  borderRadius: '10px',
  padding: '40px',
  height: '470px',
  maxWidth: '100%',
  margin: '0 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});

export const contentSection = style({
  flexGrow: 1,
});

export const quoteImage = style({
  paddingBottom: '20px',
});

globalStyle(`${quoteImage} img`, {
  width: '43px',
  height: '33px',
});

export const heading = style({
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '1.4',
  color: '#333',
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '20px',
});

export const paragraphContent = style({
  fontSize: '18px',
  fontWeight: 400,
  color: '#6e6e6e',
  lineHeight: 'normal',
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: '8',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const authorSection = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 'auto',
  gap: '10px',
  '@media': {
    'screen and (max-width: 413px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '20px',
    },
  },
});

export const authorInfo = style({
  flex: 1,
  minWidth: 0,
});

export const authorHeading = style({
  color: '#7a7eed',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: 'normal',
  margin: '0 0 5px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


export const authorParagraph = style({
  fontSize: '14px',
  fontWeight: 400,
  color: '#333',
  lineHeight: 'normal',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '280px',
});

export const clutchSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
  marginBottom: '4px',
});

export const sectionTitle = style({
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: 'normal',
  color: '#333',
  margin: '0 0 10px 0',
});

export const sectionDescription = style({
  fontSize: '18px',
  fontWeight: 500,
  color: '#333',
  lineHeight: 'normal',
  margin: 0,
});

export const sectionHeader = style({
  maxWidth: '900px',
  margin: '0px auto 3rem auto',
  textAlign: 'center',
});