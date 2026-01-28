'use client';

import { Star } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

import * as styles from './styles.css';

import {
  getPlanColorsById,
  getPlanNameById,
  PLAN_IDS,
} from '@/constants/plans';
import { API_ENDPOINTS } from '@/constants/api';
import { fetchApi } from '@/lib/api-client';
import type { PlanApiData } from '@/types/subscription';

// Helper function to safely parse prices
const parsePrice = (value: string | undefined | null): number => {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

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
  const isFree = planId === PLAN_IDS.FREE;
  const [planData, setPlanData] = useState<PlanApiData | null>(null);

  const fetchPlanData = useCallback(async () => {
    if (isFree) return;
    try {
      const result = await fetchApi<{ plans: PlanApiData[] }>(
        API_ENDPOINTS.SUBSCRIPTION.PLANS_AND_ADDONS,
        { method: 'GET' },
      );
      const plan = result.plans?.find((p) => p.id === planId);
      if (plan) setPlanData(plan);
    } catch (error) {
      console.error('Failed to load plan data:', error);
    }
  }, [planId, isFree]);

  useEffect(() => {
    fetchPlanData();
  }, [fetchPlanData]);

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
      {!isFree && billingCycle && planData ? (
        <>
          {billingCycle === 'yearly' ? (
            <div className={styles.planBadgePriceContainer}>
              <span className={styles.planBadgePriceStrike}>
                ${parsePrice(planData.yearly_price_per_staff).toFixed(0)}/year
              </span>
              <span className={styles.planBadgePrice}>
                ${parsePrice(planData.discounted_yearly_price_per_staff).toFixed(0)}/year
              </span>
            </div>
          ) : (
            <div className={styles.planBadgePriceSingle}>
              ${parsePrice(planData.monthly_price_per_staff).toFixed(0)}/month
            </div>
          )}
        </>
      ) : isFree ? (
        <div className={styles.planBadgeSubtext}>Free Trial</div>
      ) : null}
    </div>
  );
}
