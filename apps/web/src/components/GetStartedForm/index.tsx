'use client';

import { InputMask } from '@react-input/mask';
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import { colors } from '../../styles/tokens.css';
import CalendlyButton from '../billing/CalendlyButton';
import { primaryButton } from '../billing/CalendlyButton/styles.css';
import ReCaptcha, { ReCaptchaRef } from '../ReCaptcha';

import {
  backgroundContainer,
  backgroundDecorative,
  bottomHelperText,
  cardContainer,
  cardContent,
  cardHeader,
  checkboxInput,
  checkboxLabel,
  checkboxRow,
  checkboxSection,
  contactCard,
  contactCardContent,
  contactCardHeader,
  contactItem,
  contactSection,
  errorMessage,
  formContainer,
  formGroup,
  formTitle,
  gridContainer,
  infoBox,
  infoBoxText,
  inputStyle,
  labelStyle,
  leftPanel,
  loadingSpinner,
  mainContainer,
  pageWrapper,
  requiredMark,
  rightPanel,
  selectStyle,
  submitButton,
  successMessage,
  successText,
  successTitle,
  textareaStyle,
  titleGradient,
  twoColumnGrid
} from './styles.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  state: string;
  hasExperience: boolean;
  previousSoftware?: string;
  comments: string;
}

// Max length constants based on backend DTO
const MAX_LENGTHS = {
  firstName: 255,
  lastName: 255,
  companyName: 255,
  state: 255,
  softwareName: 255,
  comments: 1000,
};

interface StateData {
  id: number;
  name: string;
  code: string;
  timezones: Array<{
    timezone_id: number;
    timezone: {
      timezone: string;
    };
  }>;
}

interface StatesApiResponse {
  status_code: number;
  data: {
    count: number;
    rows: StateData[];
  };
}

interface ApiError {
  field: string;
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  status_code: number;
}


const GetStartedForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiFieldErrors, setApiFieldErrors] = useState<Record<string, string>>(
    {},
  );
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const [states, setStates] = useState<StateData[]>([]);
  const [statesLoading, setStatesLoading] = useState(true);
  const [statesError, setStatesError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const hasExperience = watch('hasExperience');

  // Scroll to top on component mount and fetch states
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch states from API
    const fetchStates = async () => {
      try {
        setStatesLoading(true);
        setStatesError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}states`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }

        const result: StatesApiResponse = await response.json();

        if (result.status_code === 200 && result.data?.rows) {
          setStates(result.data.rows);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setStatesError(
          error instanceof Error ? error.message : 'Failed to load states',
        );
      } finally {
        setStatesLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Map API field names back to form field names
  const mapApiFieldToFormField = (apiField: string): string => {
    const fieldMap: Record<string, string> = {
      first_name: 'firstName',
      last_name: 'lastName',
      company_name: 'companyName',
      phone_number: 'phoneNumber',
      email_id: 'email',
      state: 'state',
      other_software_experience: 'previousSoftware',
      software_name: 'previousSoftware',
      comments: 'comments',
    };
    return fieldMap[apiField] || apiField;
  };

  // reCAPTCHA handlers
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setRecaptchaError(null);
    // Clear API field errors for recaptcha when user completes it
    if (token && apiFieldErrors.recaptcha) {
      const { recaptcha, ...otherErrors } = apiFieldErrors;
      setApiFieldErrors(otherErrors);
    }
  };

  const handleRecaptchaError = () => {
    setRecaptchaError('reCAPTCHA error occurred. Please try again.');
    setRecaptchaToken(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaError('reCAPTCHA has expired. Please verify again.');
    setRecaptchaToken(null);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setApiFieldErrors({});
    setRecaptchaError(null);

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setRecaptchaError('Please complete the reCAPTCHA verification');
      setIsSubmitting(false);
      return;
    }

    // Transform camelCase to snake_case for API
    const transformedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      company_name: data.companyName || '',
      phone_number: data.phoneNumber,
      email_id: data.email,
      state: data.state,
      specialities: '',
      staff: 0,
      other_software_experience: data.hasExperience,
      software_name: data.previousSoftware || '',
      comments: data.comments || '',
      recaptcha_token: recaptchaToken,
    };

    try {
      const apiUrl = '/api/contact';

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
        setRecaptchaToken(null);
        setRecaptchaError(null);
        recaptchaRef.current?.reset();
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            if (error.field === 'recaptcha') {
              setRecaptchaError(error.message);
              setRecaptchaToken(null);
              recaptchaRef.current?.reset();
            } else {
              const formFieldName = mapApiFieldToFormField(error.field);
              fieldErrors[formFieldName] = error.message;
            }
          });
          setApiFieldErrors(fieldErrors);

          // Set a general error message
          setSubmitError('Please correct the errors below and try again.');
        } else {
          // Handle general errors
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
      <div className={pageWrapper}>
        <div className={backgroundContainer}>
          <div className={backgroundDecorative} />
          <div className={successMessage}>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#d1fae5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <CheckCircle
                style={{ width: '32px', height: '32px', color: '#059669' }}
              />
            </div>
            <h2 className={successTitle}>🎉 Thank You!</h2>
            <p className={successText}>
              We&apos;ve received your information and our team will be in touch
              within 24 hours to discuss how we can help transform your
              practice.
            </p>
            <button
              className={submitButton}
              onClick={() => {
                setSubmitSuccess(false);
                setSubmitError(null);
                setApiFieldErrors({});
              }}
              style={{ maxWidth: '300px', margin: '0 auto' }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      <div className={backgroundContainer}>
        <div className={backgroundDecorative} />

        <div className={mainContainer}>
          <div className={gridContainer}>
            {/* Left Panel - Contact Info & Branding */}
            <div className={leftPanel}>
              <div className={contactSection}>
                <h1 className={formTitle}>
                  <span
                    style={{
                      color: '#111827',
                      background: 'none',
                      WebkitTextFillColor: 'initial',
                    }}
                  >
                    Get Started with{' '}
                  </span>
                  <span className={titleGradient}>S Cubed</span>
                </h1>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    maxWidth: '28rem',
                    marginBottom: '1rem',
                  }}
                >
                  Transform your practice with our specialized ABA Practice &
                  Clinical Management Solution. We&apos;re here to help you
                  succeed, let&apos;s start the conversation.
                </p>
                <div className={infoBox}>
                  <p className={infoBoxText}>
                    ✨ <strong>What to expect:</strong> Our specialists will
                    provide a personalized consultation to understand your
                    unique needs and show you exactly how S Cubed can streamline
                    your practice.
                  </p>
                </div>
              </div>

              <div className={contactCard}>
                <div className={contactCardHeader}>Reach Out to Us</div>
                <div className={contactCardContent}>
                  <a
                    href="tel:2544344959"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Phone
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        Phone:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                        }}
                      >
                        (254) 434-4959
                      </span>
                    </div>
                  </a>
                  <a
                    href="mailto:info@scubed.io"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Mail
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        Email:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                        }}
                      >
                        info@scubed.io
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://scubed.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Globe
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        Website:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                        }}
                        title="https://scubed.io"
                      >
                        https://scubed.io
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/spectrum-solutions-software/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Linkedin
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        LinkedIn:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                        }}
                        title="www.linkedin.com/company/spectrum-solutions-software"
                      >
                        www.linkedin.com/company/spectrum-solutions-software
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <CalendlyButton
                buttonText="Contact Our Specialist →"
                className={primaryButton}
              />
            </div>

            {/* Right Panel - Contact Form */}
            <div className={rightPanel}>
              <div className={cardContainer}>
                {/* Card Header */}
                <div className={cardHeader}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      background:
                        'linear-gradient(to right, rgb(250, 245, 255), rgb(243, 232, 255))',
                      borderRadius: '0.5rem',
                      border: '1px solid rgb(233, 213, 255)',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: colors.primary[700],
                        margin: 0,
                      }}
                    >
                      Let&apos;s Connect
                    </h2>
                    <Mail
                      style={{
                        width: '1.125rem',
                        height: '1.125rem',
                        color: colors.primary[700],
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        borderLeft: '1px solid rgb(233, 213, 255)',
                        paddingLeft: '0.5rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      We&apos;ll respond within 24 hours
                    </span>
                  </div>
                </div>

                <div className={cardContent}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={formContainer}
                    noValidate
                  >
                    {/* First Name and Last Name */}
                    <div className={twoColumnGrid}>
                      <div className={formGroup}>
                        <label className={labelStyle}>
                          First Name <span className={requiredMark}>*</span>
                        </label>
                        <input
                          type="text"
                          className={inputStyle}
                          placeholder="Enter your first name"
                          autoComplete="given-name"
                          aria-required="true"
                          {...register('firstName', {
                            required: 'First name is required',
                            maxLength: {
                              value: MAX_LENGTHS.firstName,
                              message: `First name must not exceed ${MAX_LENGTHS.firstName} characters`,
                            },
                          })}
                        />
                        {renderFieldError(errors.firstName, 'firstName')}
                      </div>

                      <div className={formGroup}>
                        <label className={labelStyle}>
                          Last Name <span className={requiredMark}>*</span>
                        </label>
                        <input
                          type="text"
                          className={inputStyle}
                          placeholder="Enter your last name"
                          autoComplete="family-name"
                          aria-required="true"
                          {...register('lastName', {
                            required: 'Last name is required',
                            maxLength: {
                              value: MAX_LENGTHS.lastName,
                              message: `Last name must not exceed ${MAX_LENGTHS.lastName} characters`,
                            },
                          })}
                        />
                        {renderFieldError(errors.lastName, 'lastName')}
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className={twoColumnGrid}>
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
                              isEmail(email) ||
                              'Please enter a valid email address',
                          })}
                        />
                        {renderFieldError(errors.email, 'email')}
                      </div>

                      <div className={formGroup}>
                        <label className={labelStyle}>
                          Phone Number <span className={requiredMark}>*</span>
                        </label>
                        <InputMask
                          mask="(___) ___-____"
                          replacement={{ _: /\d/ }}
                          type="tel"
                          className={inputStyle}
                          placeholder="(XXX) XXX-XXXX"
                          autoComplete="tel"
                          aria-required="true"
                          {...register('phoneNumber', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
                              message: 'Please enter a valid US phone number',
                            },
                          })}
                        />
                        {renderFieldError(errors.phoneNumber, 'phoneNumber')}
                      </div>
                    </div>

                    {/* Company Name and State */}
                    <div className={twoColumnGrid}>
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

                      <div className={formGroup}>
                        <label className={labelStyle}>
                          State <span className={requiredMark}>*</span>
                        </label>
                        <select
                          className={selectStyle}
                          autoComplete="address-level1"
                          aria-required="true"
                          {...register('state', {
                            required: 'State is required',
                          })}
                          disabled={statesLoading}
                        >
                          <option value="" style={{ color: '#9ca3af' }}>
                            {statesLoading
                              ? 'Loading states...'
                              : statesError
                                ? 'Error loading states'
                                : 'Select State'}
                          </option>
                          {!statesLoading &&
                            !statesError &&
                            states.map((state) => (
                              <option key={state.code} value={state.code}>
                                {state.name} ({state.code})
                              </option>
                            ))}
                        </select>
                        {statesError && (
                          <div
                            className={errorMessage}
                            style={{
                              fontSize: '0.75rem',
                              marginTop: '0.25rem',
                            }}
                          >
                            <AlertCircle size={12} />
                            {statesError}
                          </div>
                        )}
                        {renderFieldError(errors.state, 'state')}
                      </div>
                    </div>


                    {/* Software Experience and Comments */}
                    <div className={twoColumnGrid}>
                      <div className={formGroup}>
                        <label className={labelStyle}>
                          Software Experience
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                          }}
                        >
                          <div className={checkboxSection}>
                            <div className={checkboxRow}>
                              <input
                                type="checkbox"
                                id="hasExperience"
                                className={checkboxInput}
                                aria-describedby="hasExperience-help"
                                {...register('hasExperience')}
                              />
                              <label
                                htmlFor="hasExperience"
                                className={checkboxLabel}
                              >
                                I have experience with other practice management
                                software
                              </label>
                            </div>
                          </div>

                          {hasExperience && (
                            <div
                              style={{
                                marginLeft: '0.5rem',
                                paddingLeft: '1rem',
                                borderLeft: '2px solid rgb(233, 213, 255)',
                              }}
                            >
                              <div className={formGroup}>
                                <label className={labelStyle}>
                                  Which practice management software?
                                </label>
                                <input
                                  type="text"
                                  className={inputStyle}
                                  placeholder="e.g., Therabill, WebPT"
                                  {...register('previousSoftware', {
                                    required: hasExperience
                                      ? 'Software name is required when you have software experience'
                                      : false,
                                    maxLength: {
                                      value: MAX_LENGTHS.softwareName,
                                      message: `Software name must not exceed ${MAX_LENGTHS.softwareName} characters`,
                                    },
                                  })}
                                />
                                {renderFieldError(
                                  errors.previousSoftware,
                                  'previousSoftware',
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={formGroup}>
                        <label className={labelStyle}>
                          Comments (Tell us about your needs and challenges)
                        </label>
                        <textarea
                          className={textareaStyle}
                          placeholder="Tell us about your needs and goals..."
                          rows={3}
                          {...register('comments', {
                            maxLength: {
                              value: MAX_LENGTHS.comments,
                              message: `Comments must not exceed ${MAX_LENGTHS.comments} characters`,
                            },
                          })}
                        />
                        {renderFieldError(errors.comments, 'comments')}
                      </div>
                    </div>

                    {submitError && (
                      <div
                        className={errorMessage}
                        style={{
                          textAlign: 'center',
                          marginTop: '20px',
                          padding: '1rem',
                          background: '#fef2f2',
                          borderRadius: '0.75rem',
                          border: '1px solid #fecaca',
                        }}
                      >
                        <AlertCircle size={20} />
                        {submitError}
                      </div>
                    )}

                    {/* reCAPTCHA */}
                    <div className="pt-4">
                      <ReCaptcha
                        ref={recaptchaRef}
                        onVerify={handleRecaptchaChange}
                        onError={handleRecaptchaError}
                        onExpired={handleRecaptchaExpired}
                        error={recaptchaError}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={submitButton}
                        aria-describedby="submit-help"
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className={loadingSpinner}
                              aria-hidden="true"
                            ></span>
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                            Send My Request
                          </>
                        )}
                      </button>
                      <p id="submit-help" className={bottomHelperText}>
                        🔒 Your information is secure and will only be used to
                        provide you with a personalized consultation.
                        <br />
                        We&apos;ll respond within 24 hours with next steps.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedForm;
