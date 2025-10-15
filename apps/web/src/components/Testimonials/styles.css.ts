import { globalStyle, style } from '@vanilla-extract/css';

export const sliderWrapper = style({
  maxWidth: '1400px',
  margin: '4rem auto',
  padding: '0 10px',
});

export const testimonialBox = style({
  background: 'linear-gradient(135deg, #f8f9ff 0%, #e8e6ff 100%)',
  borderRadius: '10px',
  padding: '40px',
  height: '470px',
  maxWidth: '616px',
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


// Minimal slick styles scoped to this wrapper
globalStyle(`${sliderWrapper} .slick-slider`, {
  position: 'relative',
  display: 'block',
  boxSizing: 'border-box',
});
globalStyle(`${sliderWrapper} .slick-list`, {
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
});
globalStyle(`${sliderWrapper} .slick-track`, {
  position: 'relative',
  top: 0,
  left: 0,
  display: 'block',
});
globalStyle(`${sliderWrapper} .slick-slide`, {
  display: 'none',
  float: 'left',
  height: '100%',
  minHeight: '1px',
  outline: 'none',
});
globalStyle(`${sliderWrapper} .slick-initialized .slick-slide`, {
  display: 'block',
});
globalStyle(`${sliderWrapper} .slick-dots`, {
  position: 'absolute',
  bottom: '-30px',
  display: 'block',
  width: '100%',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  textAlign: 'center',
});
globalStyle(`${sliderWrapper} .slick-dots li`, {
  position: 'relative',
  display: 'inline-block',
  width: '20px',
  height: '20px',
  margin: '0 4px',
  padding: 0,
  cursor: 'pointer',
});
globalStyle(`${sliderWrapper} .slick-dots li button`, {
  fontSize: 0,
  lineHeight: 0,
  display: 'block',
  width: '20px',
  height: '20px',
  padding: 0,
  cursor: 'pointer',
  color: 'transparent',
  border: 0,
  outline: 'none',
  background: 'transparent',
});
globalStyle(`${sliderWrapper} .slick-dots li button:before`, {
  fontFamily: 'slick',
  fontSize: '30px',
  lineHeight: '20px',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '20px',
  height: '20px',
  content: '•',
  textAlign: 'center',
  color: '#7a7eed',
  opacity: 0.5,
});
globalStyle(`${sliderWrapper} .slick-dots li.slick-active button:before`, {
  color: '#7a7eed',
  opacity: 1,
});

export const sectionTitle = style({
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: 'normal',
  color: '#333',
  margin: '0 0 10px 0',
});

export const sectionDescription = style({
  fontSize: '24px',
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