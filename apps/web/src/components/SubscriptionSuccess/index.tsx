'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Home, AlertCircle, Mail } from 'lucide-react';

import * as styles from './styles.css';

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
  }>({
    isPaidPlan: false,
  });

  useEffect(() => {
    verifySuccess();
  }, []);

  const verifySuccess = async () => {
    const sessionId = searchParams.get('session_id');

    // If there's a Stripe session ID, it's a paid plan
    if (sessionId) {
      try {
        // Verify the Stripe session with backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}payments/verify-session`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSubscriptionData({
            isPaidPlan: true,
            clinicName: data.clinic_name,
            email: data.email,
          });
          setVerified(true);
        } else {
          setError('Payment verification failed. Please contact support.');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Failed to verify payment. Please contact support.');
      }
    } else {
      // Free plan - check session storage for data
      const savedState = sessionStorage.getItem('subscriptionFormState');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          setSubscriptionData({
            isPaidPlan: false,
            clinicName: parsed.step1Data?.clinic_name,
            email: parsed.step1Data?.email,
          });
          setVerified(true);
        } catch (err) {
          console.error('Failed to parse saved state:', err);
        }
      }
      setVerified(true);
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
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={48} />
            </div>

            <h1 className={styles.title}>
              {subscriptionData.isPaidPlan
                ? 'Payment Successful!'
                : 'Trial Request Submitted Successfully!'}
            </h1>

            <p className={styles.message}>
              {subscriptionData.isPaidPlan
                ? 'Thank you for subscribing to S Cubed! Your payment has been processed successfully and your account is being set up.'
                : 'Thank you for choosing S Cubed! Your free trial request has been submitted successfully. An admin will review and approve your request soon.'}
            </p>

            <div className={`${styles.alertContainer} ${styles.alertInfo}`}>
              <Mail size={20} />
              <div>
                <strong>What happens next?</strong>
                <ul className={styles.successList}>
                  {subscriptionData.isPaidPlan ? (
                    <>
                      <li>Our team is setting up your account and will activate it within 1-2 business days</li>
                      <li>
                        You'll receive a confirmation email at{' '}
                        <strong>{subscriptionData.email}</strong> with your login credentials
                      </li>
                      <li>Once activated, you can log in and start using all S Cubed features immediately</li>
                      <li>A detailed receipt for your purchase has been sent to your email</li>
                      <li>If you have any questions, our support team is here to help</li>
                    </>
                  ) : (
                    <>
                      <li>Our team will review your trial request within 1-2 business days</li>
                      <li>
                        You'll receive an email at <strong>{subscriptionData.email}</strong> with login
                        credentials once your trial is approved
                      </li>
                      <li>After approval, you can log in and start exploring S Cubed with full access</li>
                      <li>If you have any questions, feel free to contact our support team</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {subscriptionData.clinicName && (
              <div className={styles.successDetails}>
                <h3 className={styles.successDetailsTitle}>Subscription Details</h3>
                <div className={styles.successDetailsItem}>
                  <span className={styles.label}>Clinic Name:</span>
                  <span className={styles.value}>{subscriptionData.clinicName}</span>
                </div>
                {subscriptionData.email && (
                  <div className={styles.successDetailsItem}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>{subscriptionData.email}</span>
                  </div>
                )}
                <div className={styles.successDetailsItem}>
                  <span className={styles.label}>Plan Type:</span>
                  <span className={styles.value}>
                    {subscriptionData.isPaidPlan ? 'Paid Plan' : 'Free Trial'}
                  </span>
                </div>
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
