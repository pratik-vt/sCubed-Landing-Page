import { Check } from 'lucide-react';

import * as styles from './styles.css';

import { getStepLabel } from '@/constants/steps';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  isPaidPlan: boolean;
}

/**
 * StepIndicator - Visual progress indicator for multi-step form
 */
export default function StepIndicator({ currentStep, totalSteps, isPaidPlan }: StepIndicatorProps) {

  return (
    <div className={styles.stepIndicatorWrapper}>
      <div className={styles.stepIndicatorContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          // Mark step as completed if it's before current step
          // OR if it's the final step and we're on the final step (success page)
          const isCompleted =
            stepNumber < currentStep + 1 ||
            (stepNumber === totalSteps && currentStep + 1 === totalSteps);
          const isCurrent = stepNumber === currentStep + 1 && stepNumber !== totalSteps;

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
                {getStepLabel(stepNumber - 1, isPaidPlan)}
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
