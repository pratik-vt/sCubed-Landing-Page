'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { recaptchaContainer, recaptchaError } from './styles.css';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: () => void;
  onExpired?: () => void;
  error?: string | null;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
  getValue: () => string | null;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, onError, onExpired, error, theme = 'light', size = 'normal' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      },
      execute: () => {
        recaptchaRef.current?.execute();
      },
      getValue: () => {
        return recaptchaRef.current?.getValue() || null;
      },
    }));

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error('reCAPTCHA site key is not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.');
      return (
        <div className={recaptchaContainer}>
          <div className={recaptchaError}>
            reCAPTCHA configuration error. Please contact support.
          </div>
        </div>
      );
    }

    return (
      <div className={recaptchaContainer}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={onVerify}
          onError={onError}
          onExpired={onExpired}
          theme={theme}
          size={size}
        />
        {error && <div className={recaptchaError}>{error}</div>}
      </div>
    );
  }
);

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;
