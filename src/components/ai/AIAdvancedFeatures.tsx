
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { EnhancedTextarea } from '@/components/common/EnhancedTextarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, Wand2, FileText, Search, Lightbulb, Zap } from 'lucide-react';

export function AIAdvancedFeatures() {
  const [analysisInput, setAnalysisInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [analysisType, setAnalysisType] = useState('');
  const [summaryType, setSummaryType] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analysisTypes = [
    { value: 'legal', label: 'Analyse juridique' },
    { value: 'compliance', label: 'Analyse de conformité' },
    { value: 'risk', label: 'Analyse de risques' },
    { value: 'comparison', label: 'Analyse comparative' }
  ];

  const summaryTypes = [
    { value: 'executive', label: 'Résumé exécutif' },
    { value: 'technical', label: 'Résumé technique' },
    { value: 'legal', label: 'Résumé juridique' },
    { value: 'structured', label: 'Résumé structuré' }
  ];

  const handleAnalysis = async () => {
    if (!analysisInput.trim() || !analysisType) return;
    
    setLoading(true);
    // Simulation d'analyse IA
    setTimeout(() => {
      setResults({
        type: 'analysis',
        content: `Analyse ${analysisTypes.find(t => t.value === analysisType)?.label} du contenu fourni...`,
        recommendations: [
          'Recommandation 1 basée sur l\'analyse',
          'Recommandation 2 pour améliorer la conformité',
          'Recommandation 3 pour réduire les risques'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  const handleSummary = async () => {
    if (!summaryInput.trim() || !summaryType) return;
    
    setLoading(true);
    // Simulation de résumé IA
    setTimeout(() => {
      setResults({
        type: 'summary',
        content: `${summaryTypes.find(t => t.value === summaryType)?.label} généré automatiquement...`,
        keyPoints: [
          'Point clé 1 extrait du document',
          'Point clé 2 identifié par l\'IA',
          'Point clé 3 résumé automatiquement'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Bot className="w-8 h-8 text-blue-600" />
          Fonctionnalités IA Avancées
        </h2>
        <p className="text-gray-600 text-lg">
          Utilisez l'intelligence artificielle pour analyser et résumer vos documents juridiques
        </p>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            Analyse Intelligente
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Résumé Automatique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Analyse Intelligente de Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="analysis-type">Type d'analyse</Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type d'analyse" />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="analysis-input">Contenu à analyser</Label>
                <EnhancedTextarea
                  id="analysis-input"
                  value={analysisInput}
                  onChange={(e) => setAnalysisInput(e.target.value)}
                  placeholder="Collez ici le texte juridique ou le document à analyser..."
                  context="legal"
                  enableVoice={true}
                  className="min-h-[200px]"
                />
              </div>

              <Button 
                onClick={handleAnalysis}
                disabled={loading || !analysisInput.trim() || !analysisType}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Lancer l'analyse
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Résumé Automatique de Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="summary-type">Type de résumé</Label>
                <Select value={summaryType} onValueChange={setSummaryType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type de résumé" />
                  </SelectTrigger>
                  <SelectContent>
                    {summaryTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="summary-input">Document à résumer</Label>
                <EnhancedTextarea
                  id="summary-input"
                  value={summaryInput}
                  onChange={(e) => setSummaryInput(e.target.value)}
                  placeholder="Collez ici le document long à résumer automatiquement..."
                  context="general"
                  enableVoice={true}
                  className="min-h-[200px]"
                />
              </div>

              <Button 
                onClick={handleSummary}
                disabled={loading || !summaryInput.trim() || !summaryType}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Générer le résumé
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Résultats */}
      {results && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Résultats de l'analyse IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Badge className="mb-2">
                {results.type === 'analysis' ? 'Analyse' : 'Résumé'}
              </Badge>
              <p className="text-gray-700">{results.content}</p>
            </div>

            {results.recommendations && (
              <div>
                <h4 className="font-semibold mb-2">Recommandations :</h4>
                <ul className="list-disc list-inside space-y-1">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.keyPoints && (
              <div>
                <h4 className="font-semibold mb-2">Points clés :</h4>
                <ul className="list-disc list-inside space-y-1">
                  {results.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
