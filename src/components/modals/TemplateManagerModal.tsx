
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Save, Copy } from 'lucide-react';

interface TemplateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: any;
  onSave: (templateData: any) => void;
}

export function TemplateManagerModal({ isOpen, onClose, template, onSave }: TemplateManagerModalProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    category: template?.category || 'general',
    content: template?.content || '',
    variables: template?.variables || [],
    isPublic: template?.isPublic || false
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleDuplicate = () => {
    const duplicatedTemplate = {
      ...formData,
      name: `${formData.name} (Copie)`,
      id: undefined
    };
    onSave(duplicatedTemplate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {template ? 'Modifier le modèle' : 'Nouveau modèle'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du modèle *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nom du modèle"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description du modèle"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Général</SelectItem>
                    <SelectItem value="legal">Juridique</SelectItem>
                    <SelectItem value="administrative">Administratif</SelectItem>
                    <SelectItem value="procedure">Procédure</SelectItem>
                    <SelectItem value="form">Formulaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contenu du modèle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Contenu *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Contenu du modèle... Utilisez {variable} pour les variables dynamiques"
                  rows={10}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                <p className="font-medium mb-1">Variables disponibles :</p>
                <p>• {'{nom}'} - Nom du destinataire</p>
                <p>• {'{date}'} - Date actuelle</p>
                <p>• {'{organisation}'} - Organisation</p>
                <p>• {'{titre}'} - Titre du document</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                />
                <Label htmlFor="isPublic">Modèle public (visible par tous les utilisateurs)</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          {template && (
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="w-4 h-4 mr-2" />
              Dupliquer
            </Button>
          )}
          <div className="flex space-x-2 ml-auto">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              {template ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
