
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Loader } from 'lucide-react';

interface AIAutoFillActionsProps {
  isGenerating: boolean;
  onCancel: () => void;
  onGenerate: () => void;
}

export function AIAutoFillActions({ isGenerating, onCancel, onGenerate }: AIAutoFillActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={onCancel} disabled={isGenerating}>
        Annuler
      </Button>
      <Button onClick={onGenerate} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700">
        {isGenerating ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Génération en cours...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Générer avec IA
          </>
        )}
      </Button>
    </div>
  );
}
