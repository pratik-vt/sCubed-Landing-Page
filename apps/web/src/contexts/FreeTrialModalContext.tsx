'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

import FreeTrialModal from '@/components/FreeTrialModal';

interface FreeTrialModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const FreeTrialModalContext = createContext<FreeTrialModalContextType | undefined>(undefined);

export const useFreeTrialModal = () => {
  const context = useContext(FreeTrialModalContext);
  if (!context) {
    throw new Error('useFreeTrialModal must be used within FreeTrialModalProvider');
  }
  return context;
};

interface FreeTrialModalProviderProps {
  children: ReactNode;
}

export const FreeTrialModalProvider: React.FC<FreeTrialModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSuccess = () => {
    // Redirect to dashboard or show setup wizard
    // For now, we'll just redirect to a success page
    if (typeof window !== 'undefined') {
      window.location.href = '/get-started?success=true';
    }
  };

  return (
    <FreeTrialModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <FreeTrialModal 
        isOpen={isOpen} 
        onClose={closeModal}
        onSuccess={handleSuccess}
      />
    </FreeTrialModalContext.Provider>
  );
};