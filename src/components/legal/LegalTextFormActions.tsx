
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface LegalTextFormActionsProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

export function LegalTextFormActions({ onClose, onSubmit, isSubmitting = false }: LegalTextFormActionsProps) {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button type="button" variant="outline" onClick={onClose} className="px-8">
        Annuler
      </Button>
      <Button 
        type="submit" 
        onClick={onSubmit}
        className="px-8 bg-emerald-600 hover:bg-emerald-700 gap-2"
        disabled={isSubmitting}
      >
        <Save className="w-4 h-4" />
        Enregistrer le texte
      </Button>
    </div>
  );
}
