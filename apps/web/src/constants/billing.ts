/**
 * Billing Constants
 * Centralized billing cycle constants and types
 */

export const BILLING_CYCLES = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export const BILLING_CYCLE_LABELS = {
  [BILLING_CYCLES.MONTHLY]: 'Monthly',
  [BILLING_CYCLES.YEARLY]: 'Annual',
} as const;

export type BillingCycle = typeof BILLING_CYCLES[keyof typeof BILLING_CYCLES];

/**
 * Get billing cycle label
 */
export function getBillingCycleLabel(cycle: BillingCycle): string {
  return BILLING_CYCLE_LABELS[cycle];
}

/**
 * Calculate next charge date based on billing cycle
 */
export function calculateNextChargeDate(cycle: BillingCycle): Date {
  const today = new Date();

  if (cycle === BILLING_CYCLES.YEARLY) {
    today.setFullYear(today.getFullYear() + 1);
  } else {
    today.setMonth(today.getMonth() + 1);
  }

  return today;
}

/**
 * Format next charge date for display
 */
export function formatNextChargeDate(cycle: BillingCycle): string {
  const date = calculateNextChargeDate(cycle);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}