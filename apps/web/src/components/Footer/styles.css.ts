import { style } from '@vanilla-extract/css';

import { colors, typography, spacing, shadows, radius } from '../../styles/tokens.css';

export const footerWrapper = style({
  width: '100%',
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, rgba(122, 126, 237, 0.05) 100%)`,
  borderTop: `1px solid ${colors.primary[100]}`,
  marginTop: spacing['3xl'],
  overflowX: 'hidden',
});

export const footerContainer = style({
  maxWidth: '1400px',
  width: '100%',
  margin: '0 auto',
  padding: `${spacing['2xl']} ${spacing.md}`,
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${spacing.xl} 15px`,
      width: '100%',
      maxWidth: '100%',
    },
  },
});

export const footerContent = style({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: spacing.xl,
  '@media': {
    'screen and (max-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr',
      gap: spacing.lg,
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: spacing.sm,
      textAlign: 'center',
    },
  },
});

export const brandSection = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '10px',
  '@media': {
    'screen and (max-width: 1024px)': {
      gridColumn: '1 / -1',
    },
    'screen and (max-width: 768px)': {
      alignItems: 'center',
    },
  },
});

export const logoWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  width: 'fit-content',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

export const brandDescription = style({
  fontSize: typography.fontSize.base,
  lineHeight: typography.lineHeight.relaxed,
  color: colors.neutral[600],
  maxWidth: '400px',
  marginBottom: '0',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.sm,
      maxWidth: '100%',
      marginBottom: '0',
    },
  },
});

export const footerColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  '@media': {
    'screen and (max-width: 768px)': {
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
  },
});

export const columnTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  color: colors.neutral[900],
  marginBottom: spacing.xs,
  position: 'relative',
  display: 'inline-block',
  ':after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: '0',
    width: '30px',
    height: '2px',
    background: colors.primary[600],
    borderRadius: radius.full,
  },
  '@media': {
    'screen and (max-width: 768px)': {
      ':after': {
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
});

export const footerLink = style({
  fontSize: typography.fontSize.base,
  color: colors.neutral[600],
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  position: 'relative',
  paddingLeft: '0',
  ':hover': {
    color: colors.primary[600],
    paddingLeft: '5px',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      ':hover': {
        paddingLeft: '0',
      },
    },
  },
});

export const bottomSection = style({
  paddingTop: spacing.lg,
  borderTop: `1px solid ${colors.neutral[200]}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: spacing.sm,
    },
  },
});

export const copyrightText = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  fontWeight: typography.fontWeight.normal,
});

export const legalLinks = style({
  display: 'flex',
  gap: spacing.md,
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      gap: spacing.xs,
    },
  },
});

export const legalLink = style({
  fontSize: typography.fontSize.sm,
  color: colors.neutral[500],
  textDecoration: 'none',
  position: 'relative',
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.primary[600],
  },
  selectors: {
    '&:not(:last-child)::after': {
      content: '"|"',
      position: 'absolute',
      right: `-${spacing.sm}`,
      color: colors.neutral[300],
      '@media': {
        'screen and (max-width: 768px)': {
          display: 'none',
        },
      },
    },
  },
});

export const contactInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.xs,
  '@media': {
    'screen and (max-width: 768px)': {
      marginBottom: spacing.md,
    },
  },
});

export const contactItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xs,
  fontSize: typography.fontSize.sm,
  color: colors.neutral[600],
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.primary[600],
  },
  '@media': {
    'screen and (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
});

export const ctaSection = style({
  background: 'linear-gradient(135deg, #7a7eed 100%, #fff 100%)',
  borderRadius: radius.lg,
  padding: spacing.lg,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.xl,
  boxShadow: shadows.purple,
  boxSizing: 'border-box',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: spacing.md,
      padding: '15px',
      margin: '0 15px',
      marginBottom: spacing.xl,
    },
  },
});

export const ctaContent = style({
  color: colors.white,
});

export const ctaTitle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeight.bold,
  marginBottom: spacing.xs,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: typography.fontSize.xl,
    },
  },
});

export const ctaDescription = style({
  fontSize: typography.fontSize.base,
  opacity: 0.95,
});

export const ctaButton = style({
  padding: `${spacing.sm} ${spacing.lg}`,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.semibold,
  color: colors.primary[600],
  background: colors.white,
  border: 'none',
  borderRadius: radius.md,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: shadows.md,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  ':hover': {
    transform: 'scale(1.05) translateY(-2px)',
    boxShadow: shadows.lg,
  },
  ':active': {
    transform: 'scale(1.02)',
  },
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
});

export const iconStyle = style({
  width: '20px',
  height: '20px',
  flexShrink: 0,
});

export const logosRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.xl,
  marginTop: spacing.md,
  '@media': {
    'screen and (max-width: 768px)': {
      justifyContent: 'center',
      gap: spacing.lg,
    },
  },
});

export const certificationImage = style({
  height: '70px',
  width: '70px',
  objectFit: 'cover',
  borderRadius: '50%',
  border: `2px solid ${colors.neutral[200]}`,
  '@media': {
    'screen and (max-width: 768px)': {
      height: '60px',
      width: '60px',
    },
  },
});

export const hipaaLogo = style({
  height: '70px',
  width: 'auto',
  objectFit: 'contain',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '60px',
    },
  },
});