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
} from './styles.css';

type Props = {
  buttonColor: string;
  buttonBackground: string;
  buttonWidth?: string;
};

type Inputs = {
  name: string;
  email_address: string;
  phone_number: string;
  company_name: string;
  message: string;
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
    class?: string;
    message?: string;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<Inputs>();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    reset();
    setResponse({});
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setResponse({});
    setSubmitting(true);
    fetch(`${process.env.GATSBY_ADMIN_APP_API_URL}pages/demo-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        setSubmitting(false);
        if (res.ok) {
          reset();
          setResponse({
            class: successMessageStyle,
            message:
              'Thank you for your interest in our services! Our team will be in touch shortly.',
          });
        } else {
          if (res.status === 422) {
            const json = await res.json();
            const message = json?.errors
              ?.map((err: any) => err?.message)
              .join('\n');
            setResponse({
              class: errorMessageStyle,
              message,
            });
          } else {
            setResponse({
              class: errorMessageStyle,
              message: defaultErrorMessage,
            });
          }
        }
      })
      .catch(() => {
        setResponse({
          class: errorMessageStyle,
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
          <h3 className={heading}>Request a Demo</h3>
          <p className={content}>
            Please provide a few details about yourself, and our friendly team
            of experts will reach out to offer support and arrange a demo at
            your convenience.
          </p>
          {response?.class == successMessageStyle ? (
            <div className={response?.class} style={{ whiteSpace: 'pre-line' }}>
              {response?.message}
            </div>
          ) : (
            <>
              <div className={formGroupStyle}>
                <label className={labelStyle}>
                  Name<span className={requiredIndicatorStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={inputControlStyle}
                  {...register('name', {
                    required: 'Name is required',
                    setValueAs: (value: string) => value.trim(),
                    maxLength: {
                      value: 100,
                      message:
                        'The length of name must be 100 characters or fewer.',
                    },
                  })}
                />
                {touchedFields.name && (
                  <div className={errorMessageStyle}>
                    {errors?.name?.message}
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
                  {...register('email_address', {
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
                <div className={errorMessageStyle}>
                  {errors?.email_address?.message}
                </div>
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
                <div className={errorMessageStyle}>
                  {errors?.phone_number?.message}
                </div>
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
                <div className={errorMessageStyle}>
                  {errors?.company_name?.message}
                </div>
              </div>
              <div className={formGroupStyle}>
                <label className={labelStyle}>Message</label>
                <textarea
                  className={textAreaControlStyle}
                  {...register('message', {
                    maxLength: {
                      value: 800,
                      message:
                        'The length of message must be 800 characters or fewer.',
                    },
                    setValueAs: (value: string) => value?.trim(),
                  })}
                ></textarea>
                <div className={errorMessageStyle}>
                  {errors?.message?.message}
                </div>
              </div>
              <div
                className={response?.class}
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
