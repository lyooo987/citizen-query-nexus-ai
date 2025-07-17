
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, Scale } from 'lucide-react';
import { useGlobalActions } from '@/hooks/useGlobalActions';

export function LegalTextsInstitutions() {
  const actions = useGlobalActions();

  const institutions = [
    {
      id: 1,
      name: "Assemblée Populaire Nationale",
      type: "Législatif",
      textsCount: 892,
      description: "Institution législative responsable de l'adoption des lois",
      icon: Building
    },
    {
      id: 2,
      name: "Conseil de la Nation",
      type: "Législatif",
      textsCount: 156,
      description: "Chambre haute du Parlement algérien",
      icon: Scale
    },
    {
      id: 3,
      name: "Présidence de la République",
      type: "Exécutif",
      textsCount: 234,
      description: "Ordonnances et décrets présidentiels",
      icon: Users
    },
    {
      id: 4,
      name: "Conseil des Ministres",
      type: "Exécutif",
      textsCount: 312,
      description: "Décrets exécutifs et réglementaires",
      icon: Building
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Institutions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {institutions.map((institution) => {
          const IconComponent = institution.icon;
          return (
            <Card key={institution.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{institution.name}</CardTitle>
                    <p className="text-sm text-gray-600">{institution.type}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{institution.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-600">
                    {institution.textsCount} textes
                  </span>
                  <Button variant="outline" size="sm" 
                          onClick={() => actions.handlePDFView(`Textes de ${institution.name}`)}>
                    Voir les textes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
