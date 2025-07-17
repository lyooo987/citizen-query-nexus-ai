import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, FileText, Calendar, User } from 'lucide-react';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (comment?: string) => void;
  onReject: (reason: string) => void;
  data: any;
  type: 'legal-text' | 'procedure';
}

export function ApprovalModal({ 
  isOpen, 
  onClose, 
  onApprove, 
  onReject, 
  data, 
  type 
}: ApprovalModalProps) {
  const [comment, setComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleApprove = () => {
    onApprove(comment);
    setComment('');
    onClose();
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(rejectionReason);
      setRejectionReason('');
      setShowRejectForm(false);
      onClose();
    }
  };

  const renderDataPreview = () => {
    if (type === 'legal-text') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Type de texte</Label>
              <p className="font-medium">{data?.textType || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Secteur</Label>
              <p className="font-medium">{data?.sector || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Institution</Label>
              <p className="font-medium">{data?.institution || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Date de création</Label>
              <p className="font-medium">{data?.creationDate || 'Non spécifiée'}</p>
            </div>
          </div>
          {data?.subject && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Objet</Label>
              <p className="mt-1">{data.subject}</p>
            </div>
          )}
          {data?.content && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Contenu</Label>
              <div className="mt-1 p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm">{data.content}</p>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Titre</Label>
              <p className="font-medium">{data?.title || 'Non spécifié'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Catégorie</Label>
              <p className="font-medium">{data?.category || 'Non spécifiée'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Institution</Label>
              <p className="font-medium">{data?.institution || 'Non spécifiée'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Durée estimée</Label>
              <p className="font-medium">{data?.estimatedDuration || 'Non spécifiée'}</p>
            </div>
          </div>
          {data?.description && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Description</Label>
              <div className="mt-1 p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                <p className="text-sm">{data.description}</p>
              </div>
            </div>
          )}
          {data?.procedureSteps && data.procedureSteps.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Étapes ({data.procedureSteps.length})</Label>
              <div className="mt-1 space-y-2 max-h-32 overflow-y-auto">
                {data.procedureSteps.slice(0, 3).map((step: any, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm">
                    <span className="font-medium">{index + 1}.</span> {step.title || step.description}
                  </div>
                ))}
                {data.procedureSteps.length > 3 && (
                  <p className="text-xs text-muted-foreground">... et {data.procedureSteps.length - 3} autres étapes</p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Approbation requise - {type === 'legal-text' ? 'Texte juridique' : 'Procédure administrative'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Statut d'approbation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Statut de publication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  <Calendar className="w-3 h-3 mr-1" />
                  En attente d'approbation
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Soumis le {new Date().toLocaleDateString('fr-FR')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Aperçu des données */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Aperçu du contenu</CardTitle>
            </CardHeader>
            <CardContent>
              {renderDataPreview()}
            </CardContent>
          </Card>

          {/* Actions d'approbation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Action d'approbation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!showRejectForm ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="approval-comment">Commentaire d'approbation (optionnel)</Label>
                    <Textarea
                      id="approval-comment"
                      placeholder="Ajoutez un commentaire pour l'approbation..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={handleApprove}
                      className="bg-green-600 hover:bg-green-700 gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approuver et publier
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={() => setShowRejectForm(true)}
                      className="gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rejection-reason">Motif de rejet *</Label>
                    <Textarea
                      id="rejection-reason"
                      placeholder="Veuillez expliquer pourquoi ce contenu est rejeté..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="destructive"
                      onClick={handleReject}
                      disabled={!rejectionReason.trim()}
                      className="gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Confirmer le rejet
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectionReason('');
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}