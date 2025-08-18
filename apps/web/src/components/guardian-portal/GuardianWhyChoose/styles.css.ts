import { style } from '@vanilla-extract/css';

import {
    colors,
    typography
} from '../../../styles/tokens.css';

export const whyChooseSection = style({
  padding: '40px 20px',
  backgroundColor: colors.white,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '40px 20px',
    },
  },
});

export const whyChooseContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
});

export const sectionTitle = style({
  fontSize: '36px',
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  textAlign: 'center',
  marginBottom: '60px',
  lineHeight: '1.3',
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '28px',
      marginBottom: '40px',
    },
  },
});

export const featuresGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '40px',
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '30px',
    },
  },
});

export const featureItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '20px',
  padding: '30px',
  borderRadius: '12px',
  backgroundColor: colors.neutral[100],
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
});

export const featureIcon = style({
  flexShrink: 0,
  width: '60px',
  height: '60px',
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[400]} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.white,
});

export const featureContent = style({
  flex: 1,
});

export const featureTitle = style({
  fontSize: '20px',
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: '8px',
  fontFamily: typography.fontFamily.heading,
});

export const featureDescription = style({
  fontSize: '16px',
  lineHeight: '1.6',
  color: colors.neutral[700],
  fontFamily: typography.fontFamily.body,
});