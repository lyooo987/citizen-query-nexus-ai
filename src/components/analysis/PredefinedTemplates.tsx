
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Settings, Bot, MoreHorizontal } from 'lucide-react';

export function PredefinedTemplates() {
  const templates = [
    { 
      title: "Rapport d'Activité Mensuel", 
      description: "Synthèse complète des activités du mois avec métriques clés",
      category: "Performance",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "IA",
      levelColor: "bg-blue-100 text-blue-800"
    },
    { 
      title: "Analyse de Conformité Réglementaire", 
      description: "Évaluation détaillée du respect des réglementations",
      category: "Conformité",
      frequency: "Trimestriel",
      lastUpdate: "Mis à jour",
      level: "Expert",
      levelColor: "bg-purple-100 text-purple-800"
    },
    { 
      title: "Rapport de Performance Système", 
      description: "Analyse des performances techniques et opérationnelles",
      category: "Technique",
      frequency: "Hebdomadaire",
      lastUpdate: "Mis à jour",
      level: "Avancé",
      levelColor: "bg-orange-100 text-orange-800"
    },
    { 
      title: "Synthèse Exécutive", 
      description: "Résumé stratégique pour la direction",
      category: "Direction",
      frequency: "Mensuel",
      lastUpdate: "Mis à jour",
      level: "Simple",
      levelColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Modèles de Rapports Prédéfinis
          </CardTitle>
          <CardDescription>
            Sélectionnez parmi nos modèles de rapports préconçus optimisés par IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge className={template.levelColor}>
                      {template.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span><strong>Catégorie:</strong> {template.category}</span>
                    <span><strong>Fréquence:</strong> {template.frequency}</span>
                    <span className="text-green-600"><strong>{template.lastUpdate}</strong></span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Aperçu
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurer
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Bot className="w-4 h-4 mr-1" />
                      Générer
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
