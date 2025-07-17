
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/common/ActionButton';
import { Badge } from '@/components/ui/badge';

export function ActionButtonsDemo() {
  const sampleLegalText = {
    id: '1',
    title: 'Code Civil Algérien - Article 123',
    type: 'civil',
    status: 'Publié',
    pdfUrl: '/sample-document.pdf'
  };

  const sampleProcedure = {
    id: '2',
    title: 'Demande de Passeport Biométrique',
    type: 'état-civil',
    status: 'Actif'
  };

  const comparisonItems = [
    { ...sampleLegalText, content: 'Contenu du code civil...' },
    { ...sampleProcedure, content: 'Procédure de demande...' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legal Text Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {sampleLegalText.title}
              <Badge variant="outline">{sampleLegalText.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Dispositions relatives aux obligations et contrats dans le droit civil algérien.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <ActionButton 
                action="lire" 
                size="sm"
                itemTitle={sampleLegalText.title}
                data={{ pdfUrl: sampleLegalText.pdfUrl }}
              />
              <ActionButton 
                action="pdf" 
                size="sm"
                itemTitle={sampleLegalText.title}
                data={{ pdfUrl: sampleLegalText.pdfUrl }}
              />
              <ActionButton 
                action="télécharger" 
                size="sm"
                itemTitle={sampleLegalText.title}
                data={{ url: sampleLegalText.pdfUrl }}
              />
              <ActionButton 
                action="partager" 
                size="sm"
                itemTitle={sampleLegalText.title}
              />
              <ActionButton 
                action="aimer" 
                size="sm"
                itemId={sampleLegalText.id}
                itemTitle={sampleLegalText.title}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <ActionButton 
                action="signaler" 
                variant="outline"
                size="sm"
                itemTitle={sampleLegalText.title}
              />
              <ActionButton 
                action="avis" 
                variant="outline"
                size="sm"
                itemTitle={sampleLegalText.title}
              />
              <ActionButton 
                action="témoignage" 
                variant="outline"
                size="sm"
                itemTitle={sampleLegalText.title}
              />
            </div>
          </CardContent>
        </Card>

        {/* Procedure Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {sampleProcedure.title}
              <Badge>{sampleProcedure.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Procédure administrative pour l'obtention d'un passeport biométrique.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <ActionButton 
                action="consulter" 
                size="sm"
                itemTitle={sampleProcedure.title}
              />
              <ActionButton 
                action="voir" 
                size="sm"
                itemTitle={sampleProcedure.title}
              />
              <ActionButton 
                action="examiner" 
                size="sm"
                itemId={sampleProcedure.id}
                itemTitle={sampleProcedure.title}
              />
              <ActionButton 
                action="approuver" 
                size="sm"
                itemId={sampleProcedure.id}
                itemTitle={sampleProcedure.title}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <ActionButton 
                action="utiliser" 
                variant="outline"
                size="sm"
                itemTitle={sampleProcedure.title}
              />
              <ActionButton 
                action="traduire" 
                variant="outline"
                size="sm"
                itemTitle={sampleProcedure.title}
              />
              <ActionButton 
                action="vérifier" 
                variant="outline"
                size="sm"
                itemTitle={sampleProcedure.title}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons Row */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Globales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <ActionButton 
              action="filtres" 
              data={{ type: 'legal' }}
            />
            <ActionButton 
              action="comparer" 
              data={{ items: comparisonItems }}
            />
            <ActionButton 
              action="exporter" 
              data={{ items: comparisonItems }}
              itemTitle="données-juridiques"
            />
            <ActionButton 
              action="import" 
              data={{ acceptedTypes: ['.pdf', '.docx', '.txt'] }}
            />
            <ActionButton 
              action="recherche-ia" 
            />
            <ActionButton 
              action="recherche-avancée" 
            />
            <ActionButton 
              action="générer-ia" 
            />
            <ActionButton 
              action="analyser" 
            />
            <ActionButton 
              action="commencer" 
            />
            <ActionButton 
              action="publier" 
            />
            <ActionButton 
              action="inviter" 
            />
            <ActionButton 
              action="nouveau" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
