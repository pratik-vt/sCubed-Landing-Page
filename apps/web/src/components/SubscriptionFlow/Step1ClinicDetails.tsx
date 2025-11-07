'use client';

import {
  AlertCircle,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  UserCog,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import { PhoneInput, TextInput } from './FormComponents';
import * as styles from './styles.css';

import { useLocationData } from '@/hooks/useLocationData';
import type {
  RegistrationResponseData,
  Step1FormData,
  Step1Props,
} from '@/types/subscription';
import { SUCCESS_MESSAGES } from '../../constants/messages';
import { fetchApi } from '../../lib/api-client';
import { getFieldErrors, showSuccessToast } from '../../lib/errors';
import { isApiError } from '../../types/api';

/**
 * Internal form data type - uses string IDs for state/city (like FreeTrialModal)
 */
interface InternalFormData extends Omit<Step1FormData, 'state' | 'city'> {
  state: string;
  city: string;
}

/**
 * Step 1: Clinic and Admin Details Form (Now Step 2 in new flow)
 * Collects all information except payment details
 * For FREE plans: Calls PUT /register API with complete data (old flow)
 * For PAID plans: Calls PUT /register API with draft_mode: true (clinic/admin/address only)
 */
export default function Step1ClinicDetails({
  onNext,
  onBack,
  initialData,
  selectedPlan,
  billingCycle = 'monthly',
  clinic_onboarding_request_id,
}: Readonly<Step1Props>) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InternalFormData>({
    mode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      clinic_name: initialData?.clinic_name || '',
      tax_id: initialData?.tax_id || '',
      npi: initialData?.npi || '',
      street_address_line_1: initialData?.street_address_line_1 || '',
      street_address_line_2: initialData?.street_address_line_2 || '',
      zip_code: initialData?.zip_code || '',
      email: initialData?.email || '',
      first_name: initialData?.first_name || '',
      last_name: initialData?.last_name || '',
      phone: initialData?.phone || '',
      subscription_plan_id:
        initialData?.subscription_plan_id || selectedPlan?.id || 1,
      staff_count: initialData?.staff_count || 1,
      // Handle both object and ID formats for state/city (for prefilling from API)
      state: initialData?.state?.id?.toString() || '',
      city: initialData?.city?.id?.toString() || '',
    },
  });

  // Update form when initialData changes (e.g., navigating back from cart)
  // This ensures all fields are pre-filled with saved data
  useEffect(() => {
    // Only reset if we have meaningful data to restore
    if (initialData && Object.keys(initialData).length > 0) {
      reset(
        {
          clinic_name: initialData?.clinic_name || '',
          tax_id: initialData?.tax_id || '',
          npi: initialData?.npi || '',
          street_address_line_1: initialData?.street_address_line_1 || '',
          street_address_line_2: initialData?.street_address_line_2 || '',
          zip_code: initialData?.zip_code || '',
          email: initialData?.email || '',
          first_name: initialData?.first_name || '',
          last_name: initialData?.last_name || '',
          phone: initialData?.phone || '',
          subscription_plan_id:
            initialData.subscription_plan_id || selectedPlan?.id || 1,
          staff_count: initialData?.staff_count || 1,
          state: initialData?.state?.id?.toString() || '',
          city: initialData?.city?.id?.toString() || '',
        },
        { keepDefaultValues: false },
      );
    }
  }, [
    initialData,
    initialData?.subscription_plan_id,
    initialData?.staff_count,
    reset,
  ]);

  // Update only subscription_plan_id when plan changes (without resetting the form)
  useEffect(() => {
    if (selectedPlan?.id && !initialData) {
      setValue('subscription_plan_id', selectedPlan.id);
    }
  }, [selectedPlan?.id, initialData, setValue]);

  const selectedState = watch('state');
  const selectedCity = watch('city');
  const { states, cities, loadingStates, loadingCities, apiError } =
    useLocationData(selectedState);

  // Restore city selection after cities are loaded (handles back navigation from cart)
  useEffect(() => {
    // Only restore if:
    // 1. Cities have finished loading
    // 2. We have cities available
    // 3. We have initialData with a city ID
    // 4. The current selected city doesn't match the initial city
    if (
      !loadingCities &&
      cities.length > 0 &&
      initialData?.city?.id &&
      selectedCity !== initialData.city.id.toString()
    ) {
      setValue('city', initialData.city.id.toString());
    }
  }, [loadingCities, cities, initialData?.city?.id, selectedCity, setValue]);

  // Get timezone from selected state
  const getSelectedStateTimezone = (): number | null => {
    if (!selectedState || !states.length) return null;

    const stateData = states.find(
      (state) => state.id.toString() === selectedState,
    );
    if (stateData?.timezones && stateData.timezones.length > 0) {
      return stateData.timezones[0].timezone_id;
    }

    return null;
  };

  // Helper function to determine if error should be shown (following FreeTrialModal pattern)
  const shouldShowError = (fieldName: keyof InternalFormData) => {
    const fieldError = errors[fieldName];
    const apiFieldError = fieldErrors[fieldName];

    // Show API errors always
    if (apiFieldError) return true;

    // Only hide required errors that don't have a message
    if (fieldError?.type === 'required' && !fieldError.message) return false;
    return !!fieldError;
  };

  // Get error message (prioritize API errors over form validation errors)
  const getErrorMessage = (fieldName: keyof InternalFormData) => {
    if (fieldErrors[fieldName]) {
      return { message: fieldErrors[fieldName], type: 'server' as const };
    }
    return errors[fieldName];
  };

  const onSubmit = async (data: InternalFormData) => {
    setFieldErrors({});

    try {
      const timezoneId = getSelectedStateTimezone();
      const isPaidPlan = data.subscription_plan_id > 1;

      const stateData = states.find((s) => s.id.toString() === data.state);
      const cityData = cities.find((c) => c.id.toString() === data.city);

      const formData: Step1FormData = {
        ...data,
        state: stateData || null,
        city: cityData || null,
        timezone_id: timezoneId || 1,
      };

      // For PAID plans: Call API with draft_mode: true (clinic/admin/address only)
      if (isPaidPlan) {
        const draftPayload: Record<string, unknown> = {
          clinic_onboarding_request_id,
          draft_mode: true,
          clinic_name: data.clinic_name,
          tax_id: data.tax_id,
          npi: data.npi || undefined,
          street_address_line_1: data.street_address_line_1,
          street_address_line_2: data.street_address_line_2 || undefined,
          city_id: Number.parseInt(data.city),
          state_id: Number.parseInt(data.state),
          zip_code: data.zip_code,
          timezone_id: timezoneId || 1,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
        };

        // Call API in draft mode
        await fetchApi<RegistrationResponseData>(
          'subscriptions/onboarding/register',
          {
            method: 'PUT',
            body: draftPayload,
          },
        );

        // Success! Pass data to cart for final submission
        onNext(formData);
        return;
      }

      // For FREE plans: Call /register API with complete data (old flow)
      // Construct URLs for potential redirects
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const success_url = `${baseUrl}/subscribe/success`;
      const cancel_url = `${baseUrl}/subscribe`;

      const apiPayload: Record<string, unknown> = {
        clinic_name: data.clinic_name,
        tax_id: data.tax_id,
        npi: data.npi || undefined,
        street_address_line_1: data.street_address_line_1,
        street_address_line_2: data.street_address_line_2 || undefined,
        city_id: Number.parseInt(data.city),
        state_id: Number.parseInt(data.state),
        zip_code: data.zip_code,
        timezone_id: timezoneId || 1,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        subscription_plan_id: data.subscription_plan_id,
        staff_count: data.staff_count,
        clinic_onboarding_request_id,
        // Stripe redirect URLs
        success_url,
        cancel_url,
      };

      // Use the centralized API client (changed to PUT method)
      // Note: fetchApi automatically unwraps the .data field from the response
      const result = await fetchApi<RegistrationResponseData>(
        'subscriptions/onboarding/register',
        {
          method: 'PUT',
          body: apiPayload,
        },
      );

      // Success! Show toast and move to next step
      showSuccessToast(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);

      onNext(formData, result);
    } catch (error) {
      // Extract field errors for inline display
      if (isApiError(error)) {
        const extractedFieldErrors = getFieldErrors(error);
        setFieldErrors(extractedFieldErrors);
      }
      // General errors are automatically shown as toasts by fetchApi
    }
  };

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors);
    console.log(
      'All error types:',
      Object.entries(errors).map(
        ([key, value]: [string, any]) =>
          `${key}: ${value.type} - ${value.message}`,
      ),
    );
  };

  // Calculate form completion progress
  const formValues = watch();
  const formProgress = useMemo(() => {
    const requiredFields = [
      'clinic_name',
      'tax_id',
      'street_address_line_1',
      'state',
      'city',
      'zip_code',
      'email',
      'first_name',
      'last_name',
      'phone',
    ];
    const filledFields = requiredFields.filter((field) => {
      const value = formValues[field as keyof typeof formValues];
      return value && value.toString().trim() !== '';
    });
    return Math.round((filledFields.length / requiredFields.length) * 100);
  }, [formValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
        Let's Get Started
      </h1>
      <p
        className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.1s' }}
      >
        Tell us about your practice to create your S Cubed account
      </p>

      {/* Form Progress Bar */}
      <div
        className={styles.formProgressBar}
        style={{ animationDelay: '0.2s' }}
      >
        <div
          className={`${styles.formProgressFill} ${formProgress === 100 ? styles.formProgressComplete : ''}`}
          style={{ width: `${formProgress}%` }}
        />
      </div>
      <p
        style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '2rem',
          animation: `${styles.animations.fadeInUp} 0.6s ease-out`,
          animationDelay: '0.3s',
          animationFillMode: 'both',
        }}
      >
        {formProgress}% Complete
      </p>

      {apiError && (
        <div
          className={`${styles.alertContainer} ${styles.alertError} ${styles.alertWithAnimation}`}
        >
          <AlertCircle size={20} />
          <span>{apiError}</span>
        </div>
      )}

      {/* Clinic Information */}
      <div
        className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.4s' }}
      >
        <div className={styles.sectionCardHeader}>
          <div className={styles.sectionNumber}>1</div>
          <div className={styles.sectionHeaderContent}>
            <Building2 size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Clinic Information</h2>
          </div>
        </div>

        <TextInput
          label="Clinic Name"
          required
          placeholder="ABC Therapy Center"
          registration={register('clinic_name', {
            required: 'Clinic name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
            maxLength: { value: 200, message: 'Maximum 200 characters' },
          })}
          error={
            shouldShowError('clinic_name')
              ? getErrorMessage('clinic_name')
              : undefined
          }
        />

        <div className={styles.formGrid}>
          <TextInput
            label="Tax ID (EIN)"
            required
            placeholder="123456789"
            maxLength={9}
            registration={register('tax_id', {
              required: 'Tax ID is required',
              pattern: {
                value: /^\d{9}$/,
                message: 'Tax ID must be exactly 9 digits',
              },
            })}
            error={
              shouldShowError('tax_id') ? getErrorMessage('tax_id') : undefined
            }
            helpText="9-digit Employer Identification Number"
          />

          <TextInput
            label="NPI"
            required
            placeholder="1234567890"
            maxLength={10}
            registration={register('npi', {
              required: 'NPI is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'NPI must be exactly 10 digits',
              },
            })}
            error={shouldShowError('npi') ? getErrorMessage('npi') : undefined}
            helpText="10-digit National Provider Identifier"
          />
        </div>
      </div>

      {/* Location Information */}
      <div
        className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.5s' }}
      >
        <div className={styles.sectionCardHeader}>
          <div className={styles.sectionNumber}>2</div>
          <div className={styles.sectionHeaderContent}>
            <MapPin size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Location</h2>
          </div>
        </div>

        <TextInput
          label="Street Address"
          required
          placeholder="123 Main Street"
          registration={register('street_address_line_1', {
            required: 'Street address is required',
            minLength: { value: 5, message: 'Minimum 5 characters' },
            maxLength: { value: 200, message: 'Maximum 200 characters' },
          })}
          error={
            shouldShowError('street_address_line_1')
              ? getErrorMessage('street_address_line_1')
              : undefined
          }
        />

        <TextInput
          label="Address Line 2 (Optional)"
          placeholder="Suite 200"
          registration={register('street_address_line_2', {
            maxLength: {
              value: 200,
              message: 'Maximum 200 characters',
            },
          })}
          error={
            shouldShowError('street_address_line_2')
              ? getErrorMessage('street_address_line_2')
              : undefined
          }
        />

        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.label}>
              State <span className={styles.requiredIndicator}>*</span>
            </label>
            <select
              className={`${styles.select} ${styles.inputLarge} ${errors.state ? `${styles.inputError} ${styles.shakeAnimation}` : ''}`}
              disabled={loadingStates}
              {...register('state', { required: 'State is required' })}
            >
              <option value="">
                {loadingStates ? 'Loading states...' : 'Select a state'}
              </option>
              {states.map((option) => (
                <option key={option.id} value={option.id.toString()}>
                  {option.name} ({option.code})
                </option>
              ))}
            </select>
            {shouldShowError('state') && getErrorMessage('state') && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{getErrorMessage('state')?.message}</span>
              </div>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              City <span className={styles.requiredIndicator}>*</span>
            </label>
            <select
              className={`${styles.select} ${styles.inputLarge} ${errors.city ? `${styles.inputError} ${styles.shakeAnimation}` : ''}`}
              disabled={!selectedState || loadingCities}
              {...register('city', { required: 'City is required' })}
            >
              <option value="">
                {!selectedState
                  ? 'Select a state first'
                  : loadingCities
                    ? 'Loading cities...'
                    : 'Select a city'}
              </option>
              {cities.map((option) => (
                <option key={option.id} value={option.id.toString()}>
                  {option.name}
                </option>
              ))}
            </select>
            {shouldShowError('city') && getErrorMessage('city') && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{getErrorMessage('city')?.message}</span>
              </div>
            )}
          </div>
        </div>

        <TextInput
          label="ZIP Code"
          required
          placeholder="12345"
          maxLength={5}
          registration={register('zip_code', {
            required: 'ZIP code is required',
            pattern: {
              value: /^\d{5}$/,
              message: 'ZIP code must be 5 digits',
            },
          })}
          error={
            shouldShowError('zip_code')
              ? getErrorMessage('zip_code')
              : undefined
          }
          helpText="Timezone will be automatically selected based on your state"
        />
      </div>

      {/* Admin Information */}
      <div
        className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.6s' }}
      >
        <div className={styles.sectionCardHeader}>
          <div className={styles.sectionNumber}>3</div>
          <div className={styles.sectionHeaderContent}>
            <UserCog size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Admin Account</h2>
          </div>
        </div>

        <TextInput
          label="Email Address"
          type="email"
          required
          placeholder="admin@abctherapy.com"
          registration={register('email', {
            required: 'Email is required',
            validate: (value) => isEmail(value) || 'Invalid email address',
            maxLength: { value: 100, message: 'Maximum 100 characters' },
          })}
          error={
            shouldShowError('email') ? getErrorMessage('email') : undefined
          }
          helpText="This email has been verified"
          disabled
        />

        <div className={styles.formGrid}>
          <TextInput
            label="First Name"
            required
            placeholder="John"
            registration={register('first_name', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
              maxLength: { value: 100, message: 'Maximum 100 characters' },
            })}
            error={
              shouldShowError('first_name')
                ? getErrorMessage('first_name')
                : undefined
            }
          />

          <TextInput
            label="Last Name"
            required
            placeholder="Doe"
            registration={register('last_name', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
              maxLength: { value: 100, message: 'Maximum 100 characters' },
            })}
            error={
              shouldShowError('last_name')
                ? getErrorMessage('last_name')
                : undefined
            }
          />
        </div>

        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone number is required',
            validate: (phone) =>
              isMobilePhone(phone, 'en-US', { strictMode: false }) ||
              'Invalid phone number',
          }}
          render={({ field }) => (
            <PhoneInput
              label="Phone Number"
              required
              placeholder="(555) 123-4567"
              name="phone"
              value={field.value}
              onChange={field.onChange}
              error={
                shouldShowError('phone') ? getErrorMessage('phone') : undefined
              }
              helpText="10-digit US phone number"
            />
          )}
        />
      </div>

      {/* Form Actions */}
      <div className={styles.buttonGroup}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonSecondary}`}
            disabled={isSubmitting}
          >
            <ChevronLeft
              size={20}
              style={{ transition: 'transform 0.2s ease' }}
            />
            Back
          </button>
        )}
        {!onBack && <div />}
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
          disabled={isSubmitting || loadingStates}
        >
          {isSubmitting ? (
            <>
              <span className={styles.loadingSpinner} /> Processing...
            </>
          ) : (
            <>
              Continue to Review
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
        button:not(:disabled):hover svg:first-child {
          transform: translateX(-4px);
        }
      `}</style>
    </form>
  );
}
