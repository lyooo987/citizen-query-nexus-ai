
import React from 'react';
import { EnhancedPDFViewerModal } from '../enhanced/EnhancedPDFViewerModal';
import { DocumentViewerModal } from '../DocumentViewerModal';

interface BaseModalGroupProps {
  modals: any;
  closeModal: (modalName: string) => void;
}

export function BaseModalGroup({ modals, closeModal }: BaseModalGroupProps) {
  return (
    <>
      <EnhancedPDFViewerModal
        isOpen={modals.pdfViewer.isOpen}
        onClose={() => closeModal('pdfViewer')}
        title={modals.pdfViewer.data?.title || 'Document PDF'}
        pdfUrl={modals.pdfViewer.data?.url}
      />

      <DocumentViewerModal
        isOpen={modals.documentViewer.isOpen}
        onClose={() => closeModal('documentViewer')}
        document={modals.documentViewer.document}
      />
    </>
  );
}
