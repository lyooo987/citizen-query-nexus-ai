
import React, { createContext, useContext, ReactNode } from 'react';
import { useModalError } from '@/hooks/useModalError';
import { ModalErrorState } from '../types/modalTypes';

interface ModalContextValue {
  handleError: (message: string, showToast?: boolean) => void;
  clearError: () => void;
  retryWithCallback: (callback: () => void | Promise<void>) => void;
  error: ModalErrorState;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const modalError = useModalError();

  return (
    <ModalContext.Provider value={modalError}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}
