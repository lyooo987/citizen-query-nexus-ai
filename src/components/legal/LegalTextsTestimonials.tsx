
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export function LegalTextsTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Me. Amina Benali",
      role: "Avocate",
      speciality: "Droit commercial",
      rating: 5,
      comment: "Cette plateforme m'a permis de trouver rapidement les textes juridiques dont j'avais besoin pour mes dossiers. La recherche est très efficace.",
      date: "12 janvier 2024"
    },
    {
      id: 2,
      name: "Dr. Karim Meziani",
      role: "Magistrat",
      speciality: "Droit civil",
      rating: 5,
      comment: "Un outil indispensable pour les professionnels du droit. La base de données est complète et régulièrement mise à jour.",
      date: "08 janvier 2024"
    },
    {
      id: 3,
      name: "Mme. Fatima Ouali",
      role: "Juriste d'entreprise",
      speciality: "Droit du travail",
      rating: 4,
      comment: "Interface intuitive et contenu de qualité. Je recommande vivement cette plateforme à tous mes collègues juristes.",
      date: "05 janvier 2024"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Témoignages récents</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <Badge variant="outline" className="mt-1">
                    {testimonial.speciality}
                  </Badge>
                </div>
                <Quote className="w-6 h-6 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm text-gray-700 italic">"{testimonial.comment}"</p>
                <p className="text-xs text-gray-500">{testimonial.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
