import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { colors, radius, shadows, typography } from '@/styles/tokens.css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const modalContainer = style({
  padding: '40px',
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  maxHeight: 'calc(90vh - 40px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
  '@media': {
    '(max-width: 1024px)': {
      height: 'auto',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0px',
      overflow: 'hidden', // Container itself doesn't scroll
    },
    '(max-width: 640px)': {
      padding: '0px',
      height: 'auto',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden', // Container itself doesn't scroll
    },
  },
});

export const modalOverlay = style({
  // Ensure overlay takes full viewport height
  minHeight: '100vh',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media': {
    '(max-width: 1024px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
    },
    '(max-width: 640px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
    },
  },
});

export const modalContent = style({
  width: '720px',
  maxWidth: '90vw',
  backgroundColor: colors.primary[50],
  backgroundImage:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(122, 126, 237, 0.06))',
  boxShadow: `${shadows.purple}, 0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
  padding: '36px 40px',
  borderRadius: '24px',
  animation: `${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${colors.primary[200]}`,
  backdropFilter: 'blur(12px)',
  position: 'relative',
  overflow: 'visible', // Changed from hidden to visible
  maxHeight: '90vh',
  '@media': {
    '(max-width: 1024px)': {
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: 'calc(100vh - 60px)', // Increased margin to ensure bottom border is visible
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      margin: '30px auto', // Added margin for better visibility
    },
    '(max-width: 640px)': {
      width: '95vw',
      maxWidth: '95vw',
      maxHeight: 'calc(100vh - 60px)', // Increased margin to ensure bottom border is visible
      padding: '0',
      borderRadius: radius.xl,
      margin: '30px auto', // Increased margin for better visibility
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    // '(max-height: 700px)': {
    //   padding: '20px 24px',
    // },
  },
  // Add subtle inner glow
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background:
      'linear-gradient(90deg, transparent, rgba(122, 126, 237, 0.4), transparent)',
    zIndex: 1,
  },
});

export const modalHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '4px',
  '@media': {
    '(max-width: 1024px)': {
      padding: '20px 20px 10px',
      marginBottom: '0',
      position: 'sticky',
      top: 0,
      backgroundColor: colors.primary[50],
      backgroundImage:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(122, 126, 237, 0.06))',
      zIndex: 15,
      borderBottom: `1px solid ${colors.neutral[200]}`,
    },
    '(max-width: 640px)': {
      padding: '20px 20px 10px',
      marginBottom: '0',
      position: 'sticky',
      top: 0,
      backgroundColor: colors.primary[50],
      backgroundImage:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(122, 126, 237, 0.06))',
      zIndex: 15,
      borderBottom: `1px solid ${colors.neutral[200]}`,
    },
    '(max-height: 700px)': {
      marginBottom: '2px',
    },
  },
});

export const modalTitle = style({
  fontSize: typography.fontSize['2xl'], // 24px - More prominent
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900], // Deep neutral
  margin: '0 0 4px 0', // Tighter spacing to subtitle
  lineHeight: typography.lineHeight.tight,
  fontFamily: typography.fontFamily.heading,
  background: `linear-gradient(135deg, ${colors.neutral[900]}, ${colors.primary[700]})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  '@media': {
    '(max-width: 640px)': {
      fontSize: typography.fontSize.xl, // 20px
    },
  },
});

export const modalSubtitle = style({
  fontSize: typography.fontSize.sm, // 14px
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontFamily: typography.fontFamily.body,
  opacity: 0.9,
  margin: '0px',
});

export const closeButton = style({
  position: 'absolute',
  top: '10px',
  boxShadow: 'none !important',
  right: '10px',
  padding: '8px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  color: '#6b7280',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 20,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: '#1a1a1a',
  },
  ':focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.3)',
  },
  '@media': {
    '(max-width: 1024px)': {
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 30,
    },
    '(max-width: 640px)': {
      position: 'fixed',
      top: '5px',
      right: '5px',
      zIndex: 30,
    },
  },
});

export const progressBar = style({
  height: '6px', // Slimmer height for modern feel
  backgroundColor: colors.neutral[200],
  borderRadius: radius.full,
  marginBottom: '8px', // Further reduced gap below progress bar
  overflow: 'hidden',
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
  position: 'relative',
  '@media': {
    '(max-width: 1024px)': {
      margin: '0 20px 8px',
    },
    '(max-width: 640px)': {
      margin: '0 20px 8px',
    },
  },
});

export const progressBarFill = style({
  height: '100%',
  background: `linear-gradient(90deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 100%)`,
  borderRadius: radius.full,
  transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: `0 0 8px ${colors.primary[600]}33`, // Subtle glow
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
    borderRadius: radius.full,
  },
});

export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingLeft: '2px',
  paddingRight: '4px',
  maxHeight: 'calc(80vh - 200px)',
  WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
  '@media': {
    '(max-width: 1024px)': {
      gap: '12px',
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      padding: '12px 20px 20px',
      maxHeight: 'none',
      minHeight: 0,
    },
    '(max-width: 640px)': {
      gap: '12px',
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      padding: '12px 20px 20px',
      maxHeight: 'none',
      minHeight: 0,
    },
    '(max-height: 700px)': {
      maxHeight: 'calc(100vh - 250px)',
    },
  },
});

export const sectionHeader = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[800],
  padding: '12px 16px 12px 20px',
  marginBottom: '12px',
  backgroundColor: colors.primary[50],
  borderRadius: radius.lg,
  margin: '0 0 12px 0',
  fontFamily: typography.fontFamily.heading,
  boxShadow: `${shadows.sm}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
  position: 'relative',
  background: `linear-gradient(135deg, ${colors.primary[50]}, ${colors.primary[100]})`,
  border: `1px solid ${colors.primary[200]}`,
  borderLeft: `5px solid ${colors.primary[600]}`,
  '@media': {
    '(max-width: 640px)': {
      padding: '8px 12px 8px 16px',
      marginBottom: '8px',
      fontSize: typography.fontSize.base,
    },
    '(max-height: 700px)': {
      padding: '8px 12px 8px 16px',
      marginBottom: '8px',
    },
  },
  // Add subtle icon-like decoration
  '::before': {
    content: '""',
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    backgroundColor: colors.primary[600],
    borderRadius: '50%',
    opacity: 0.7,
    boxShadow: `0 0 4px ${colors.primary[600]}30`,
  },
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '14px',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
  },
});

export const formGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  gridColumn: 'span 6',
  '@media': {
    '(max-width: 640px)': {
      gridColumn: 'span 12',
    },
  },
});

export const formGroupFull = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  gridColumn: 'span 12',
});

export const labelStyle = style({
  fontSize: typography.fontSize.sm, // 14px - increased from 13px
  fontWeight: typography.fontWeight.semibold, // 600 - increased from 500
  color: colors.neutral[700], // Slightly darker for better contrast
  display: 'block',
  marginBottom: '6px', // Slightly more spacing
  fontFamily: typography.fontFamily.body,
  lineHeight: typography.lineHeight.tight,
});

export const requiredIndicator = style({
  color: '#dc2626', // Red-600 for better contrast
  marginLeft: '3px',
  fontWeight: typography.fontWeight.bold, // Make asterisk more prominent
  fontSize: typography.fontSize.sm, // Match label size
});

export const inputStyle = style({
  height: '42px', // Slightly taller for better UX
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.md, // More rounded (lg equivalent)
  padding: '0 16px',
  fontSize: typography.fontSize.sm,
  backgroundColor: colors.white,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  fontFamily: typography.fontFamily.body,
  boxShadow: shadows.sm, // Subtle shadow
  ':hover': {
    borderColor: colors.neutral[400],
    boxShadow: shadows.md,
    transform: 'translateY(-1px)',
  },
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[500], // Purple border
    boxShadow: `${shadows.lg}, 0 0 0 4px ${colors.primary[500]}20`, // Purple glow
    transform: 'translateY(-2px)',
  },
  ':disabled': {
    backgroundColor: colors.neutral[50],
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  '::placeholder': {
    color: colors.neutral[500],
    fontSize: typography.fontSize.xs,
    opacity: 0.8,
  },
  '@media': {
    '(max-width: 640px)': {
      fontSize: '16px', // Prevent zoom on iOS
    },
  },
});

export const selectStyle = style({
  height: '42px', // Match input height
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: radius.md, // More rounded (lg equivalent)
  padding: '0 40px 0 16px',
  fontSize: typography.fontSize.sm,
  backgroundColor: colors.white,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  cursor: 'pointer',
  appearance: 'none',
  fontFamily: typography.fontFamily.body,
  boxShadow: shadows.sm,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%23${colors.neutral[600].replace('#', '')}' d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  ':hover': {
    borderColor: colors.neutral[400],
    boxShadow: shadows.md,
    transform: 'translateY(-1px)',
  },
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[500], // Purple border
    boxShadow: `${shadows.lg}, 0 0 0 4px ${colors.primary[500]}20`, // Purple glow
    transform: 'translateY(-2px)',
  },
  ':disabled': {
    backgroundColor: colors.neutral[50],
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  '@media': {
    '(max-width: 640px)': {
      fontSize: '16px', // Prevent zoom on iOS
    },
  },
});

export const errorMessage = style({
  fontSize: typography.fontSize.xs, // 12px with design tokens
  color: '#dc2626', // Red-600 for better contrast
  marginTop: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontWeight: typography.fontWeight.medium,
  lineHeight: typography.lineHeight.tight,
});

export const actionButtons = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  paddingTop: '20px',
  borderTop: '1px solid #e5e7eb',
  position: 'sticky',
  bottom: 0,
  backgroundColor: colors.primary[50],
  backgroundImage:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(122, 126, 237, 0.06))',
  marginTop: 'auto',
  zIndex: 10,
  '@media': {
    '(max-width: 1024px)': {
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '15px 20px 20px',
      backgroundColor: colors.primary[50],
      backgroundImage:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(122, 126, 237, 0.06))',
      borderTop: `1px solid ${colors.neutral[200]}`,
      marginTop: '0',
      zIndex: 15,
      flexShrink: 0,
    },
    '(max-width: 640px)': {
      flexDirection: 'column-reverse',
      gap: '10px',
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '15px 20px 20px',
      backgroundColor: colors.primary[50],
      backgroundImage:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(122, 126, 237, 0.06))',
      borderTop: `1px solid ${colors.neutral[200]}`,
      marginTop: '0',
      zIndex: 15,
      flexShrink: 0,
    },
  },
});

export const cancelButton = style({
  padding: '9px 20px',
  height: '36px',
  backgroundColor: 'white',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#9ca3af',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
    },
  },
});

export const submitButton = style({
  padding: '14px 32px',
  height: '48px', // Taller for better presence
  background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})`,
  border: 'none',
  borderRadius: radius.lg, // More rounded
  color: colors.white,
  fontSize: typography.fontSize.base, // Larger text
  fontWeight: typography.fontWeight.bold,
  fontFamily: typography.fontFamily.heading,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  flex: 1,
  maxWidth: '100%', // Full width CTA
  boxShadow: `${shadows.purple}, ${shadows.lg}`,
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center', // Center text alignment
  ':hover': {
    background: `linear-gradient(135deg, ${colors.primary[700]}, ${colors.primary[800]})`,
    transform: 'translateY(-2px) scale(1.02)', // Slight scale on hover
    boxShadow: `${shadows.purple}, ${shadows.xl}`,
  },
  ':active': {
    transform: 'translateY(0) scale(1)',
    boxShadow: shadows.purple,
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: shadows.base,
  },
  // Add subtle shine effect
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s ease',
  },
  // Note: Hover animation handled by transition on ::before
  '@media': {
    '(max-width: 640px)': {
      width: '100%',
      maxWidth: 'none',
      height: '52px',
    },
  },
});

export const successMessage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  padding: '48px 24px',
  textAlign: 'center',
  color: '#10b981',
  fontSize: '18px',
  fontWeight: 500,
});

export const errorBanner = style({
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#dc2626',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const loadingSpinner = style({
  animation: `${spin} 1s linear infinite`,
});

export const validationIcon = style({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#10b981',
});

// Special grid layouts
export const formGroupThird = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  gridColumn: 'span 4',
  '@media': {
    '(max-width: 640px)': {
      gridColumn: 'span 12',
    },
  },
});

export const locationRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 120px',
  gap: '12px',
  gridColumn: 'span 12',
  '@media': {
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const fieldWrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const inputValid = style({
  borderColor: '#10b981',
});

export const inputError = style({
  borderColor: '#dc2626', // Red-600 for better contrast
  borderWidth: '1px', // Keep normal border width
  boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.15)', // Subtle red glow
});

export const consentSection = style({
  padding: '12px 16px',
  backgroundColor: 'rgba(122, 126, 237, 0.03)',
  borderRadius: radius.lg,
  border: `1px solid ${colors.primary[200]}`,
});

export const consentCheckbox = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
});

export const checkboxInput = style({
  marginTop: '2px',
  width: '18px',
  height: '18px',
  cursor: 'pointer',
  accentColor: colors.primary[600],
  flexShrink: 0,
});

export const consentLabel = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[700],
  lineHeight: typography.lineHeight.relaxed,
  userSelect: 'none',
  cursor: 'pointer',
  flex: 1,
});

export const privacyNote = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  fontSize: typography.fontSize.xs,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  fontStyle: 'italic',
  opacity: 0.9,
});

export const privacyIcon = style({
  flexShrink: 0,
  marginTop: '2px',
  color: colors.primary[600],
});

// Ensure proper scrolling on all touch devices
globalStyle('html, body', {
  '@media': {
    '(max-width: 1024px)': {
      WebkitOverflowScrolling: 'touch',
    },
  },
});

// Add global styles for modal body scrolling
globalStyle(`.${modalContent} *`, {
  '@media': {
    '(max-width: 1024px)': {
      WebkitOverflowScrolling: 'touch',
    },
  },
});
