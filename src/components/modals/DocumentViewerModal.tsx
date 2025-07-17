
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Share, Printer, ZoomIn, ZoomOut } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document?: any;
}

export function DocumentViewerModal({ isOpen, onClose, document }: DocumentViewerModalProps) {
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    console.log('Download document:', document);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document?.title || 'Document',
        text: document?.description || '',
        url: window.location.href
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {document?.title || 'Visualiseur de document'}
          </DialogTitle>
          
          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm px-2">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <div className="flex-1" />
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4 mr-1" />
              Partager
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" />
              Imprimer
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-4" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
          <Card>
            <CardContent className="p-6">
              {document ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">{document.title}</h2>
                  <div className="text-sm text-gray-600">
                    <p>Type: {document.type}</p>
                    <p>Date: {document.date}</p>
                    <p>Auteur: {document.author}</p>
                  </div>
                  <div className="prose max-w-none">
                    <p>{document.content || 'Contenu du document à afficher ici...'}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Aucun document sélectionné</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="border-t pt-4 flex justify-end">
          <Button onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
