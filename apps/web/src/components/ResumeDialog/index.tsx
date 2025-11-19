'use client';

import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import {
  dialogContent,
  dialogTitle,
  dialogDescription,
  dialogFooter,
  primaryButton,
  secondaryButton,
  errorText,
} from './styles.css';

interface ResumeDialogProps {
  open: boolean;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  onContinue: () => void;
  onStartNew: () => void;
  onClose: () => void;
}

const ResumeDialog: React.FC<ResumeDialogProps> = ({
  open,
  currentStep,
  isLoading,
  error,
  onContinue,
  onStartNew,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnOverlayClick
      closeOnEsc
      showCloseIcon={false}
      classNames={{
        modal: dialogContent,
      }}
    >
      <h2 className={dialogTitle}>Welcome Back!</h2>
      <p className={dialogDescription}>
        You have an incomplete form at Step {currentStep} of 3.
        <br />
        Would you like to continue where you left off?
      </p>

      {error && <p className={errorText}>{error}</p>}

      <div className={dialogFooter}>
        <button
          className={primaryButton}
          onClick={onContinue}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Continue Form'}
        </button>
        <button
          className={secondaryButton}
          onClick={onStartNew}
          disabled={isLoading}
        >
          Start New Form
        </button>
      </div>
    </Modal>
  );
};

export default ResumeDialog;
