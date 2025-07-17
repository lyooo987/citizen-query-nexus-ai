
import { useState, useCallback, useMemo } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface ModalState {
  [key: string]: {
    isOpen: boolean;
    [key: string]: any;
  };
}

// État initial optimisé avec toutes les modales nécessaires
const initialModals: ModalState = {
  pdfViewer: { isOpen: false, data: null },
  comparison: { isOpen: false, data: [] },
  filter: { isOpen: false, type: 'general' },
  feedback: { isOpen: false, type: 'feedback', itemTitle: '' },
  export: { isOpen: false, data: [], filename: 'export' },
  import: { isOpen: false, acceptedTypes: ['.csv', '.xlsx', '.json'] },
  advancedSearch: { isOpen: false, data: null },
  analysis: { isOpen: false, type: 'comparative', data: [] },
  management: { isOpen: false, type: 'domain' },
  workflow: { isOpen: false, data: null },
  aiGeneration: { isOpen: false, type: 'form', data: null },
  userManagement: { isOpen: false, action: 'create', user: null },
  alertManagement: { isOpen: false, alert: null },
  sessionManagement: { isOpen: false, data: null },
  documentViewer: { isOpen: false, document: null },
  templateManager: { isOpen: false, template: null },
  projectManager: { isOpen: false, project: null },
  tagManager: { isOpen: false, tag: null },
  workflowManager: { isOpen: false, workflow: null },
  geolocationSearch: { isOpen: false, location: null },
  notification: { isOpen: false, notification: null }
};

export function useModals() {
  const [modals, setModals] = useState<ModalState>(initialModals);

  const openModal = useCallback((modalName: keyof ModalState, data?: any) => {
    performanceMonitor.recordMetric(`modal_open_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: true, ...data }
    }));
  }, []);

  const closeModal = useCallback((modalName: keyof ModalState) => {
    performanceMonitor.recordMetric(`modal_close_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: false }
    }));
  }, []);

  const closeAllModals = useCallback(() => {
    performanceMonitor.recordMetric('modal_close_all', performance.now(), 'interaction');
    
    setModals(initialModals);
  }, []);

  const modalStats = useMemo(() => {
    const openModals = Object.values(modals).filter(modal => modal.isOpen);
    return {
      openCount: openModals.length,
      isAnyOpen: openModals.length > 0,
      openModalNames: Object.keys(modals).filter(key => modals[key].isOpen)
    };
  }, [modals]);

  const toggleModal = useCallback((modalName: keyof ModalState, data?: any) => {
    if (modals[modalName].isOpen) {
      closeModal(modalName);
    } else {
      openModal(modalName, data);
    }
  }, [modals, openModal, closeModal]);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    toggleModal,
    ...modalStats
  };
}
