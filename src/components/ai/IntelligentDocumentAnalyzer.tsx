
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Brain, BarChart3, Tags, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  legalReferences: Array<{ text: string; article: string; confidence: number }>;
  riskAnalysis: Array<{ type: string; level: 'low' | 'medium' | 'high'; description: string }>;
  recommendations: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  processingTime: number;
}

interface IntelligentDocumentAnalyzerProps {
  document?: {
    title: string;
    content: string;
    type: string;
  };
}

export function IntelligentDocumentAnalyzer({ document }: IntelligentDocumentAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulation du processus d'analyse IA
    const steps = [
      { progress: 15, message: 'Extraction du texte...' },
      { progress: 30, message: 'Analyse linguistique...' },
      { progress: 50, message: 'Identification des références juridiques...' },
      { progress: 70, message: 'Évaluation des risques...' },
      { progress: 85, message: 'Génération des recommandations...' },
      { progress: 100, message: 'Finalisation...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step.progress);
    }

    // Résultat d'analyse simulé
    const result: AnalysisResult = {
      summary: "Ce document traite des procédures administratives relatives à l'obtention de permis de construire. Il contient des informations détaillées sur les étapes, les documents requis et les délais.",
      keyPoints: [
        "Procédure en 5 étapes principales",
        "Délai maximum de traitement : 90 jours",
        "Documents obligatoires : plans, étude d'impact",
        "Possibilité de recours en cas de refus"
      ],
      legalReferences: [
        { text: "Code de l'urbanisme", article: "Article L421-1", confidence: 0.95 },
        { text: "Décret n° 2007-18", article: "Article 2", confidence: 0.87 },
        { text: "Loi sur l'aménagement du territoire", article: "Article 15", confidence: 0.82 }
      ],
      riskAnalysis: [
        { type: "Délai de traitement", level: "medium", description: "Risque de dépassement des délais pendant les périodes de forte demande" },
        { type: "Conformité technique", level: "high", description: "Exigences techniques strictes pouvant entraîner des rejets" },
        { type: "Impact environnemental", level: "low", description: "Évaluation environnementale généralement standard" }
      ],
      recommendations: [
        "Préparer tous les documents en amont pour éviter les retards",
        "Consulter un architecte pour les projets complexes",
        "Prévoir une marge de temps supplémentaire pour les recours éventuels"
      ],
      complexity: 'moderate',
      processingTime: 4.5
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'complex': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Analyseur Intelligent de Documents
          </CardTitle>
          <p className="text-gray-600">
            Utilisez l'IA pour analyser automatiquement vos documents juridiques et obtenir des insights précieux
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!document && !selectedFile && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Téléchargez un document</h3>
              <p className="text-gray-600 mb-4">PDF, DOCX, TXT jusqu'à 10MB</p>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="cursor-pointer">
                  Choisir un fichier
                </Button>
              </label>
            </div>
          )}

          {(document || selectedFile) && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-medium">{document?.title || selectedFile?.name}</h4>
                  <p className="text-sm text-gray-600">
                    {document?.type || selectedFile?.type} • Prêt pour l'analyse
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isAnalyzing && !analysisResult && (document || selectedFile) && (
            <Button onClick={startAnalysis} className="w-full bg-purple-600 hover:bg-purple-700">
              <Brain className="w-4 h-4 mr-2" />
              Lancer l'analyse IA
            </Button>
          )}

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600 animate-pulse" />
                <h3 className="font-medium">Analyse en cours...</h3>
                <p className="text-sm text-gray-600">L'IA traite votre document</p>
              </div>
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-center text-sm text-gray-500">{analysisProgress}% terminé</p>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Analyse terminée
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {analysisResult.processingTime}s
                  </span>
                  <Badge className={getComplexityColor(analysisResult.complexity)}>
                    Complexité : {analysisResult.complexity}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="summary">Résumé</TabsTrigger>
                  <TabsTrigger value="references">Références</TabsTrigger>
                  <TabsTrigger value="risks">Risques</TabsTrigger>
                  <TabsTrigger value="recommendations">Conseils</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Résumé automatique</h4>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {analysisResult.summary}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Points clés identifiés</h4>
                      <ul className="space-y-2">
                        {analysisResult.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="references" className="mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Références juridiques détectées</h4>
                    {analysisResult.legalReferences.map((ref, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{ref.text}</div>
                          <div className="text-sm text-gray-600">{ref.article}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {Math.round(ref.confidence * 100)}% de confiance
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${ref.confidence * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Analyse des risques</h4>
                    {analysisResult.riskAnalysis.map((risk, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{risk.type}</h5>
                          <Badge className={getRiskColor(risk.level)}>
                            {risk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-gray-700 text-sm">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Recommandations IA</h4>
                    {analysisResult.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Tags className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold">
                          {analysisResult.legalReferences.length}
                        </div>
                        <div className="text-sm text-gray-600">Références détectées</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                        <div className="text-2xl font-bold">
                          {analysisResult.riskAnalysis.length}
                        </div>
                        <div className="text-sm text-gray-600">Risques identifiés</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold">
                          {analysisResult.recommendations.length}
                        </div>
                        <div className="text-sm text-gray-600">Recommandations</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
