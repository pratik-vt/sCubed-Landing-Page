'use client';

import { AlertCircle, ChevronRight, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import { TextInput } from './FormComponents';
import * as styles from './styles.css';

import { SUCCESS_MESSAGES } from '@/constants/messages';
import { API_ENDPOINTS } from '@/constants/api';
import { fetchApi } from '@/lib/api-client';
import { getFieldErrors, showSuccessToast } from '@/lib/errors';
import { isApiError } from '@/types/api';

interface EmailFormData {
  email: string;
}

interface EmailVerificationResponse {
  clinic_onboarding_request_id: number;
  email: string;
  message: string;
}

interface Step0Props {
  onNext: (clinic_onboarding_request_id: number, email: string) => void;
  initialEmail?: string;
}

/**
 * Step 0: Email Input
 * Collects user email and initiates email verification process
 */
export default function Step0EmailInput({
  onNext,
  initialEmail,
}: Readonly<Step0Props>) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    mode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      email: initialEmail || '',
    },
  });

  // Helper function to determine if error should be shown
  const shouldShowError = (fieldName: keyof EmailFormData) => {
    const fieldError = errors[fieldName];
    const apiFieldError = fieldErrors[fieldName];

    // Show API errors always
    if (apiFieldError) return true;

    // Only hide required errors that don't have a message
    if (fieldError && fieldError.type === 'required' && !fieldError.message)
      return false;
    return !!fieldError;
  };

  // Get error message (prioritize API errors over form validation errors)
  const getErrorMessage = (fieldName: keyof EmailFormData) => {
    if (fieldErrors[fieldName]) {
      return { message: fieldErrors[fieldName], type: 'server' as const };
    }
    return errors[fieldName];
  };

  const onSubmit = async (data: EmailFormData) => {
    setFieldErrors({});

    try {
      // Call the verify-email/request endpoint
      const result = await fetchApi<EmailVerificationResponse>(
        API_ENDPOINTS.SUBSCRIPTION.VERIFY_EMAIL_REQUEST,
        {
          method: 'POST',
          body: { email: data.email },
        },
      );

      // Success! Show toast and move to OTP verification step
      showSuccessToast(
        SUCCESS_MESSAGES.REGISTRATION_SUCCESS ||
          'Verification code sent! Please check your email.',
      );

      // Move to next step with the clinic_onboarding_request_id
      onNext(result.clinic_onboarding_request_id, data.email);
    } catch (error) {
      // Extract field errors for inline display
      if (isApiError(error)) {
        const extractedFieldErrors = getFieldErrors(error);
        setFieldErrors(extractedFieldErrors);
      }
      // General errors are automatically shown as toasts by fetchApi
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.otpContainer}>
        <div
          className={`${styles.iconContainerLarge} ${styles.iconContainerPrimary}`}
        >
          <Mail size={30} />
        </div>

        <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
          Get Started with S Cubed
        </h1>
        <p
          className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.1s' }}
        >
          Enter your email address to begin your subscription journey
        </p>
      </div>

      <div
        className={`${styles.alertContainerCentered} ${styles.alertInfo} ${styles.alertWithAnimation} ${styles.alertWithBorder}`}
        style={{ animationDelay: '0.2s' }}
      >
        <AlertCircle size={20} />
        <span className={styles.alertTextCentered}>
          We'll send you a verification code to confirm your email address
        </span>
      </div>

      <div className={styles.formSection} style={{ marginTop: '2rem' }}>
        <TextInput
          label="Email Address"
          type="email"
          required
          placeholder="admin@yourpractice.com"
          registration={register('email', {
            required: 'Email is required',
            validate: (value) => isEmail(value) || 'Invalid email address',
            maxLength: { value: 100, message: 'Maximum 100 characters' },
          })}
          error={
            shouldShowError('email') ? getErrorMessage('email') : undefined
          }
          helpText="This will be your account email for S Cubed"
        />
      </div>

      {/* Form Actions */}
      <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
        <div />
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.loadingSpinner} />
              Sending Code...
            </>
          ) : (
            <>
              Continue
              <ChevronRight
                size={20}
                style={{ transition: 'transform 0.2s ease' }}
              />
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        button:not(:disabled):hover svg {
          transform: translateX(4px);
        }
      `}</style>
    </form>
  );
}
