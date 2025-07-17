
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LegalTextFormMainInfoProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export function LegalTextFormMainInfo({ formData, onInputChange }: LegalTextFormMainInfoProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardTitle className="text-xl text-gray-900">Informations principales</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Titre du texte *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onInputChange('title', e.target.value)}
              placeholder="Ex: Loi n° 08-09 du 25 février 2008"
              className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference" className="text-sm font-medium text-gray-700">Référence officielle *</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => onInputChange('reference', e.target.value)}
              placeholder="Ex: J.O. n° 12 du 02/03/2008"
              className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type de texte *</Label>
            <Select onValueChange={(value) => onInputChange('type', value)} value={formData.type}>
              <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="loi">Loi</SelectItem>
                <SelectItem value="decret">Décret</SelectItem>
                <SelectItem value="arrete">Arrêté</SelectItem>
                <SelectItem value="ordonnance">Ordonnance</SelectItem>
                <SelectItem value="circulaire">Circulaire</SelectItem>
                <SelectItem value="instruction">Instruction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain" className="text-sm font-medium text-gray-700">Domaine juridique *</Label>
            <Select onValueChange={(value) => onInputChange('domain', value)} value={formData.domain}>
              <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Droit civil</SelectItem>
                <SelectItem value="penal">Droit pénal</SelectItem>
                <SelectItem value="commercial">Droit commercial</SelectItem>
                <SelectItem value="administratif">Droit administratif</SelectItem>
                <SelectItem value="travail">Droit du travail</SelectItem>
                <SelectItem value="famille">Droit de la famille</SelectItem>
                <SelectItem value="environnement">Droit de l'environnement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date de publication *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => onInputChange('date', e.target.value)}
              className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description/Objet</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Résumé de l'objet du texte juridique..."
            rows={3}
            className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
