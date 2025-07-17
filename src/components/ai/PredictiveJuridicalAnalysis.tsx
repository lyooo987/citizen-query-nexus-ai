
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EnhancedTextarea } from '@/components/common/EnhancedTextarea';
import { TrendingUp, Shield, AlertTriangle, Target, Brain, BarChart3 } from 'lucide-react';

interface PredictionResult {
  caseType: string;
  successProbability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  keyFactors: string[];
  recommendations: string[];
  similarCases: Array<{
    reference: string;
    outcome: string;
    similarity: number;
  }>;
  timeline: {
    estimatedDuration: string;
    keyMilestones: string[];
  };
}

interface RiskAssessment {
  complianceScore: number;
  riskFactors: Array<{
    category: string;
    level: 'low' | 'medium' | 'high';
    description: string;
    impact: number;
  }>;
  recommendations: string[];
}

interface AnomalyDetection {
  anomalies: Array<{
    type: string;
    location: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    suggestion: string;
  }>;
  confidenceScore: number;
}

export function PredictiveJuridicalAnalysis() {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'prediction' | 'risk' | 'anomaly' | 'recommendations'>('prediction');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    prediction?: PredictionResult;
    risk?: RiskAssessment;
    anomaly?: AnomalyDetection;
    recommendations?: string[];
  }>({});

  const simulatePredictiveAnalysis = async (): Promise<PredictionResult> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      caseType: 'Litige contractuel commercial',
      successProbability: 0.72,
      riskLevel: 'medium',
      keyFactors: [
        'Clause de force majeure présente',
        'Jurisprudence récente favorable',
        'Preuves documentaires solides',
        'Délais de prescription respectés'
      ],
      recommendations: [
        'Renforcer la documentation des échanges',
        'Considérer une médiation préalable',
        'Préparer une expertise technique',
        'Évaluer les coûts de procédure'
      ],
      similarCases: [
        { reference: 'Com. 15 mars 2023, n°21-16432', outcome: 'Favorable', similarity: 0.89 },
        { reference: 'CA Paris, 12 janv. 2024', outcome: 'Partiellement favorable', similarity: 0.76 },
        { reference: 'Cass. Com. 8 juin 2023', outcome: 'Défavorable', similarity: 0.65 }
      ],
      timeline: {
        estimatedDuration: '18-24 mois',
        keyMilestones: [
          'Assignation : 2-4 semaines',
          'Mise en état : 8-12 mois',
          'Audience de plaidoirie : 14-18 mois',
          'Délibéré : 16-20 mois'
        ]
      }
    };
  };

  const simulateRiskAssessment = async (): Promise<RiskAssessment> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      complianceScore: 78,
      riskFactors: [
        {
          category: 'Conformité RGPD',
          level: 'medium',
          description: 'Clauses de protection des données incomplètes',
          impact: 65
        },
        {
          category: 'Droit du travail',
          level: 'low',
          description: 'Procédures RH conformes',
          impact: 25
        },
        {
          category: 'Droit commercial',
          level: 'high',
          description: 'Conditions générales non mises à jour',
          impact: 85
        }
      ],
      recommendations: [
        'Mise à jour des CGV selon la réglementation 2024',
        'Audit complet des processus RGPD',
        'Formation équipe juridique sur nouvelles réglementations'
      ]
    };
  };

  const simulateAnomalyDetection = async (): Promise<AnomalyDetection> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      anomalies: [
        {
          type: 'Référence juridique',
          location: 'Article 3, paragraphe 2',
          severity: 'medium',
          description: 'Référence à un texte abrogé (Loi n°2018-123)',
          suggestion: 'Remplacer par la référence actuelle (Loi n°2023-456)'
        },
        {
          type: 'Cohérence temporelle',
          location: 'Clause 5.2',
          severity: 'low',
          description: 'Date antérieure à la date de signature',
          suggestion: 'Vérifier et corriger la chronologie'
        },
        {
          type: 'Terminologie',
          location: 'Définitions',
          severity: 'high',
          description: 'Terme "SARL" utilisé mais structure "SAS" définie',
          suggestion: 'Harmoniser la terminologie juridique'
        }
      ],
      confidenceScore: 0.91
    };
  };

  const handleAnalysis = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const [prediction, risk, anomaly] = await Promise.all([
        simulatePredictiveAnalysis(),
        simulateRiskAssessment(),
        simulateAnomalyDetection()
      ]);

      const recommendations = [
        'Consulter un avocat spécialisé en droit commercial',
        'Effectuer un audit de conformité trimestriel',
        'Mettre en place une veille juridique automatisée',
        'Former les équipes aux nouveaux textes réglementaires'
      ];

      setResults({ prediction, risk, anomaly, recommendations });
    } catch (error) {
      console.error('Erreur lors de l\'analyse prédictive:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Analyse Prédictive Juridique Avancée
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedTextarea
            placeholder="Décrivez votre situation juridique, votre contrat, ou votre litige pour une analyse prédictive complète..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
            context="legal"
            enableVoice={true}
          />
          
          <Button 
            onClick={handleAnalysis}
            disabled={isAnalyzing || !inputText.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Analyse en cours...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Lancer l'analyse prédictive
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {(results.prediction || results.risk || results.anomaly || results.recommendations) && (
        <Card>
          <CardHeader>
            <div className="flex space-x-1">
              {[
                { id: 'prediction', label: 'Prédiction', icon: TrendingUp },
                { id: 'risk', label: 'Risques', icon: Shield },
                { id: 'anomaly', label: 'Anomalies', icon: AlertTriangle },
                { id: 'recommendations', label: 'Recommandations', icon: Target }
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activeTab === id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(id as any)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === 'prediction' && results.prediction && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {Math.round(results.prediction.successProbability * 100)}%
                        </div>
                        <div className="text-sm text-gray-600">Probabilité de succès</div>
                        <Progress 
                          value={results.prediction.successProbability * 100} 
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <Badge className={getRiskColor(results.prediction.riskLevel)}>
                          {results.prediction.riskLevel.toUpperCase()}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-2">Niveau de risque</div>
                        <div className="text-lg font-semibold mt-1">
                          {results.prediction.timeline.estimatedDuration}
                        </div>
                        <div className="text-xs text-gray-500">Durée estimée</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Facteurs clés identifiés</h4>
                    <ul className="space-y-1">
                      {results.prediction.keyFactors.map((factor, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cas similaires</h4>
                    <div className="space-y-2">
                      {results.prediction.similarCases.map((case_, index) => (
                        <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                          <div className="font-medium">{case_.reference}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className={`text-xs px-2 py-1 rounded ${
                              case_.outcome === 'Favorable' ? 'bg-green-100 text-green-700' :
                              case_.outcome === 'Défavorable' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {case_.outcome}
                            </span>
                            <span className="text-xs text-gray-500">
                              {Math.round(case_.similarity * 100)}% similaire
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risk' && results.risk && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{
                    color: results.risk.complianceScore >= 80 ? '#16a34a' :
                           results.risk.complianceScore >= 60 ? '#ca8a04' : '#dc2626'
                  }}>
                    {results.risk.complianceScore}/100
                  </div>
                  <div className="text-sm text-gray-600">Score de conformité</div>
                  <Progress value={results.risk.complianceScore} className="mt-2" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Facteurs de risque identifiés</h4>
                  {results.risk.riskFactors.map((factor, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{factor.category}</h5>
                        <Badge className={getRiskColor(factor.level)}>
                          {factor.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Impact:</span>
                        <Progress value={factor.impact} className="flex-1 h-2" />
                        <span className="text-xs font-medium">{factor.impact}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'anomaly' && results.anomaly && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Anomalies détectées</h4>
                  <Badge variant="outline">
                    Confiance: {Math.round(results.anomaly.confidenceScore * 100)}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  {results.anomaly.anomalies.map((anomaly, index) => (
                    <Alert key={index} className={`border-l-4 ${
                      anomaly.severity === 'high' ? 'border-l-red-500' :
                      anomaly.severity === 'medium' ? 'border-l-orange-500' :
                      'border-l-yellow-500'
                    }`}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium">{anomaly.type}</span>
                              <span className="text-sm text-gray-500 ml-2">({anomaly.location})</span>
                            </div>
                            <Badge className={getRiskColor(anomaly.severity)}>
                              {anomaly.severity}
                            </Badge>
                          </div>
                          <p className="text-sm">{anomaly.description}</p>
                          <div className="bg-blue-50 p-2 rounded text-sm">
                            <strong>Suggestion:</strong> {anomaly.suggestion}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && results.recommendations && (
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recommandations contextuelles
                </h4>
                <div className="grid gap-3">
                  {results.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
