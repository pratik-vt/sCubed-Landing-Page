import { style } from '@vanilla-extract/css';

import { colors, radius, shadows, spacing, typography } from '../../../styles/tokens.css';

export const plansWrapper = style({
  padding: `${spacing['2xl']} 0`,
});

export const plansContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${spacing.md}`,
});

export const billingToggle = style({
  display: 'flex',
  justifyContent: 'center',
  gap: spacing.xs,
  marginBottom: spacing['2xl'],
  padding: '4px',
  background: colors.neutral[100],
  borderRadius: radius.full,
  maxWidth: '400px',
  margin: `0 auto ${spacing['2xl']}`,
});

export const billingToggleOption = style({
  flex: 1,
  padding: `${spacing.sm} ${spacing.md}`,
  background: 'transparent',
  border: 'none',
  borderRadius: radius.full,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  color: colors.neutral[600],
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
});

export const billingToggleActive = style({
  background: colors.white,
  color: colors.neutral[900],
  boxShadow: shadows.sm,
});

export const savingBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `2px ${spacing.xs}`,
  background: colors.accent.green,
  color: colors.white,
  borderRadius: radius.full,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semibold,
});

export const plansGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.lg,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
      maxWidth: '500px',
      margin: '0 auto',
    },
  },
});

export const planCard = style({
  position: 'relative',
  background: colors.white,
  border: `2px solid ${colors.neutral[200]}`,
  borderRadius: radius.xl,
  padding: spacing.lg,
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    borderColor: colors.primary[300],
    boxShadow: shadows.lg,
  },
});

export const planCardPopular = style([
  planCard,
  {
    borderColor: colors.primary[600],
    borderWidth: '2px',
    background: `linear-gradient(to bottom, ${colors.primary[50]}, ${colors.white})`,
    transform: 'scale(1.05)',
    ':hover': {
      transform: 'scale(1.05) translateY(-4px)',
    },
    '@media': {
      'screen and (max-width: 1024px)': {
        transform: 'scale(1)',
        ':hover': {
          transform: 'translateY(-4px)',
        },
      },
    },
  },
]);

export const popularBadge = style({
  position: 'absolute',
  top: '-14px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: `4px ${spacing.md}`,
  background: colors.primary[600],
  color: colors.white,
  borderRadius: radius.full,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  whiteSpace: 'nowrap',
});

export const planName = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
});

export const badge = style({
  display: 'inline-block',
  padding: `4px ${spacing.sm}`,
  background: colors.primary[100],
  color: colors.primary[700],
  borderRadius: radius.base,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  marginBottom: spacing.sm,
});

export const planDescription = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
  marginBottom: spacing.md,
  minHeight: '48px',
});

export const planPriceWrapper = style({
  marginBottom: spacing.lg,
  paddingBottom: spacing.lg,
  borderBottom: `1px solid ${colors.neutral[200]}`,
});

export const planPrice = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: spacing.xs,
  marginBottom: spacing.xs,
});

export const planPriceAmount = style({
  fontSize: typography.fontSize['4xl'],
  fontWeight: typography.fontWeight.bold,
  color: colors.neutral[900],
});

export const planPricePeriod = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
});

export const planCTA = style({
  width: '100%',
  padding: `${spacing.sm} ${spacing.lg}`,
  background: colors.white,
  border: `2px solid ${colors.primary[600]}`,
  borderRadius: radius.md,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xs,
  marginBottom: spacing.lg,
  ':hover': {
    background: colors.primary[50],
    transform: 'translateY(-2px)',
    boxShadow: shadows.md,
  },
});

export const planCTAPopular = style([
  planCTA,
  {
    background: colors.primary[600],
    color: colors.white,
    ':hover': {
      background: colors.primary[700],
    },
  },
]);

export const featuresGrid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
});

export const featuresTitle = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[700],
  marginBottom: spacing.xs,
});

export const planFeature = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: spacing.xs,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  lineHeight: typography.lineHeight.relaxed,
});

export const planFeatureIcon = style({
  flexShrink: 0,
  marginTop: '2px',
  color: colors.accent.green,
});
