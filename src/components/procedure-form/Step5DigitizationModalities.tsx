
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FormStepProps } from './types';

export function Step5DigitizationModalities({ form }: FormStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Numérisation et modalités</h3>
        <p className="text-gray-600">Définissez les modalités de traitement</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="numerisation" 
            {...form.register('digitalProcedure')}
          />
          <Label htmlFor="numerisation">Numérisation de la procédure</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="depot-tiers" 
            {...form.register('thirdPartySubmission')}
          />
          <Label htmlFor="depot-tiers">Dépôt par une tierce personne</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="withdrawal-when">Quand retirer l'acte ou le service administratif demandé</Label>
          <Textarea
            id="withdrawal-when"
            placeholder="Délais et conditions de retrait..."
            {...form.register('withdrawalConditions')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="withdrawal-how">Comment retirer l'acte ou le service administratif demandé</Label>
          <Textarea
            id="withdrawal-how"
            placeholder="Modalités de retrait..."
            {...form.register('withdrawalMethods')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="validity">Validité de l'acte ou du service administratif demandé</Label>
        <Input
          id="validity"
          placeholder="Ex: 10 ans, permanent, etc."
          {...form.register('validityDuration')}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="appeal-possible" 
          {...form.register('appealPossible')}
        />
        <Label htmlFor="appeal-possible">Possibilité de recours</Label>
      </div>
    </div>
  );
}
