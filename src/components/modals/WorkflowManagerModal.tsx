
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Workflow, Plus, Trash2, ArrowRight } from 'lucide-react';

interface WorkflowManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow?: any;
  onSave: (workflowData: any) => void;
}

export function WorkflowManagerModal({ isOpen, onClose, workflow, onSave }: WorkflowManagerModalProps) {
  const [formData, setFormData] = useState({
    name: workflow?.name || '',
    description: workflow?.description || '',
    category: workflow?.category || 'general',
    steps: workflow?.steps || [
      { id: 1, name: 'Début', type: 'start', description: '' }
    ],
    isActive: workflow?.isActive ?? true
  });

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      name: `Étape ${formData.steps.length}`,
      type: 'process',
      description: ''
    };
    setFormData({
      ...formData,
      steps: [...formData.steps, newStep]
    });
  };

  const removeStep = (stepId: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter(step => step.id !== stepId)
    });
  };

  const updateStep = (stepId: number, updates: any) => {
    setFormData({
      ...formData,
      steps: formData.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'start': return 'bg-green-100 text-green-800';
      case 'process': return 'bg-blue-100 text-blue-800';
      case 'decision': return 'bg-orange-100 text-orange-800';
      case 'end': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            {workflow ? 'Modifier le workflow' : 'Nouveau workflow'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du workflow *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Nom du workflow"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description du workflow"
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="space-y-2 flex-1">
                  <Label>Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Général</SelectItem>
                      <SelectItem value="legal">Juridique</SelectItem>
                      <SelectItem value="administrative">Administratif</SelectItem>
                      <SelectItem value="approval">Approbation</SelectItem>
                      <SelectItem value="review">Révision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  />
                  <Label htmlFor="isActive">Workflow actif</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Étapes du workflow</CardTitle>
              <Button onClick={addStep} size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Ajouter une étape
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.steps.map((step, index) => (
                <div key={step.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getStepTypeColor(step.type)}>
                        Étape {index + 1}
                      </Badge>
                      {index < formData.steps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    {formData.steps.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeStep(step.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nom de l'étape</Label>
                      <Input
                        value={step.name}
                        onChange={(e) => updateStep(step.id, { name: e.target.value })}
                        placeholder="Nom de l'étape"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={step.type} 
                        onValueChange={(value) => updateStep(step.id, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="start">Début</SelectItem>
                          <SelectItem value="process">Processus</SelectItem>
                          <SelectItem value="decision">Décision</SelectItem>
                          <SelectItem value="end">Fin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateStep(step.id, { description: e.target.value })}
                      placeholder="Description de l'étape"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            {workflow ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
