'use client';

import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import OTPCodeInput from './OTPCodeInput';
import * as styles from './styles.css';

import { fetchApi } from '@/lib/api-client';
import { showSuccessToast } from '@/lib/errors';
import { isApiError } from '@/types/api';
import type { Step2Props } from '@/types/subscription';

interface OTPFormData {
  otp_code: string;
}

/**
 * Step 2: Email OTP Verification
 * Verifies OTP code sent during registration
 */
export default function Step2OTPVerification({
  email,
  clinic_onboarding_request_id,
  onVerified,
  onBack,
}: Step2Props) {
  const [verifying, setVerifying] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpValue, setOtpValue] = useState('');
  const cooldownInterval = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<OTPFormData>({
    defaultValues: {
      otp_code: '',
    },
  });

  // Cleanup cooldown interval on unmount
  useEffect(() => {
    return () => {
      if (cooldownInterval.current) {
        clearInterval(cooldownInterval.current);
      }
    };
  }, []);

  // Clear any errors when component mounts (fresh start)
  useEffect(() => {
    setApiError(null);
    setResendSuccess(false);
  }, []);

  // Handle OTP input changes
  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('otp_code', value);
    // Clear error when user starts typing
    if (apiError) {
      setApiError(null);
    }
  };

  const sendOTP = async () => {
    if (resendCooldown > 0 || resendingOtp) return;

    setResendingOtp(true);
    setApiError(null);
    setResendSuccess(false);

    try {
      // Resend OTP via API
      await fetchApi<{ clinic_onboarding_request_id: number; message: string }>(
        'subscriptions/onboarding/verify-email/request',
        {
          method: 'POST',
          body: { email },
        },
      );

      // Show success message
      setResendSuccess(true);
      showSuccessToast(
        'Verification code sent successfully. Please check your email.',
      );

      // Start cooldown timer (60 seconds)
      startCooldown(60);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      if (isApiError(error)) {
        setApiError(
          error.message ||
            'Failed to send verification code. Please try again.',
        );
      } else {
        setApiError(
          'Network error. Please check your connection and try again.',
        );
      }
    } finally {
      setResendingOtp(false);
    }
  };

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);

    if (cooldownInterval.current) {
      clearInterval(cooldownInterval.current);
    }

    cooldownInterval.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownInterval.current) {
            clearInterval(cooldownInterval.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (data: OTPFormData) => {
    setVerifying(true);
    setApiError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}subscriptions/onboarding/verify-email/confirm`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clinic_onboarding_request_id,
            otp: data.otp_code,
          }),
        },
      );

      // Parse response
      const result = await response.json();

      // Log the response for debugging
      console.log('OTP Verification Response:', {
        status: response.status,
        ok: response.ok,
        result,
      });

      // Extract message from response (check multiple possible fields)
      const message = result.message || result.error || result.detail || '';
      const lowerMessage = message.toLowerCase();

      // Determine if this is a successful verification
      // Check multiple indicators of success:
      const isSuccessfulVerification =
        // 1. Explicit success flag
        (response.ok && result.success === true) ||
        // 2. 200 status with data
        (response.ok && result.data) ||
        // 3. Message indicates success (even if status is error)
        // These phrases indicate the email was verified (even if API returns error status)
        (message &&
          (lowerMessage.includes('verified successfully') ||
            lowerMessage.includes('email verified') ||
            lowerMessage.includes('email has been verified') ||
            lowerMessage.includes('verification successful') ||
            lowerMessage.includes('successfully verified') ||
            // "Please complete your registration" is a clear success indicator
            lowerMessage.includes('please complete') ||
            lowerMessage.includes('complete your registration') ||
            lowerMessage.includes('complete registration') ||
            // Other success indicators
            lowerMessage.includes('pending') ||
            lowerMessage.includes('submitted successfully') ||
            lowerMessage.includes('submission successful')));

      if (isSuccessfulVerification) {
        console.log(
          '✅ Email verification successful - redirecting to next step',
        );

        // Clear any previous errors
        setApiError(null);

        // Show success toast notification
        showSuccessToast('Email verified successfully!');

        // Wait a brief moment to ensure state updates
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Immediately transition to next step
        onVerified(result.data || {});
      } else {
        // This is a genuine error - invalid OTP, expired OTP, etc.
        console.error('❌ Email verification failed:', message);

        const errorMessage =
          message || 'Invalid verification code. Please try again.';
        setApiError(errorMessage);
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
        Verify Your Email
      </h1>
      <p className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`} style={{ animationDelay: '0.1s' }}>
        We've sent a verification code to <strong>{email}</strong>
      </p>

      <div className={`${styles.alertContainer} ${styles.alertInfo} ${styles.alertWithAnimation} ${styles.alertWithBorder}`} style={{ animationDelay: '0.2s' }}>
        <Mail size={20} />
        <span>Please check your email for the 6-digit verification code.</span>
      </div>

      {resendSuccess && (
        <div className={`${styles.alertContainer} ${styles.alertSuccess} ${styles.alertWithAnimation}`}>
          <Check size={20} />
          <span>
            Verification code sent successfully! Please check your email.
          </span>
        </div>
      )}

      {apiError && (
        <div className={`${styles.alertContainer} ${styles.alertError} ${styles.alertWithAnimation}`}>
          <AlertCircle size={20} />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.otpContainer} style={{ marginTop: '2rem' }}>
          <div className={`${styles.iconContainerLarge} ${styles.iconContainerPrimary}`}>
            <Mail size={48} />
          </div>

          <OTPCodeInput
            label="Enter 6-digit authentication code"
            helpText="Enter the 6-digit code sent to your email"
            value={otpValue}
            onChange={handleOtpChange}
            disabled={verifying}
            hasError={!!apiError}
          />
          <input type="hidden" {...register('otp_code')} />

          <div className={styles.resendContainer}>
            <p className={styles.resendText}>Didn't receive the code?</p>
            {resendCooldown > 0 ? (
              <div className={styles.resendCooldown} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#e5e7eb',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280'
                }}>
                  {resendCooldown}
                </span>
                <span>Resend available in {resendCooldown} seconds</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={sendOTP}
                disabled={resendingOtp}
                className={styles.resendButton}
                style={{
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                {resendingOtp ? (
                  <>
                    <span className={styles.loadingSpinner} />
                    Sending...
                  </>
                ) : (
                  'Resend Code'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
          <button
            type="button"
            onClick={onBack}
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonSecondary}`}
            disabled={verifying}
          >
            <ChevronLeft size={20} style={{ transition: 'transform 0.2s ease' }} />
            Back
          </button>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
            disabled={verifying}
          >
            {verifying ? (
              <>
                <span className={styles.loadingSpinner} />
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <ChevronRight size={20} style={{ transition: 'transform 0.2s ease' }} />
              </>
            )}
          </button>
        </div>

        <style jsx>{`
          button:not(:disabled):hover svg {
            transform: translateX(4px);
          }
          button:not(:disabled):hover svg:first-child {
            transform: translateX(-4px);
          }
        `}</style>
      </form>
    </div>
  );
}
