import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Scan } from 'lucide-react';
import { SECTORS } from '@/types/legal';
import { FormStepProps, targetCategories, procedureTypes } from './types';
import { OCRScanner } from '@/components/common/OCRScanner';

export function Step1GeneralInfo({ form }: FormStepProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);

  const handleOCRTextExtracted = (text: string) => {
    // Importer la fonction d'extraction
    import('@/utils/ocrFormFiller').then(({ extractProcedureData }) => {
      const extractedData = extractProcedureData(text);
      console.log('Données de procédure extraites:', extractedData);
      
      // Pré-remplir le formulaire avec les données extraites
      Object.entries(extractedData).forEach(([key, value]) => {
        if (value) {
          form.setValue(key as any, value);
        }
      });
    });
    setShowOCRScanner(false);
  };

  if (showOCRScanner) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Scanner un document de procédure</h3>
          <Button 
            variant="outline" 
            onClick={() => setShowOCRScanner(false)}
          >
            Retour au formulaire
          </Button>
        </div>
        <OCRScanner
          title="Scanner pour pré-remplir le formulaire"
          onTextExtracted={handleOCRTextExtracted}
          onClose={() => setShowOCRScanner(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Informations générales</h3>
          <p className="text-gray-600">Renseignez les informations de base de la procédure</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowOCRScanner(true)}
          className="flex items-center gap-2"
        >
          <Scan className="w-4 h-4" />
          Scanner un document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom de la procédure *</Label>
          <Input
            id="name"
            placeholder="Ex: Demande de passeport biométrique"
            {...form.register('name', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type de procédure *</Label>
          <Select onValueChange={(value) => form.setValue('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {procedureTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Description détaillée de la procédure..."
          className="min-h-24"
          {...form.register('description', { required: true })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sector">Secteur et/ou administration *</Label>
          <Select onValueChange={(value) => form.setValue('sector', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un secteur" />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((sector) => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Catégorie cible *</Label>
          <div className="grid grid-cols-2 gap-2">
            {targetCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm">{category}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
