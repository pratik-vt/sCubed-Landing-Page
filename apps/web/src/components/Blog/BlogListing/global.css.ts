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