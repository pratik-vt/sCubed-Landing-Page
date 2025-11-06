'use client';

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as styles from './styles.css';

import { SUCCESS_MESSAGES } from '@/constants/messages';
import { fetchApi } from '@/lib/api-client';
import { showSuccessToast } from '@/lib/errors';
import { isApiError } from '@/types/api';
import type { Step3PaidProps } from '@/types/subscription';

interface CartFormData {
  staff_count: number;
  billing_cycle: 'monthly' | 'yearly';
  addons: number[];
}

interface PlanData {
  id: number;
  name: string;
  slug: string;
  plan_type: string;
  monthly_price_per_staff: string;
  yearly_price_per_staff: string;
  trial_days: number;
  max_staff: number;
  display_order: number;
  stripe_monthly_price_id: string | null;
  stripe_yearly_price_id: string | null;
}

interface AddonData {
  id: number;
  feature_key: string;
  feature_name: string;
  description: string;
  feature_type: string;
  monthly_price: string;
  yearly_price: string;
  stripe_monthly_price_id: string | null;
  stripe_yearly_price_id: string | null;
  display_order: number;
}

/**
 * Step 3 (Paid Plan): Cart/Checkout (Now Step 4 in new flow)
 * Allows staff count adjustment, billing cycle selection, and add-on selection
 * Calls /register API on submission and returns payment URL
 */
export default function Step3PaidCart({
  formData,
  onNext,
  onBack,
  clinic_onboarding_request_id,
}: Step3PaidProps) {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [addons, setAddons] = useState<AddonData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<CartFormData>({
    defaultValues: {
      staff_count: formData.staff_count || 1,
      billing_cycle: 'monthly',
      addons: [],
    },
  });

  const billingCycle = watch('billing_cycle');
  const staffCount = watch('staff_count');

  useEffect(() => {
    fetchPlansAndAddons();
  }, []);

  const fetchPlansAndAddons = async () => {
    setLoadingData(true);
    try {
      const result = await fetchApi<{ plans: PlanData[]; addons: AddonData[] }>(
        'subscriptions/onboarding/plans-and-addons',
        {
          method: 'GET',
        },
      );

      setPlans(result.plans || []);
      setAddons(result.addons || []);
    } catch (error) {
      console.error('Failed to load plans and add-ons:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const toggleAddon = (addonId: number) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  const incrementStaff = () => {
    const currentPlan = getCurrentPlan();
    if (currentPlan && Number(staffCount) < currentPlan.max_staff) {
      setValue('staff_count', Number(staffCount) + 1);
    }
  };

  const decrementStaff = () => {
    if (Number(staffCount) > 1) {
      setValue('staff_count', Number(staffCount) - 1);
    }
  };

  const calculateNextChargeDate = (cycle: 'monthly' | 'yearly'): string => {
    const now = new Date();
    const nextDate = new Date(now);

    if (cycle === 'yearly') {
      nextDate.setFullYear(now.getFullYear() + 1);
    } else {
      nextDate.setMonth(now.getMonth() + 1);
    }

    return nextDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getItemCount = (): number => {
    return 1 + selectedAddons.length; // 1 for plan + number of addons
  };

  // Get current plan data
  const getCurrentPlan = (): PlanData | null => {
    if (!formData.subscription_plan_id || plans.length === 0) return null;
    return plans.find((p) => p.id === formData.subscription_plan_id) || null;
  };

  const calculateTotal = () => {
    const currentPlan = getCurrentPlan();
    if (!currentPlan) return 0;

    // Base plan price per staff * staff count
    const pricePerStaff =
      billingCycle === 'monthly'
        ? Number.parseFloat(currentPlan.monthly_price_per_staff)
        : Number.parseFloat(currentPlan.yearly_price_per_staff);

    const basePrice = pricePerStaff * Number(staffCount);

    // Calculate add-ons total
    const addonsTotal = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        const addonPrice =
          billingCycle === 'monthly'
            ? Number.parseFloat(addon.monthly_price)
            : Number.parseFloat(addon.yearly_price);
        return total + addonPrice;
      }
      return total;
    }, 0);

    return basePrice + addonsTotal;
  };

  const onSubmit = async (data: CartFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      // Extract city_id and state_id from formData objects
      const cityId = formData.city?.id;
      const stateId = formData.state?.id;

      if (!cityId || !stateId) {
        setApiError(
          'Missing city or state information. Please go back and complete the form.',
        );
        setIsSubmitting(false);
        return;
      }

      // Construct URLs for Stripe redirect
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const success_url = `${baseUrl}/subscribe/success`;
      const cancel_url = `${baseUrl}/subscribe`;

      // Combine clinic details from previous step with cart data
      const registrationPayload = {
        // Clinic details
        clinic_name: formData.clinic_name,
        tax_id: formData.tax_id,
        npi: formData.npi || undefined,
        street_address_line_1: formData.street_address_line_1,
        street_address_line_2: formData.street_address_line_2 || undefined,
        city_id: cityId,
        state_id: stateId,
        zip_code: formData.zip_code,
        timezone_id: formData.timezone_id,
        // Admin details
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        // Subscription details
        subscription_plan_id: formData.subscription_plan_id,
        staff_count: Number(data.staff_count),
        billing_cycle: data.billing_cycle,
        addons: selectedAddons,
        // Onboarding request ID
        clinic_onboarding_request_id,
        // Stripe redirect URLs
        success_url,
        cancel_url,
      };

      // Call /register API
      const result = await fetchApi<{
        payment_url: string;
        payment_required: boolean;
      }>('subscriptions/onboarding/register', {
        method: 'POST',
        body: registrationPayload,
      });

      // Success! Show toast
      showSuccessToast(
        SUCCESS_MESSAGES.REGISTRATION_SUCCESS ||
          'Registration successful! Redirecting to payment...',
      );

      // Pass data including payment URL to next step
      onNext({
        staff_count: Number(data.staff_count),
        addons: selectedAddons,
        billing_cycle: data.billing_cycle,
        payment_url: result.payment_url,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      if (isApiError(error)) {
        setApiError(
          error.message || 'Failed to complete registration. Please try again.',
        );
      } else {
        setApiError(
          'Network error. Please check your connection and try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();
  const currentPlan = getCurrentPlan();

  // Calculate savings percentage for yearly billing
  const getSavingsPercentage = (): string => {
    if (!currentPlan) return '';
    const monthlyTotal =
      Number.parseFloat(currentPlan.monthly_price_per_staff) * 12;
    const yearlyTotal = Number.parseFloat(currentPlan.yearly_price_per_staff);
    if (monthlyTotal > 0 && yearlyTotal > 0) {
      const savings = ((monthlyTotal - yearlyTotal) / monthlyTotal) * 100;
      return `Save ${Math.round(savings)}%`;
    }
    return '';
  };

  // Get selected and recommended addons
  const selectedAddonsList = addons.filter((addon) =>
    selectedAddons.includes(addon.id),
  );
  const recommendedAddonsList = addons.filter(
    (addon) => !selectedAddons.includes(addon.id),
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.cartHeader}>
        <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
          Customize Your Plan
        </h1>
        <p
          className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.1s' }}
        >
          Select your billing cycle and add-ons to complete your subscription
        </p>
      </div>

      {apiError && (
        <div className={`${styles.alertContainer} ${styles.alertError}`}>
          <AlertCircle size={20} />
          <span>{apiError}</span>
        </div>
      )}

      {loadingData && (
        <div className={styles.loadingMessage}>Loading plan details...</div>
      )}

      {!loadingData && !currentPlan && (
        <div className={`${styles.alertContainer} ${styles.alertError}`}>
          <AlertCircle size={20} />
          <span>Unable to load plan details. Please try again.</span>
        </div>
      )}

      {!loadingData && currentPlan && (
        <div className={styles.cartGrid}>
          {/* Left Column: Plan Details */}
          <div className={styles.planDetailsColumn}>
            {/* Plan Card */}
            <div className={styles.planCard} style={{ animationDelay: '0.2s' }}>
              <span className={styles.sectionBadge}>PLAN</span>
              <div className={styles.planHeader}>
                <h2 className={styles.planName}>
                  {currentPlan.name} -{' '}
                  {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
                </h2>
              </div>

              <div className={styles.planPriceRow}>
                <span>
                  $
                  {billingCycle === 'monthly'
                    ? currentPlan.monthly_price_per_staff
                    : currentPlan.yearly_price_per_staff}
                </span>
                <span className={styles.priceEquals}>×</span>
                <div className={styles.counterControls}>
                  <button
                    type="button"
                    onClick={decrementStaff}
                    disabled={Number(staffCount) <= 1}
                    className={styles.counterButton}
                    aria-label="Decrease staff count"
                  >
                    <Minus size={20} />
                  </button>
                  <span className={styles.counterValue}>{staffCount}</span>
                  <button
                    type="button"
                    onClick={incrementStaff}
                    disabled={Number(staffCount) >= currentPlan.max_staff}
                    className={styles.counterButton}
                    aria-label="Increase staff count"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <span className={styles.priceEquals}>=</span>
                <span className={styles.totalPrice}>
                  $
                  {(
                    (billingCycle === 'monthly'
                      ? Number.parseFloat(currentPlan.monthly_price_per_staff)
                      : Number.parseFloat(currentPlan.yearly_price_per_staff)) *
                    Number(staffCount)
                  ).toFixed(0)}
                </span>
              </div>
              <div className={styles.staffLabel}>Staff Member</div>
            </div>

            {/* Billing Cycle Selection */}
            <Controller
              name="billing_cycle"
              control={control}
              render={({ field }) => (
                <div
                  className={`${styles.billingCycleGrid} ${styles.fadeInUpAnimation}`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <label
                    className={`${styles.billingCycleOption} ${
                      field.value === 'monthly'
                        ? styles.billingCycleOptionSelected
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      value="monthly"
                      checked={field.value === 'monthly'}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={styles.billingCycleRadio}
                    />
                    <div className={styles.billingCycleContent}>
                      <span className={styles.billingCycleTitle}>Monthly</span>
                      <span className={styles.billingCyclePrice}>
                        ${currentPlan.monthly_price_per_staff}/month per staff
                      </span>
                    </div>
                  </label>

                  <label
                    className={`${styles.billingCycleOption} ${
                      field.value === 'yearly'
                        ? styles.billingCycleOptionSelected
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      value="yearly"
                      checked={field.value === 'yearly'}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={styles.billingCycleRadio}
                    />
                    <div className={styles.billingCycleContent}>
                      <span className={styles.billingCycleTitle}>Yearly</span>
                      <span className={styles.billingCyclePrice}>
                        ${currentPlan.yearly_price_per_staff}/year per staff
                      </span>
                      {getSavingsPercentage() && (
                        <span className={styles.billingCycleSavings}>
                          {getSavingsPercentage()}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              )}
            />

            {/* Selected Addons */}
            {selectedAddonsList.length > 0 && (
              <>
                <h3
                  className={styles.sectionHeader}
                  style={{ animationDelay: '0.4s' }}
                >
                  Selected Add-ons
                </h3>
                <div className={styles.addonsGrid}>
                  {selectedAddonsList.map((addon, index) => {
                    const price =
                      billingCycle === 'monthly'
                        ? Number.parseFloat(addon.monthly_price)
                        : Number.parseFloat(addon.yearly_price);
                    const total =
                      billingCycle === 'monthly' ? price * 12 : price;

                    return (
                      <div
                        key={addon.id}
                        className={styles.addonItemCard}
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <span className={styles.sectionBadge}>ADDON</span>
                        <div className={styles.addonItemHeader}>
                          <h4 className={styles.addonItemTitle}>
                            {addon.feature_name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => toggleAddon(addon.id)}
                            className={styles.removeAddonButton}
                            aria-label={`Remove ${addon.feature_name}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className={styles.addonItemPrice}>
                          ${price.toFixed(0)} ×{' '}
                          {billingCycle === 'monthly' ? '12 mo' : '12 mo'} = $
                          {total.toFixed(0)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Recommended Addons */}
            {recommendedAddonsList.length > 0 && (
              <>
                <h3
                  className={styles.sectionHeader}
                  style={{ animationDelay: '0.6s' }}
                >
                  Recommended Addons
                </h3>
                <div className={styles.recommendedAddonsGrid}>
                  {recommendedAddonsList.map((addon, index) => {
                    const price =
                      billingCycle === 'monthly'
                        ? Number.parseFloat(addon.monthly_price)
                        : Number.parseFloat(addon.yearly_price);

                    return (
                      <div
                        key={addon.id}
                        className={styles.recommendedAddonCard}
                        style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                      >
                        <div className={styles.recommendedAddonHeader}>
                          <h4 className={styles.recommendedAddonTitle}>
                            {addon.feature_name}
                          </h4>
                          <div className={styles.recommendedAddonPrice}>
                            ${price.toFixed(0)} ×{' '}
                            {billingCycle === 'monthly' ? '12 mo' : '12 mo'} = $
                            {(billingCycle === 'monthly'
                              ? price * 12
                              : price
                            ).toFixed(0)}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={styles.addToSubscriptionButton}
                        >
                          Add
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Footer Links */}
            <div className={styles.footerLinks}>
              <button
                type="button"
                onClick={onBack}
                className={styles.footerLink}
              >
                Change Subscription
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={onBack}
                className={styles.footerLinkDisabled}
              >
                Cancel Subscription
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className={styles.orderSummaryColumn}>
            <div
              className={styles.orderSummaryCard}
              style={{ animationDelay: '0.4s' }}
            >
              <h2 className={styles.orderSummaryHeader}>Order Summary</h2>

              {/* Plan Line Item */}
              <div className={styles.summaryLineItem}>
                <div className={styles.summaryLineItemContent}>
                  <div className={styles.summaryLineItemTitle}>
                    {currentPlan.name} -{' '}
                    {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
                  </div>
                  <div className={styles.summarySubtext}>
                    $
                    {billingCycle === 'monthly'
                      ? currentPlan.monthly_price_per_staff
                      : currentPlan.yearly_price_per_staff}{' '}
                    × {staffCount}/
                    {billingCycle === 'monthly' ? 'month' : 'year'}
                  </div>
                </div>
                <div className={styles.summaryLineItemPrice}>
                  $
                  {(
                    (billingCycle === 'monthly'
                      ? Number.parseFloat(currentPlan.monthly_price_per_staff)
                      : Number.parseFloat(currentPlan.yearly_price_per_staff)) *
                    Number(staffCount)
                  ).toFixed(0)}
                </div>
              </div>

              {/* Addon Line Items */}
              {selectedAddonsList.map((addon) => {
                const price =
                  billingCycle === 'monthly'
                    ? Number.parseFloat(addon.monthly_price)
                    : Number.parseFloat(addon.yearly_price);
                const total = billingCycle === 'monthly' ? price * 12 : price;

                return (
                  <div key={addon.id} className={styles.summaryLineItem}>
                    <div className={styles.summaryLineItemContent}>
                      <div className={styles.summaryLineItemTitle}>
                        {addon.feature_name} -{' '}
                        {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
                      </div>
                      <div className={styles.summarySubtext}>
                        ${price.toFixed(0)} × 12 months
                      </div>
                    </div>
                    <div className={styles.summaryLineItemPrice}>
                      ${total.toFixed(0)}
                    </div>
                  </div>
                );
              })}

              <div className={styles.summaryDivider} />

              {/* Total */}
              <div className={styles.summaryTotalRow}>
                <span>Total ({getItemCount()} items)</span>
                <span>${total.toFixed(0)}</span>
              </div>

              {/* Next Charge Date */}
              <div className={styles.nextChargeText}>
                Next Charge on {calculateNextChargeDate(billingCycle)}
                <div className={styles.nextChargeNote}>
                  (Amount subject to change based on the selected plan)
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                className={styles.proceedButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.loadingSpinner} />
                    Processing...
                  </>
                ) : (
                  'PROCEED TO CHECKOUT'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      {!loadingData && currentPlan && (
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={onBack}
            className={`${styles.button} ${styles.buttonSecondary}`}
            disabled={isSubmitting}
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.loadingSpinner} />
                Processing...
              </>
            ) : (
              <>
                Proceed to Checkout
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      )}
    </form>
  );
}
