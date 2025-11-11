/**
 * Status Constants
 * Centralized status values for consistent state management
 */

export const STATUS = {
  // Loading states
  LOADING: 'loading',
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  PROCESSING: 'processing',

  // Success states
  SUCCESS: 'success',
  COMPLETED: 'completed',
  VERIFIED: 'verified',

  // Error states
  ERROR: 'error',
  FAILED: 'failed',
  INVALID: 'invalid',

  // Cancellation states
  CANCELED: 'canceled',
  CANCELLED: 'cancelled',

  // Pending states
  PENDING: 'pending',
  WAITING: 'waiting',

  // Activity states
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISABLED: 'disabled',
  ENABLED: 'enabled',

  // Subscription states
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  CLEANED: 'cleaned',
  TRANSACTIONAL: 'transactional',
} as const;

export type StatusType = typeof STATUS[keyof typeof STATUS];

// Status groups for easier checking
export const STATUS_GROUPS = {
  LOADING: [STATUS.LOADING, STATUS.SUBMITTING, STATUS.PROCESSING] as const,
  SUCCESS: [STATUS.SUCCESS, STATUS.COMPLETED, STATUS.VERIFIED] as const,
  ERROR: [STATUS.ERROR, STATUS.FAILED, STATUS.INVALID] as const,
  PENDING: [STATUS.PENDING, STATUS.WAITING] as const,
} as const;

// Helper functions
export function isLoadingStatus(status: string): boolean {
  return STATUS_GROUPS.LOADING.includes(status as any);
}

export function isSuccessStatus(status: string): boolean {
  return STATUS_GROUPS.SUCCESS.includes(status as any);
}

export function isErrorStatus(status: string): boolean {
  return STATUS_GROUPS.ERROR.includes(status as any);
}

export function isPendingStatus(status: string): boolean {
  return STATUS_GROUPS.PENDING.includes(status as any);
}

// Payment return status type
export type PaymentReturnStatus =
  | typeof STATUS.LOADING
  | typeof STATUS.SUCCESS
  | typeof STATUS.CANCELED
  | typeof STATUS.ERROR;

// Form submission status type
export type FormStatus =
  | typeof STATUS.IDLE
  | typeof STATUS.SUBMITTING
  | typeof STATUS.SUCCESS
  | typeof STATUS.ERROR;