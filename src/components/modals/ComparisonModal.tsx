
import React from 'react';
import { BaseModal } from './core/BaseModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModalActions } from './common/ModalActions';
import { GitCompare, FileText } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onExport?: (items: any[]) => void;
}

export function ComparisonModal({ isOpen, onClose, items, onExport }: ComparisonModalProps) {
  const handleExport = () => {
    onExport?.(items);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Comparaison de documents"
      size="xl"
      footer={
        <ModalActions
          primaryAction={
            items.length > 0 ? {
              label: 'Exporter la comparaison',
              onClick: handleExport,
              icon: 'download'
            } : undefined
          }
          cancelAction={{
            label: 'Fermer',
            onClick: onClose,
            icon: 'close'
          }}
        />
      }
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <GitCompare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun élément à comparer</h3>
            <p className="text-gray-500">Sélectionnez des documents pour commencer la comparaison</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  {items.length} document(s) en comparaison
                </p>
                <p className="text-sm text-blue-600">
                  Analysez les différences et similitudes ci-dessous
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="truncate">{item.title || `Document ${index + 1}`}</span>
                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                        {item.type || 'Document'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {item.description || 'Aucune description disponible'}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Modifié: {item.lastModified || 'Inconnue'}</span>
                      <span>Taille: {item.size || 'N/A'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
}
