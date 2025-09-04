'use client';

import { AlertCircle, CheckCircle } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import ReCaptcha, { ReCaptchaRef } from '../ReCaptcha';

import {
  container,
  errorMessage,
  form,
  formWrapper,
  inputStyle,
  label,
  labelSubtext,
  labelText,
  loadingSpinner,
  submitButton,
  successMessage,
} from './styles.css';

interface FormData {
  email: string;
}

interface NewsletterFormProps {
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const submitToAPI = async (email: string, token: string) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          recaptcha_token: token,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setSubmitMessage(result.message || 'Thank you for subscribing to our newsletter!');
        reset();
        recaptchaRef.current?.reset();
        setPendingFormData(null);
        
        setTimeout(() => {
          setSubmitSuccess(false);
          setSubmitMessage('');
        }, 5000);
      } else {
        if (result.errors && result.errors.length > 0) {
          const error = result.errors[0];
          if (error.field === 'recaptcha') {
            setRecaptchaError(error.message);
          } else {
            setApiError(error.message);
          }
        } else {
          setApiError('Failed to subscribe. Please try again later.');
        }
        recaptchaRef.current?.reset();
        setPendingFormData(null);
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setApiError('Network error. Please check your connection and try again.');
      recaptchaRef.current?.reset();
      setPendingFormData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    setRecaptchaError(null);
    setPendingFormData(data);

    // Execute invisible reCAPTCHA
    recaptchaRef.current?.execute();
  };

  const handleRecaptchaVerify = useCallback((token: string | null) => {
    if (token && pendingFormData) {
      // reCAPTCHA verified, now submit the form
      submitToAPI(pendingFormData.email, token);
    } else if (!token) {
      setRecaptchaError('reCAPTCHA verification failed. Please try again.');
      setIsSubmitting(false);
      setPendingFormData(null);
    }
  }, [pendingFormData]);

  const handleRecaptchaError = () => {
    setRecaptchaError('reCAPTCHA error. Please try again.');
    setIsSubmitting(false);
    setPendingFormData(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaError('reCAPTCHA expired. Please try again.');
    setIsSubmitting(false);
    setPendingFormData(null);
  };

  return (
    <div className={`${container} ${className || ''}`}>
      <div className={label}>
        <span className={labelText}>Subscribe to our Newsletter</span>
        <span className={labelSubtext}>Stay informed with industry insights and updates</span>
      </div>
      
      <div className={formWrapper}>
        <form className={form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email address"
            className={inputStyle}
            {...register('email', {
              required: 'Email is required',
              validate: (value) => isEmail(value) || 'Please enter a valid email address',
            })}
            disabled={isSubmitting}
            autoComplete="email"
            aria-label="Email address for newsletter"
          />
          
          <button
            type="submit"
            className={submitButton}
            disabled={isSubmitting}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? (
              <span className={loadingSpinner}>Subscribing...</span>
            ) : (
              'Subscribe'
            )}
          </button>

          <ReCaptcha
            ref={recaptchaRef}
            size="invisible"
            siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3}
            onVerify={handleRecaptchaVerify}
            onError={handleRecaptchaError}
            onExpired={handleRecaptchaExpired}
          />
        </form>
        
        {submitSuccess && (
          <div className={successMessage}>
            <CheckCircle size={16} />
            <span>{submitMessage}</span>
          </div>
        )}
        
        {(errors.email || apiError || recaptchaError) && (
          <div className={errorMessage}>
            <AlertCircle size={16} />
            <span>{errors.email?.message || apiError || recaptchaError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;