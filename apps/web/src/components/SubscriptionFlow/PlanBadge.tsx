'use client';

import { Star } from 'lucide-react';

import * as styles from './styles.css';

import {
  getPlanColorsById,
  getPlanNameById,
  getPlanPricingById,
  PLAN_IDS,
} from '@/constants/plans';

interface PlanBadgeProps {
  readonly planId: number;
  readonly billingCycle?: 'monthly' | 'yearly';
}

/**
 * PlanBadge - Displays the selected subscription plan
 * Shows at the top of the subscription flow for context
 */
export default function PlanBadge({ planId, billingCycle }: PlanBadgeProps) {
  const planName = getPlanNameById(planId);
  const colors = getPlanColorsById(planId);
  const pricing = getPlanPricingById(planId);
  const isFree = planId === PLAN_IDS.FREE;

  return (
    <div
      className={styles.planBadgeContainer}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      }}
    >
      <div className={styles.planBadgeContent}>
        {!isFree && <Star size={16} className={styles.planBadgeIcon} />}
        <span className={styles.planBadgeName}>{planName}</span>
        {!isFree && billingCycle && (
          <span className={styles.planBadgeCycle}>
            ({billingCycle === 'yearly' ? 'Annual' : 'Monthly'})
          </span>
        )}
      </div>
      {!isFree && billingCycle ? (
        <>
          {billingCycle === 'yearly' ? (
            <div className={styles.planBadgePriceContainer}>
              <span className={styles.planBadgePriceStrike}>
                ${pricing.monthly * 12}/year
              </span>
              <span className={styles.planBadgePrice}>
                ${pricing.yearly}/year
              </span>
            </div>
          ) : (
            <div className={styles.planBadgePriceSingle}>
              ${pricing.monthly}/month
            </div>
          )}
        </>
      ) : isFree ? (
        <div className={styles.planBadgeSubtext}>Free Trial</div>
      ) : null}
    </div>
  );
}
