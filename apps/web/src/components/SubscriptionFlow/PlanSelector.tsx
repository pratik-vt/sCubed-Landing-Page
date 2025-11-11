'use client';

import { X, Check, Star } from 'lucide-react';
import { useState } from 'react';

import * as styles from './styles.css';

import { PLAN_IDS, PLAN_NAMES, PLAN_COLORS, PLAN_PRICING } from '@/constants/plans';
import { BILLING_CYCLES, type BillingCycle } from '@/constants/billing';

interface PlanSelectorProps {
  currentPlanId: number;
  currentBillingCycle: BillingCycle;
  onSelectPlan: (planId: number, billingCycle: BillingCycle) => void;
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
    useState<BillingCycle>(currentBillingCycle);

  const freePlan = { id: PLAN_IDS.FREE, name: PLAN_NAMES[PLAN_IDS.FREE] };
  const paidPlans = [
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
                selectedBillingCycle === BILLING_CYCLES.MONTHLY
                  ? styles.billingToggleButtonActive
                  : ''
              }`}
              onClick={() => setSelectedBillingCycle(BILLING_CYCLES.MONTHLY)}
            >
              Monthly
            </button>
            <button
              className={`${styles.billingToggleButton} ${
                selectedBillingCycle === BILLING_CYCLES.YEARLY
                  ? styles.billingToggleButtonActive
                  : ''
              }`}
              onClick={() => setSelectedBillingCycle(BILLING_CYCLES.YEARLY)}
            >
              Yearly
            </button>
          </div>

          {/* Free Plan - Separate Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Free Option
            </h3>
            <div
              className={`${styles.planOptionCard} ${
                selectedPlanId === freePlan.id ? styles.planOptionCardSelected : ''
              }`}
              style={{
                borderColor: selectedPlanId === freePlan.id ? PLAN_COLORS[freePlan.id].border : '#e5e7eb',
                backgroundColor: selectedPlanId === freePlan.id ? PLAN_COLORS[freePlan.id].bg : '#ffffff',
              }}
              onClick={() => setSelectedPlanId(freePlan.id)}
            >
              <div className={styles.planOptionCheckbox}>
                {selectedPlanId === freePlan.id && (
                  <Check size={16} style={{ color: PLAN_COLORS[freePlan.id].text }} />
                )}
              </div>
              <div className={styles.planOptionContent}>
                <div className={styles.planOptionHeader}>
                  <span
                    className={styles.planOptionName}
                    style={{ color: PLAN_COLORS[freePlan.id].text }}
                  >
                    {freePlan.name}
                  </span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: PLAN_COLORS[freePlan.id].text, marginTop: '0.5rem' }}>
                  $0
                </div>
                <div
                  className={styles.planOptionBadge}
                  style={{
                    color: PLAN_COLORS[freePlan.id].text,
                    borderColor: PLAN_COLORS[freePlan.id].border,
                    backgroundColor: selectedPlanId === freePlan.id ? '#ffffff' : PLAN_COLORS[freePlan.id].bg,
                  }}
                >
                  Free
                </div>
              </div>
            </div>
          </div>

          {/* Paid Plans - Grid Section */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Paid Plans
            </h3>
            <div className={styles.planOptionsGrid}>
              {paidPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const colors = PLAN_COLORS[plan.id as keyof typeof PLAN_COLORS];

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
                    <div className={styles.planOptionCheckbox}>
                      {isSelected && (
                        <Check size={16} style={{ color: colors.text }} />
                      )}
                    </div>
                    <div className={styles.planOptionContent}>
                      <div className={styles.planOptionHeader}>
                        <Star size={16} style={{ color: colors.text }} />
                        <span
                          className={styles.planOptionName}
                          style={{ color: colors.text }}
                        >
                          {plan.name}
                        </span>
                      </div>
                      <div style={{ marginTop: '0.75rem' }}>
                        {selectedBillingCycle === BILLING_CYCLES.YEARLY ? (
                          <>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'line-through' }}>
                              ${PLAN_PRICING[plan.id as keyof typeof PLAN_PRICING].monthly * 12}/year
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.text, marginTop: '0.25rem' }}>
                              ${PLAN_PRICING[plan.id as keyof typeof PLAN_PRICING].yearly}/year
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.text }}>
                            ${PLAN_PRICING[plan.id as keyof typeof PLAN_PRICING].monthly}/month
                          </div>
                        )}
                      </div>
                      <div
                        className={styles.planOptionBadge}
                        style={{
                          color: colors.text,
                          borderColor: colors.border,
                          backgroundColor: !isSelected ? colors.bg : '#ffffff',
                        }}
                      >
                        {selectedBillingCycle === BILLING_CYCLES.YEARLY ? 'Annual' : 'Monthly'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
