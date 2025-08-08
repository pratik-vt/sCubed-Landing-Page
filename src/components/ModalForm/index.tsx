import React, { useState, FC } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import { InputMask, Track, unformat } from '@react-input/mask';

import Button from '../Button/button';

import {
  buttonStyle,
  container,
  content,
  errorMessageStyle,
  formGroupStyle,
  formWrapper,
  heading,
  inputControlStyle,
  labelStyle,
  requiredIndicatorStyle,
  submitButtonStyle,
  successMessageStyle,
  textAreaControlStyle,
  checkboxControlStyle,
  checkboxLabelStyle,
} from './styles.css';

type Props = {
  buttonColor: string;
  buttonBackground: string;
  buttonWidth?: string;
};

type Inputs = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email_id: string;
  state: string;
  specialities: string;
  other_software_experience: boolean;
  company_name?: string;
  staff?: number;
  software_name?: string;
  comments?: string;
};

type FieldError = {
  field: string;
  message: string;
};

type ApiErrorResponse = {
  errors: FieldError[];
  status_code: number;
};

const defaultErrorMessage =
  'An unexpected error has occurred. Please try again later.';

const ModalForm: FC<Props> = ({
  buttonColor,
  buttonBackground,
  buttonWidth,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState<{
    success?: boolean;
    message?: string;
  }>();
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
  } = useForm<Inputs>();

  const watchOtherSoftwareExperience = watch('other_software_experience');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    reset();
    setResponse({});
    setSubmitting(false);
    setApiErrors({});
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setResponse({});
    setApiErrors({});
    setSubmitting(true);
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}pages/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        setSubmitting(false);
        if (res.ok || res.status === 200) {
          reset();
          setApiErrors({});
          setResponse({
            success: true,
            message:
              'Thank you for your interest in our services! Our team will be in touch shortly.',
          });
        } else {
          if (res.status === 422) {
            const json: ApiErrorResponse = await res.json();
            if (json?.errors && Array.isArray(json.errors)) {
              // Set field-specific errors
              const fieldErrors: Record<string, string> = {};
              json.errors.forEach((error) => {
                if (error.field && error.message) {
                  fieldErrors[error.field] = error.message;
                }
              });
              setApiErrors(fieldErrors);

              // Also set a general message if there are errors
              const generalErrors = json.errors.filter((err) => !err.field);
              if (generalErrors.length > 0) {
                setResponse({
                  success: false,
                  message: generalErrors.map((err) => err.message).join('\n'),
                });
              }
            } else {
              setResponse({
                success: false,
                message: 'Validation failed. Please check your inputs.',
              });
            }
          } else {
            setResponse({
              success: false,
              message: defaultErrorMessage,
            });
          }
        }
      })
      .catch(() => {
        setSubmitting(false);
        setResponse({
          success: false,
          message: defaultErrorMessage,
        });
      });
  };

  const track: Track = ({
    inputType,
    value,
    data,
    selectionStart,
    selectionEnd,
  }) => {
    if (inputType === 'insert' && !/^\D*1/.test(data) && selectionStart <= 1) {
      return `1${data}`;
    }

    if (
      inputType !== 'insert' &&
      selectionStart <= 1 &&
      selectionEnd < value.length
    ) {
      if (selectionEnd > 2) {
        return '1';
      }
      if (selectionEnd === 2) {
        return false;
      }
    }

    return data;
  };

  return (
    <div className={container}>
      <Button
        className={buttonStyle}
        color={buttonColor}
        backgroundColor={buttonBackground}
        width={buttonWidth ?? '180px'}
        onClick={onOpenModal}
      >
        BOOK A DEMO
      </Button>
      <Modal open={open} onClose={onCloseModal} center>
        <form
          className={formWrapper}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          {response?.success ? (
            <div className={successMessageStyle}>{response?.message}</div>
          ) : (
            <>
              <h3 className={heading}>Request a Demo</h3>
              <p className={content}>
                Please provide a few details about yourself, and our friendly
                team of experts will reach out to offer support and arrange a
                demo at your convenience.
              </p>

              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  First Name<span className={requiredIndicatorStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('first_name', {
                    required: 'First name is required',
                    setValueAs: (value: string) => value.trim(),
                    maxLength: {
                      value: 50,
                      message:
                        'The length of first name must be 50 characters or fewer.',
                    },
                  })}
                />
                {(touchedFields.first_name || apiErrors.first_name) && (
                  <div className={errorMessageStyle}>
                    {errors?.first_name?.message || apiErrors.first_name}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  Last Name<span className={requiredIndicatorStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('last_name', {
                    required: 'Last name is required',
                    setValueAs: (value: string) => value.trim(),
                    maxLength: {
                      value: 50,
                      message:
                        'The length of last name must be 50 characters or fewer.',
                    },
                  })}
                />
                {(touchedFields.last_name || apiErrors.last_name) && (
                  <div className={errorMessageStyle}>
                    {errors?.last_name?.message || apiErrors.last_name}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  Email<span className={requiredIndicatorStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('email_id', {
                    required: 'Email is required',
                    validate: (email) => {
                      return isEmail(email) ? true : 'Email is not valid';
                    },
                    maxLength: {
                      value: 100,
                      message:
                        'The length of email must be 100 characters or fewer.',
                    },
                  })}
                />
                {(errors?.email_id || apiErrors.email_id) && (
                  <div className={errorMessageStyle}>
                    {errors?.email_id?.message || apiErrors.email_id}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  Phone Number<span className={requiredIndicatorStyle}>*</span>
                </label>
                <InputMask
                  type="text"
                  track={track}
                  mask="+_ (___) ____-___"
                  replacement={{ _: /\d/ }}
                  className={inputControlStyle}
                  {...register('phone_number', {
                    required: 'Phone number is required',
                    validate: (phone) => {
                      return isMobilePhone(phone, 'en-US', {
                        strictMode: false,
                      })
                        ? true
                        : 'Phone number is not valid';
                    },
                    setValueAs: (value: string) =>
                      unformat(value, {
                        mask: '+1 (___) ____-___',
                        replacement: { _: /\d/ },
                      }),
                  })}
                />
                {(errors?.phone_number || apiErrors.phone_number) && (
                  <div className={errorMessageStyle}>
                    {errors?.phone_number?.message || apiErrors.phone_number}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>Company</label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('company_name', {
                    maxLength: {
                      value: 200,
                      message:
                        'The length of company name must be 200 characters or fewer.',
                    },
                    setValueAs: (value: string) => value?.trim(),
                  })}
                />
                {(errors?.company_name || apiErrors.company_name) && (
                  <div className={errorMessageStyle}>
                    {errors?.company_name?.message || apiErrors.company_name}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  State<span className={requiredIndicatorStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('state', {
                    required: 'State is required',
                    setValueAs: (value: string) => value.trim(),
                    maxLength: {
                      value: 50,
                      message:
                        'The length of state must be 50 characters or fewer.',
                    },
                  })}
                />
                {(touchedFields.state || apiErrors.state) && (
                  <div className={errorMessageStyle}>
                    {errors?.state?.message || apiErrors.state}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  Specialities<span className={requiredIndicatorStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('specialities', {
                    required: 'Specialities is required',
                    setValueAs: (value: string) => value.trim(),
                    maxLength: {
                      value: 100,
                      message:
                        'The length of specialities must be 100 characters or fewer.',
                    },
                  })}
                />
                {(touchedFields.specialities || apiErrors.specialities) && (
                  <div className={errorMessageStyle}>
                    {errors?.specialities?.message || apiErrors.specialities}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>Number of Staff</label>
                <input
                  type="number"
                  className={inputControlStyle}
                  {...register('staff', {
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: 'Staff must be at least 1',
                    },
                  })}
                />
                {(errors?.staff || apiErrors.staff) && (
                  <div className={errorMessageStyle}>
                    {errors?.staff?.message || apiErrors.staff}
                  </div>
                )}
              </div>
              <div className={formGroupStyle}>
                <label className={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    className={checkboxControlStyle}
                    {...register('other_software_experience')}
                  />
                  Do you have experience with other therapy practice management
                  software?
                </label>
                {apiErrors.other_software_experience && (
                  <div className={errorMessageStyle}>
                    {apiErrors.other_software_experience}
                  </div>
                )}
              </div>
              {watchOtherSoftwareExperience && (
                <div className={formGroupStyle}>
                  <label className={labelStyle}>
                    Software Name
                    <span className={requiredIndicatorStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    className={inputControlStyle}
                    {...register('software_name', {
                      required: watchOtherSoftwareExperience
                        ? 'Software name is required when you have experience with other software'
                        : false,
                      setValueAs: (value: string) => value?.trim(),
                      maxLength: {
                        value: 200,
                        message:
                          'The length of software name must be 200 characters or fewer.',
                      },
                    })}
                  />
                  {(errors?.software_name || apiErrors.software_name) && (
                    <div className={errorMessageStyle}>
                      {errors?.software_name?.message ||
                        apiErrors.software_name}
                    </div>
                  )}
                </div>
              )}
              <div className={formGroupStyle}>
                <label className={labelStyle}>Comments</label>
                <textarea
                  className={textAreaControlStyle}
                  {...register('comments', {
                    setValueAs: (value: string) => value?.trim(),
                  })}
                ></textarea>
                {apiErrors.comments && (
                  <div className={errorMessageStyle}>{apiErrors.comments}</div>
                )}
              </div>
              <div
                className={errorMessageStyle}
                style={{ whiteSpace: 'pre-line' }}
              >
                {response?.message}
              </div>
              <button
                className={submitButtonStyle}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default ModalForm;
