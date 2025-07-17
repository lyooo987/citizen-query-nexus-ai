
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { FormStepProps } from './types';

export function Step6AdditionalInfo({ form }: FormStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Informations complémentaires</h3>
        <p className="text-gray-600">Ajoutez les derniers détails</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="legal-basis">Ancrage juridique</Label>
        <Textarea
          id="legal-basis"
          placeholder="Références juridiques (lois, décrets, arrêtés...)"
          {...form.register('legalBasis')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Label>Guide d'utilisation à télécharger</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-blue-600 cursor-pointer mb-2">Choisir pour télécharger</p>
            <Button variant="outline" size="sm">Sélectionner un fichier</Button>
          </div>
        </div>
        <div className="space-y-4">
          <Label>Formulaire à télécharger</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-blue-600 cursor-pointer mb-2">Choisir pour télécharger</p>
            <Button variant="outline" size="sm">Sélectionner un fichier</Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequent-questions">Questions fréquemment posées</Label>
        <Textarea
          id="frequent-questions"
          placeholder="Questions et réponses fréquentes..."
          className="min-h-24"
          {...form.register('frequentQuestions')}
        />
      </div>

      <div className="space-y-6">
        <h4 className="font-semibold text-lg">Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contact-address">Adresse</Label>
            <Textarea
              id="contact-address"
              placeholder="Adresse complète..."
              {...form.register('contactAddress')}
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">N° Téléphone</Label>
              <Input
                id="phone"
                placeholder="+213 XX XX XX XX"
                {...form.register('phoneNumber')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@administration.dz"
                {...form.register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="green-number">N° Vert</Label>
              <Input
                id="green-number"
                placeholder="3030"
                {...form.register('greenNumber')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
