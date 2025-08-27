import { globalStyle } from '@vanilla-extract/css';

import { colors, typography, spacing } from '../../../styles/tokens.css';
import { transcriptContent } from './styles.css';

// Transcript content global styles
globalStyle(`${transcriptContent} p`, {
  marginBottom: spacing.sm,
});

globalStyle(`${transcriptContent} p:last-child`, {
  marginBottom: 0,
});

globalStyle(`${transcriptContent} strong`, {
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
});

globalStyle(`${transcriptContent} em`, {
  fontStyle: 'italic',
});

globalStyle(`${transcriptContent} ul`, {
  marginBottom: spacing.sm,
  paddingLeft: spacing.lg,
});

globalStyle(`${transcriptContent} ol`, {
  marginBottom: spacing.sm,
  paddingLeft: spacing.lg,
});

globalStyle(`${transcriptContent} li`, {
  marginBottom: '0.25rem',
}); 