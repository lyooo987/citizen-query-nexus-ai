
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, CheckCircle, ArrowRight } from 'lucide-react';

export function DocumentTemplatesSection() {
  const templateCategories = [
    {
      id: 1,
      title: 'Contrats commerciaux',
      description: 'Modèles pour différents types de contrats commerciaux',
      count: 15,
      icon: FileText,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Avis juridiques',
      description: 'Structures pour rédiger des avis juridiques',
      count: 8,
      icon: FileText,
      color: 'purple'
    },
    {
      id: 3,
      title: 'Procédures internes',
      description: 'Modèles de procédures et règlements internes',
      count: 12,
      icon: FileText,
      color: 'emerald'
    }
  ];

  const features = [
    {
      title: 'Vérification automatique',
      description: 'Vérifiez automatiquement la conformité et la cohérence de vos documents.',
      action: 'Activer la vérification'
    },
    {
      title: 'Éditeur collaboratif',
      description: 'Rédigez et collaborez en temps réel avec votre équipe sur des documents juridiques.',
      action: 'Ouvrir l\'éditeur'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Modèles de documents</h1>
        <p className="text-muted-foreground">
          Accédez à une bibliothèque de modèles pour différents types de documents juridiques.
        </p>
      </div>

      {/* Template Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templateCategories.map((category) => {
          const IconComponent = category.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            emerald: 'bg-emerald-100 text-emerald-600'
          };

          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {category.count} modèles
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <Button variant="outline" className="w-full justify-between">
                  Parcourir les modèles
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  {index === 0 ? <CheckCircle className="w-6 h-6 text-emerald-600" /> : <Users className="w-6 h-6 text-emerald-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    {feature.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Feature */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-800">Éditeur collaboratif</h3>
                <p className="text-emerald-700">
                  Rédigez et collaborez en temps réel avec votre équipe sur des documents juridiques.
                </p>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Ouvrir l'éditeur
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
