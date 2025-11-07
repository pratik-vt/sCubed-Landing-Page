'use client';

import {
  AlertCircle,
  ChevronLeft,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import * as styles from './styles.css';

import type { Step4Props } from '@/types/subscription';

/**
 * Step 4 (Paid Plan): Payment Processing
 * Uses pre-generated payment URL from OTP verification or creates new Stripe session
 */
export default function Step4PaymentProcessing({
  formData,
  paymentUrl,
  onBack,
}: Step4Props) {
  const [processing, setProcessing] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [stripeUrl, setStripeUrl] = useState<string | null>(null);

  useEffect(() => {
    initializePayment();
  }, []);

  const initializePayment = async () => {
    setProcessing(true);
    setApiError(null);

    try {
      // If payment URL already exists from OTP verification, use it directly
      if (paymentUrl) {
        console.log(
          'Using pre-generated payment URL from OTP verification:',
          paymentUrl,
        );
        setStripeUrl(paymentUrl);

        // Automatically redirect to payment URL after showing message
        setTimeout(() => {
          window.location.href = paymentUrl;
        }, 2000);

        setProcessing(false);
        return;
      }

      // Otherwise, create a new payment session (fallback flow)
      console.log(
        'No pre-generated payment URL found. Creating new Stripe session...',
      );

      // Step 1: Submit subscription data to backend
      const subscriptionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}subscriptions/paid-plan`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      if (!subscriptionResponse.ok) {
        const data = await subscriptionResponse.json();
        throw new Error(
          data.message || 'Failed to create subscription. Please try again.',
        );
      }

      const subscriptionResult = await subscriptionResponse.json();

      // Step 2: Create Stripe payment session
      const stripeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}payments/create-stripe-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription_plan_id: formData.subscription_plan_id,
            billing_cycle: formData.billing_cycle,
            staff_count: formData.staff_count,
            addons: formData.addons || [],
            customer_email: formData.email,
            success_url: `${window.location.origin}/subscribe/payment-return?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${window.location.origin}/subscribe/payment-return?canceled=true`,
          }),
        },
      );

      if (!stripeResponse.ok) {
        const data = await stripeResponse.json();
        throw new Error(
          data.message || 'Failed to initialize payment. Please try again.',
        );
      }

      const stripeResult = await stripeResponse.json();

      if (stripeResult.session_url) {
        setStripeUrl(stripeResult.session_url);

        // Automatically redirect to Stripe checkout
        setTimeout(() => {
          window.location.href = stripeResult.session_url;
        }, 2000);
      } else {
        throw new Error('Payment session URL not received. Please try again.');
      }
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setApiError(
        error instanceof Error
          ? error.message
          : 'Failed to initialize payment. Please try again.',
      );
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.loadingIconWrapper}>
          <span className={styles.loadingSpinnerLarge} />
        </div>
        <h2
          className={`${styles.successTitle} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.2s' }}
        >
          Processing Your Order...
        </h2>
        <p
          className={`${styles.successMessage} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.3s' }}
        >
          Please wait while we securely process your payment details. This will
          only take a moment.
        </p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.errorIconWrapper}>
          <AlertCircle className={styles.errorIconLarge} strokeWidth={2.5} />
        </div>
        <h2
          className={`${styles.successTitle} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.2s' }}
        >
          Payment Initialization Failed
        </h2>
        <p
          className={`${styles.successMessage} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.3s' }}
        >
          {apiError}
        </p>

        <div
          className={`${styles.alertContainer} ${styles.alertWarning} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.4s' }}
        >
          <AlertCircle size={20} />
          <span>
            Your subscription data has been saved. Please try again or contact
            support if the problem persists.
          </span>
        </div>

        <div
          className={`${styles.buttonGroup} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.5s' }}
        >
          {onBack && (
            <button
              onClick={onBack}
              className={`${styles.button} ${styles.buttonLarge} ${styles.buttonSecondary}`}
            >
              <ChevronLeft size={20} />
              Back
            </button>
          )}
          <button
            onClick={() => window.location.reload()}
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (stripeUrl) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.paymentIconWrapper}>
          <CreditCard size={30} strokeWidth={2.5} />
        </div>

        <h2
          className={`${styles.successTitle} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.2s' }}
        >
          Redirecting to Secure Payment...
        </h2>

        <p
          className={`${styles.successMessage} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.3s' }}
        >
          You will be automatically redirected to our secure payment page in a
          moment. After completing your payment, you'll be brought back to see
          your subscription confirmation.
        </p>

        <div
          className={`${styles.alertContainer} ${styles.alertInfo} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.4s' }}
        >
          <AlertCircle size={20} />
          <div>
            <strong>What happens next:</strong>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
              <li>Complete your payment on the secure Stripe checkout page</li>
              <li>
                You'll be automatically redirected back to your success page
              </li>
              <li>Your subscription will be activated immediately</li>
            </ul>
          </div>
        </div>

        <div
          className={`${styles.buttonGroup} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.5s' }}
        >
          {onBack && (
            <button
              onClick={onBack}
              className={`${styles.button} ${styles.buttonLarge} ${styles.buttonSecondary}`}
            >
              <ChevronLeft size={20} />
              Back
            </button>
          )}
          <button
            onClick={() => (window.location.href = stripeUrl)}
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
          >
            Proceed to Payment Now
            <ExternalLink size={20} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
