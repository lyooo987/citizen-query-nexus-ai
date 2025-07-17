
import { useCallback } from 'react';
import { useUnifiedModalContext } from '@/components/modals/unified/UnifiedModalProvider';
import { performanceMonitor } from '@/utils/performanceMonitor';

export function useOptimizedModal() {
  const { openModal, closeModal, modals } = useUnifiedModalContext();

  const openModalWithTracking = useCallback((modalName: string, data?: any) => {
    performanceMonitor.recordMetric(`modal_open_${modalName}`, performance.now(), 'interaction');
    openModal(modalName, data);
  }, [openModal]);

  const closeModalWithTracking = useCallback((modalName: string) => {
    performanceMonitor.recordMetric(`modal_close_${modalName}`, performance.now(), 'interaction');
    closeModal(modalName);
  }, [closeModal]);

  return {
    openModal: openModalWithTracking,
    closeModal: closeModalWithTracking,
    modals,
    isAnyModalOpen: Object.values(modals).some((modal: any) => modal?.isOpen)
  };
}
