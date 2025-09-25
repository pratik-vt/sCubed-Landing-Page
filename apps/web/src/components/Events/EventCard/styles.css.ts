import { style, styleVariants } from '@vanilla-extract/css';

const baseCard = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  textDecoration: 'none',
  color: 'inherit',
  height: '100%',

  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
});

export const card = style([baseCard]);

export const featuredCard = style([
  baseCard,
  {
    '@media': {
      '(min-width: 768px)': {
        gridColumn: 'span 2',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
      },
    },
  },
]);

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  paddingTop: '60%',
  backgroundColor: '#f3f4f6',
  overflow: 'hidden',
});

export const image = style({
  objectFit: 'cover',
  transition: 'transform 0.3s ease',

  selectors: {
    [`${card}:hover &, ${featuredCard}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const imagePlaceholder = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 600,
  textTransform: 'uppercase',
});

export const badgesContainer = style({
  position: 'absolute',
  top: '12px',
  left: '12px',
  right: '12px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  zIndex: 1,
});

export const eventTypeBadge = style({
  padding: '4px 12px',
  backgroundColor: 'rgba(79, 70, 229, 0.9)',
  color: 'white',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const statusBadge = styleVariants({
  ongoing: {
    padding: '4px 12px',
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  completed: {
    padding: '4px 12px',
    backgroundColor: 'rgba(107, 114, 128, 0.9)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
});

export const featuredBadge = style({
  padding: '4px 12px',
  backgroundColor: 'rgba(236, 72, 153, 0.9)',
  color: 'white',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const content = style({
  padding: '24px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    'screen and (max-width: 1024px)': {
      paddingBottom: '28px',
    },
  },
});

export const dateTime = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#6b7280',
  fontSize: '0.875rem',
  marginBottom: '12px',
});

export const icon = style({
  width: '16px',
  height: '16px',
  flexShrink: 0,
});

export const separator = style({
  color: '#d1d5db',
});

export const title = style({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: '12px',
  lineHeight: 1.3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  '@media': {
    'screen and (max-width: 1024px)': {
      WebkitLineClamp: 2,
    },
  },
});

export const excerpt = style({
  fontSize: '0.875rem',
  color: '#6b7280',
  lineHeight: 1.6,
  marginBottom: '16px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  flex: 1,
  '@media': {
    'screen and (max-width: 1024px)': {
      WebkitLineClamp: 2,
    },
  },
});

export const metadata = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  paddingTop: '16px',
  borderTop: '1px solid #e5e7eb',
  flexWrap: 'wrap',
  gap: '8px',
  rowGap: '10px',
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '12px',
    },
  },
});

export const location = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#6b7280',
  fontSize: '0.875rem',
});

export const pricing = style({
  display: 'flex',
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 1024px)': {
      justifyContent: 'flex-start',
    },
  },
});

export const registerLink = style({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#4f46e5',
  textDecoration: 'none',

  ':hover': {
    textDecoration: 'underline',
  },
  '@media': {
    'screen and (max-width: 1024px)': {
      alignSelf: 'flex-start',
    },
  },
});

export const categories = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
});

export const category = style({
  padding: '4px 10px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#374151',
});
