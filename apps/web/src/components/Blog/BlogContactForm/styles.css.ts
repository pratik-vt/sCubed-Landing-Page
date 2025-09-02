import { style, keyframes } from '@vanilla-extract/css';

import { colors } from '../../../styles/tokens.css';

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const formContainer = style({
  background: 'linear-gradient(135deg, #fafbff 0%, #f3f4f6 100%)',
  border: `1px solid ${colors.neutral[200]}`,
  borderRadius: '0.75rem', // matches radius.md
  padding: '1.5rem', // matches spacing.md
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '1.5rem',
      borderRadius: '0.75rem',
    },
  },
});

export const formHeader = style({
  textAlign: 'center',
  marginBottom: '1rem',
  
  '@media': {
    'screen and (max-width: 768px)': {
      marginBottom: '0.75rem',
    },
  },
});

export const formTitle = style({
  fontSize: '1.125rem',
  fontWeight: '600',
  color: colors.neutral[900],
  margin: '0',
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
});

export const formSubtitle = style({
  fontSize: '0.875rem',
  color: colors.neutral[600],
  lineHeight: '1.5',
  margin: 0,
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  marginBottom: '1rem',
  
  '@media': {
    'screen and (max-width: 768px)': {
      gap: '0.75rem',
      marginBottom: '0.75rem',
    },
  },
});

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
});

export const labelStyle = style({
  fontSize: '0.875rem',
  fontWeight: '600',
  color: colors.neutral[700],
  lineHeight: '1.25',
});

export const requiredMark = style({
  color: '#ef4444', // red-500 equivalent
  marginLeft: '2px',
});

export const inputStyle = style({
  padding: '0.625rem',
  fontSize: '0.875rem',
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: '6px',
  background: 'white',
  color: colors.neutral[900],
  transition: 'all 0.2s ease-in-out',
  
  '::placeholder': {
    color: colors.neutral[400],
  },
  
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[500],
    boxShadow: `0 0 0 3px ${colors.primary[500]}20`,
  },
  
  ':disabled': {
    backgroundColor: colors.neutral[50],
    color: colors.neutral[500],
    cursor: 'not-allowed',
  },
});

export const textareaStyle = style([
  inputStyle,
  {
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'inherit',
  },
]);

export const submitButton = style({
  width: '100%',
  padding: '0.75rem 1.25rem',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'white',
  background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: '0.75rem',
  
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
  },
  
  ':active': {
    transform: 'translateY(0)',
  },
  
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
});

export const loadingSpinner = style({
  width: '16px',
  height: '16px',
  border: '2px solid transparent',
  borderTop: '2px solid white',
  borderRadius: '50%',
  animation: `${spinAnimation} 1s linear infinite`,
});

export const errorMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.75rem',
  color: '#dc2626', // red-600 equivalent
  marginTop: '0.25rem',
  lineHeight: '1.4',
});

export const successMessage = style({
  textAlign: 'center',
  padding: '2rem',
  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
  borderRadius: '12px',
  border: '1px solid #bbf7d0', // green-200 equivalent
});


