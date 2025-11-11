'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Home } from 'lucide-react';

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
      <h1 className={styles.successTitle}>Trial Request Submitted Successfully!</h1>

      <p className={styles.successMessage}>
        Thank you for choosing S Cubed! Your free trial request has been submitted successfully.
        An admin will review and approve your request soon.
      </p>

      <div className={`${styles.alertContainerCentered} ${styles.alertInfo}`}>
        <div className={styles.alertIconWrapper}>
          <AlertCircle size={24} />
        </div>
        <div className={styles.alertContent}>
          <span className={styles.alertTitle}>What happens next?</span>
          <ul className={styles.successList}>
            <li className={styles.successListItem}>Our team will review your trial request within 1-2 business days</li>
            <li className={styles.successListItem}>
              You'll receive an email at <strong>{formData.email}</strong> with login credentials once
              your trial is approved
            </li>
            <li className={styles.successListItem}>After approval, you can log in and start exploring S Cubed with full access</li>
            <li className={styles.successListItem}>If you have any questions, feel free to contact our support team</li>
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

      <div className={styles.buttonGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => router.push('/')}
          className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.6s' }}
        >
          <Home size={20} />
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
