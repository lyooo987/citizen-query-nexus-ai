
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { FormStepProps, ProcedureStep } from './types';

export function Step2StepsConditions({ 
  form, 
  procedureSteps = [], 
  setProcedureSteps 
}: FormStepProps) {
  const addProcedureStep = () => {
    if (setProcedureSteps) {
      const newStep: ProcedureStep = { 
        id: Date.now().toString(), 
        title: '', 
        description: '' 
      };
      setProcedureSteps([...procedureSteps, newStep]);
    }
  };

  const updateProcedureStep = (index: number, field: keyof ProcedureStep, value: string) => {
    if (setProcedureSteps) {
      const updated = [...procedureSteps];
      updated[index] = { ...updated[index], [field]: value };
      setProcedureSteps(updated);
    }
  };

  const removeProcedureStep = (index: number) => {
    if (setProcedureSteps) {
      setProcedureSteps(procedureSteps.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Étapes et conditions</h3>
        <p className="text-gray-600">Définissez les étapes de la procédure</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium">Étapes de la procédure</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addProcedureStep}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter une étape
          </Button>
        </div>

        {procedureSteps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune étape ajoutée pour le moment. Cliquez sur "Ajouter une étape" pour commencer.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {procedureSteps.map((step, index) => (
              <Card key={step.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Titre de l'étape"
                      value={step.title}
                      onChange={(e) => updateProcedureStep(index, 'title', e.target.value)}
                    />
                    <Textarea
                      placeholder="Description de l'étape"
                      value={step.description}
                      onChange={(e) => updateProcedureStep(index, 'description', e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProcedureStep(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="conditions">Conditions d'utilisation du service</Label>
        <Textarea
          id="conditions"
          placeholder="Conditions et prérequis pour utiliser ce service..."
          className="min-h-24"
          {...form.register('conditions')}
        />
      </div>
    </div>
  );
}
