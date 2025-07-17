
import React from 'react';
import { useUnifiedModals } from '@/hooks/useUnifiedModals';
import { useToast } from '@/hooks/use-toast';

// Import des modales spécialisées
import { PDFViewerModal } from './specialized/PDFViewerModal';
import { ComparisonModal } from './specialized/ComparisonModal';
import { FilterModal } from './specialized/FilterModal';

export function ModalManager() {
  const { modals, closeModal, openModal } = useUnifiedModals();
  const { toast } = useToast();

  return (
    <>
      <PDFViewerModal
        isOpen={modals.pdfViewer?.isOpen || false}
        onClose={() => closeModal('pdfViewer')}
        data={modals.pdfViewer?.data || { title: 'Document PDF' }}
      />
      
      <ComparisonModal
        isOpen={modals.comparison?.isOpen || false}
        onClose={() => closeModal('comparison')}
        data={modals.comparison?.data || { items: [] }}
        onExport={(items) => {
          openModal('export', { data: items, filename: 'comparison' });
          toast({
            title: "Export initié",
            description: "La comparaison va être exportée.",
          });
        }}
      />
      
      <FilterModal
        isOpen={modals.filter?.isOpen || false}
        onClose={() => closeModal('filter')}
        data={modals.filter?.data || { type: 'general' }}
        onFiltersApply={(filters) => {
          console.log('Applying filters:', filters);
          toast({
            title: "Filtres appliqués",
            description: "Vos filtres ont été appliqués avec succès.",
          });
        }}
      />
    </>
  );
}

// Hook personnalisé pour utiliser les modales dans l'application
export function useModals() {
  return useUnifiedModals();
}
