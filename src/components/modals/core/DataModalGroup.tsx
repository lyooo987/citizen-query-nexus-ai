
import React from 'react';
import { ExportModal } from '../ExportModal';
import { ImportModal } from '../ImportModal';
import { AnalysisModal } from '../AnalysisModal';

interface DataModalGroupProps {
  modals: any;
  closeModal: (modalName: string) => void;
}

export function DataModalGroup({ modals, closeModal }: DataModalGroupProps) {
  return (
    <>
      <ExportModal
        isOpen={modals.export.isOpen}
        onClose={() => closeModal('export')}
        data={modals.export.data}
        filename={modals.export.filename}
      />

      <ImportModal
        isOpen={modals.import.isOpen}
        onClose={() => closeModal('import')}
        acceptedTypes={modals.import.acceptedTypes}
        onImport={(files) => {
          console.log('Import:', files);
          closeModal('import');
        }}
      />

      <AnalysisModal
        isOpen={modals.analysis.isOpen}
        onClose={() => closeModal('analysis')}
        type={modals.analysis.type}
        data={modals.analysis.data}
      />
    </>
  );
}
