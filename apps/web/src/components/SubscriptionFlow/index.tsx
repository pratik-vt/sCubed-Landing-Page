'use client';

import { Pencil } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import PlanBadge from './PlanBadge';
import PlanSelector from './PlanSelector';
import Step0EmailInput from './Step0EmailInput';
import Step1ClinicDetails from './Step1ClinicDetails';
import Step2OTPVerification from './Step2OTPVerification';
import Step3FreeSuccess from './Step3FreeSuccess';
import Step3PaidCart from './Step3PaidCart';
import Step4PaymentProcessing from './Step4PaymentProcessing';
import StepIndicator from './StepIndicator';
import * as styles from './styles.css';

import { getPlanIdByName } from '@/constants/plans';
import {
  clearSession,
  loadSession,
  saveSession,
} from '@/lib/subscriptionSessionManager';
import type {
  OTPVerificationResponse,
  RegistrationResponseData,
  Step1FormData,
  SubscriptionFormState,
} from '@/types/subscription';

/**
 * SubscriptionFlow - Main orchestrator for multi-step subscription form
 *
 * Handles two different flows:
 * - Free Plan: Step 0 (Email) → Step 1 (OTP) → Step 2 (Details+Register) → Step 3 (Success)
 * - Paid Plan: Step 0 (Email) → Step 1 (OTP) → Step 2 (Details) → Step 3 (Cart+Register) → Step 4 (Payment)
 */
export default function SubscriptionFlow() {
  const searchParams = useSearchParams();
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  // Initialize state from URL params (plan selection from pricing page)
  const [formState, setFormState] = useState<SubscriptionFormState>({
    currentStep: 0,
    step1Data: {},
    otpVerified: false,
    selectedPlan: null,
    selectedAddons: [],
    billingCycle: 'monthly',
    isSubmitting: false,
    submitError: null,
    paymentUrl: null,
    paymentRequired: false,
  });

  // State for plan selector modal
  const [showPlanSelector, setShowPlanSelector] = useState(false);

  // Load plan selection from URL params and restore session with validation
  useEffect(() => {
    const planParam = searchParams.get('plan');
    const billingParam = searchParams.get('billing');

    if (planParam) {
      // Fresh start with plan from URL params (from pricing page)
      const planId = getPlanIdByName(planParam);
      const billing = (billingParam as 'monthly' | 'yearly') || 'monthly';

      setFormState((prev) => ({
        ...prev,
        step1Data: {
          ...prev.step1Data,
          subscription_plan_id: planId,
        },
        billingCycle: billing,
      }));

      // Clear any old session data when starting fresh
      clearSession();
      setIsRestoringSession(false);
    } else {
      // Try to restore session from sessionStorage with validation
      const restoredState = loadSession();

      if (restoredState) {
        // Session is valid, restore the state
        console.log('Session restored successfully');
        setFormState((prev) => ({ ...prev, ...restoredState }));
      } else {
        // Session invalid or expired, start fresh
        console.log('No valid session found, starting fresh');
      }

      setIsRestoringSession(false);
    }
  }, [searchParams]);

  // Persist form state to session storage with metadata
  useEffect(() => {
    if (!isRestoringSession) {
      saveSession(formState);
    }
  }, [formState, isRestoringSession]);

  // Step 0: Handle email submission
  const handleStep0Complete = (
    clinic_onboarding_request_id: number,
    email: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      clinic_onboarding_request_id,
      step1Data: {
        ...prev.step1Data,
        email,
      },
      currentStep: 1,
    }));
  };

  // Step 1: Handle OTP verification (was Step 2)
  const handleOTPVerified = (responseData: OTPVerificationResponse) => {
    setFormState((prev) => ({
      ...prev,
      otpVerified: true,
      currentStep: 2,
    }));
  };

  // Step 2: Handle clinic details submission (was Step 1)
  const handleStep2Complete = (
    data: Step1FormData,
    apiResponse?: RegistrationResponseData,
  ) => {
    setFormState((prev) => ({
      ...prev,
      step1Data: data,
      currentStep: 3,
    }));
  };

  // Step 1: Handle back navigation (back to email)
  const handleBackToStep0 = () => {
    setFormState((prev) => ({
      ...prev,
      currentStep: 0,
    }));
  };

  // Step 2: Handle back navigation (back to OTP)
  const handleBackToStep1 = () => {
    setFormState((prev) => ({
      ...prev,
      currentStep: 1,
    }));
  };

  // Step 3 (Paid): Handle cart/checkout submission with payment URL
  const handlePaidCartComplete = (data: {
    staff_count: number;
    addons: number[];
    billing_cycle: 'monthly' | 'yearly';
    payment_url?: string;
  }) => {
    setFormState((prev) => ({
      ...prev,
      step1Data: {
        ...prev.step1Data,
        staff_count: data.staff_count,
      },
      selectedAddons: data.addons,
      billingCycle: data.billing_cycle,
      paymentUrl: data.payment_url || null,
      currentStep: 4,
    }));
  };

  // Step 3: Handle back to clinic details
  const handleBackToStep2 = () => {
    setFormState((prev) => ({
      ...prev,
      currentStep: 2,
    }));
  };

  // Step 4: Handle back to cart/plan details
  const handleBackToStep3 = () => {
    setFormState((prev) => ({
      ...prev,
      currentStep: 3,
    }));
  };

  // Handle plan change from modal
  const handlePlanChange = (planId: number, billingCycle: 'monthly' | 'yearly') => {
    setFormState((prev) => ({
      ...prev,
      step1Data: {
        ...prev.step1Data,
        subscription_plan_id: planId,
      },
      billingCycle,
    }));
    setShowPlanSelector(false);
  };

  // Determine if current plan is free or paid
  const isPaidPlan = Boolean(
    formState.selectedPlan?.type === 'paid' ||
      (formState.step1Data.subscription_plan_id &&
        formState.step1Data.subscription_plan_id > 1),
  );

  // Calculate total steps based on plan type
  // Free: 0 (Email) → 1 (OTP) → 2 (Details) → 3 (Success) = 4 steps
  // Paid: 0 (Email) → 1 (OTP) → 2 (Details) → 3 (Cart) → 4 (Payment) = 5 steps
  const totalSteps = isPaidPlan ? 5 : 4;

  // Show loading state while restoring session
  if (isRestoringSession) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.stepContent}>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Plan Badge - Shows selected plan with edit option */}
        {formState.step1Data.subscription_plan_id && (
          <div className={styles.planBadgeWrapper}>
            <PlanBadge
              planId={formState.step1Data.subscription_plan_id}
              billingCycle={formState.billingCycle}
            />
            <button
              onClick={() => setShowPlanSelector(true)}
              className={styles.editPlanButton}
              type="button"
              aria-label="Change plan"
              title="Change plan"
            >
              <Pencil size={18} />
            </button>
          </div>
        )}

        {/* Step Indicator */}
        <StepIndicator
          currentStep={formState.currentStep}
          totalSteps={totalSteps}
          isPaidPlan={isPaidPlan}
        />

        {/* Step Content */}
        <div className={styles.stepContent}>
          {/* Step 0: Email Input */}
          {formState.currentStep === 0 && (
            <Step0EmailInput
              onNext={handleStep0Complete}
              initialEmail={formState.step1Data.email}
            />
          )}

          {/* Step 1: OTP Verification */}
          {formState.currentStep === 1 &&
            formState.step1Data.email &&
            formState.clinic_onboarding_request_id && (
              <Step2OTPVerification
                email={formState.step1Data.email}
                clinic_onboarding_request_id={
                  formState.clinic_onboarding_request_id
                }
                onVerified={handleOTPVerified}
                onBack={handleBackToStep0}
              />
            )}

          {/* Step 2: Clinic Details */}
          {formState.currentStep === 2 && (
            <Step1ClinicDetails
              onNext={handleStep2Complete}
              onBack={handleBackToStep1}
              initialData={formState.step1Data}
              selectedPlan={formState.selectedPlan}
              billingCycle={formState.billingCycle}
              clinic_onboarding_request_id={formState.clinic_onboarding_request_id}
            />
          )}

          {/* Step 3: Free Plan Success */}
          {formState.currentStep === 3 && !isPaidPlan && (
            <Step3FreeSuccess
              formData={{
                ...formState.step1Data,
                clinic_name: formState.step1Data.clinic_name || '',
                tax_id: formState.step1Data.tax_id || '',
                street_address_line_1:
                  formState.step1Data.street_address_line_1 || '',
                city_id: formState.step1Data.city?.id || 0,
                state_id: formState.step1Data.state?.id || 0,
                zip_code: formState.step1Data.zip_code || '',
                timezone_id: formState.step1Data.timezone_id || 1,
                email: formState.step1Data.email || '',
                first_name: formState.step1Data.first_name || '',
                last_name: formState.step1Data.last_name || '',
                phone: formState.step1Data.phone || '',
                subscription_plan_id:
                  formState.step1Data.subscription_plan_id || 1,
                staff_count: formState.step1Data.staff_count || 1,
              }}
            />
          )}

          {/* Step 3: Paid Plan Cart */}
          {formState.currentStep === 3 && isPaidPlan && (
            <Step3PaidCart
              formData={formState.step1Data}
              onNext={handlePaidCartComplete}
              onBack={handleBackToStep2}
              clinic_onboarding_request_id={formState.clinic_onboarding_request_id}
            />
          )}

          {/* Step 4: Paid Plan Payment Processing */}
          {formState.currentStep === 4 && isPaidPlan && (
            <Step4PaymentProcessing
              formData={{
                ...formState.step1Data,
                clinic_name: formState.step1Data.clinic_name || '',
                tax_id: formState.step1Data.tax_id || '',
                street_address_line_1:
                  formState.step1Data.street_address_line_1 || '',
                city_id: formState.step1Data.city?.id || 0,
                state_id: formState.step1Data.state?.id || 0,
                zip_code: formState.step1Data.zip_code || '',
                timezone_id: formState.step1Data.timezone_id || 1,
                email: formState.step1Data.email || '',
                first_name: formState.step1Data.first_name || '',
                last_name: formState.step1Data.last_name || '',
                phone: formState.step1Data.phone || '',
                subscription_plan_id:
                  formState.step1Data.subscription_plan_id || 2,
                staff_count: formState.step1Data.staff_count || 1,
                billing_cycle: formState.billingCycle,
                addons: formState.selectedAddons,
              }}
              paymentUrl={formState.paymentUrl}
              onBack={handleBackToStep3}
            />
          )}
        </div>
      </div>

      {/* Plan Selector Modal */}
      {showPlanSelector && formState.step1Data.subscription_plan_id && (
        <PlanSelector
          currentPlanId={formState.step1Data.subscription_plan_id}
          currentBillingCycle={formState.billingCycle}
          onSelectPlan={handlePlanChange}
          onClose={() => setShowPlanSelector(false)}
        />
      )}
    </div>
  );
}
