'use client';

import { InputMask, unformat } from '@react-input/mask';
import { AlertCircle, Check, Loader2, Rocket, X } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import {
  actionButtons,
  cancelButton,
  closeButton,
  errorBanner,
  errorMessage,
  fieldWrapper,
  formGrid,
  formGroup,
  formGroupFull,
  formWrapper,
  inputError,
  inputStyle,
  inputValid,
  labelStyle,
  loadingSpinner,
  locationRow,
  modalContainer,
  modalContent,
  modalHeader,
  modalOverlay,
  modalSubtitle,
  modalTitle,
  progressBar,
  progressBarFill,
  requiredIndicator,
  sectionHeader,
  selectStyle,
  submitButton,
} from './styles.css';
import SuccessModal from './SuccessModal';
import { formatNPI, formatTaxId, phoneTrack } from './utils';

type FreeTrialInputs = {
  // Clinic Details
  clinicName: string;
  taxId: string;
  npi?: string;
  addressLine1: string;
  addressLine2?: string;
  state: string;
  city: string;
  zipCode: string;
  timezone: string;

  // Primary Contact Information
  fullName: string;
  email: string;
  phoneNumber: string;
};

type StateOption = {
  id: number;
  name: string;
  code: string;
  timezones: Array<{
    timezone_id: number;
    timezone: {
      timezone: string;
    };
  }>;
};

type CityOption = {
  id: string;
  name: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const FreeTrialModal: FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<{
    success?: boolean;
    message?: string;
  }>();
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<FreeTrialInputs>({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const selectedState = watch('state');
  const selectedCity = watch('city');

  // Fetch states on component mount
  useEffect(() => {
    if (isOpen) {
      fetchStates();
    }
  }, [isOpen]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
      // Auto-populate timezone based on state
      const state = states.find((s) => s.id.toString() === selectedState);
      if (state?.timezones?.[0]?.timezone?.timezone) {
        setValue('timezone', state.timezones[0].timezone.timezone);
      }
    } else {
      setCities([]);
      setValue('city', '');
      setValue('timezone', '');
    }
  }, [selectedState, states, setValue]);

  const fetchStates = async () => {
    setLoadingStates(true);
    try {
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

      const result = await response.json();

      if (result.status_code === 200 && result.data?.rows) {
        setStates(result.data.rows);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoadingStates(false);
    }
  };

  const fetchCities = async (stateId: string) => {
    setLoadingCities(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}states/${stateId}/cities?page=1&limit=500`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }

      const result = await response.json();
      setCities(result.data.rows || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleClose = () => {
    reset();
    setSubmitResponse({});
    setApiErrors({});
    onClose();
  };

  const onSubmit: SubmitHandler<FreeTrialInputs> = async (data) => {
    setSubmitResponse({});
    setApiErrors({});
    setSubmitting(true);

    // TODO: Uncomment when API is ready
    // try {
    //   const apiUrl = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;
    //   const response = await fetch(`${apiUrl}/v1/clinics/free-trial`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       clinic_name: data.clinicName,
    //       tax_id: data.taxId,
    //       npi: data.npi,
    //       address_line_1: data.addressLine1,
    //       address_line_2: data.addressLine2,
    //       state_id: data.state,
    //       city_id: data.city,
    //       zip_code: data.zipCode,
    //       timezone: data.timezone,
    //       contact_name: data.fullName,
    //       contact_email: data.email,
    //       contact_phone: data.phoneNumber,
    //     }),
    //   });

    //   if (response.ok) {
    //     setSubmitResponse({
    //       success: true,
    //       message: 'Welcome to S Cubed! Your trial has started.',
    //     });

    //     setTimeout(() => {
    //       handleClose();
    //       if (onSuccess) {
    //         onSuccess();
    //       }
    //     }, 2000);
    //   } else {
    //     const errorData = await response.json();
    //     if (response.status === 422 && errorData.errors) {
    //       const fieldErrors: Record<string, string> = {};
    //       errorData.errors.forEach((error: any) => {
    //         if (error.field && error.message) {
    //           fieldErrors[error.field] = error.message;
    //         }
    //       });
    //       setApiErrors(fieldErrors);
    //       setSubmitResponse({
    //         success: false,
    //         message: 'Please correct the errors and try again.',
    //       });
    //     } else {
    //       setSubmitResponse({
    //         success: false,
    //         message:
    //           errorData.message || 'An error occurred. Please try again.',
    //       });
    //     }
    //   }
    // } catch (error) {
    //   setSubmitResponse({
    //     success: false,
    //     message: 'Network error. Please check your connection and try again.',
    //   });
    // } finally {
    //   setSubmitting(false);
    // }

    // Demo mode - Always succeed
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitResponse({
        success: true,
        message: 'Welcome to S Cubed! Your trial has started.',
      });
    } catch (error) {
      // This shouldn't happen in demo mode, but keeping for safety
      setSubmitResponse({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    const totalFields = 12; // Total required fields
    const filledFields = Object.keys(dirtyFields).filter(
      (key) => !errors[key as keyof FreeTrialInputs],
    ).length;
    return Math.min((filledFields / totalFields) * 100, 100);
  };

  const isFieldValid = (fieldName: keyof FreeTrialInputs) => {
    return (
      touchedFields[fieldName] && !errors[fieldName] && !apiErrors[fieldName]
    );
  };

  const getInputClassName = (fieldName: keyof FreeTrialInputs) => {
    if (errors[fieldName] || apiErrors[fieldName])
      return `${inputStyle} ${inputError}`;
    if (isFieldValid(fieldName)) return `${inputStyle} ${inputValid}`;
    return inputStyle;
  };

  const getSelectClassName = (fieldName: keyof FreeTrialInputs) => {
    if (errors[fieldName] || apiErrors[fieldName])
      return `${selectStyle} ${inputError}`;
    if (isFieldValid(fieldName)) return `${selectStyle} ${inputValid}`;
    return selectStyle;
  };

  // Helper function to determine if we should show error text (not for required-only errors)
  const shouldShowError = (fieldName: keyof FreeTrialInputs) => {
    const fieldError = errors[fieldName];
    const apiError = apiErrors[fieldName];

    // Always show API errors
    if (apiError) return true;

    // Don't show error if it's just a required field error (no message)
    if (fieldError && fieldError.type === 'required') return false;

    // Show other validation errors (format, length, etc.)
    return !!fieldError;
  };

  // If submission was successful, render SuccessModal directly
  if (submitResponse?.success) {
    return (
      <SuccessModal
        onClose={handleClose}
        clinicName={watch('clinicName')}
        trialEndDate={new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
        timezone={watch('timezone') || 'IST'}
      />
    );
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      center={true}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      classNames={{
        modal: modalContent,
        overlay: modalOverlay,
      }}
      styles={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999999,
        },
        modal: {
          position: 'relative',
          margin: 0,
          maxWidth: '90vw',
          height: 'fit-content',
          minHeight: 'fit-content',
          maxHeight: 'calc(100vh - 40px)',
        },
      }}
      showCloseIcon={false}
    >
      <div className={modalContainer}>
        <button
          type="button"
          onClick={handleClose}
          className={closeButton}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className={modalHeader}>
              <h2 className={modalTitle}>Start Your 30-Day Free Trial</h2>
              <p className={modalSubtitle}>
                Complete this quick form to activate your free trial
              </p>
            </div>

            <div className={progressBar}>
              <div
                className={progressBarFill}
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <form className={formWrapper} onSubmit={handleSubmit(onSubmit)}>
              {submitResponse?.message && !submitResponse.success && (
                <div className={errorBanner}>
                  <AlertCircle size={20} />
                  <span>{submitResponse.message}</span>
                </div>
              )}

              <div className={sectionHeader}>Clinic Details</div>

              <div className={formGrid}>
                {/* Row 1: Clinic Name - Full width */}
                <div className={formGroupFull}>
                  <label className={labelStyle}>
                    Clinic Name<span className={requiredIndicator}>*</span>
                  </label>
                  <div className={fieldWrapper}>
                    <input
                      type="text"
                      className={getInputClassName('clinicName')}
                      placeholder="Enter clinic name"
                      {...register('clinicName', {
                        required: true, // Just validate, don't show message
                        minLength: { value: 2, message: 'Min 2 characters' },
                        maxLength: {
                          value: 100,
                          message: 'Max 100 characters',
                        },
                      })}
                    />
                    {isFieldValid('clinicName') && (
                      <Check
                        size={16}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '10px',
                          color: '#10b981',
                        }}
                      />
                    )}
                  </div>
                  {shouldShowError('clinicName') && (
                    <span className={errorMessage}>
                      {errors.clinicName?.message || apiErrors.clinic_name}
                    </span>
                  )}
                </div>

                {/* Row 2: Tax ID and NPI */}
                <div className={formGroup}>
                  <label className={labelStyle}>
                    Tax ID<span className={requiredIndicator}>*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClassName('taxId')}
                    placeholder="XX-XXXXXXX"
                    {...register('taxId', {
                      required: true, // Just validate, don't show message
                      pattern: {
                        value: /^\d{2}-\d{7}$/,
                        message: 'Format: XX-XXXXXXX',
                      },
                      onChange: (e) => {
                        const formatted = formatTaxId(e.target.value);
                        setValue('taxId', formatted);
                        return formatted;
                      },
                    })}
                  />
                  {shouldShowError('taxId') && (
                    <span className={errorMessage}>
                      {errors.taxId?.message || apiErrors.tax_id}
                    </span>
                  )}
                </div>

                <div className={formGroup}>
                  <label className={labelStyle}>NPI</label>
                  <input
                    type="text"
                    className={getInputClassName('npi')}
                    placeholder="10 digits (optional)"
                    {...register('npi', {
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Must be 10 digits',
                      },
                      onChange: (e) => {
                        const formatted = formatNPI(e.target.value);
                        setValue('npi', formatted);
                        return formatted;
                      },
                    })}
                  />
                  {(errors.npi || apiErrors.npi) && (
                    <span className={errorMessage}>
                      {errors.npi?.message || apiErrors.npi}
                    </span>
                  )}
                </div>

                {/* Row 3: Address Line 1 */}
                <div className={formGroupFull}>
                  <label className={labelStyle}>
                    Address Line 1<span className={requiredIndicator}>*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClassName('addressLine1')}
                    placeholder="Street address"
                    {...register('addressLine1', {
                      required: true, // Just validate, don't show message
                      minLength: { value: 5, message: 'Min 5 characters' },
                    })}
                  />
                  {(errors.addressLine1 || apiErrors.address_line_1) && (
                    <span className={errorMessage}>
                      {errors.addressLine1?.message || apiErrors.address_line_1}
                    </span>
                  )}
                </div>

                {/* Row 4: Address Line 2 */}
                <div className={formGroupFull}>
                  <label className={labelStyle}>Address Line 2</label>
                  <input
                    type="text"
                    className={inputStyle}
                    placeholder="Apt, suite, unit (optional)"
                    {...register('addressLine2')}
                  />
                </div>

                {/* Row 5: State, City, Zip - Special layout */}
                <div className={locationRow}>
                  <div className={fieldWrapper}>
                    <label className={labelStyle}>
                      State<span className={requiredIndicator}>*</span>
                    </label>
                    <select
                      className={getSelectClassName('state')}
                      {...register('state', { required: true })}
                      disabled={loadingStates}
                    >
                      <option value="">
                        {loadingStates ? 'Loading...' : 'Select State'}
                      </option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id.toString()}>
                          {state.name} ({state.code})
                        </option>
                      ))}
                    </select>
                    {(errors.state || apiErrors.state) && (
                      <span className={errorMessage}>
                        {errors.state?.message || apiErrors.state}
                      </span>
                    )}
                  </div>

                  <div className={fieldWrapper}>
                    <label className={labelStyle}>
                      City<span className={requiredIndicator}>*</span>
                    </label>
                    <select
                      className={getSelectClassName('city')}
                      {...register('city', { required: true })}
                      disabled={!selectedState || loadingCities}
                    >
                      <option value="">
                        {loadingCities ? 'Loading...' : 'Select City'}
                      </option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {(errors.city || apiErrors.city) && (
                      <span className={errorMessage}>
                        {errors.city?.message || apiErrors.city}
                      </span>
                    )}
                  </div>

                  <div className={fieldWrapper}>
                    <label className={labelStyle}>
                      Zip<span className={requiredIndicator}>*</span>
                    </label>
                    <input
                      type="text"
                      className={getInputClassName('zipCode')}
                      placeholder="XXXXX"
                      {...register('zipCode', {
                        required: true, // Just validate, don't show message
                        pattern: {
                          value: /^\d{5}(-\d{4})?$/,
                          message: 'Invalid',
                        },
                      })}
                    />
                    {(errors.zipCode || apiErrors.zip_code) && (
                      <span className={errorMessage}>
                        {errors.zipCode?.message || apiErrors.zip_code}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 6: Timezone */}
                <div className={formGroupFull}>
                  <label className={labelStyle}>
                    Timezone<span className={requiredIndicator}>*</span>
                  </label>
                  <select
                    className={getSelectClassName('timezone')}
                    {...register('timezone', {
                      required: true, // Just validate, don't show message
                    })}
                    disabled={!selectedState}
                  >
                    <option value="">
                      {!selectedState
                        ? 'Select a state first'
                        : 'Select Timezone'}
                    </option>
                    {selectedState &&
                      states
                        .find((s) => s.id.toString() === selectedState)
                        ?.timezones?.map((tz) => (
                          <option
                            key={tz.timezone_id}
                            value={tz.timezone.timezone}
                          >
                            {tz.timezone.timezone}
                          </option>
                        ))}
                  </select>
                  {(errors.timezone || apiErrors.timezone) && (
                    <span className={errorMessage}>
                      {errors.timezone?.message || apiErrors.timezone}
                    </span>
                  )}
                </div>
              </div>

              <div className={sectionHeader}>Primary Contact Information</div>

              <div className={formGrid}>
                {/* Row 1: Full Name */}
                <div className={formGroupFull}>
                  <label className={labelStyle}>
                    Full Name<span className={requiredIndicator}>*</span>
                  </label>
                  <input
                    type="text"
                    className={getInputClassName('fullName')}
                    placeholder="First and Last Name"
                    {...register('fullName', {
                      required: true, // Just validate, don't show message
                      minLength: { value: 2, message: 'Min 2 characters' },
                    })}
                  />
                  {(errors.fullName || apiErrors.contact_name) && (
                    <span className={errorMessage}>
                      {errors.fullName?.message || apiErrors.contact_name}
                    </span>
                  )}
                </div>

                {/* Row 2: Email and Phone */}
                <div className={formGroup}>
                  <label className={labelStyle}>
                    Email Address<span className={requiredIndicator}>*</span>
                  </label>
                  <input
                    type="email"
                    className={getInputClassName('email')}
                    placeholder="email@example.com"
                    {...register('email', {
                      required: true, // Just validate, don't show message
                      validate: (value) => isEmail(value) || 'Invalid email',
                    })}
                  />
                  {(errors.email || apiErrors.contact_email) && (
                    <span className={errorMessage}>
                      {errors.email?.message || apiErrors.contact_email}
                    </span>
                  )}
                </div>

                <div className={formGroup}>
                  <label className={labelStyle}>
                    Phone Number<span className={requiredIndicator}>*</span>
                  </label>
                  <InputMask
                    type="text"
                    track={phoneTrack}
                    mask="+_ (___) ___-____"
                    replacement={{ _: /\d/ }}
                    className={getInputClassName('phoneNumber')}
                    placeholder="(XXX) XXX-XXXX"
                    {...register('phoneNumber', {
                      required: true, // Just validate, don't show message
                      validate: (phone) =>
                        isMobilePhone(phone, 'en-US', { strictMode: false }) ||
                        'Invalid phone',
                      setValueAs: (value: string) =>
                        unformat(value, {
                          mask: '+1 (___) ___-____',
                          replacement: { _: /\d/ },
                        }),
                    })}
                  />
                  {(errors.phoneNumber || apiErrors.contact_phone) && (
                    <span className={errorMessage}>
                      {errors.phoneNumber?.message || apiErrors.contact_phone}
                    </span>
                  )}
                </div>
              </div>

              <div className={actionButtons}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={cancelButton}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className={loadingSpinner} />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Rocket size={18} />
                      Start Free Trial
                    </>
                  )}
                </button>
              </div>
            </form>
      </div>
    </Modal>
  );
};

export default FreeTrialModal;
