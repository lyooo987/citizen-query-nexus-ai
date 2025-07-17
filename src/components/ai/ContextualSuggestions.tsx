
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, History, TrendingUp, FileText, Clock, Star } from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'search' | 'document' | 'trend' | 'reminder';
  title: string;
  description: string;
  relevance: number;
  action: string;
  metadata?: {
    category?: string;
    lastAccessed?: string;
    popularity?: number;
  };
}

export function ContextualSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de suggestions contextuelles basées sur l'historique
    setTimeout(() => {
      setSuggestions([
        {
          id: '1',
          type: 'search',
          title: 'Recherches similaires à "contrat de travail"',
          description: 'Autres utilisateurs ont aussi recherché ces termes',
          relevance: 0.92,
          action: 'Voir les suggestions',
          metadata: {
            category: 'Droit social',
            popularity: 87
          }
        },
        {
          id: '2',
          type: 'document',
          title: 'Nouveau décret sur la formation professionnelle',
          description: 'Publié cette semaine, pertinent pour vos activités',
          relevance: 0.88,
          action: 'Consulter le document',
          metadata: {
            category: 'Formation',
            lastAccessed: '2024-01-15'
          }
        },
        {
          id: '3',
          type: 'trend',
          title: 'Évolution récente du droit du numérique',
          description: 'Tendance émergente dans votre domaine d\'expertise',
          relevance: 0.84,
          action: 'Voir l\'analyse',
          metadata: {
            category: 'Droit numérique',
            popularity: 73
          }
        },
        {
          id: '4',
          type: 'reminder',
          title: 'Échéance réglementaire approche',
          description: 'Nouvelle obligation RGPD applicable dans 30 jours',
          relevance: 0.95,
          action: 'Voir les détails',
          metadata: {
            category: 'Protection des données'
          }
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'search': return History;
      case 'document': return FileText;
      case 'trend': return TrendingUp;
      case 'reminder': return Clock;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'search': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'document': return 'bg-green-100 text-green-800 border-green-200';
      case 'trend': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'reminder': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'search': return 'Recherche';
      case 'document': return 'Document';
      case 'trend': return 'Tendance';
      case 'reminder': return 'Rappel';
      default: return 'Suggestion';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600 animate-pulse" />
            Suggestions contextuelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Suggestions personnalisées
        </CardTitle>
        <p className="text-sm text-gray-600">
          Basées sur votre activité et vos préférences
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const IconComponent = getIcon(suggestion.type);
            
            return (
              <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-full bg-gray-100">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <Badge className={getTypeColor(suggestion.type)}>
                          {getTypeLabel(suggestion.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                      
                      {suggestion.metadata && (
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {suggestion.metadata.category && (
                            <span>{suggestion.metadata.category}</span>
                          )}
                          {suggestion.metadata.popularity && (
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-yellow-500" />
                              {suggestion.metadata.popularity}% populaire
                            </span>
                          )}
                          {suggestion.metadata.lastAccessed && (
                            <span>Vu le {suggestion.metadata.lastAccessed}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {Math.round(suggestion.relevance * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">pertinence</div>
                    </div>
                    <Button size="sm" variant="outline">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Conseil IA</span>
          </div>
          <p className="text-sm text-blue-800">
            Vos recherches récentes suggèrent un intérêt pour le droit social. 
            Nous avons détecté 3 nouvelles publications qui pourraient vous intéresser.
          </p>
          <Button size="sm" variant="outline" className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-100">
            Voir les recommandations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
