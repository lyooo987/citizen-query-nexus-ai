
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Brain, Target, Zap, BarChart3, Activity } from 'lucide-react';
import { TabFormField } from '@/components/common/TabFormField';
import { PredictiveJuridicalAnalysis } from './PredictiveJuridicalAnalysis';
import { AICapabilitiesGrid } from './AICapabilitiesGrid';

interface PredictionResult {
  id: string;
  case: string;
  prediction: string;
  confidence: number;
  factors: string[];
  outcome: 'favorable' | 'défavorable' | 'incertain';
  estimatedDuration: string;
}

export function PredictiveAnalysisTab() {
  const [activeAnalysis, setActiveAnalysis] = useState('overview');

  const predictions: PredictionResult[] = [
    {
      id: '1',
      case: 'Recours administratif - Permis de construire',
      prediction: 'Forte probabilité d\'annulation de la décision administrative',
      confidence: 87.5,
      factors: ['Vice de procédure', 'Délai de notification', 'Motivation insuffisante'],
      outcome: 'favorable',
      estimatedDuration: '6-8 mois'
    },
    {
      id: '2',
      case: 'Contentieux commercial - Rupture de contrat',
      prediction: 'Probable condamnation aux dommages-intérêts',
      confidence: 72.3,
      factors: ['Clause pénale', 'Préjudice prouvé', 'Faute contractuelle'],
      outcome: 'défavorable',
      estimatedDuration: '12-18 mois'
    },
    {
      id: '3',
      case: 'Litige foncier - Propriété disputée',
      prediction: 'Issue incertaine nécessitant expertise approfondie',
      confidence: 45.8,
      factors: ['Titre de propriété', 'Prescription acquisitive', 'Témoignages contradictoires'],
      outcome: 'incertain',
      estimatedDuration: '18-24 mois'
    }
  ];

  const trendingCases = [
    {
      type: 'Droit administratif',
      increase: '+23%',
      description: 'Augmentation des recours contre les décisions d\'urbanisme'
    },
    {
      type: 'Droit du travail',
      increase: '+18%',
      description: 'Hausse des contentieux liés au licenciement'
    },
    {
      type: 'Droit commercial',
      increase: '+15%',
      description: 'Croissance des litiges contractuels'
    }
  ];

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'favorable': return 'bg-green-100 text-green-800';
      case 'défavorable': return 'bg-red-100 text-red-800';
      case 'incertain': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Analyser un document pour prédiction juridique..."
        onSearch={(query) => console.log('Analyse prédictive:', query)}
        onAdd={() => console.log('Nouvelle analyse')}
        onFilter={() => console.log('Filtrer analyses')}
        onSort={() => console.log('Trier analyses')}
        onExport={() => console.log('Exporter analyse')}
        onRefresh={() => console.log('Actualiser prédictions')}
        showActions={true}
      />

      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Prédictions Juridiques et Analyse Prédictive Avancée
          </CardTitle>
          <p className="text-gray-600">
            Intelligence artificielle prédictive pour l'analyse des décisions juridiques
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">1,247</div>
              <div className="text-sm text-gray-600">Prédictions générées</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">89.3%</div>
              <div className="text-sm text-gray-600">Précision moyenne</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">156</div>
              <div className="text-sm text-gray-600">Analyses en cours</div>
            </div>
          </div>
          <AICapabilitiesGrid type="prediction" />
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Prédictions Juridiques</TabsTrigger>
          <TabsTrigger value="analysis">Analyse Avancée</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="models">Modèles IA</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Prédictions Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{prediction.case}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={getOutcomeColor(prediction.outcome)}>
                          {prediction.outcome}
                        </Badge>
                        <div className={`text-sm font-bold ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{prediction.prediction}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Facteurs déterminants:</p>
                        <div className="flex flex-wrap gap-1">
                          {prediction.factors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Durée estimée:</p>
                        <p className="text-sm text-gray-600">{prediction.estimatedDuration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Progress value={prediction.confidence} className="flex-1 mr-4" />
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <PredictiveJuridicalAnalysis />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Tendances Juridiques Prédictives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingCases.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{trend.type}</h4>
                      <p className="text-sm text-gray-600">{trend.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white">
                        {trend.increase}
                      </Badge>
                      <Activity className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Modèles d'IA Prédictive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Modèle de Classification</h4>
                  <p className="text-sm text-gray-600 mb-3">Classification automatique des affaires juridiques</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-800">Actif</Badge>
                    <span className="text-sm font-medium">Précision: 92.4%</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Modèle de Régression</h4>
                  <p className="text-sm text-gray-600 mb-3">Prédiction des durées de procédure</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    <span className="text-sm font-medium">Précision: 87.1%</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Modèle de Clustering</h4>
                  <p className="text-sm text-gray-600 mb-3">Regroupement de jurisprudences similaires</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-orange-100 text-orange-800">En test</Badge>
                    <span className="text-sm font-medium">Précision: 94.7%</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Modèle de Sentiment</h4>
                  <p className="text-sm text-gray-600 mb-3">Analyse du sentiment des décisions</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-100 text-purple-800">Actif</Badge>
                    <span className="text-sm font-medium">Précision: 89.6%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
