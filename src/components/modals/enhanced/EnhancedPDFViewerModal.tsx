
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { BaseModal } from '../core/BaseModal';
import { useModalContext } from '../context/ModalProvider';

interface EnhancedPDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string;
}

export function EnhancedPDFViewerModal({ 
  isOpen, 
  onClose, 
  title, 
  pdfUrl 
}: EnhancedPDFViewerModalProps) {
  const { handleError, error, clearError } = useModalContext();

  const handleDownload = async () => {
    try {
      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${title}.pdf`;
        link.click();
      } else {
        throw new Error('URL du PDF non disponible');
      }
    } catch (err) {
      handleError('Erreur lors du téléchargement du PDF');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: `Consultez ce document: ${title}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Toast success sera géré par le système
      }
    } catch (err) {
      handleError('Erreur lors du partage');
    }
  };

  const footer = (
    <div className="flex gap-2 justify-end">
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Partager
      </Button>
      <Button variant="outline" size="sm" onClick={handleDownload}>
        <Download className="w-4 h-4 mr-2" />
        Télécharger
      </Button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
      error={error}
      footer={footer}
    >
      <div className="h-[60vh] bg-gray-100 rounded-lg p-4">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 rounded"
            title={title}
            onError={() => handleError('Erreur lors du chargement du PDF')}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📄</div>
              <p>Aperçu du document non disponible</p>
              <p className="text-sm">Utilisez le bouton télécharger pour obtenir le fichier</p>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
