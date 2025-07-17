
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Workflow, Plus, Trash2 } from 'lucide-react';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow?: any;
  onSave?: (workflow: any) => void;
}

export function WorkflowModal({ isOpen, onClose, workflow, onSave }: WorkflowModalProps) {
  const [name, setName] = useState(workflow?.name || '');
  const [description, setDescription] = useState(workflow?.description || '');
  const [status, setStatus] = useState(workflow?.status || 'draft');
  const [steps, setSteps] = useState(workflow?.steps || [{ name: '', description: '', type: 'action' }]);

  const addStep = () => {
    setSteps([...steps, { name: '', description: '', type: 'action' }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const handleSave = () => {
    const workflowData = {
      id: workflow?.id || Date.now().toString(),
      name,
      description,
      status,
      steps,
      createdAt: workflow?.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    onSave?.(workflowData);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={workflow ? "Modifier le workflow" : "Nouveau workflow"}
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="workflow-name">Nom du workflow</Label>
            <Input
              id="workflow-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du workflow"
            />
          </div>
          <div>
            <Label htmlFor="workflow-status">Statut</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="workflow-description">Description</Label>
          <Textarea
            id="workflow-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du workflow"
            rows={3}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Étapes du workflow</Label>
            <Button onClick={addStep} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une étape
            </Button>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Étape {index + 1}</h4>
                  {steps.length > 1 && (
                    <Button
                      onClick={() => removeStep(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Nom de l'étape</Label>
                    <Input
                      value={step.name}
                      onChange={(e) => updateStep(index, 'name', e.target.value)}
                      placeholder="Nom de l'étape"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={step.type}
                      onValueChange={(value) => updateStep(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="approval">Approbation</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="condition">Condition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Label>Description</Label>
                  <Textarea
                    value={step.description}
                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                    placeholder="Description de l'étape"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSave} disabled={!name.trim()}>
          <Workflow className="w-4 h-4 mr-2" />
          {workflow ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </BaseModal>
  );
}
