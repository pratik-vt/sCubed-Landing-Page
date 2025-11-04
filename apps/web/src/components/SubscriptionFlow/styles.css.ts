import { style, keyframes } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '@/styles/tokens.css';

// ============================================================================
// ANIMATIONS
// ============================================================================

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// ============================================================================
// PAGE LAYOUT
// ============================================================================

export const pageWrapper = style({
  fontFamily: typography.fontFamily.body,
  minHeight: 'calc(100vh - 200px)',
  backgroundColor: '#f9fafb',
  padding: `${spacing.xl} 0`,
  animation: `${fadeIn} 0.6s ease-out`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.lg} 0`,
    },
  },
});

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: radius.lg,
  boxShadow: shadows.base,
  padding: spacing.xl,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: spacing.md,
      borderRadius: radius.md,
    },
  },
});

export const stepContent = style({
  marginTop: spacing.xl,
});

// ============================================================================
// STEP INDICATOR
// ============================================================================

export const stepIndicatorWrapper = style({
  width: '100%',
  padding: `${spacing.md} 0`,
});

export const stepIndicatorContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  maxWidth: '600px',
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 600px)': {
      maxWidth: '100%',
    },
  },
});

export const stepItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  flex: 1,
});

export const stepCircle = style({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  transition: 'all 0.3s ease',
  zIndex: 2,
  '@media': {
    'screen and (max-width: 600px)': {
      width: '40px',
      height: '40px',
      fontSize: typography.fontSize.base,
    },
  },
});

export const stepCircleCompleted = style({
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  boxShadow: shadows.purple,
});

export const stepCircleCurrent = style({
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  boxShadow: shadows.purple,
});

export const stepCircleInactive = style({
  backgroundColor: '#e5e7eb',
  color: '#9ca3af',
  border: '2px solid #d1d5db',
});

export const stepNumber = style({
  lineHeight: 1,
});

export const stepCheckIcon = style({
  width: '24px',
  height: '24px',
});

export const stepLabel = style({
  marginTop: spacing.xs,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  textAlign: 'center',
  transition: 'color 0.3s ease',
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: typography.fontSize.xs,
    },
  },
});

export const stepLabelCurrent = style({
  color: colors.primary[600],
});

export const stepLabelInactive = style({
  color: '#9ca3af',
});

export const stepConnector = style({
  position: 'absolute',
  top: '24px',
  left: '50%',
  width: '100%',
  height: '3px',
  transform: 'translateY(-50%)',
  transition: 'background-color 0.3s ease',
  zIndex: 1,
  '@media': {
    'screen and (max-width: 600px)': {
      top: '20px',
      height: '2px',
    },
  },
});

export const stepConnectorCompleted = style({
  backgroundColor: colors.primary[600],
});

export const stepConnectorInactive = style({
  backgroundColor: '#e5e7eb',
});

// ============================================================================
// FORM ELEMENTS
// ============================================================================

export const formTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.sm,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize['2xl'],
    },
  },
});

export const formSubtitle = style({
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  marginBottom: spacing.xl,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.base,
    },
  },
});

export const formSection = style({
  marginBottom: spacing.xl,
});

export const sectionTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.md,
  paddingBottom: spacing.sm,
  borderBottom: '2px solid #e5e7eb',
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const formField = style({
  marginBottom: spacing.md,
});

export const label = style({
  display: 'block',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: '#374151',
  marginBottom: spacing.xs,
});

export const requiredIndicator = style({
  color: '#ef4444',
  marginLeft: '4px',
});

export const input = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSize.base,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  ':disabled': {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed',
  },
});

export const inputError = style({
  borderColor: '#ef4444',
  ':focus': {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px #ef444420',
  },
});

export const errorMessage = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.sm,
  color: '#ef4444',
  marginTop: spacing.xs,
});

export const helpText = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginTop: spacing.xs,
});

export const select = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSize.base,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  boxSizing: 'border-box',
  cursor: 'pointer',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
});

export const textarea = style({
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSize.base,
  color: '#111827',
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: radius.md,
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: typography.fontFamily.body,
  resize: 'vertical',
  boxSizing: 'border-box',
  ':focus': {
    outline: 'none',
    borderColor: colors.primary[600],
    boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
  },
  ':disabled': {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed',
  },
});

export const checkboxLabel = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.sm,
  cursor: 'pointer',
  userSelect: 'none',
});

export const checkbox = style({
  width: '18px',
  height: '18px',
  marginTop: '2px',
  cursor: 'pointer',
  accentColor: colors.primary[600],
});

export const checkboxText = style({
  fontSize: typography.fontSize.sm,
  color: '#374151',
  lineHeight: 1.5,
});

// ============================================================================
// BUTTONS
// ============================================================================

export const buttonGroup = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: spacing.md,
  marginTop: spacing.xl,
  '@media': {
    'screen and (max-width: 600px)': {
      flexDirection: 'column-reverse',
    },
  },
});

export const button = style({
  padding: '14px 32px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  borderRadius: radius.md,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  fontFamily: typography.fontFamily.body,
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const buttonPrimary = style({
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  boxShadow: shadows.purple,
  selectors: {
    '&:hover': {
      backgroundColor: colors.primary[700],
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 40px -10px rgba(124, 82, 255, 0.5)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled:hover': {
      transform: 'none',
      backgroundColor: colors.primary[600],
    },
  },
});

export const buttonSecondary = style({
  backgroundColor: '#ffffff',
  color: '#374151',
  border: '2px solid #d1d5db',
  selectors: {
    '&:hover': {
      backgroundColor: '#f9fafb',
      borderColor: '#9ca3af',
    },
  },
});

export const loadingSpinner = style({
  display: 'inline-block',
  width: '16px',
  height: '16px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderTopColor: '#ffffff',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

// ============================================================================
// SUCCESS/ERROR STATES
// ============================================================================

export const successContainer = style({
  textAlign: 'center',
  padding: spacing.xl,
});

export const successIcon = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  color: colors.accent.green,
  backgroundColor: '#d1fae5',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const successTitle = style({
  fontSize: typography.fontSize['3xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.md,
});

export const successMessage = style({
  fontSize: typography.fontSize.lg,
  color: '#6b7280',
  marginBottom: spacing.lg,
  lineHeight: 1.6,
});

export const alertContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
  padding: spacing.md,
  borderRadius: radius.md,
  marginBottom: spacing.md,
  fontSize: typography.fontSize.sm,
});

export const alertError = style({
  backgroundColor: '#fee2e2',
  color: '#991b1b',
  border: '1px solid #fca5a5',
});

export const alertWarning = style({
  backgroundColor: '#fef3c7',
  color: '#92400e',
  border: '1px solid #fcd34d',
});

export const alertInfo = style({
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  border: '1px solid #93c5fd',
});

export const alertSuccess = style({
  backgroundColor: '#d1fae5',
  color: '#065f46',
  border: '1px solid #6ee7b7',
});

// ============================================================================
// OTP VERIFICATION
// ============================================================================

export const otpContainer = style({
  maxWidth: '400px',
  margin: '0 auto',
  textAlign: 'center',
});

export const otpIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  backgroundColor: colors.primary[600],
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: shadows.purple,
});

export const otpIcon = style({
  width: '40px',
  height: '40px',
  color: '#ffffff',
});

export const resendContainer = style({
  marginTop: spacing.lg,
  textAlign: 'center',
});

export const resendText = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginBottom: spacing.xs,
});

export const resendCooldown = style({
  fontSize: typography.fontSize.sm,
  color: '#9ca3af',
  fontStyle: 'italic',
});

export const resendButton = style({
  background: 'none',
  border: 'none',
  color: colors.primary[600],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: 0,
  selectors: {
    '&:hover': {
      color: colors.primary[700],
    },
    '&:disabled': {
      color: '#9ca3af',
      cursor: 'not-allowed',
      textDecoration: 'none',
    },
  },
});

// ============================================================================
// LOADING & ERROR ICONS
// ============================================================================

export const loadingIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingSpinnerLarge = style({
  display: 'inline-block',
  width: '48px',
  height: '48px',
  border: '4px solid #e5e7eb',
  borderTopColor: colors.primary[600],
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});

export const errorIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  color: '#ef4444',
  backgroundColor: '#fee2e2',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const errorIconLarge = style({
  width: '48px',
  height: '48px',
});

export const paymentIconWrapper = style({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  marginBottom: spacing.lg,
  color: colors.primary[600],
  backgroundColor: `${colors.primary[600]}20`,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ============================================================================
// SUCCESS DETAILS
// ============================================================================

export const successList = style({
  listStyle: 'disc',
  paddingLeft: spacing.lg,
  marginTop: spacing.sm,
  textAlign: 'left',
  lineHeight: 1.6,
});

export const successDetails = style({
  backgroundColor: '#f9fafb',
  borderRadius: radius.md,
  padding: spacing.lg,
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
});

export const successDetailsTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.md,
  textAlign: 'left',
});

export const successDetailsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing.md,
});

export const successDetailsItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: spacing.sm,
  borderBottom: '1px solid #e5e7eb',
  ':last-child': {
    borderBottom: 'none',
  },
});

export const successDetailsLabel = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  fontWeight: typography.fontWeight.semibold,
});

export const successDetailsValue = style({
  fontSize: typography.fontSize.sm,
  color: '#111827',
  fontWeight: typography.fontWeight.normal,
  textAlign: 'right',
});

// ============================================================================
// CART / CHECKOUT
// ============================================================================

export const cartHeader = style({
  textAlign: 'center',
  marginBottom: spacing.xl,
});

export const cartIcon = style({
  color: colors.primary[600],
  margin: '0 auto',
  marginBottom: spacing.md,
});

export const billingCycleGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const billingCycleOption = style({
  position: 'relative',
  padding: spacing.lg,
  border: '2px solid #e5e7eb',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      borderColor: colors.primary[600],
      boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
    },
  },
});

export const billingCycleOptionSelected = style({
  borderColor: colors.primary[600],
  backgroundColor: `${colors.primary[600]}08`,
  boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
});

export const billingCycleRadio = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
});

export const billingCycleContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const billingCycleTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
});

export const billingCyclePrice = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
});

export const billingCycleSavings = style({
  fontSize: typography.fontSize.sm,
  color: colors.accent.green,
  fontWeight: typography.fontWeight.semibold,
});

export const addonsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: spacing.md,
});

export const addonCard = style({
  display: 'flex',
  gap: spacing.md,
  padding: spacing.lg,
  border: '2px solid #e5e7eb',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover': {
      borderColor: colors.primary[600],
      boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
    },
  },
});

export const addonCardSelected = style({
  borderColor: colors.primary[600],
  backgroundColor: `${colors.primary[600]}08`,
  boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
});

export const addonCheckbox = style({
  width: '24px',
  height: '24px',
  flexShrink: 0,
  border: '2px solid #d1d5db',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  transition: 'all 0.2s ease',
  selectors: {
    [`${addonCardSelected} &`]: {
      backgroundColor: colors.primary[600],
      borderColor: colors.primary[600],
    },
  },
});

export const addonContent = style({
  flex: 1,
});

export const addonTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.xs,
});

export const addonDescription = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginBottom: spacing.sm,
  lineHeight: 1.5,
});

export const addonPrice = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
});

export const orderSummary = style({
  backgroundColor: '#f9fafb',
  borderRadius: radius.md,
  padding: spacing.lg,
  marginTop: spacing.xl,
  marginBottom: spacing.lg,
});

export const orderSummaryTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  marginBottom: spacing.md,
});

export const orderSummaryItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  marginBottom: spacing.sm,
});

export const orderSummaryDivider = style({
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: `${spacing.md} 0`,
});

export const orderSummaryTotal = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
});

export const savingsText = style({
  fontSize: typography.fontSize.sm,
  color: colors.accent.green,
  fontWeight: typography.fontWeight.semibold,
  marginLeft: spacing.xs,
});

export const loadingMessage = style({
  textAlign: 'center',
  color: '#6b7280',
  padding: spacing.lg,
  fontSize: typography.fontSize.base,
});

// ============================================================================
// CART REDESIGN - TWO COLUMN LAYOUT
// ============================================================================

export const cartGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: spacing.xl,
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.lg,
    },
  },
});

export const planDetailsColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg,
});

export const orderSummaryColumn = style({
  '@media': {
    'screen and (min-width: 1025px)': {
      position: 'sticky',
      top: spacing.lg,
    },
    'screen and (max-width: 1024px)': {
      order: -1, // Show summary first on mobile
    },
  },
});

export const planCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  padding: spacing.lg,
});

export const sectionBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `6px 12px`,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderRadius: radius.md,
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  marginBottom: spacing.sm,
});

export const planHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  marginBottom: spacing.md,
});

export const planName = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
});

export const planPriceRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.md,
  fontSize: typography.fontSize.xl,
  color: '#111827',
  marginTop: spacing.sm,
});

export const counterControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
});

export const counterButton = style({
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  border: '2px solid #d1d5db',
  borderRadius: radius.md,
  cursor: 'pointer',
  color: '#374151',
  transition: 'all 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: colors.primary[600],
      color: colors.primary[600],
      backgroundColor: `${colors.primary[600]}08`,
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
});

export const counterValue = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  minWidth: '40px',
  textAlign: 'center',
});

export const staffLabel = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  fontWeight: typography.fontWeight.medium,
});

export const priceEquals = style({
  fontSize: typography.fontSize.xl,
  color: '#6b7280',
  fontWeight: typography.fontWeight.medium,
});

export const totalPrice = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
});

export const addonItemCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  padding: spacing.lg,
  marginBottom: spacing.md,
  position: 'relative',
});

export const addonItemHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: spacing.xs,
});

export const addonItemTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  flex: 1,
});

export const removeAddonButton = style({
  padding: spacing.xs,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#ef4444',
  borderRadius: radius.md,
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: '#fee2e2',
  },
});

export const addonItemPrice = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
  marginTop: spacing.xs,
});

export const recommendedAddonCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  padding: spacing.lg,
  marginBottom: spacing.md,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});

export const recommendedAddonHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
});

export const recommendedAddonTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
});

export const recommendedAddonPrice = style({
  fontSize: typography.fontSize.base,
  color: '#6b7280',
});

export const addToSubscriptionButton = style({
  padding: '12px 24px',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: colors.primary[700],
    transform: 'translateY(-1px)',
    boxShadow: shadows.purple,
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const orderSummaryCard = style({
  backgroundColor: '#ffffff',
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  padding: spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});

export const orderSummaryHeader = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  paddingBottom: spacing.md,
  borderBottom: '2px solid #e5e7eb',
});

export const summaryLineItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: spacing.md,
});

export const summaryLineItemContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1,
});

export const summaryLineItemTitle = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: '#111827',
});

export const summarySubtext = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
});

export const summaryLineItemPrice = style({
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: '#111827',
  whiteSpace: 'nowrap',
});

export const summaryDivider = style({
  height: '1px',
  backgroundColor: '#e5e7eb',
  margin: `${spacing.sm} 0`,
});

export const summaryTotalRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  paddingTop: spacing.sm,
});

export const nextChargeText = style({
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
  marginTop: spacing.md,
  paddingTop: spacing.md,
  borderTop: '1px solid #e5e7eb',
});

export const nextChargeNote = style({
  fontSize: typography.fontSize.xs,
  color: '#9ca3af',
  marginTop: spacing.xs,
});

export const proceedButton = style({
  width: '100%',
  padding: '16px 32px',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.bold,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  backgroundColor: colors.primary[600],
  color: '#ffffff',
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginTop: spacing.md,
  boxShadow: shadows.purple,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: colors.primary[700],
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 40px -10px rgba(124, 82, 255, 0.5)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});

export const footerLinks = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  marginTop: spacing.xl,
  fontSize: typography.fontSize.sm,
  color: '#6b7280',
});

export const footerLink = style({
  color: '#ef4444',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#dc2626',
    textDecoration: 'underline',
  },
});

export const footerLinkDisabled = style({
  color: '#9ca3af',
  cursor: 'not-allowed',
  ':hover': {
    textDecoration: 'none',
  },
});

export const sectionHeader = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  marginBottom: spacing.md,
  marginTop: spacing.lg,
});

// ============================================================================
// PLAN BADGE
// ============================================================================

export const planBadgeContainer = style({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.xs,
  padding: `${spacing.sm} ${spacing.lg}`,
  borderRadius: radius.lg,
  border: '2px solid',
  marginBottom: spacing.lg,
  boxShadow: shadows.sm,
});

export const planBadgeContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
});

export const planBadgeIcon = style({
  flexShrink: 0,
});

export const planBadgeName = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
});

export const planBadgeCycle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  opacity: 0.8,
});

export const planBadgeSubtext = style({
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  opacity: 0.7,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const planBadgeWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  marginBottom: spacing.md,
  position: 'relative',
});

export const editPlanButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.primary[600],
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: spacing.xs,
  borderRadius: '50%',
  transition: 'all 0.2s ease',
  width: '36px',
  height: '36px',
  flexShrink: 0,
  ':hover': {
    backgroundColor: colors.primary[50],
    transform: 'scale(1.1)',
  },
  ':active': {
    transform: 'scale(0.95)',
  },
  ':focus': {
    outline: `2px solid ${colors.primary[600]}`,
    outlineOffset: '2px',
  },
});

// ============================================================================
// MODAL STYLES
// ============================================================================

export const modalBackdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  animation: `${fadeIn} 0.2s ease-out`,
});

export const modalContainer = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  borderRadius: radius.lg,
  boxShadow: shadows.xl,
  zIndex: 1000,
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: spacing.lg,
  borderBottom: '1px solid #e5e7eb',
});

export const modalTitle = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  color: '#111827',
  margin: 0,
});

export const modalCloseButton = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: spacing.xs,
  borderRadius: radius.md,
  color: '#6b7280',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: '#f3f4f6',
    color: '#111827',
  },
});

export const modalBody = style({
  padding: spacing.lg,
  overflowY: 'auto',
  flex: 1,
});

export const modalFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: spacing.md,
  padding: spacing.lg,
  borderTop: '1px solid #e5e7eb',
});

// ============================================================================
// PLAN SELECTOR STYLES
// ============================================================================

export const billingToggleContainer = style({
  display: 'flex',
  gap: spacing.xs,
  backgroundColor: '#f3f4f6',
  padding: spacing.xs,
  borderRadius: radius.lg,
  marginBottom: spacing.lg,
});

export const billingToggleButton = style({
  flex: 1,
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: '#6b7280',
  background: 'transparent',
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    color: '#111827',
  },
});

export const billingToggleButtonActive = style({
  backgroundColor: '#ffffff',
  color: colors.primary[600],
  boxShadow: shadows.sm,
});

export const planOptionsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const planOptionCard = style({
  position: 'relative',
  padding: spacing.lg,
  border: '2px solid #e5e7eb',
  borderRadius: radius.lg,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff',
  ':hover': {
    borderColor: '#d1d5db',
    boxShadow: shadows.sm,
  },
});

export const planOptionCardSelected = style({
  boxShadow: shadows.md,
});

export const planOptionCheckbox = style({
  position: 'absolute',
  top: spacing.sm,
  right: spacing.sm,
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '2px solid #e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  transition: 'all 0.2s ease',
});

export const planOptionContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const planOptionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
});

export const planOptionName = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
});

export const planOptionBadge = style({
  display: 'inline-flex',
  alignSelf: 'flex-start',
  padding: `${spacing.xs} ${spacing.sm}`,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  borderRadius: radius.md,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  border: '1px solid transparent',
});

export const otpInputContainer = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  flexWrap: 'wrap',
});

export const otpInput = style({
  width: '50px',
  height: '50px',
  textAlign: 'center',
  fontSize: '24px',
});