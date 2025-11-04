'use client';

import { X, Check, Star } from 'lucide-react';
import { useState } from 'react';

import * as styles from './styles.css';

import { PLAN_IDS, PLAN_NAMES, PLAN_COLORS } from '@/constants/plans';

interface PlanSelectorProps {
  currentPlanId: number;
  currentBillingCycle: 'monthly' | 'yearly';
  onSelectPlan: (planId: number, billingCycle: 'monthly' | 'yearly') => void;
  onClose: () => void;
}

/**
 * PlanSelector - Modal for changing subscription plan
 * Allows users to select a different plan without leaving the current screen
 */
export default function PlanSelector({
  currentPlanId,
  currentBillingCycle,
  onSelectPlan,
  onClose,
}: PlanSelectorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(currentPlanId);
  const [selectedBillingCycle, setSelectedBillingCycle] =
    useState<'monthly' | 'yearly'>(currentBillingCycle);

  const plans = [
    { id: PLAN_IDS.FREE, name: PLAN_NAMES[PLAN_IDS.FREE] },
    { id: PLAN_IDS.STARTER, name: PLAN_NAMES[PLAN_IDS.STARTER] },
    { id: PLAN_IDS.ESSENTIAL, name: PLAN_NAMES[PLAN_IDS.ESSENTIAL] },
    { id: PLAN_IDS.GROWTH, name: PLAN_NAMES[PLAN_IDS.GROWTH] },
  ];

  const handleConfirm = () => {
    onSelectPlan(selectedPlanId, selectedBillingCycle);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className={styles.modalBackdrop} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Change Your Plan</h2>
          <button
            onClick={onClose}
            className={styles.modalCloseButton}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Billing Cycle Toggle */}
          <div className={styles.billingToggleContainer}>
            <button
              className={`${styles.billingToggleButton} ${
                selectedBillingCycle === 'monthly'
                  ? styles.billingToggleButtonActive
                  : ''
              }`}
              onClick={() => setSelectedBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`${styles.billingToggleButton} ${
                selectedBillingCycle === 'yearly'
                  ? styles.billingToggleButtonActive
                  : ''
              }`}
              onClick={() => setSelectedBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>

          {/* Plan Options */}
          <div className={styles.planOptionsGrid}>
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const colors = PLAN_COLORS[plan.id as keyof typeof PLAN_COLORS];
              const isFree = plan.id === PLAN_IDS.FREE;

              return (
                <div
                  key={plan.id}
                  className={`${styles.planOptionCard} ${
                    isSelected ? styles.planOptionCardSelected : ''
                  }`}
                  style={{
                    borderColor: isSelected ? colors.border : '#e5e7eb',
                    backgroundColor: isSelected ? colors.bg : '#ffffff',
                  }}
                  onClick={() => setSelectedPlanId(plan.id)}
                >
                  {/* Selection Indicator */}
                  <div className={styles.planOptionCheckbox}>
                    {isSelected && (
                      <Check size={16} style={{ color: colors.text }} />
                    )}
                  </div>

                  {/* Plan Content */}
                  <div className={styles.planOptionContent}>
                    <div className={styles.planOptionHeader}>
                      {!isFree && (
                        <Star size={16} style={{ color: colors.text }} />
                      )}
                      <span
                        className={styles.planOptionName}
                        style={{ color: colors.text }}
                      >
                        {plan.name}
                      </span>
                    </div>

                    <div
                      className={styles.planOptionBadge}
                      style={{
                        color: colors.text,
                        borderColor: colors.border,
                        backgroundColor: !isSelected ? colors.bg : '#ffffff',
                      }}
                    >
                      {isFree
                        ? 'Free'
                        : selectedBillingCycle === 'yearly'
                          ? 'Annual'
                          : 'Monthly'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={selectedPlanId === currentPlanId && selectedBillingCycle === currentBillingCycle}
          >
            Update Plan
          </button>
        </div>
      </div>
    </>
  );
}
