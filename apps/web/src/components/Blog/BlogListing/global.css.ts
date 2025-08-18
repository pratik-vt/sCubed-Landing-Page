import { globalStyle } from '@vanilla-extract/css';
import { colors, spacing } from '../../../styles/tokens.css';
import { searchBar, postCard, readMoreLink, heroCard } from './styles.css';

// Search bar icon styles
globalStyle(`${searchBar} svg`, {
  position: 'absolute',
  left: spacing.lg,
  color: colors.neutral[400],
  zIndex: 1,
});

// Post card link styles
globalStyle(`${postCard} a`, {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'stretch',
  width: '100%',
  height: '100%',
  flexDirection: 'inherit', // Inherit direction from parent
  overflow: 'visible', // Ensure content is not clipped
});

// Hero card link styles
globalStyle(`${heroCard} a`, {
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
});

// Read more link hover effect
globalStyle(`${postCard}:hover ${readMoreLink}`, {
  color: colors.primary[700],
});

// Post card hover before effect
globalStyle(`${postCard}:hover:before`, {
  opacity: 1,
});

// Hero section text styles
globalStyle('.hero-title', {
  fontSize: '3rem',
  fontWeight: '700',
  marginBottom: '1rem',
  lineHeight: '1.2',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '2rem',
    },
    '(max-width: 480px)': {
      fontSize: '1.75rem',
    },
  },
});

globalStyle('.hero-subtitle', {
  fontSize: '1.25rem',
  opacity: 0.9,
  lineHeight: '1.6',
  maxWidth: '600px',
  margin: '0 auto',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '1rem',
    },
    '(max-width: 480px)': {
      fontSize: '0.9rem',
    },
  },
});

globalStyle('.hero-count', {
  fontSize: '1rem',
  opacity: 0.8,
  marginTop: '1rem',
  
  '@media': {
    '(max-width: 768px)': {
      fontSize: '0.875rem',
    },
    '(max-width: 480px)': {
      fontSize: '0.8rem',
    },
  },
}); 