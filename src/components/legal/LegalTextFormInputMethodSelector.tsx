
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ClipboardList, Scan } from 'lucide-react';

interface LegalTextFormInputMethodSelectorProps {
  inputMethod: 'manual' | 'ocr';
  onInputMethodChange: (method: 'manual' | 'ocr') => void;
}

export function LegalTextFormInputMethodSelector({ 
  inputMethod, 
  onInputMethodChange 
}: LegalTextFormInputMethodSelectorProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          Méthode de Saisie
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            type="button"
            variant={inputMethod === 'manual' ? 'default' : 'outline'}
            onClick={() => onInputMethodChange('manual')}
            className="h-20 flex flex-col gap-2"
          >
            <ClipboardList className="w-6 h-6" />
            <span>Insertion Manuelle</span>
            <span className="text-xs opacity-80">Saisie via le formulaire</span>
          </Button>
          
          <Button
            type="button"
            variant={inputMethod === 'ocr' ? 'default' : 'outline'}
            onClick={() => onInputMethodChange('ocr')}
            className="h-20 flex flex-col gap-2"
          >
            <Scan className="w-6 h-6" />
            <span>Insertion OCR</span>
            <span className="text-xs opacity-80">Scan de document</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
