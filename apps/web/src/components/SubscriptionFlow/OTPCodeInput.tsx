'use client';

import { useRef, useEffect, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import * as styles from './styles.css';

interface OTPCodeInputProps {
  label?: string;
  helpText?: string;
  boxes?: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  hasError?: boolean;
}

export default function OTPCodeInput({
  label = 'Enter 6-digit authentication code',
  helpText,
  boxes = 6,
  disabled = false,
  onChange,
  value = '',
  hasError = false,
}: Readonly<OTPCodeInputProps>) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Convert value string to array of digits
  const getDigitsArray = (val: string): string[] => {
    const digits = val.slice(0, boxes).split('');
    return [...digits, ...new Array(Math.max(0, boxes - digits.length)).fill('')];
  };

  const currentDigits = getDigitsArray(value);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const updateOTP = (newDigits: string[]) => {
    onChange?.(newDigits.join(''));
  };

  const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only allow single digit
    if (inputValue && !/^\d$/.test(inputValue)) {
      return;
    }

    const newDigits = [...currentDigits];
    newDigits[index] = inputValue;
    updateOTP(newDigits);

    // Auto-focus next input if value entered
    if (inputValue && index < boxes - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    if (e.key === 'Backspace') {
      // If input is empty, move to previous and clear it
      if (!currentDigits[index] && index > 0) {
        e.preventDefault();
        const newDigits = [...currentDigits];
        newDigits[index - 1] = '';
        updateOTP(newDigits);
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 0);
      }
      // If input has value, let default behavior clear it (onChange will handle state update)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < boxes - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Delete') {
      e.preventDefault();
      const newDigits = [...currentDigits];
      newDigits[index] = '';
      updateOTP(newDigits);
    } else if (/^\d$/.test(e.key)) {
      // If typing a digit and input already has value, replace it
      if (currentDigits[index]) {
        e.preventDefault();
        const newDigits = [...currentDigits];
        newDigits[index] = e.key;
        updateOTP(newDigits);

        // Move to next box
        if (index < boxes - 1) {
          setTimeout(() => {
            inputRefs.current[index + 1]?.focus();
          }, 0);
        }
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Extract only digits from pasted content
    const digits = pastedData.replaceAll(/\D/g, '').slice(0, boxes);

    if (digits) {
      const newDigits = getDigitsArray(digits);
      updateOTP(newDigits);

      // Focus the next empty box or the last box
      const nextEmptyIndex = newDigits.findIndex(digit => !digit);
      const focusIndex = nextEmptyIndex === -1 ? boxes - 1 : nextEmptyIndex;
      setTimeout(() => {
        inputRefs.current[focusIndex]?.focus();
      }, 0);
    }
  };

  return (
    <div className={styles.formField} style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      {label ? (
        <label className={styles.label} style={{ textAlign: 'center', fontSize: '14px' }}>
          {label}
        </label>
      ) : null}
      <div className={styles.otpInputContainer}>
        {currentDigits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            className={`${styles.otpBoxLarge} ${hasError ? styles.otpBoxError : ''}`}
            maxLength={1}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            disabled={disabled}
            value={digit}
            onChange={(e) => handleInputChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${idx + 1}`}
            autoComplete="off"
            data-filled={digit ? 'true' : 'false'}
            style={{
              animationDelay: `${idx * 0.05}s`
            }}
          />
        ))}
      </div>
      {helpText ? (
        <p className={styles.helpText} style={{ textAlign: 'center', marginTop: '1rem' }}>
          {helpText}
        </p>
      ) : null}
    </div>
  );
}


