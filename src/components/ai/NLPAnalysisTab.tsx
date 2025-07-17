
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { TabFormField } from '@/components/common/TabFormField';
import { SpecializedNLP } from './SpecializedNLP';
import { AICapabilitiesGrid } from './AICapabilitiesGrid';

export function NLPAnalysisTab() {
  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Analyser un texte avec NLP juridique spécialisé..."
        onSearch={(query) => console.log('Analyse NLP:', query)}
        onAdd={() => console.log('Nouvelle analyse NLP')}
        onFilter={() => console.log('Filtrer analyses NLP')}
        onSort={() => console.log('Trier analyses NLP')}
        onExport={() => console.log('Exporter analyse NLP')}
        onRefresh={() => console.log('Actualiser NLP')}
        showActions={true}
      />

      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Traitement du Langage Naturel Juridique
          </CardTitle>
          <p className="text-gray-600">
            Traitement du langage naturel spécialisé pour l'analyse automatique de textes juridiques
          </p>
        </CardHeader>
        <CardContent>
          <AICapabilitiesGrid type="nlp" />
        </CardContent>
      </Card>
      
      <SpecializedNLP />
    </div>
  );
}
