
import { useState, useCallback, useMemo } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';

export interface UnifiedModalState {
  [key: string]: {
    isOpen: boolean;
    data?: any;
    config?: any;
  };
}

const initialModalState: UnifiedModalState = {
  pdfViewer: { isOpen: false, data: null },
  comparison: { isOpen: false, data: { items: [] } },
  filter: { isOpen: false, data: { type: 'general' } },
  feedback: { isOpen: false, data: { type: 'feedback' } },
  export: { isOpen: false, data: { data: [], filename: 'export' } },
  import: { isOpen: false, data: { acceptedTypes: ['.csv', '.xlsx', '.json'] } },
  confirmation: { isOpen: false, data: null }
};

export function useUnifiedModals() {
  const [modals, setModals] = useState<UnifiedModalState>(initialModalState);

  const openModal = useCallback((modalName: string, data?: any, config?: any) => {
    performanceMonitor.recordMetric(`modal_open_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { 
        isOpen: true, 
        data: data || prev[modalName]?.data,
        config: config || prev[modalName]?.config
      }
    }));
  }, []);

  const closeModal = useCallback((modalName: string) => {
    performanceMonitor.recordMetric(`modal_close_${modalName}`, performance.now(), 'interaction');
    
    setModals(prev => ({
      ...prev,
      [modalName]: { ...prev[modalName], isOpen: false }
    }));
  }, []);

  const closeAllModals = useCallback(() => {
    performanceMonitor.recordMetric('modal_close_all', performance.now(), 'interaction');
    
    setModals(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: { ...prev[key], isOpen: false }
      }), {} as UnifiedModalState)
    );
  }, []);

  const updateModalData = useCallback((modalName: string, data: any) => {
    setModals(prev => ({
      ...prev,
      [modalName]: { 
        ...prev[modalName], 
        data: { ...prev[modalName]?.data, ...data }
      }
    }));
  }, []);

  const modalStats = useMemo(() => ({
    openCount: Object.values(modals).filter(modal => modal.isOpen).length,
    isAnyOpen: Object.values(modals).some(modal => modal.isOpen),
    openModalNames: Object.keys(modals).filter(key => modals[key].isOpen)
  }), [modals]);

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    updateModalData,
    ...modalStats
  };
}
