import { style } from '@vanilla-extract/css';

import { colors, spacing, typography } from '@/styles/tokens.css';

export const container = style({
  padding: `${spacing.xl} 0`, // Reduced from lg (32px) to md (24px)
  backgroundColor: colors.white,
});

export const wrapper = style({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
  '@media': {
    '(max-width: 768px)': {
      padding: `0 ${spacing.sm}`,
    },
  },
});

export const title = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  textAlign: 'center',
  marginTop: '0px',
  marginBottom: spacing.xl, // Reduced from xl (48px) to lg (32px)
  fontFamily: typography.fontFamily.heading,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize['3xl'],
      marginBottom: spacing.md, // Reduced from lg (32px) to md (24px)
    },
  },
});

export const sectionTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
  textAlign: 'left',
  marginBottom: spacing.sm, // Reduced from md (24px) to sm (16px)
  fontFamily: typography.fontFamily.heading,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.xl,
      marginBottom: spacing.xs, // Reduced from sm (16px) to xs (8px)
    },
  },
});

export const faqContainer = style({
  display: 'flex',
  gap: spacing.xl, // Reduced from lg (32px) to md (24px)
  alignItems: 'flex-start',
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      gap: 0,
    },
  },
});

export const faqColumn = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${colors.neutral[200]}`,
  borderBottom: `1px solid ${colors.neutral[200]}`,
  minHeight: 'min-content',
  height: 'auto',
});

export const accordionGroup = style({
  width: '100%',
  borderTop: `1px solid ${colors.neutral[200]}`,
  ':first-child': {
    borderTop: 'none',
  },
});

export const faqItem = style({
  backgroundColor: 'transparent',
  overflow: 'hidden',
  position: 'relative',
  // Optimize for animations
  transform: 'translateZ(0)', // Create a new stacking context for better performance
  willChange: 'auto',
});

export const faqItemOpen = style({});

export const faqQuestion = style({
  width: '100%',
  padding: `${spacing.sm} 0`, // Reduced from md (24px) to sm (16px)
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: spacing.md,
  textAlign: 'left',
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.primary[600],
  },
  ':focus': {
    outline: 'none',
  },
  '@media': {
    '(max-width: 768px)': {
      padding: `${spacing.xs} 0`, // Reduced from sm (16px) to xs (8px)
    },
  },
});

export const questionText = style({
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.normal,
  color: colors.neutral[900],
  fontFamily: typography.fontFamily.body,
  lineHeight: typography.lineHeight.normal,
  flex: 1,
  '@media': {
    '(max-width: 768px)': {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const icon = style({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.neutral[600],
  transition: 'color 0.2s ease', // Remove transform transition to let Framer Motion handle it
  marginRight: spacing.sm,
});

export const iconSvg = style({
  width: '100%',
  height: '100%',
});

export const faqAnswer = style({
  overflow: 'hidden',
  vars: {
    '--answer-padding': spacing.sm, // Reduced from md (24px) to sm (16px)
  },
  '@media': {
    '(max-width: 768px)': {
      vars: {
        '--answer-padding': spacing.xs, // Reduced from sm (16px) to xs (8px)
      },
    },
  },
});

export const answerContent = style({
  padding: `0 0 var(--answer-padding) calc(20px + ${spacing.sm})`, // Use CSS variable instead of static
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  fontFamily: typography.fontFamily.body,
  whiteSpace: 'pre-line',
  // Add will-change for better animation performance
  willChange: 'auto',
  '@media': {
    '(max-width: 768px)': {
      padding: `0 0 var(--answer-padding) calc(20px + ${spacing.sm})`, // Use CSS variable for mobile too
      fontSize: typography.fontSize.base,
    },
  },
});