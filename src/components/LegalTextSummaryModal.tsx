
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  FileText, 
  Calendar,
  Plus,
  X,
  BookOpen,
  Scale
} from 'lucide-react';

interface LegalTextSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnother: () => void;
  legalTextData?: any; // Les données du texte juridique ajouté
}

export function LegalTextSummaryModal({ 
  isOpen, 
  onClose, 
  onAddAnother, 
  legalTextData 
}: LegalTextSummaryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-600">
            <CheckCircle className="w-6 h-6" />
            Texte juridique ajouté avec succès
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Résumé principal */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">
                {legalTextData?.title || "Nouveau texte juridique"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <p className="font-medium">{legalTextData?.type || "Loi"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Domaine:</span>
                  <p className="font-medium">{legalTextData?.domain || "Droit commercial"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Numéro:</span>
                  <p className="font-medium">{legalTextData?.number || "2024-001"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date de publication:</span>
                  <p className="font-medium">{legalTextData?.publishDate || new Date().toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{legalTextData?.articlesCount || 15}</p>
                <p className="text-xs text-gray-600">Articles</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{legalTextData?.chaptersCount || 5}</p>
                <p className="text-xs text-gray-600">Chapitres</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Scale className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-lg font-bold">{legalTextData?.referencesCount || 8}</p>
                <p className="text-xs text-gray-600">Références</p>
              </CardContent>
            </Card>
          </div>

          {/* Informations détaillées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations du texte juridique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {legalTextData?.summary && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Résumé:</span>
                  <p className="text-sm mt-1">{legalTextData.summary}</p>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Ajouté le {new Date().toLocaleDateString('fr-FR')}</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Statut: Publié
                </Badge>
              </div>

              {legalTextData?.keywords && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Mots-clés:</span>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {legalTextData.keywords.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              Le texte juridique a été sauvegardé dans votre bibliothèque
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Fermer
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={onAddAnother}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un autre texte
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
