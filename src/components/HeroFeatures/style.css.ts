import { style } from '@vanilla-extract/css';

export const heroSection = style({
  padding: '40px 0 60px 0',
  position: 'relative',
  overflow: 'hidden',
  '@media': { 'screen and (min-width: 768px)': { padding: '50px 0 80px 0' } },
});

export const heroContainer = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 10,
});

export const heroContent = style({
  textAlign: 'center',
  marginBottom: '80px',
  '@media': { 'screen and (min-width: 768px)': { marginBottom: '100px' } },
});

export const heroBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '10px 24px',
  backgroundColor: 'rgba(139, 92, 246, 0.1)',
  color: '#8b5cf6',
  borderRadius: '9999px',
  fontSize: '1.1rem',
  fontWeight: '600',
  marginBottom: '32px',
  border: '1px solid rgba(139, 92, 246, 0.2)',
});

export const heroBadgeDot = style({
  display: 'none',
});

export const heroTitle = style({
  fontSize: '48px',
  fontWeight: '800',
  color: '#111827',
  marginBottom: '32px',
  lineHeight: 1.1,
  maxWidth: '1000px',
  margin: '0 auto 32px',
  '@media': { 'screen and (min-width: 768px)': { fontSize: '64px' } },
});

export const heroSubtitle = style({
  fontSize: '20px',
  color: '#6b7280',
  marginBottom: '48px',
  lineHeight: 1.6,
  maxWidth: '800px',
  margin: '0 auto 48px',
  '@media': { 'screen and (min-width: 768px)': { fontSize: '22px' } },
});

export const buttonContainer = style({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '48px',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 640px)': { flexDirection: 'column', gap: '12px' },
  },
});

export const primaryButton = style({
  padding: '16px 32px',
  backgroundColor: '#8b5cf6',
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.4)',
  ':hover': {
    backgroundColor: '#7c3aed',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 15px -3px rgba(139, 92, 246, 0.4)',
  },
});

export const secondaryButton = style({
  padding: '16px 24px',
  backgroundColor: 'transparent',
  color: '#6b7280',
  border: '1px solid #d1d5db',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#8b5cf6',
    color: '#8b5cf6',
  },
});

export const playIcon = style({ color: 'inherit' });

export const trustBadges = style({
  display: 'flex',
  gap: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media': { 'screen and (max-width: 768px)': { gap: '16px' } },
});

export const trustBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
});

export const trustIcon = style({ color: '#10b981' });

export const trustText = style({
  fontSize: '1rem',
  fontWeight: '500',
  color: '#374151',
});

export const featureCards = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '32px',
  maxWidth: '1200px',
  margin: '0 auto',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
    },
  },
});

export const featureCard = style({
  backgroundColor: '#ffffff',
  padding: '40px 32px',
  borderRadius: '20px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(229, 231, 235, 0.5)',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  ':hover': {
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-4px)',
  },
});

export const featureIcon = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '24px',
});

export const featureTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '16px',
  lineHeight: 1.3,
});

export const featureDescription = style({
  fontSize: '16px',
  color: '#6b7280',
  lineHeight: 1.6,
});

export const heroDescription = style({
  fontSize: '18px',
  color: '#6b7280',
  maxWidth: '700px',
  margin: '0 auto',
  lineHeight: 1.6,
});

export const backgroundImage = style({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
});

export const backgroundOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(to bottom right, rgba(250, 250, 250, 0.9), rgba(255, 255, 255, 0.9))',
});

export const featureCardsWrapper = style({
  marginTop: '80px',
  '@media': { 'screen and (min-width: 768px)': { marginTop: '100px' } },
});

export const floatingElement1 = style({
  position: 'absolute',
  top: '-24px',
  right: '-24px',
  width: '80px',
  height: '80px',
  backgroundColor: '#8b5cf6',
  borderRadius: '16px',
  opacity: 0.2,
  transform: 'rotate(12deg)',
});

export const floatingElement2 = style({
  position: 'absolute',
  top: '-24px',
  left: '-8px',
  width: '64px',
  height: '64px',
  backgroundColor: '#a78bfa',
  borderRadius: '12px',
  opacity: 0.3,
  transform: 'rotate(-12deg)',
});
