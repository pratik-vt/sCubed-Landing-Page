/**
 * Subscription Steps Constants
 * Centralized step definitions for subscription flow
 */

export const SUBSCRIPTION_STEPS = {
  EMAIL: 0,
  VERIFY: 1,
  DETAILS: 2,
  CHECKOUT: 3,
  PAYMENT: 4,
} as const;

export type SubscriptionStep = typeof SUBSCRIPTION_STEPS[keyof typeof SUBSCRIPTION_STEPS];

export const STEP_LABELS = {
  FREE_PLAN: {
    0: 'Email',
    1: 'Verify',
    2: 'Details',
    3: 'Complete',
  },
  PAID_PLAN: {
    0: 'Email',
    1: 'Verify',
    2: 'Details',
    3: 'Checkout',
    4: 'Payment',
  },
} as const;

/**
 * Get step label based on plan type and step number
 */
export function getStepLabel(step: number, isPaidPlan: boolean): string {
  const labels = isPaidPlan ? STEP_LABELS.PAID_PLAN : STEP_LABELS.FREE_PLAN;
  return labels[step as keyof typeof labels] || '';
}

/**
 * Get total steps based on plan type
 */
export function getTotalSteps(isPaidPlan: boolean): number {
  return isPaidPlan ? 5 : 4;
}

/**
 * Check if current step is the final step
 */
export function isFinalStep(currentStep: number, isPaidPlan: boolean): boolean {
  const totalSteps = getTotalSteps(isPaidPlan);
  return currentStep === totalSteps - 1;
}

/**
 * Check if step is completed
 */
export function isStepCompleted(stepNumber: number, currentStep: number, totalSteps: number): boolean {
  return stepNumber < currentStep + 1 ||
         (stepNumber === totalSteps && currentStep + 1 === totalSteps);
}

/**
 * Check if step is current
 */
export function isCurrentStep(stepNumber: number, currentStep: number, totalSteps: number): boolean {
  return stepNumber === currentStep + 1 && stepNumber !== totalSteps;
}