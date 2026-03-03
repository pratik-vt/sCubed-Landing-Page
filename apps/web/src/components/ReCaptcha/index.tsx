'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { NORMAL_WIDGET_MIN_WIDTH } from './constants';
import { recaptchaContainer, recaptchaContainerInvisible, recaptchaError } from './styles.css';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onError?: () => void;
  onExpired?: () => void;
  error?: string | null;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
  siteKey?: string; // Optional custom site key
}

export interface ReCaptchaRef {
  reset: () => void;
  execute: () => void;
  getValue: () => string | null;
}

const ReCaptcha = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  ({ onVerify, onError, onExpired, error, theme = 'light', size: propSize, siteKey: customSiteKey }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [responsiveSize, setResponsiveSize] = useState<'compact' | 'normal' | null>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width ?? 0;
        setResponsiveSize(width >= NORMAL_WIDGET_MIN_WIDTH ? 'normal' : 'compact');
      });

      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    const size = propSize || responsiveSize;
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

    // Use custom site key if provided, otherwise use default
    const siteKey = customSiteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error('reCAPTCHA site key is not configured. Please provide siteKey prop or set NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.');
      return (
        <div className={recaptchaContainer}>
          <div className={recaptchaError}>
            reCAPTCHA configuration error. Please contact support.
          </div>
        </div>
      );
    }

    const containerClass = size === 'invisible' ? recaptchaContainerInvisible : recaptchaContainer;

    // Wait for ResizeObserver to measure the container before rendering the widget.
    // Google's reCAPTCHA only renders once — the size cannot be changed after creation.
    // When propSize is provided (e.g., 'invisible'), size resolves immediately.
    if (!size) {
      return (
        <div ref={containerRef} className={recaptchaContainer}>
          <div style={{ minHeight: '78px' }} />
        </div>
      );
    }

    return (
      <div ref={containerRef} className={containerClass}>
        <ReCAPTCHA
          key={size}
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
