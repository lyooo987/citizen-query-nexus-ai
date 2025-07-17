
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, TrendingUp, Clock, Star, ArrowRight, RefreshCw } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'document' | 'procedure' | 'update' | 'template';
  title: string;
  description: string;
  relevanceScore: number;
  category: string;
  estimatedTime: string;
  priority: 'low' | 'medium' | 'high';
  reason: string;
  tags: string[];
}

interface UserPreferences {
  domains: string[];
  frequency: string;
  complexity: string;
  notifications: boolean;
}

export function AIRecommendationEngine() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    domains: ['droit-administratif', 'urbanisme'],
    frequency: 'daily',
    complexity: 'moderate',
    notifications: true
  });
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    generateRecommendations();
  }, [userPreferences]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulation de génération de recommandations IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'update',
        title: 'Nouvelle réglementation sur les marchés publics',
        description: 'Important décret modifiant les seuils de marchés publics entré en vigueur cette semaine',
        relevanceScore: 0.95,
        category: 'Marchés publics',
        estimatedTime: '10 min',
        priority: 'high',
        reason: 'Basé sur vos recherches récentes sur les marchés publics',
        tags: ['Urgent', 'Réglementation', 'Marchés publics']
      },
      {
        id: '2',
        type: 'procedure',
        title: 'Simplification de la procédure de permis de construire',
        description: 'Nouvelle procédure dématérialisée pour les permis de construire résidentiels',
        relevanceScore: 0.87,
        category: 'Urbanisme',
        estimatedTime: '15 min',
        priority: 'medium',
        reason: 'Correspond à votre domaine d\'expertise en urbanisme',
        tags: ['Procédure', 'Dématérialisation', 'Urbanisme']
      },
      {
        id: '3',
        type: 'template',
        title: 'Modèle de contrat de prestation intellectuelle',
        description: 'Template mis à jour conforme aux dernières évolutions jurisprudentielles',
        relevanceScore: 0.82,
        category: 'Droit des contrats',
        estimatedTime: '8 min',
        priority: 'medium',
        reason: 'Suggéré en fonction de votre activité récente',
        tags: ['Template', 'Contrat', 'Jurisprudence']
      },
      {
        id: '4',
        type: 'document',
        title: 'Guide pratique des recours administratifs',
        description: 'Nouveau guide complet sur les procédures de recours avec exemples pratiques',
        relevanceScore: 0.78,
        category: 'Droit administratif',
        estimatedTime: '25 min',
        priority: 'low',
        reason: 'Recommandé pour approfondir vos connaissances',
        tags: ['Guide', 'Recours', 'Pratique']
      }
    ];

    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'procedure': return '⚙️';
      case 'update': return '🔔';
      case 'template': return '📋';
      default: return '📌';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              Recommandations IA Personnalisées
            </span>
            <Button
              onClick={generateRecommendations}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </CardTitle>
          <p className="text-gray-600">
            Découvrez du contenu pertinent sélectionné spécialement pour vous par notre IA
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList>
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              <TabsTrigger value="trending">Tendances</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="mt-6">
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Tout
                  </Button>
                  <Button
                    variant={selectedCategory === 'marchés' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('marchés')}
                  >
                    Marchés publics
                  </Button>
                  <Button
                    variant={selectedCategory === 'urbanisme' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('urbanisme')}
                  >
                    Urbanisme
                  </Button>
                  <Button
                    variant={selectedCategory === 'administratif' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('administratif')}
                  >
                    Droit administratif
                  </Button>
                </div>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-24 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRecommendations.map((rec) => (
                      <Card key={rec.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{getTypeIcon(rec.type)}</span>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getPriorityColor(rec.priority)}>
                                      {rec.priority.toUpperCase()}
                                    </Badge>
                                    <Badge variant="outline">{rec.category}</Badge>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                                      <span>{Math.round(rec.relevanceScore * 100)}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-3">{rec.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {rec.estimatedTime}
                                </span>
                                <span className="text-blue-600">{rec.reason}</span>
                              </div>
                              <div className="flex gap-2">
                                {rec.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button className="ml-4">
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Consulter
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Sujets en tendance cette semaine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { topic: 'Réforme des marchés publics', growth: '+45%', searches: 1250 },
                        { topic: 'Transition énergétique', growth: '+32%', searches: 890 },
                        { topic: 'Urbanisme durable', growth: '+28%', searches: 670 },
                        { topic: 'Dématérialisation administrative', growth: '+22%', searches: 520 }
                      ].map((trend, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{trend.topic}</div>
                            <div className="text-sm text-gray-600">{trend.searches} recherches</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {trend.growth}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personnaliser vos recommandations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Domaines d'intérêt</label>
                    <div className="flex gap-2 flex-wrap">
                      {['Droit administratif', 'Urbanisme', 'Marchés publics', 'Environnement', 'Social'].map((domain) => (
                        <Badge
                          key={domain}
                          variant={userPreferences.domains.includes(domain.toLowerCase()) ? 'default' : 'outline'}
                          className="cursor-pointer"
                        >
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Fréquence des recommandations</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="daily">Quotidienne</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuelle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Niveau de complexité préféré</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="simple">Simple</option>
                      <option value="moderate">Modéré</option>
                      <option value="advanced">Avancé</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
