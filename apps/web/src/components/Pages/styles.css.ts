import { style } from '@vanilla-extract/css';

export const listStyle = style({
  '::before': {
    content: `counter(list, lower-alpha) ") "`,
    counterIncrement: `list`,
  },
});

export const olStyle = style({
  counterReset: 'list',
  listStyle: 'none',
});

export const olRomanStyle = style({
  listStyleType: 'upper-roman',
});

export const olLatinStyle = style({
  listStyleType: 'lower-latin',
});

export const olItemStyle = style({
  '::marker': {
    fontWeight: 'bold',
  },
  marginTop: '5px',
});

export const headingStyle = style({
  textAlign: 'center',
});

export const sectionStyle = style({
  display: 'block',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
  marginInlineStart: '0px',
  marginInlineEnd: '0px',
  fontSize: '1em',
});
