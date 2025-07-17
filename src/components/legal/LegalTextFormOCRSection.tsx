
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan } from 'lucide-react';
import { SmartOCRProcessor } from '@/components/common/SmartOCRProcessor';

interface LegalTextFormOCRSectionProps {
  showOCRScanner: boolean;
  onShowOCRScanner: (show: boolean) => void;
  onOCRFormDataExtracted: (data: { documentType: 'legal' | 'procedure', formData: Record<string, any> }) => void;
}

export function LegalTextFormOCRSection({ 
  showOCRScanner, 
  onShowOCRScanner, 
  onOCRFormDataExtracted 
}: LegalTextFormOCRSectionProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-green-600" />
          Scanner pour Générer un Texte Juridique
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <SmartOCRProcessor
          onFormDataExtracted={onOCRFormDataExtracted}
          onClose={() => onShowOCRScanner(false)}
          title="Scanner pour Générer un Texte Juridique"
        />
      </CardContent>
    </Card>
  );
}
