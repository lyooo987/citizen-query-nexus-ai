
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LegalTextFormContentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export function LegalTextFormContent({ formData, onInputChange }: LegalTextFormContentProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
        <CardTitle className="text-xl text-gray-900">Contenu du texte juridique</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <Label htmlFor="content" className="text-sm font-medium text-gray-700">Texte intégral *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => onInputChange('content', e.target.value)}
            placeholder="Saisir ou coller le contenu complet du texte juridique..."
            rows={12}
            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-sm"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
