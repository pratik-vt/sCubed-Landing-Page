'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronRight, AlertCircle, Mail } from 'lucide-react';
import isEmail from 'validator/lib/isEmail';

import { TextInput } from './FormComponents';
import * as styles from './styles.css';

import { fetchApi } from '@/lib/api-client';
import { getFieldErrors, showSuccessToast } from '@/lib/errors';
import { isApiError } from '@/types/api';
import { SUCCESS_MESSAGES } from '@/constants/messages';

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
export default function Step0EmailInput({ onNext, initialEmail }: Readonly<Step0Props>) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
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
        'subscriptions/onboarding/verify-email/request',
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
        <div className={styles.otpIconWrapper}>
          <Mail size={48} className={styles.otpIcon} />
        </div>

        <h1 className={styles.formTitle}>Get Started with S Cubed</h1>
        <p className={styles.formSubtitle}>
          Enter your email address to begin your subscription journey
        </p>
      </div>

      <div className={`${styles.alertContainer} ${styles.alertInfo}`}>
        <AlertCircle size={20} />
        <span>
          We'll send you a verification code to confirm your email address
        </span>
      </div>

      <div className={styles.formSection}>
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
      <div className={styles.buttonGroup}>
        <div />
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
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
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
