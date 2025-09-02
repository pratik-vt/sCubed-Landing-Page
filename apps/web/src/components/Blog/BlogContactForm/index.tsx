'use client';

import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputMask } from '@react-input/mask';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';
import isEmail from 'validator/lib/isEmail';

import {
  formContainer,
  formHeader,
  formTitle,
  formGrid,
  formGroup,
  labelStyle,
  inputStyle,
  textareaStyle,
  submitButton,
  loadingSpinner,
  errorMessage,
  successMessage,
  requiredMark
} from './styles.css';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  message: string;
}

// Max length constants
const MAX_LENGTHS = {
  fullName: 255,
  companyName: 255,
  message: 1000,
};

interface ApiError {
  field: string;
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  status_code: number;
}

const BlogContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiFieldErrors, setApiFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Map API field names back to form field names
  const mapApiFieldToFormField = (apiField: string): string => {
    const fieldMap: Record<string, string> = {
      first_name: 'fullName',
      last_name: 'fullName',
      company_name: 'companyName',
      phone_number: 'phoneNumber',
      email_id: 'email',
      comments: 'message',
    };
    return fieldMap[apiField] || apiField;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setApiFieldErrors({});

    // Split full name into first and last name for API
    const nameParts = data.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Transform data for API
    const transformedData = {
      first_name: firstName,
      last_name: lastName,
      company_name: data.companyName || '',
      phone_number: data.phoneNumber,
      email_id: data.email,
      state: '', // Not required for blog contact form
      specialities: '',
      staff: 0,
      other_software_experience: false,
      software_name: '',
      comments: data.message || '',
    };

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}pages/contact-us`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setApiFieldErrors({});
        reset();
      } else {
        const errorData: ApiErrorResponse = await response.json().catch(() => ({
          errors: [],
          status_code: response.status,
        }));

        if (
          errorData.errors &&
          Array.isArray(errorData.errors) &&
          errorData.errors.length > 0
        ) {
          // Handle field-specific errors
          const fieldErrors: Record<string, string> = {};
          errorData.errors.forEach((error: ApiError) => {
            const formFieldName = mapApiFieldToFormField(error.field);
            fieldErrors[formFieldName] = error.message;
          });
          setApiFieldErrors(fieldErrors);
          setSubmitError('Please correct the errors below and try again.');
        } else {
          throw new Error(
            errorData.errors?.[0]?.message ||
              'Something went wrong. Please try again.',
          );
        }
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (error: any, fieldName: string) => {
    // Check for form validation errors first
    if (error) {
      return (
        <div className={errorMessage}>
          <AlertCircle size={16} />
          {error.message}
        </div>
      );
    }

    // Check for API field errors
    if (apiFieldErrors[fieldName]) {
      return (
        <div className={errorMessage}>
          <AlertCircle size={16} />
          {apiFieldErrors[fieldName]}
        </div>
      );
    }

    return null;
  };

  if (submitSuccess) {
    return (
      <div className={formContainer}>
        <div className={successMessage}>
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#d1fae5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <CheckCircle style={{ width: '24px', height: '24px', color: '#059669' }} />
          </div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
            Thank You! 🎉
          </h3>
          <p style={{ margin: '0 0 1.5rem 0', color: '#6b7280', lineHeight: '1.5' }}>
            We've received your message and our team will be in touch within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setSubmitError(null);
              setApiFieldErrors({});
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#7c3aed',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={formContainer}>
      <div className={formHeader}>
        <h3 className={formTitle}>Ready to Transform Your Practice?</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={formGrid}>
          <div className={formGroup}>
            <label className={labelStyle}>
              Full Name <span className={requiredMark}>*</span>
            </label>
            <input
              type="text"
              className={inputStyle}
              placeholder="Enter your full name"
              autoComplete="name"
              aria-required="true"
              {...register('fullName', {
                required: 'Full name is required',
                maxLength: {
                  value: MAX_LENGTHS.fullName,
                  message: `Name must not exceed ${MAX_LENGTHS.fullName} characters`,
                },
              })}
            />
            {renderFieldError(errors.fullName, 'fullName')}
          </div>

          <div className={formGroup}>
            <label className={labelStyle}>
              Email Address <span className={requiredMark}>*</span>
            </label>
            <input
              type="email"
              className={inputStyle}
              placeholder="your.email@company.com"
              autoComplete="email"
              aria-required="true"
              {...register('email', {
                required: 'Email is required',
                validate: (email) =>
                  isEmail(email) || 'Please enter a valid email address',
              })}
            />
            {renderFieldError(errors.email, 'email')}
          </div>

          <div className={formGroup}>
            <label className={labelStyle}>Phone Number</label>
            <InputMask
              mask="(___) ___-____"
              replacement={{ _: /\d/ }}
              type="tel"
              className={inputStyle}
              placeholder="(XXX) XXX-XXXX"
              autoComplete="tel"
              {...register('phoneNumber', {
                pattern: {
                  value: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
                  message: 'Please enter a valid US phone number',
                },
              })}
            />
            {renderFieldError(errors.phoneNumber, 'phoneNumber')}
          </div>

          <div className={formGroup}>
            <label className={labelStyle}>Company Name</label>
            <input
              type="text"
              className={inputStyle}
              placeholder="Your practice name"
              autoComplete="organization"
              {...register('companyName', {
                maxLength: {
                  value: MAX_LENGTHS.companyName,
                  message: `Company name must not exceed ${MAX_LENGTHS.companyName} characters`,
                },
              })}
            />
            {renderFieldError(errors.companyName, 'companyName')}
          </div>
        </div>

        <div className={formGroup} style={{ gridColumn: '1 / -1' }}>
          <label className={labelStyle}>
            Message <span className={requiredMark}>*</span>
          </label>
          <textarea
            className={textareaStyle}
            placeholder="Tell us about your practice and how we can help..."
            rows={4}
            {...register('message', {
              required: 'Message is required',
              maxLength: {
                value: MAX_LENGTHS.message,
                message: `Message must not exceed ${MAX_LENGTHS.message} characters`,
              },
            })}
          />
          {renderFieldError(errors.message, 'message')}
        </div>

        {submitError && (
          <div
            className={errorMessage}
            style={{
              textAlign: 'center',
              marginTop: '1rem',
              padding: '1rem',
              background: '#fef2f2',
              borderRadius: '0.5rem',
              border: '1px solid #fecaca',
            }}
          >
            <AlertCircle size={20} />
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={submitButton}
        >
          {isSubmitting ? (
            <>
              <span className={loadingSpinner} aria-hidden="true"></span>
              Sending Message...
            </>
          ) : (
            <>
              <Mail size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BlogContactForm;
