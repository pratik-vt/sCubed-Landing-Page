'use client';

import confetti from 'canvas-confetti';
import { CheckCircle2, X } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';

import {
  celebrationOverlay,
  chipIcon,
  chipLabel,
  chipValue,
  closeButton,
  infoChip,
  infoRow,
  loginButton,
  loginInfoMessage,
  loginSection,
  modalBackdrop,
  modalEnter,
  statusPill,
  successBadge,
  successContent,
  successHeader,
  successHighlight,
  successModalCard,
  successSubtext,
  successTitle,
  titleRow,
} from './successStyles.css';

type Props = {
  onClose: () => void;
  clinicName?: string;
  trialEndDate?: string;
  timezone?: string;
};

const SuccessModal: FC<Props> = ({
  onClose,
  clinicName = '',
  trialEndDate = 'Nov 14, 2025',
  timezone = 'IST',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    // Focus management
    closeButtonRef.current?.focus();

    // Keyboard handler for ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Create a custom canvas for confetti
    const myCanvas = document.createElement('canvas');
    myCanvas.style.position = 'fixed';
    myCanvas.style.top = '0';
    myCanvas.style.left = '0';
    myCanvas.style.width = '100vw';
    myCanvas.style.height = '100vh';
    myCanvas.style.pointerEvents = 'none';
    myCanvas.style.zIndex = '2147483647';
    document.body.appendChild(myCanvas);

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    // Fire confetti after 250ms for micro-motion
    const confettiTimer = setTimeout(() => {
      // Left cannon
      myConfetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
        startVelocity: 45,
        gravity: 1,
        ticks: 200,
      });

      // Right cannon
      myConfetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
        startVelocity: 45,
        gravity: 1,
        ticks: 200,
      });
    }, 250);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(confettiTimer);
      setTimeout(() => {
        myCanvas.remove();
      }, 3000);
    };
  }, [onClose]);

  return (
    <div className={modalBackdrop}>
      {/* Light purple blurred overlay */}
      <div className={celebrationOverlay} aria-hidden="true" />

      {/* Modal content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className={`${successModalCard} ${modalEnter}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={closeButton}
          aria-label="Close success modal"
        >
          <X size={24} />
        </button>

        <div className={successHeader}>
          <div className={titleRow}>
            <span
              style={{
                fontSize: '42px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              🎉
            </span>
            <h2 id="welcome-title" className={successTitle}>
              Welcome aboard!
            </h2>
            <div className={successBadge}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className={successSubtext}>
            Your 30-day S Cubed trial has started
          </p>
        </div>

        <div className={infoRow} aria-live="polite">
          <div className={statusPill}>
            <span className={chipIcon}>📅</span>
            <div className={infoChip}>
              <span className={chipLabel}>Ends</span>
              <span className={chipValue}>{trialEndDate}</span>
            </div>
          </div>
          <div className={statusPill}>
            <span className={chipIcon}>🏷️</span>
            <div className={infoChip}>
              <span className={chipLabel}>Plan</span>
              <span className={chipValue}>Free Trial</span>
            </div>
          </div>
          <div className={statusPill}>
            <span className={chipIcon}>🌍</span>
            <div className={infoChip}>
              <span className={chipLabel}>Timezone</span>
              <span className={chipValue}>{timezone}</span>
            </div>
          </div>
        </div>

        <div className={successContent}>
          <p>
            🚀 Explore S Cubed and enjoy full access to all features during your
            trial.
            <br />
            <span className={successHighlight}>
              💜 We're excited to have you with us!
            </span>
          </p>
        </div>

        <div className={loginSection}>
          <div className={loginInfoMessage}>
            <strong>
              📧 Your login credentials will be sent to your registered email
              within 2 business days.
            </strong>
            <br />
            Once you receive them, you'll be able to log in to your S Cubed
            dashboard and start exploring our complete suite of practice
            management tools.
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className={loginButton}
            aria-label="Go to homepage"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
