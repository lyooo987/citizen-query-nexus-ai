
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useFormLibraryStore, SavedForm } from '@/stores/formLibraryStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_FORM_TEMPLATES } from '@/data/formTemplatesFinal';
import { FormTemplate } from '@/data/formTemplates';

interface AddLegalTextFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLegalTextForm({ isOpen, onClose }: AddLegalTextFormProps) {
  const { toast } = useToast();
  const { forms: customForms } = useFormLibraryStore();
  const [selectedFormId, setSelectedFormId] = useState('');
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  // Filtrer les formulaires de la bibliothèque pour les textes juridiques
  const procedureCategories = ['État Civil', 'Urbanisme', 'Commerce', 'Emploi', 'Santé', 'Éducation', 'Transport', 'Fiscalité'];
  const legalTextForms = ALL_FORM_TEMPLATES.filter(form => 
    !procedureCategories.includes(form.category)
  );

  useEffect(() => {
    if (selectedFormId) {
      const form = legalTextForms.find(f => f.id === selectedFormId);
      if (form) {
        setSelectedForm(form);
        // Initialiser les données du formulaire avec des valeurs vides
        const initialData: { [key: string]: any } = {};
        form.fields.forEach(field => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      }
    } else {
      setSelectedForm(null);
      setFormData({});
    }
  }, [selectedFormId, legalTextForms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForm) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un formulaire depuis la bibliothèque.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Nouveau texte juridique:', { formTemplate: selectedForm, data: formData });
    toast({
      title: "Texte juridique ajouté",
      description: `Le texte basé sur "${selectedForm.name}" a été ajouté avec succès.`,
    });
    onClose();
    setSelectedFormId('');
    setSelectedForm(null);
    setFormData({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau texte juridique</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection du formulaire depuis la bibliothèque */}
          <Card>
            <CardHeader>
              <CardTitle>Sélection du formulaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-select">Formulaire depuis la bibliothèque *</Label>
                  <Select value={selectedFormId} onValueChange={setSelectedFormId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un formulaire depuis la bibliothèque" />
                    </SelectTrigger>
                    <SelectContent>
                      {legalTextForms.length === 0 ? (
                        <SelectItem value="" disabled>
                          Aucun formulaire de texte juridique disponible dans la bibliothèque
                        </SelectItem>
                      ) : (
                        legalTextForms.map((form) => (
                          <SelectItem key={form.id} value={form.id}>
                            {form.name} ({form.category})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {selectedForm && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Description:</strong> {selectedForm.description}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      <strong>Champs:</strong> {selectedForm.fields.length} champs configurés
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Formulaire dynamique basé sur la sélection */}
          {selectedForm && (
            <Card>
              <CardHeader>
                <CardTitle>Détails du texte juridique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedForm.fields.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={3}
                        />
                      ) : field.type === 'select' && field.options ? (
                        <Select 
                          value={formData[field.name] || ''} 
                          onValueChange={(value) => setFormData({...formData, [field.name]: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder || `Sélectionner ${field.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.name}
                          type={field.type || 'text'}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={!selectedForm}>
              Ajouter le texte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
