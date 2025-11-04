import { Check } from 'lucide-react';

import * as styles from './styles.css';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isPaidPlan: boolean;
}

/**
 * StepIndicator - Visual progress indicator for multi-step form
 */
export default function StepIndicator({ currentStep, totalSteps, isPaidPlan }: StepIndicatorProps) {
  const getStepLabel = (step: number): string => {
    if (!isPaidPlan) {
      // Free plan: 4 steps (Email → OTP → Details → Success)
      switch (step) {
        case 1:
          return 'Email';
        case 2:
          return 'Verify';
        case 3:
          return 'Details';
        case 4:
          return 'Complete';
        default:
          return '';
      }
    } else {
      // Paid plan: 5 steps (Email → OTP → Details → Cart → Payment)
      switch (step) {
        case 1:
          return 'Email';
        case 2:
          return 'Verify';
        case 3:
          return 'Details';
        case 4:
          return 'Checkout';
        case 5:
          return 'Payment';
        default:
          return '';
      }
    }
  };

  return (
    <div className={styles.stepIndicatorWrapper}>
      <div className={styles.stepIndicatorContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep + 1;
          const isCurrent = stepNumber === currentStep + 1;

          return (
            <div key={stepNumber} className={styles.stepItem}>
              {/* Step Circle */}
              <div
                className={`${styles.stepCircle} ${
                  isCompleted
                    ? styles.stepCircleCompleted
                    : isCurrent
                      ? styles.stepCircleCurrent
                      : styles.stepCircleInactive
                }`}
              >
                {isCompleted ? (
                  <Check className={styles.stepCheckIcon} />
                ) : (
                  <span className={styles.stepNumber}>{stepNumber}</span>
                )}
              </div>

              {/* Step Label */}
              <div
                className={`${styles.stepLabel} ${
                  isCurrent ? styles.stepLabelCurrent : styles.stepLabelInactive
                }`}
              >
                {getStepLabel(stepNumber)}
              </div>

              {/* Connector Line (not for last step) */}
              {stepNumber < totalSteps && (
                <div
                  className={`${styles.stepConnector} ${
                    isCompleted ? styles.stepConnectorCompleted : styles.stepConnectorInactive
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
