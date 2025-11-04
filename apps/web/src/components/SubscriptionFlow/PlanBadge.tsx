'use client';

import { Star } from 'lucide-react';

import * as styles from './styles.css';

import { getPlanColorsById, getPlanNameById } from '@/constants/plans';

interface PlanBadgeProps {
  planId: number;
  billingCycle?: 'monthly' | 'yearly';
}

/**
 * PlanBadge - Displays the selected subscription plan
 * Shows at the top of the subscription flow for context
 */
export default function PlanBadge({ planId, billingCycle }: PlanBadgeProps) {
  const planName = getPlanNameById(planId);
  const colors = getPlanColorsById(planId);
  const isFree = planId === 1;

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
      {!isFree && (
        <div className={styles.planBadgeSubtext}>Selected Plan</div>
      )}
    </div>
  );
}
