
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, BookOpen, Building, FileText } from 'lucide-react';

export function LegalTextsTypes() {
  const textTypes = [
    {
      id: 1,
      name: "Lois",
      count: 892,
      description: "Textes adoptés par le Parlement",
      icon: Scale,
      color: "emerald"
    },
    {
      id: 2,
      name: "Ordonnances",
      count: 234,
      description: "Textes pris par le Président de la République",
      icon: BookOpen,
      color: "blue"
    },
    {
      id: 3,
      name: "Décrets",
      count: 312,
      description: "Textes réglementaires du gouvernement",
      icon: Building,
      color: "purple"
    },
    {
      id: 4,
      name: "Arrêtés",
      count: 156,
      description: "Textes des autorités administratives",
      icon: FileText,
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "bg-emerald-100 text-emerald-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Types de textes juridiques</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {textTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card key={type.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(type.color)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <p className="text-sm text-gray-600">{type.count} textes</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Parcourir
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
