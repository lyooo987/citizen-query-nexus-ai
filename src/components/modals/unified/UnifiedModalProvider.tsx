
import React, { createContext, useContext, ReactNode } from 'react';
import { useUnifiedModals } from '@/hooks/useUnifiedModals';
import { UnifiedModalRenderer } from './UnifiedModalRenderer';

interface UnifiedModalContextType {
  openModal: (modalName: string, data?: any, config?: any) => void;
  closeModal: (modalName: string) => void;
  closeAllModals: () => void;
  updateModalData: (modalName: string, data: any) => void;
  modals: any;
}

const UnifiedModalContext = createContext<UnifiedModalContextType | undefined>(undefined);

export function UnifiedModalProvider({ children }: { children: ReactNode }) {
  const modalManager = useUnifiedModals();

  return (
    <UnifiedModalContext.Provider value={modalManager}>
      {children}
      <UnifiedModalRenderer />
    </UnifiedModalContext.Provider>
  );
}

export function useUnifiedModalContext() {
  const context = useContext(UnifiedModalContext);
  if (!context) {
    throw new Error('useUnifiedModalContext must be used within UnifiedModalProvider');
  }
  return context;
}
