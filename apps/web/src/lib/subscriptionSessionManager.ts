/**
 * Subscription Session Manager
 *
 * Manages sessionStorage persistence for the subscription onboarding flow.
 * Handles session validation, expiry checks, and data integrity.
 */

import { SubscriptionFormState } from '@/types/subscription';

// Session constants
const SESSION_STORAGE_KEY = 'subscriptionFormState';
const SESSION_VERSION = '1.0.0';
const OTP_EXPIRY_MINUTES = 30;
const SESSION_MAX_AGE_HOURS = 24;

export interface SessionMetadata {
  version: string;
  sessionCreatedAt: number;
  otpVerifiedAt: number | null;
  lastUpdatedAt: number;
  planType: 'free' | 'paid' | null;
}

export interface SubscriptionSession {
  formState: SubscriptionFormState;
  metadata: SessionMetadata;
}

/**
 * Save subscription form state to sessionStorage with metadata
 */
export function saveSession(formState: SubscriptionFormState): void {
  try {
    // Get existing session to preserve timestamps
    const existingSession = loadSessionRaw();
    const now = Date.now();

    const sessionData: SubscriptionSession = {
      formState,
      metadata: {
        version: SESSION_VERSION,
        sessionCreatedAt: existingSession?.metadata.sessionCreatedAt || now,
        otpVerifiedAt: formState.otpVerified
          ? (existingSession?.metadata.otpVerifiedAt || now)
          : null,
        lastUpdatedAt: now,
        planType: formState.selectedPlan
          ? (formState.selectedPlan.price?.monthly && formState.selectedPlan.price.monthly > 0 ? 'paid' : 'free')
          : null,
      },
    };

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to save subscription session:', error);
  }
}

/**
 * Load raw session data without validation
 */
function loadSessionRaw(): SubscriptionSession | null {
  try {
    const data = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!data) return null;

    const session = JSON.parse(data) as SubscriptionSession;

    // Basic structure validation
    if (!session.formState || !session.metadata) {
      console.warn('Invalid session structure');
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to load subscription session:', error);
    return null;
  }
}

/**
 * Load and validate subscription form state from sessionStorage
 */
export function loadSession(): SubscriptionFormState | null {
  const session = loadSessionRaw();
  if (!session) return null;

  const validation = validateSession(session);

  if (!validation.isValid) {
    console.warn('Session validation failed:', validation.reason);
    clearSession();
    return null;
  }

  return session.formState;
}

/**
 * Validate session data and check expiry
 */
export function validateSession(session: SubscriptionSession): {
  isValid: boolean;
  reason?: string;
} {
  const { metadata } = session;
  const now = Date.now();

  // Check session version
  if (metadata.version !== SESSION_VERSION) {
    return { isValid: false, reason: 'Session version mismatch' };
  }

  // Check session age (max 24 hours)
  const sessionAgeHours = (now - metadata.sessionCreatedAt) / (1000 * 60 * 60);
  if (sessionAgeHours > SESSION_MAX_AGE_HOURS) {
    return { isValid: false, reason: 'Session expired (max age exceeded)' };
  }

  // Check OTP expiry if OTP was verified
  if (metadata.otpVerifiedAt) {
    const otpAgeMinutes = (now - metadata.otpVerifiedAt) / (1000 * 60);
    if (otpAgeMinutes > OTP_EXPIRY_MINUTES) {
      return { isValid: false, reason: 'OTP expired (30 minutes elapsed)' };
    }
  }

  return { isValid: true };
}

/**
 * Check if current session is valid
 */
export function isSessionValid(): boolean {
  const session = loadSessionRaw();
  if (!session) return false;

  const validation = validateSession(session);
  return validation.isValid;
}

/**
 * Get session age in minutes
 */
export function getSessionAge(): number | null {
  const session = loadSessionRaw();
  if (!session) return null;

  const now = Date.now();
  return (now - session.metadata.sessionCreatedAt) / (1000 * 60);
}

/**
 * Get OTP age in minutes
 */
export function getOtpAge(): number | null {
  const session = loadSessionRaw();
  if (!session || !session.metadata.otpVerifiedAt) return null;

  const now = Date.now();
  return (now - session.metadata.otpVerifiedAt) / (1000 * 60);
}

/**
 * Check if OTP has expired
 */
export function isOtpExpired(): boolean {
  const otpAge = getOtpAge();
  if (otpAge === null) return false;

  return otpAge > OTP_EXPIRY_MINUTES;
}

/**
 * Clear subscription session from sessionStorage
 */
export function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear subscription session:', error);
  }
}

/**
 * Get session metadata
 */
export function getSessionMetadata(): SessionMetadata | null {
  const session = loadSessionRaw();
  return session?.metadata || null;
}

/**
 * Check if user can proceed to a specific step
 */
export function canProceedToStep(currentStep: number, targetStep: number, formState: SubscriptionFormState): boolean {
  // Always allow going back
  if (targetStep < currentStep) return true;

  // Validate forward navigation
  switch (targetStep) {
    case 0:
      return true; // Can always go to email step

    case 1:
      // Can go to OTP if we have clinic_onboarding_request_id
      return !!formState.clinic_onboarding_request_id;

    case 2:
      // Can go to clinic details if OTP verified
      return formState.otpVerified;

    case 3:
      // Can go to cart/success if we have clinic details
      return !!formState.step1Data?.clinic_name && formState.otpVerified;

    case 4:
      // Can go to payment if we have payment URL (paid plans only)
      return !!formState.paymentUrl && formState.paymentRequired;

    default:
      return false;
  }
}

/**
 * Update session timestamp without changing form state
 */
export function touchSession(): void {
  const session = loadSessionRaw();
  if (session) {
    session.metadata.lastUpdatedAt = Date.now();
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }
}
