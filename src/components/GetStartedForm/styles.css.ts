import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { colors } from '../../styles/tokens.css';

// Animation keyframes
const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const slideInLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-30px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

const slideInRight = keyframes({
  from: { opacity: 0, transform: 'translateX(30px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

// Main layout styles
export const pageWrapper = style({
  marginTop: '-45px',
  paddingTop: '125px',
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  animation: `${fadeIn} 0.6s ease-out`,
  '@media': {
    '(max-width: 820px)': {
      marginTop: '-70px',
      paddingTop: '150px',
    },
    '(max-width: 800px)': {
      marginTop: '-100px',
      paddingTop: '180px',
    },
    '(max-width: 767px)': {
      marginTop: '-220px',
      paddingTop: '300px',
    },
  },
});

export const backgroundContainer = style({
  position: 'relative',
  minHeight: '100vh',
  paddingBottom: '2rem',
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.white} 25%, ${colors.primary[100]} 50%, ${colors.white} 75%, ${colors.primary[50]} 100%)`,
  overflow: 'hidden',
});

export const backgroundDecorative = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(40deg, transparent 25%, ${colors.primary[600]}05 50%, transparent 75%)`,
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '400px',
    background: `radial-gradient(circle, ${colors.primary[600]}08 0%, transparent 70%)`,
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
    filter: 'blur(80px)',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '400px',
    height: '400px',
    background: `radial-gradient(circle, ${colors.primary[400]}12 0%, transparent 70%)`,
    borderRadius: '50%',
    transform: 'translate(-50%, 50%)',
    filter: 'blur(80px)',
  },
});

export const mainContainer = style({
  position: 'relative',
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '2rem 1.5rem 1rem 1.5rem', // Reduced bottom padding from 2rem to 1rem
  zIndex: 1,
  '@media': {
    '(max-width: 768px)': {
      padding: '1.5rem 1rem 0.5rem 1rem', // Reduced bottom padding on mobile too
    },
  },
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '2rem',
  alignItems: 'start',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: '2rem',
    },
    '(max-width: 768px)': {
      gap: '1.5rem',
    },
  },
});

// Left panel styles with enhanced animations
export const leftPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  animation: `${slideInLeft} 0.8s ease-out`,
  '@media': {
    '(max-width: 768px)': {
      gap: '1rem',
    },
  },
});

export const contactSection = style({
  textAlign: 'left',
  '@media': {
    '(max-width: 1023px)': {
      textAlign: 'center',
    },
  },
});

export const formTitle = style({
  fontSize: '2.5rem',
  fontWeight: '700',
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 50%, ${colors.primary[400]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  lineHeight: '1.2',
  marginBottom: '0.75rem',
  letterSpacing: '-0.02em',
  '@media': {
    '(min-width: 1024px)': {
      fontSize: '3rem',
    },
    '(max-width: 768px)': {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    '(max-width: 480px)': {
      fontSize: '1.75rem',
    },
  },
});

export const titleGradient = style({
  display: 'block',
  color: colors.neutral[900],
  fontWeight: '700',
});

export const contactCard = style({
  background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.primary[100]} 30%, ${colors.primary[50]} 70%, ${colors.white} 100%)`,
  border: `1px solid ${colors.primary[200]}`,
  borderRadius: '1.5rem',
  backdropFilter: 'blur(12px)',
  boxShadow: `0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 4px 16px -4px ${colors.primary[600]}15, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 40px -12px rgba(0, 0, 0, 0.18), 0 8px 20px -4px ${colors.primary[600]}25, inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
    borderColor: colors.primary[300],
  },
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 50%, ${colors.primary[500]} 100%)`,
    opacity: 0.8,
  },
});

export const contactCardHeader = style({
  padding: '1rem 1rem 0.5rem 1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[700],
  fontSize: '1.125rem', // Increased from 1rem
  fontWeight: '700',
  letterSpacing: '-0.01em',
  textAlign: 'center',
  '@media': {
    '(max-width: 768px)': {
      padding: '0.875rem 0.875rem 0.375rem 0.875rem',
      fontSize: '1rem', // Increased from 0.9rem
    },
  },
});

export const contactCardContent = style({
  padding: '0 1rem 1rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  '@media': {
    '(max-width: 768px)': {
      padding: '0 0.875rem 0.875rem 0.875rem',
      gap: '0.625rem',
    },
  },
});

export const contactItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.625rem 0.625rem',
  borderRadius: '0.75rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  background: 'transparent',
  border: '1px solid transparent',
  ':hover': {
    background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
    transform: 'translateX(6px)',
    borderColor: colors.primary[200],
    boxShadow: `0 4px 12px -2px ${colors.primary[600]}20, inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
  },
  '@media': {
    '(max-width: 768px)': {
      padding: '0.875rem 0.75rem',
      gap: '0.75rem',
    },
  },
});

// Global styles for contactItem hover effects
globalStyle(`${contactItem}:hover div:first-child`, {
  background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
  transform: 'scale(1.1)',
  boxShadow: `0 4px 8px -2px ${colors.primary[600]}40`,
});

globalStyle(`${contactItem}:hover div:first-child svg`, {
  color: colors.white,
  transform: 'scale(1.1)',
});

globalStyle(`${contactItem}:hover span:last-child`, {
  color: colors.primary[700],
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  textDecorationColor: colors.primary[300],
  textDecorationThickness: '2px',
});

export const specialistButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '1.25rem 2rem',
  background: 'linear-gradient(135deg, #7a7eed 0%, #9f7aea 100%)',
  border: 'none',
  borderRadius: '1rem',
  color: colors.white,
  fontSize: '1rem',
  fontWeight: '700',
  lineHeight: '1',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  boxShadow:
    '0 8px 24px -4px rgba(122, 126, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  ':hover': {
    background: 'linear-gradient(135deg, #6c6ee5 0%, #9171e8 100%)',
    boxShadow:
      '0 12px 32px -4px rgba(122, 126, 237, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
    transition: 'left 0.6s ease',
  },
  '@media': {
    '(max-width: 1024px)': {
      display: 'none',
    },
  },
});

// Global style for specialistButton hover effect on ::before
globalStyle(`${specialistButton}:hover::before`, {
  left: '100%',
});

// Right panel styles with enhanced design
export const rightPanel = style({
  display: 'flex',
  flexDirection: 'column',
  animation: `${slideInRight} 0.8s ease-out 0.2s both`,
});

export const cardContainer = style({
  background: `rgba(255, 255, 255, 0.98)`,
  backdropFilter: 'blur(20px)',
  borderRadius: '2rem',
  marginTop: '2.5rem',
  boxShadow: `0 32px 64px -12px rgba(0, 0, 0, 0.12), 0 16px 32px -8px rgba(0, 0, 0, 0.08)`,
  border: `1px solid ${colors.neutral[200]}50`,
  overflow: 'hidden',
  animation: `${scaleIn} 0.6s ease-out 0.4s both`,
  '@media': {
    '(max-width: 768px)': {
      borderRadius: '1.5rem',
      marginTop: '1rem',
    },
  },
});

export const cardHeader = style({
  background: `rgba(${colors.primary[50]}, 0.3)`,
  padding: '1rem',
  textAlign: 'center',
  borderBottom: `1px solid ${colors.primary[200]}`,
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 50%, ${colors.primary[600]} 100%)`,
  },
  '@media': {
    '(max-width: 768px)': {
      padding: '0.75rem',
    },
  },
});

export const cardContent = style({
  padding: '1.5rem',
  '@media': {
    '(max-width: 768px)': {
      padding: '1.25rem',
    },
  },
});

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  '@media': {
    '(max-width: 768px)': {
      gap: '1.25rem',
    },
  },
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.25rem',
  background: colors.neutral[50],
  borderRadius: '1rem',
  border: `1px solid ${colors.primary[100]}`,
  transition: 'all 0.3s ease',
  ':hover': {
    background: colors.primary[50],
    borderColor: `${colors.primary[200]}`,
    boxShadow: `0 4px 8px -2px ${colors.primary[100]}20`,
  },
  '@media': {
    '(max-width: 768px)': {
      padding: '1rem',
      gap: '0.875rem',
    },
  },
});

export const sectionNumber = style({
  width: '1.5rem',
  height: '1.5rem',
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 100%)`,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 4px -1px ${colors.primary[600]}20`,
  transition: 'all 0.3s ease',
  flexShrink: 0,
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 3px 6px -1px ${colors.primary[600]}30`,
  },
});

export const sectionTitle = style({
  fontSize: '1.125rem',
  fontWeight: '600',
  color: colors.neutral[900],
  letterSpacing: '-0.01em',
  '@media': {
    '(max-width: 768px)': {
      fontSize: '1rem',
    },
  },
});

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
  transition: 'all 0.3s ease',
});

// Grid layout styles for form sections
export const twoColumnGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  alignItems: 'start',
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
});

export const threeColumnGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const labelStyle = style({
  fontSize: '0.8125rem',
  fontWeight: '700', // Bolden for better readability
  color: '#1f2937', // Direct dark color to override any conflicts
  letterSpacing: '0.01em',
  transition: 'color 0.3s ease',
  display: 'block', // Ensure proper display
});

export const requiredMark = style({
  color: '#ef4444',
  marginLeft: '0.25rem',
});

const baseInputStyle = {
  height: '2.75rem',
  padding: '0 1rem',
  border: `1.5px solid ${colors.neutral[200]}`,
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  fontWeight: '400', // Changed from '500' to normal weight
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: colors.white,
  boxShadow: `0 1px 2px 0 ${colors.neutral[200]}10`,
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 2px ${colors.primary[600]}10`,
  },
  ':hover': {
    borderColor: colors.primary[400],
  },
  '::placeholder': {
    color: '#52525b', // Direct dark color for better contrast
    fontWeight: '400',
  },
};

export const inputStyle = style({
  ...baseInputStyle,
  '::placeholder': {
    color: '#52525b', // Direct dark color for better contrast
    fontWeight: '400',
  },
});

export const selectStyle = style({
  ...baseInputStyle,
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 16px center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px',
  paddingRight: '3rem',
  color: colors.neutral[700],
  selectors: {
    '&:has(option[value=""]:checked)': {
      color: '#52525b', // Darker placeholder color for better contrast
    },
  },
});

export const textareaStyle = style({
  minHeight: '4.5rem',
  padding: '0.75rem 1rem',
  border: `1.5px solid ${colors.neutral[200]}`,
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  fontWeight: '400', // Changed from '500' to normal weight
  resize: 'vertical',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: colors.white,
  boxShadow: `0 1px 2px 0 ${colors.neutral[200]}10`,
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 2px ${colors.primary[600]}10`,
  },
  ':hover': {
    borderColor: colors.primary[400],
  },
  '::placeholder': {
    color: '#52525b', // Direct dark color for better contrast
    fontWeight: '400',
  },
});

// Simplified checkbox section without input-like styling
export const checkboxSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '0.5rem 0', // Minimal padding, no background
});

export const checkboxRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
});

export const checkboxInput = style({
  width: '1.125rem', // Slightly larger for better accessibility
  height: '1.125rem',
  accentColor: colors.primary[600],
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  flexShrink: 0,
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const checkboxLabel = style({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: colors.neutral[800],
  cursor: 'pointer',
  lineHeight: '1.5',
  transition: 'color 0.3s ease',
  ':hover': {
    color: colors.primary[600],
  },
});

export const checkboxContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
});

export const submitButton = style({
  width: '100%',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  background: 'linear-gradient(135deg, #7a7eed 0%, #9f7aea 100%)',
  color: colors.white,
  border: 'none',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 6px -1px rgba(122, 126, 237, 0.4)',
  letterSpacing: '0.01em',
  ':hover': {
    background: 'linear-gradient(135deg, #6c6ee5 0%, #9171e8 100%)',
    boxShadow: '0 6px 8px -1px rgba(122, 126, 237, 0.5)',
    transform: 'translateY(-1px)',
  },
  ':active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px -1px rgba(122, 126, 237, 0.4)',
  },
  ':disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
  '@media': {
    '(max-width: 768px)': {
      height: '2.75rem',
      fontSize: '0.875rem',
    },
  },
});

export const errorMessage = style({
  color: '#ef4444',
  fontSize: '0.875rem',
  fontWeight: '500',
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  animation: `${fadeIn} 0.3s ease-out`,
});

export const successMessage = style({
  position: 'relative',
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '4rem',
  background: colors.white,
  borderRadius: '2rem',
  boxShadow: `0 32px 64px -12px rgba(0, 0, 0, 0.15), 0 16px 32px -8px rgba(0, 0, 0, 0.08)`,
  textAlign: 'center',
  zIndex: 10,
  animation: `${scaleIn} 0.6s ease-out`,
  '@media': {
    '(max-width: 768px)': {
      padding: '3rem 2rem',
      margin: '1rem',
    },
  },
});

export const successTitle = style({
  fontSize: '1.875rem',
  fontWeight: 'bold',
  color: colors.neutral[900],
  marginBottom: '1rem',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '2.25rem',
    },
  },
});

export const successText = style({
  fontSize: '1.125rem',
  color: colors.neutral[600],
  marginBottom: '2rem',
  lineHeight: '1.75',
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '18px',
  height: '18px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderTopColor: 'white',
  borderRadius: '50%',
  animation: `${spin} 0.6s linear infinite`,
  marginRight: '0.5rem',
});

export const infoBox = style({
  display: 'none',
  background: colors.primary[50],
  borderRadius: '0.75rem',
  padding: '1rem',
  marginBottom: '1rem',
  marginTop: '0.5rem',
  border: `1px solid ${colors.primary[200]}`,
  boxShadow: `0 2px 4px -1px ${colors.primary[100]}30`,
  '@media': {
    '(min-width: 1024px)': {
      display: 'block',
    },
  },
});

export const infoBoxText = style({
  color: colors.neutral[700],
  fontSize: '0.875rem',
  lineHeight: '1.5',
});

export const sectionNumberText = style({
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: colors.white,
});

export const checkboxHelperText = style({
  fontSize: '0.75rem',
  color: colors.neutral[600], // Darker for better readability
  lineHeight: '1.5',
  marginLeft: '0', // Remove left margin to align with checkbox row
  marginTop: '0.25rem',
  paddingLeft: '1.875rem', // Use padding instead of margin for better alignment
});

export const bottomHelperText = style({
  textAlign: 'center',
  fontSize: '0.875rem',
  color: colors.neutral[600], // Darker for better readability
  marginTop: '1rem',
  lineHeight: '1.75',
  padding: '1rem',
  background: 'rgba(249, 250, 251, 0.8)',
  borderRadius: '0.75rem',
  border: `1px solid ${colors.neutral[200]}`,
  backdropFilter: 'blur(4px)',
});

// Progress indicator
export const progressIndicator = style({
  position: 'sticky',
  top: '100px',
  marginBottom: '2rem',
  padding: '1rem',
  background: `rgba(255, 255, 255, 0.95)`,
  backdropFilter: 'blur(10px)',
  borderRadius: '1rem',
  border: `1px solid ${colors.neutral[200]}40`,
  display: 'none',
  '@media': {
    '(min-width: 1200px)': {
      display: 'block',
    },
  },
});

// Legacy compatibility styles (hidden)
export const contactPanel = style({ display: 'none' });
export const contactInfo = style({ display: 'none' });
export const formPanel = style({ display: 'none' });
export const formHeader = style({ display: 'none' });
export const formSubtitle = style({ display: 'none' });
export const pageContainer = style({ display: 'none' });
export const contactHeader = style({ display: 'none' });
export const contactButton = style({ display: 'none' });
export const formGrid = style({ display: 'none' });
