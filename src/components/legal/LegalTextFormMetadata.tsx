
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LegalTextFormMetadataProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export function LegalTextFormMetadata({ formData, onInputChange }: LegalTextFormMetadataProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-lg text-gray-900">Métadonnées</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="source" className="text-sm font-medium text-gray-700">Source/Origine</Label>
          <Input
            id="source"
            value={formData.source}
            onChange={(e) => onInputChange('source', e.target.value)}
            placeholder="Ex: Ministère de la Justice"
            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">Mots-clés</Label>
          <Textarea
            id="keywords"
            value={formData.keywords}
            onChange={(e) => onInputChange('keywords', e.target.value)}
            placeholder="Mots-clés séparés par des virgules"
            rows={3}
            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">Statut</Label>
          <Select onValueChange={(value) => onInputChange('status', value)} value={formData.status}>
            <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="archived">Archivé</SelectItem>
              <SelectItem value="abrogated">Abrogé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
