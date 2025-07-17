
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormStepProps } from './types';

export function Step4ModalsDelays({ form }: FormStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Modalités et délais</h3>
        <p className="text-gray-600">Définissez les modalités de traitement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="submissionLocation">Où déposer le dossier</Label>
          <Textarea
            id="submissionLocation"
            placeholder="Adresse et lieu de dépôt du dossier..."
            {...form.register('submissionLocation')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsibleAdmin">Administration concernée</Label>
          <Input
            id="responsibleAdmin"
            placeholder="Administration responsable"
            {...form.register('responsibleAdmin')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="validityStart">Validité de la procédure - Du</Label>
          <Input
            id="validityStart"
            type="date"
            {...form.register('validityStart')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="validityEnd">Au</Label>
          <Input
            id="validityEnd"
            type="date"
            {...form.register('validityEnd')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Type de procédure</Label>
        <RadioGroup defaultValue="open">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="periodic" id="periodic" />
            <Label htmlFor="periodic">Procédure périodique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="open" id="open" />
            <Label htmlFor="open">Procédure ouverte</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="processingDuration">Durée du traitement (en jours)</Label>
        <Input
          id="processingDuration"
          placeholder="Ex: 15"
          {...form.register('processingDuration')}
        />
      </div>

      <div className="space-y-4">
        <Label>Frais</Label>
        <RadioGroup defaultValue="free">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free">Gratuit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paid" id="paid" />
            <Label htmlFor="paid">Payant</Label>
          </div>
        </RadioGroup>
        
        <div className="space-y-2">
          <Label htmlFor="cost">Coût (si payant)</Label>
          <Input
            id="cost"
            placeholder="Ex: 5000 DA"
            {...form.register('cost')}
          />
        </div>
      </div>
    </div>
  );
}
