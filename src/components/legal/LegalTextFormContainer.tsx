
import React from 'react';
import { LegalTextFormMainInfo } from './LegalTextFormMainInfo';
import { LegalTextFormMetadata } from './LegalTextFormMetadata';
import { LegalTextFormContent } from './LegalTextFormContent';
import { LegalTextFormActions } from './LegalTextFormActions';
import { useLegalTextForm } from './LegalTextFormProvider';

interface LegalTextFormContainerProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function LegalTextFormContainer({ onClose, onSubmit }: LegalTextFormContainerProps) {
  const { formData, updateFormData } = useLegalTextForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données finales du formulaire:', formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LegalTextFormMainInfo 
            formData={formData}
            onInputChange={updateFormData}
          />
        </div>

        <div className="space-y-6">
          <LegalTextFormMetadata 
            formData={formData}
            onInputChange={updateFormData}
          />
        </div>
      </div>

      <LegalTextFormContent 
        formData={formData}
        onInputChange={updateFormData}
      />

      <LegalTextFormActions 
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </form>
  );
}
