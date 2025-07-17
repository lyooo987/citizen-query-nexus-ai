
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { GitCompareArrows, Scale, BookOpen } from 'lucide-react';

interface LegalText {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  publishDate: string;
  status: string;
}

const mockLegalTexts: LegalText[] = [
  {
    id: '1',
    title: 'Code civil algérien - Livre des obligations',
    description: 'Dispositions relatives aux contrats et obligations civiles',
    type: 'Code',
    category: 'Civil',
    publishDate: '1975',
    status: 'En vigueur'
  },
  {
    id: '2',
    title: 'Code de commerce algérien',
    description: 'Règles régissant les activités commerciales en Algérie',
    type: 'Code',
    category: 'Commercial',
    publishDate: '1975',
    status: 'En vigueur'
  },
  {
    id: '3',
    title: 'Loi sur les relations de travail',
    description: 'Cadre juridique des relations employeur-employé',
    type: 'Loi',
    category: 'Travail',
    publishDate: '1990',
    status: 'En vigueur'
  },
  {
    id: '4',
    title: 'Code pénal algérien',
    description: 'Définition des infractions et sanctions pénales',
    type: 'Code',
    category: 'Pénal',
    publishDate: '1966',
    status: 'En vigueur'
  }
];

export function LegalTextsComparisonTab() {
  const [selectedTexts, setSelectedTexts] = useState<string[]>([]);

  const handleTextSelection = (textId: string, checked: boolean) => {
    if (checked) {
      setSelectedTexts([...selectedTexts, textId]);
    } else {
      setSelectedTexts(selectedTexts.filter(id => id !== textId));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Code':
        return BookOpen;
      case 'Loi':
        return Scale;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <GitCompareArrows className="w-16 h-16 mx-auto text-emerald-600" />
        <div>
          <h2 className="text-2xl font-bold">Comparaison des textes juridiques</h2>
          <p className="text-gray-600 mt-2">
            Sélectionnez les textes juridiques à comparer pour analyser leurs similitudes, différences et évolutions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Sélectionner les textes à comparer</h3>
          <p className="text-sm text-gray-600 mb-4">Choisissez au moins 2 textes juridiques pour commencer la comparaison</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockLegalTexts.map((text) => {
            const TypeIcon = getTypeIcon(text.type);
            return (
              <Card key={text.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedTexts.includes(text.id)}
                      onCheckedChange={(checked) => 
                        handleTextSelection(text.id, checked as boolean)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TypeIcon className="w-5 h-5 text-emerald-600" />
                        <CardTitle className="text-lg">{text.title}</CardTitle>
                      </div>
                      <CardDescription className="mt-1">
                        {text.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline">Type: {text.type}</Badge>
                        <Badge variant="outline">Catégorie: {text.category}</Badge>
                        <Badge variant="outline">Publié: {text.publishDate}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">
            {selectedTexts.length} texte(s) sélectionné(s)
          </span>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={selectedTexts.length < 2}
          >
            <GitCompareArrows className="w-4 h-4 mr-2" />
            Comparer les textes
          </Button>
        </div>
      </div>

      {/* Aperçu des fonctionnalités de comparaison */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Fonctionnalités de comparaison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Analyse structurelle</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Comparaison des articles et sections</li>
                <li>• Identification des similitudes</li>
                <li>• Détection des différences clés</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Évolution temporelle</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Chronologie des modifications</li>
                <li>• Impact des amendements</li>
                <li>• Analyse des abrogations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
