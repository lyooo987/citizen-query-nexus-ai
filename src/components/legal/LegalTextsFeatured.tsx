
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, Download } from 'lucide-react';

export function LegalTextsFeatured() {
  const featuredTexts = [
    {
      id: 1,
      title: "Loi n° 23-12 du 14 juin 2023 relative à la transformation numérique",
      type: "Loi",
      category: "Numérique",
      publishDate: "14 juin 2023",
      views: "2,847",
      downloads: "892",
      featured: true
    },
    {
      id: 2,
      title: "Ordonnance n° 23-07 du 18 mai 2023 portant protection des données personnelles",
      type: "Ordonnance",
      category: "Protection des données",
      publishDate: "18 mai 2023",
      views: "1,923",
      downloads: "567",
      featured: true
    },
    {
      id: 3,
      title: "Décret n° 23-234 du 25 avril 2023 relatif à l'investissement",
      type: "Décret",
      category: "Économie",
      publishDate: "25 avril 2023",
      views: "3,156",
      downloads: "1,234",
      featured: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-500" />
        <h3 className="text-xl font-semibold text-gray-900">Textes juridiques en vedette</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {featuredTexts.map((text) => (
          <Card key={text.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{text.type}</Badge>
                    <Badge className="bg-emerald-100 text-emerald-800">{text.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{text.title}</CardTitle>
                </div>
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Publié le {text.publishDate}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {text.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {text.downloads}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Consulter
                  </Button>
                  <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
