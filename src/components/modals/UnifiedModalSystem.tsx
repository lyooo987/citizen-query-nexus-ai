import React from 'react';
import { useUnifiedModals } from '@/hooks/useUnifiedModals';
import { useToast } from '@/hooks/use-toast';
import { securityMonitor } from '@/utils/unifiedSecurity';

// Import des modales spécialisées
import { PDFViewerModal } from './specialized/PDFViewerModal';
import { ComparisonModal } from './specialized/ComparisonModal';
import { FilterModal } from './specialized/FilterModal';

export function UnifiedModalSystem() {
  const { modals, closeModal, openModal } = useUnifiedModals();
  const { toast } = useToast();

  // Gestionnaire sécurisé pour les actions de modales
  const handleSecureAction = React.useCallback((action: string, data: any) => {
    securityMonitor.logSecurityEvent('modal_action', {
      action,
      timestamp: Date.now()
    }, 'low');
    
    switch (action) {
      case 'export':
        openModal('export', data);
        toast({
          title: "Export initié",
          description: "Le processus d'export a commencé.",
        });
        break;
      case 'import':
        openModal('import', data);
        break;
      case 'feedback':
        openModal('feedback', data);
        break;
      default:
        console.warn('Action non reconnue:', action);
    }
  }, [openModal, toast]);

  return (
    <>
      {/* Modales de visualisation */}
      <PDFViewerModal
        isOpen={modals.pdfViewer?.isOpen || false}
        onClose={() => closeModal('pdfViewer')}
        data={modals.pdfViewer?.data || { title: 'Document PDF' }}
      />
      
      <ComparisonModal
        isOpen={modals.comparison?.isOpen || false}
        onClose={() => closeModal('comparison')}
        data={modals.comparison?.data || { items: [] }}
        onExport={(items) => handleSecureAction('export', { data: items, filename: 'comparison' })}
      />
      
      <FilterModal
        isOpen={modals.filter?.isOpen || false}
        onClose={() => closeModal('filter')}
        data={modals.filter?.data || { type: 'general' }}
        onFiltersApply={(filters) => {
          securityMonitor.logSecurityEvent('filters_applied', { filterCount: Object.keys(filters).length }, 'low');
          toast({
            title: "Filtres appliqués",
            description: "Vos filtres ont été appliqués avec succès.",
          });
        }}
      />

      {/* Autres modales seront ajoutées au besoin */}
    </>
  );
}