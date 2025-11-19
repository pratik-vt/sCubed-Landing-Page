// LocalStorage keys
const STORAGE_KEYS = {
  SESSION: 'contactFormSession',
  STEP: 'contactFormStep',
} as const;

export interface ContactFormSession {
  sessionId: string;
  currentStep: number;
}

/**
 * Save contact form session to localStorage
 */
export const saveSession = (sessionId: string, step: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SESSION, sessionId);
    localStorage.setItem(STORAGE_KEYS.STEP, step.toString());
  } catch (error) {
    console.error('Error saving contact form session:', error);
  }
};

/**
 * Get contact form session from localStorage
 */
export const getSession = (): ContactFormSession | null => {
  try {
    const sessionId = localStorage.getItem(STORAGE_KEYS.SESSION);
    const stepStr = localStorage.getItem(STORAGE_KEYS.STEP);

    if (!sessionId || !stepStr) {
      return null;
    }

    const currentStep = parseInt(stepStr, 10);
    if (isNaN(currentStep) || currentStep < 1 || currentStep > 3) {
      return null;
    }

    return {
      sessionId,
      currentStep,
    };
  } catch (error) {
    console.error('Error getting contact form session:', error);
    return null;
  }
};

/**
 * Clear contact form session from localStorage
 */
export const clearSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.STEP);
  } catch (error) {
    console.error('Error clearing contact form session:', error);
  }
};

/**
 * Check if user has an incomplete form that can be resumed
 */
export const hasIncompleteForm = (): boolean => {
  const session = getSession();
  // Has session and not completed (step < 3 means they haven't submitted final step)
  return session !== null && session.currentStep < 3;
};

/**
 * Get session ID from localStorage
 */
export const getSessionId = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.SESSION);
  } catch (error) {
    console.error('Error getting session ID:', error);
    return null;
  }
};

/**
 * Get current step from localStorage
 */
export const getCurrentStep = (): number | null => {
  try {
    const stepStr = localStorage.getItem(STORAGE_KEYS.STEP);
    if (!stepStr) return null;

    const step = parseInt(stepStr, 10);
    if (isNaN(step) || step < 1 || step > 3) return null;

    return step;
  } catch (error) {
    console.error('Error getting current step:', error);
    return null;
  }
};
