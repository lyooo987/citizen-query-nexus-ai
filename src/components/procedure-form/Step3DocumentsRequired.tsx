
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { FormStepProps } from './types';

export function Step3DocumentsRequired({ 
  requiredDocs = [], 
  setRequiredDocs,
  complementaryDocs = [],
  setComplementaryDocs
}: FormStepProps) {
  const addDocument = (type: 'required' | 'complementary') => {
    if (type === 'required' && setRequiredDocs) {
      setRequiredDocs([...requiredDocs, '']);
    } else if (type === 'complementary' && setComplementaryDocs) {
      setComplementaryDocs([...complementaryDocs, '']);
    }
  };

  const updateDocument = (type: 'required' | 'complementary', index: number, value: string) => {
    if (type === 'required' && setRequiredDocs) {
      const updated = [...requiredDocs];
      updated[index] = value;
      setRequiredDocs(updated);
    } else if (type === 'complementary' && setComplementaryDocs) {
      const updated = [...complementaryDocs];
      updated[index] = value;
      setComplementaryDocs(updated);
    }
  };

  const removeDocument = (type: 'required' | 'complementary', index: number) => {
    if (type === 'required' && setRequiredDocs) {
      setRequiredDocs(requiredDocs.filter((_, i) => i !== index));
    } else if (type === 'complementary' && setComplementaryDocs) {
      setComplementaryDocs(complementaryDocs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Documents requis</h3>
        <p className="text-gray-600">Listez les documents nécessaires</p>
      </div>

      {/* Documents demandés */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium">Documents demandés</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addDocument('required')}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un document
          </Button>
        </div>

        {requiredDocs.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
            <p>Aucun document ajouté</p>
          </div>
        ) : (
          <div className="space-y-2">
            {requiredDocs.map((doc, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Nom du document requis"
                  value={doc}
                  onChange={(e) => updateDocument('required', index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument('required', index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Documents complémentaires */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-medium">Documents complémentaires (si nécessaire après validation)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addDocument('complementary')}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un document
          </Button>
        </div>

        {complementaryDocs.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
            <p>Aucun document ajouté</p>
          </div>
        ) : (
          <div className="space-y-2">
            {complementaryDocs.map((doc, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Nom du document complémentaire"
                  value={doc}
                  onChange={(e) => updateDocument('complementary', index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument('complementary', index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
