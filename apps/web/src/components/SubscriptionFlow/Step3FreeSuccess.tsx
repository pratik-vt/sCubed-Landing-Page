'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, Home } from 'lucide-react';

import * as styles from './styles.css';

import type { Step3FreeProps } from '@/types/subscription';

/**
 * Step 3 (Free Plan): Success Confirmation
 * Shows success message after OTP verification
 * Note: No additional API call needed - registration is already complete
 */
export default function Step3FreeSuccess({ formData }: Step3FreeProps) {
  const router = useRouter();

  useEffect(() => {
    // Clear form state from session storage on mount
    sessionStorage.removeItem('subscriptionFormState');
  }, []);

  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>
        <CheckCircle2 size={48} />
      </div>

      <h1 className={styles.successTitle}>Trial Request Submitted Successfully!</h1>

      <p className={styles.successMessage}>
        Thank you for choosing S Cubed! Your free trial request has been submitted successfully.
        An admin will review and approve your request soon.
      </p>

      <div className={`${styles.alertContainer} ${styles.alertInfo}`}>
        <AlertCircle size={20} />
        <div>
          <strong>What happens next?</strong>
          <ul className={styles.successList}>
            <li>Our team will review your trial request within 1-2 business days</li>
            <li>
              You'll receive an email at <strong>{formData.email}</strong> with login credentials once
              your trial is approved
            </li>
            <li>After approval, you can log in and start exploring S Cubed with full access</li>
            <li>If you have any questions, feel free to contact our support team</li>
          </ul>
        </div>
      </div>

      <div className={styles.successDetails}>
        <h3 className={styles.successDetailsTitle}>Registration Summary</h3>
        <div className={styles.successDetailsGrid}>
          <div className={styles.successDetailsItem}>
            <span className={styles.successDetailsLabel}>Clinic Name:</span>
            <span className={styles.successDetailsValue}>{formData.clinic_name}</span>
          </div>
          <div className={styles.successDetailsItem}>
            <span className={styles.successDetailsLabel}>Admin Email:</span>
            <span className={styles.successDetailsValue}>{formData.email}</span>
          </div>
          <div className={styles.successDetailsItem}>
            <span className={styles.successDetailsLabel}>Plan:</span>
            <span className={styles.successDetailsValue}>Free Trial</span>
          </div>
          <div className={styles.successDetailsItem}>
            <span className={styles.successDetailsLabel}>Staff Count:</span>
            <span className={styles.successDetailsValue}>{formData.staff_count}</span>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup} style={{ justifyContent: 'center' }}>
        <button
          onClick={() => router.push('/')}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          <Home size={20} />
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
