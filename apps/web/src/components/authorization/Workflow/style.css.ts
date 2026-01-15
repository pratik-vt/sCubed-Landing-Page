import { style } from '@vanilla-extract/css';

import { spacing, typography } from '@/styles/tokens.css';

// Main section styles
export const featuresSection = style({
  position: 'relative',
  padding: `${spacing['xl']} 0`,
  backgroundColor: '#ffffff',
  overflow: 'hidden',
});

export const sectionBackground = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 20% 50%, rgba(122, 126, 237, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)
  `,
  pointerEvents: 'none',
  zIndex: 0,
});

export const featuresContainer = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 1.5rem',
  position: 'relative',
  zIndex: 1,
});

export const sectionHeader = style({
  maxWidth: '900px',
  margin: '0 auto',
  textAlign: 'center',
  marginTop: '0px',
  marginBottom: `${spacing['xl']}`,
});

export const sectionTitle = style({
  fontSize: '36px',
  fontWeight: '700',
  color: '#111827',
  marginTop: '0px',
  marginBottom: '16px',
  lineHeight: 1.2,
  fontFamily: typography.fontFamily.heading,
  '@media': {
    'screen and (min-width: 768px) and (max-width: 1024px)': {
      fontSize: '40px',
    },
    'screen and (min-width: 1025px)': {
      fontSize: '48px',
    },
  },
});

export const sectionDescription = style({
  fontSize: '20px',
  color: '#6b7280',
  lineHeight: 1.6,
  fontFamily: typography.fontFamily.body,
});

// Core Features Grid
export const coreFeatures = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  marginBottom: '0px',
  '@media': {
    'screen and (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '28px',
    },
    'screen and (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px',
    },
  },
});

export const coreFeatureCard = style({
  backgroundColor: '#ffffff',
  padding: '36px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(229, 231, 235, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  animation: 'fadeInUp 0.6s ease-out both',
  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  ':hover': {
    boxShadow: '0 12px 40px rgba(122, 126, 237, 0.12)',
    transform: 'translateY(-6px)',
    borderColor: 'rgba(122, 126, 237, 0.2)',
  },
});

export const coreFeatureIcon = style({
  width: '56px',
  height: '56px',
  backgroundColor: 'rgba(122, 126, 237, 0.1)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  transition: 'all 0.3s ease',
  color: '#7a7eed',
  selectors: {
    [`${coreFeatureCard}:hover &`]: {
      backgroundColor: 'rgba(122, 126, 237, 0.15)',
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
});

export const coreFeatureTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '12px',
  lineHeight: 1.3,
  fontFamily: typography.fontFamily.heading,
});

export const coreFeatureDescription = style({
  fontSize: '15px',
  color: '#6b7280',
  lineHeight: 1.6,
  fontFamily: typography.fontFamily.body,
});
