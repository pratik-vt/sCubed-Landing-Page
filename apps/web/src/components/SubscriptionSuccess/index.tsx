'use client';

import { AlertCircle, CheckCircle2, Clock, Home, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import * as styles from './styles.css';

import { fetchApi } from '@/lib/api-client';
import { isApiError } from '@/types/api';

/**
 * SubscriptionSuccess Component
 * Displayed after successful subscription (Free or Paid)
 * For paid plans, validates Stripe session via query params
 */
export default function SubscriptionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<{
    isPaidPlan: boolean;
    clinicName?: string;
    email?: string;
    paymentStatus?: string;
    nextStep?: string;
    paymentVerified?: boolean;
  }>({
    isPaidPlan: false,
  });

  useEffect(() => {
    verifySuccess();
  }, []);

  const verifySuccess = async () => {
    // Try different parameter names Stripe might use
    const sessionId =
      searchParams.get('session_id') ||
      searchParams.get('cs') ||
      searchParams.get('checkout_session_id');

    // Check if the placeholder wasn't replaced
    if (sessionId === '{CHECKOUT_SESSION_ID}') {
      setError(
        'Payment session not properly initialized. Please contact support.',
      );
      setVerified(false);
      setLoading(false);
      return;
    }

    // If there's a Stripe session ID, it's a paid plan - verify payment
    if (sessionId) {
      try {
        // Ensure the session ID is properly encoded
        const encodedSessionId = encodeURIComponent(sessionId);
        const verifyUrl = `subscriptions/onboarding/verify-payment?session_id=${encodedSessionId}`;

        // Verify the Stripe session with backend using new endpoint
        // Use skipErrorToast to handle errors manually
        const data = await fetchApi<{
          clinic_onboarding_request_id: number;
          email: string;
          clinic_name: string;
          status: string;
          payment_verified: boolean;
          payment_status: string;
          next_step: string;
        }>(verifyUrl, {
          method: 'GET',
          skipErrorToast: true, // Handle errors manually to prevent automatic toasts
        });

        // Check if the response has the expected structure
        if (!data || typeof data !== 'object') {
          setError(
            'Invalid response from payment verification. Please contact support.',
          );
          setVerified(false);
        } else {
          // Set subscription data with payment status
          setSubscriptionData({
            isPaidPlan: true,
            clinicName: data.clinic_name || 'N/A',
            email: data.email || 'N/A',
            paymentStatus: data.payment_status || 'unknown',
            nextStep: data.next_step || 'Your payment is being processed.',
            paymentVerified: data.payment_verified || false,
          });

          // Set verified to true even if payment is pending (we'll show different UI)
          setVerified(true);
        }
      } catch (err) {
        if (isApiError(err)) {
          // Only redirect for truly invalid session errors (404)
          if (err.statusCode === 404) {
            // Invalid session - redirect to home after short delay
            setError(
              'Invalid or expired checkout session. Redirecting to homepage...',
            );
            setTimeout(() => {
              router.push('/');
            }, 3000);
          } else {
            // For other errors, show the error but don't redirect
            // The user might need to retry or contact support
            setError(
              err.message ||
                'Failed to verify payment. Please contact support.',
            );
            setVerified(false);
          }
        } else {
          // Network or other error - don't redirect, let user retry
          setError(
            'Failed to verify payment. Please check your connection and try again.',
          );
          setVerified(false);
        }
      }
    } else {
      // No session ID - check if it's a legitimate free plan from session storage
      const savedState = sessionStorage.getItem('subscriptionFormState');

      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          // Verify it's actually a free plan (subscription_plan_id === 1)
          if (parsed.step1Data?.subscription_plan_id === 1) {
            setSubscriptionData({
              isPaidPlan: false,
              clinicName: parsed.step1Data?.clinic_name,
              email: parsed.step1Data?.email,
            });
            setVerified(true);
          } else {
            // Not a free plan but no session ID - unauthorized access
            router.push('/');
            return;
          }
        } catch (err) {
          // If can't parse session data, redirect to home
          router.push('/');
          return;
        }
      } else {
        // No session ID and no saved state - unauthorized access
        router.push('/');
        return;
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.loadingIconWrapper}>
              <span className={styles.loadingSpinner} />
            </div>
            <h2 className={styles.title}>Verifying Your Subscription...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.errorIconWrapper}>
              <AlertCircle size={48} />
            </div>
            <h1 className={styles.title}>Verification Failed</h1>
            <p className={styles.message}>{error}</p>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => router.push('/')}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                <Home size={20} />
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verified) {
    // Determine if payment is pending for paid plans
    const isPaymentPending =
      subscriptionData.isPaidPlan && !subscriptionData.paymentVerified;

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div
              className={
                isPaymentPending
                  ? styles.loadingIconWrapper
                  : styles.successIcon
              }
            >
              {isPaymentPending ? (
                <Clock size={48} />
              ) : (
                <CheckCircle2 size={48} />
              )}
            </div>

            <h1 className={styles.title}>
              {subscriptionData.isPaidPlan
                ? isPaymentPending
                  ? 'Payment Processing...'
                  : 'Payment Successful!'
                : 'Trial Request Submitted Successfully!'}
            </h1>

            <p className={styles.message}>
              {subscriptionData.isPaidPlan
                ? subscriptionData.nextStep ||
                  (isPaymentPending
                    ? 'Your payment is being processed. This usually takes just a few moments. You will receive a confirmation email shortly.'
                    : 'Thank you for subscribing to S Cubed! Your payment has been processed successfully and your account is being set up.')
                : 'Thank you for choosing S Cubed! Your free trial request has been submitted successfully. An admin will review and approve your request soon.'}
            </p>

            <div
              className={`${styles.alertContainer} ${isPaymentPending ? styles.alertWarning : styles.alertInfo}`}
            >
              {isPaymentPending ? <Clock size={20} /> : <Mail size={20} />}
              <div>
                <strong>What happens next?</strong>
                <ul className={styles.successList}>
                  {subscriptionData.isPaidPlan ? (
                    isPaymentPending ? (
                      <>
                        <li className={styles.successListItem}>
                          Your payment is currently being processed by our
                          payment provider
                        </li>
                        <li className={styles.successListItem}>
                          You will receive a confirmation email at{' '}
                          <strong>{subscriptionData.email}</strong> once payment
                          is confirmed
                        </li>
                        <li className={styles.successListItem}>
                          This typically takes 1-5 minutes but may take up to 24
                          hours in rare cases
                        </li>
                        <li className={styles.successListItem}>
                          If you don't receive confirmation within 24 hours,
                          please contact our support team
                        </li>
                      </>
                    ) : (
                      <>
                        <li className={styles.successListItem}>
                          Our team is setting up your account and will activate
                          it within 1-2 business days
                        </li>
                        <li className={styles.successListItem}>
                          You'll receive a confirmation email at{' '}
                          <strong>{subscriptionData.email}</strong> with your
                          login credentials
                        </li>
                        <li className={styles.successListItem}>
                          Once activated, you can log in and start using all S
                          Cubed features immediately
                        </li>
                        <li className={styles.successListItem}>
                          A detailed receipt for your purchase has been sent to
                          your email
                        </li>
                        <li className={styles.successListItem}>
                          If you have any questions, our support team is here to
                          help
                        </li>
                      </>
                    )
                  ) : (
                    <>
                      <li className={styles.successListItem}>
                        Our team will review your trial request within 1-2
                        business days
                      </li>
                      <li className={styles.successListItem}>
                        You'll receive an email at{' '}
                        <strong>{subscriptionData.email}</strong> with login
                        credentials once your trial is approved
                      </li>
                      <li className={styles.successListItem}>
                        After approval, you can log in and start exploring S
                        Cubed with full access
                      </li>
                      <li className={styles.successListItem}>
                        If you have any questions, feel free to contact our
                        support team
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {subscriptionData.clinicName && (
              <div className={styles.successDetails}>
                <h3 className={styles.successDetailsTitle}>
                  Subscription Details
                </h3>
                <div className={styles.successDetailsItem}>
                  <span className={styles.label}>Clinic Name:</span>
                  <span className={styles.value}>
                    {subscriptionData.clinicName}
                  </span>
                </div>
                {subscriptionData.email && (
                  <div className={styles.successDetailsItem}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>
                      {subscriptionData.email}
                    </span>
                  </div>
                )}
                <div className={styles.successDetailsItem}>
                  <span className={styles.label}>Plan Type:</span>
                  <span className={styles.value}>
                    {subscriptionData.isPaidPlan ? 'Paid Plan' : 'Free Trial'}
                  </span>
                </div>
                {subscriptionData.paymentStatus && (
                  <div className={styles.successDetailsItem}>
                    <span className={styles.label}>Payment Status:</span>
                    <span
                      className={`${styles.value} ${isPaymentPending ? styles.paymentPending : styles.paymentCompleted}`}
                    >
                      {subscriptionData.paymentStatus
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <button
                onClick={() => router.push('/')}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                <Home size={20} />
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
