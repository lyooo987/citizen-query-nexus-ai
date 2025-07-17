
import React from 'react';
import { useGlobalActions } from '@/hooks/useGlobalActions';
import { UnifiedModalSystem } from '@/components/modals/UnifiedModalSystem';
import { LibraryFormHandler } from './LibraryFormHandler';

interface ActionHandlerProps {
  children: React.ReactNode;
}

export function ActionHandler({ children }: ActionHandlerProps) {
  const actions = useGlobalActions();

  // Attacher les gestionnaires d'actions globales à window pour un accès facile
  React.useEffect(() => {
    (window as any).actionHandlers = {
      ...actions,
      
      // Actions étendues pour les nouvelles fonctionnalités
      handleAnalysisComparative: (data: any[] = []) => {
        console.log('Analyse comparative clicked', data);
        actions.handleAnalysis('comparative', data);
      },
      handleAnalysisPerformance: (data: any[] = []) => {
        console.log('Analyse performance clicked', data);
        actions.handleAnalysis('performance', data);
      },
      handleAnalysisTrends: (data: any[] = []) => {
        console.log('Analyse trends clicked', data);
        actions.handleAnalysis('trends', data);
      },
      
      // Actions de gestion
      handleAddDomain: () => {
        console.log('Add domain clicked');
        actions.handleManagement('domain');
      },
      handleAddTextType: () => {
        console.log('Add text type clicked');
        actions.handleManagement('textType');
      },
      handleAddCategory: () => {
        console.log('Add category clicked');
        actions.handleManagement('category');
      },
      handleAddOrganization: () => {
        console.log('Add organization clicked');
        actions.handleManagement('organization');
      },
      handleAddSource: () => {
        console.log('Add source clicked');
        actions.handleManagement('source');
      },
      handleAddRole: () => {
        console.log('Add role clicked');
        actions.handleManagement('role');
      },
      handleAddPermission: () => {
        console.log('Add permission clicked');
        actions.handleManagement('permission');
      },
      handleAddPolicy: () => {
        console.log('Add policy clicked');
        actions.handleManagement('policy');
      },
      
      // Actions d'import par lot
      handleBatchImportZip: () => {
        console.log('Batch import ZIP clicked');
        actions.handleImport(['.zip']);
      },
      handleBatchImportCsv: () => {
        console.log('Batch import CSV clicked');
        actions.handleImport(['.csv']);
      },
      handleBatchImportExcel: () => {
        console.log('Batch import Excel clicked');
        actions.handleImport(['.xlsx', '.xls']);
      },
      handleBatchImportJson: () => {
        console.log('Batch import JSON clicked');
        actions.handleImport(['.json']);
      },
      
      // Actions de navigation
      handleViewProcedures: () => {
        console.log('View procedures clicked');
        const event = new CustomEvent('navigate-to-section', { detail: 'procedures-catalog' });
        window.dispatchEvent(event);
      },
      
      handleViewTexts: () => {
        console.log('View texts clicked');
        const event = new CustomEvent('navigate-to-section', { detail: 'legal-catalog' });
        window.dispatchEvent(event);
      }
    };

    console.log('Action handlers attached to window');
  }, [actions]);

  return (
    <>
      {children}
      <UnifiedModalSystem />
      <LibraryFormHandler />
    </>
  );
}
