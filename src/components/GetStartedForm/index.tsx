import { InputMask } from '@react-input/mask';
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import { colors } from '../../styles/tokens.css';

import {
  backgroundContainer,
  backgroundDecorative,
  bottomHelperText,
  cardContainer,
  cardContent,
  cardHeader,
  checkboxHelperText,
  checkboxInput,
  checkboxLabel,
  contactCard,
  contactCardContent,
  contactCardHeader,
  contactItem,
  contactSection,
  errorMessage,
  formContainer,
  formGroup,
  formSection,
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
  sectionNumber,
  sectionNumberText,
  sectionTitle,
  selectStyle,
  specialistButton,
  submitButton,
  successMessage,
  successText,
  successTitle,
  textareaStyle,
  titleGradient,
  twoColumnGrid,
} from './styles.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  state: string;
  numberOfStaff: string;
  disciplines: string;
  hasExperience: boolean;
  previousSoftware?: string;
  comments: string;
}

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

const staffSizes = [
  '1-5 employees',
  '6-15 employees',
  '16-30 employees',
  '31-50 employees',
  '51-100 employees',
  '100+ employees',
];

const GetStartedForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiFieldErrors, setApiFieldErrors] = useState<Record<string, string>>(
    {},
  );
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
          `${process.env.GATSBY_ADMIN_APP_API_URL}states`,
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
      specialities: 'disciplines',
      staff: 'numberOfStaff',
      other_software_experience: 'previousSoftware',
      software_name: 'previousSoftware',
      comments: 'comments',
    };
    return fieldMap[apiField] || apiField;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setApiFieldErrors({});

    // Transform camelCase to snake_case for API
    const transformedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      company_name: data.companyName,
      phone_number: data.phoneNumber,
      email_id: data.email,
      state: data.state,
      specialities: data.disciplines,
      staff: data.numberOfStaff
        ? parseInt(data.numberOfStaff.split('-')[0])
        : 0,
      other_software_experience: data.previousSoftware || '',
      software_name: data.previousSoftware || '',
      comments: data.comments,
    };

    try {
      const response = await fetch(
        `${process.env.GATSBY_ADMIN_APP_API_URL}pages/contact-us`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transformedData),
        },
      );

      if (response.ok) {
        setSubmitSuccess(true);
        setApiFieldErrors({});
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
            const formFieldName = mapApiFieldToFormField(error.field);
            fieldErrors[formFieldName] = error.message;
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
                  Get Started with
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
                  Transform your practice with our specialized billing
                  solutions. We&apos;re here to help you succeed—let&apos;s
                  start the conversation.
                </p>
                <div className={infoBox}>
                  <p className={infoBoxText}>
                    ✨ <strong>What to expect:</strong> Our billing specialists
                    will provide a personalized consultation to understand your
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
                          width: '1rem',
                          height: '1rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          fontWeight: '500',
                        }}
                      >
                        Phone
                      </span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
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
                          width: '1rem',
                          height: '1rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          fontWeight: '500',
                        }}
                      >
                        Email
                      </span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        info@scubed.io
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://www.scubed.io"
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
                          width: '1rem',
                          height: '1rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          fontWeight: '500',
                        }}
                      >
                        Website
                      </span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        www.scubed.io
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/scubed"
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
                          width: '1rem',
                          height: '1rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          fontWeight: '500',
                        }}
                      >
                        LinkedIn
                      </span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        linkedin.com/scubed
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <button className={specialistButton}>
                <Phone size={16} style={{ marginRight: '8px' }} />
                Contact Our Specialist
              </button>
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
                    {/* Personal Information Section */}
                    <div className={formSection}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <div className={sectionNumber}>
                          <span className={sectionNumberText}>1</span>
                        </div>
                        <h3 className={sectionTitle}>Personal Information</h3>
                      </div>

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
                            {...register('firstName', {
                              required: 'First name is required',
                              minLength: {
                                value: 2,
                                message:
                                  'First name must be at least 2 characters',
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
                            {...register('lastName', {
                              required: 'Last name is required',
                              minLength: {
                                value: 2,
                                message:
                                  'Last name must be at least 2 characters',
                              },
                            })}
                          />
                          {renderFieldError(errors.lastName, 'lastName')}
                        </div>
                      </div>

                      <div className={twoColumnGrid}>
                        <div className={formGroup}>
                          <label className={labelStyle}>
                            Email Address{' '}
                            <span className={requiredMark}>*</span>
                          </label>
                          <input
                            type="email"
                            className={inputStyle}
                            placeholder="your.email@company.com"
                            autoComplete="email"
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
                          <label className={labelStyle}>Phone Number</label>
                          <InputMask
                            mask="(___) ___-____"
                            replacement={{ _: /\d/ }}
                            type="tel"
                            className={inputStyle}
                            placeholder="(XXX) XXX-XXXX"
                            autoComplete="tel"
                            {...register('phoneNumber')}
                          />
                          {renderFieldError(errors.phoneNumber, 'phoneNumber')}
                        </div>
                      </div>
                    </div>

                    {/* Company Information Section */}
                    <div className={formSection}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <div className={sectionNumber}>
                          <span className={sectionNumberText}>2</span>
                        </div>
                        <h3 className={sectionTitle}>Company Information</h3>
                      </div>

                      <div className={twoColumnGrid}>
                        <div className={formGroup}>
                          <label className={labelStyle}>Company Name</label>
                          <input
                            type="text"
                            className={inputStyle}
                            placeholder="Your practice name"
                            autoComplete="organization"
                            {...register('companyName')}
                          />
                          {renderFieldError(errors.companyName, 'companyName')}
                        </div>

                        <div className={formGroup}>
                          <label className={labelStyle}>State</label>
                          <select
                            className={selectStyle}
                            autoComplete="address-level1"
                            {...register('state')}
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
                        </div>
                      </div>

                      <div className={twoColumnGrid}>
                        <div className={formGroup}>
                          <label className={labelStyle}>Number of Staff</label>
                          <select
                            className={selectStyle}
                            {...register('numberOfStaff')}
                          >
                            <option value="" style={{ color: '#9ca3af' }}>
                              Select team size
                            </option>
                            {staffSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                          {renderFieldError(
                            errors.numberOfStaff,
                            'numberOfStaff',
                          )}
                        </div>

                        <div className={formGroup}>
                          <label className={labelStyle}>
                            Disciplines/Specialties
                          </label>
                          <input
                            type="text"
                            className={inputStyle}
                            placeholder="ABA, OT, PT, Speech, etc."
                            {...register('disciplines')}
                          />
                          {renderFieldError(errors.disciplines, 'disciplines')}
                        </div>
                      </div>
                    </div>

                    {/* Additional Information Section */}
                    <div className={formSection}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <div className={sectionNumber}>
                          <span className={sectionNumberText}>3</span>
                        </div>
                        <h3 className={sectionTitle}>Additional Information</h3>
                        <label className={labelStyle}>
                          (Tell us about your needs and challenges)
                        </label>
                      </div>

                      <div className={twoColumnGrid}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              padding: '0.875rem',
                              borderRadius: '0.5rem',
                              background:
                                'linear-gradient(to right, rgb(250, 245, 255), rgb(239, 246, 255))',
                              border: '1px solid rgb(233, 213, 255)',
                            }}
                          >
                            <input
                              type="checkbox"
                              id="hasExperience"
                              className={checkboxInput}
                              style={{ marginTop: '0.125rem' }}
                              {...register('hasExperience')}
                            />
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                                flex: '1',
                              }}
                            >
                              <label
                                htmlFor="hasExperience"
                                className={checkboxLabel}
                              >
                                I have experience with other billing software
                              </label>
                              <p className={checkboxHelperText}>
                                Let us know your current setup
                              </p>
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
                                  Which billing software?
                                </label>
                                <input
                                  type="text"
                                  className={inputStyle}
                                  placeholder="e.g., Therabill, WebPT"
                                  {...register('previousSoftware')}
                                />
                                {renderFieldError(
                                  errors.previousSoftware,
                                  'previousSoftware',
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className={formGroup}>
                          <textarea
                            className={textareaStyle}
                            placeholder="What billing challenges are you facing? What are your main goals? Any specific requirements?"
                            rows={4}
                            {...register('comments')}
                          />
                          {renderFieldError(errors.comments, 'comments')}
                        </div>
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

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={submitButton}
                      >
                        {isSubmitting ? (
                          <>
                            <span className={loadingSpinner}></span>
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5 mr-2" />
                            Send My Request
                          </>
                        )}
                      </button>
                      <p className={bottomHelperText}>
                        🔒 Your information is secure and will only be used to
                        provide you with a personalized consultation. We&apos;ll
                        respond within 24 hours with next steps.
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
