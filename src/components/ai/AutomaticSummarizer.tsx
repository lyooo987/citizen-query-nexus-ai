
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Brain, BarChart3, Key, Clock, Download } from 'lucide-react';

interface SummaryResult {
  originalLength: number;
  summaryLength: number;
  compressionRatio: number;
  keyPoints: string[];
  mainThemes: string[];
  legalReferences: string[];
  executiveSummary: string;
  detailedSummary: string;
  processingTime: number;
}

export function AutomaticSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SummaryResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResult(null);
    }
  };

  const startSummarization = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);

    // Simulation du processus de résumé
    const steps = [
      { progress: 15, message: 'Extraction du texte...' },
      { progress: 30, message: 'Analyse linguistique...' },
      { progress: 50, message: 'Identification des concepts clés...' },
      { progress: 70, message: 'Génération du résumé...' },
      { progress: 85, message: 'Validation et optimisation...' },
      { progress: 100, message: 'Finalisation...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(step.progress);
    }

    // Résultat simulé
    const summaryResult: SummaryResult = {
      originalLength: 15420,
      summaryLength: 1847,
      compressionRatio: 88,
      keyPoints: [
        "Nouvelles obligations pour les entreprises de plus de 50 salariés",
        "Entrée en vigueur prévue au 1er janvier 2025",
        "Sanctions administratives renforcées en cas de non-conformité",
        "Délai de mise en conformité de 12 mois",
        "Création d'un dispositif d'accompagnement spécialisé"
      ],
      mainThemes: [
        "Obligations légales",
        "Sanctions et conformité",
        "Calendrier d'application",
        "Mesures d'accompagnement"
      ],
      legalReferences: [
        "Article L. 1234-1 du Code du travail",
        "Décret n° 2024-123 du 15 mars 2024",
        "Circulaire DGT n° 2024-05"
      ],
      executiveSummary: "Ce texte introduit de nouvelles obligations pour les entreprises concernant la protection des données personnelles des salariés. Les entreprises de plus de 50 salariés devront se conformer aux nouvelles exigences avant le 1er janvier 2025.",
      detailedSummary: "Le présent décret modifie substantiellement le régime de protection des données personnelles en entreprise. Il impose aux entreprises de plus de 50 salariés la mise en place d'un système de traçabilité des accès aux données personnelles, la désignation d'un responsable de la conformité, et la mise en œuvre de procédures de notification en cas d'incident. Les sanctions peuvent aller jusqu'à 2% du chiffre d'affaires pour les manquements graves.",
      processingTime: 3.2
    };

    setResult(summaryResult);
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Résumeur Automatique IA
          </CardTitle>
          <p className="text-gray-600">
            Générez automatiquement des résumés intelligents de vos documents juridiques
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!file && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Téléchargez un document</h3>
              <p className="text-gray-600 mb-4">PDF, DOCX, TXT jusqu'à 50MB</p>
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

          {file && !processing && !result && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Prêt pour l'analyse
                    </p>
                  </div>
                </div>
                <Button onClick={startSummarization} className="bg-purple-600 hover:bg-purple-700">
                  <Brain className="w-4 h-4 mr-2" />
                  Générer le résumé
                </Button>
              </div>
            </div>
          )}

          {processing && (
            <div className="space-y-4">
              <div className="text-center">
                <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600 animate-pulse" />
                <h3 className="font-medium">Analyse en cours...</h3>
                <p className="text-sm text-gray-600">L'IA traite votre document</p>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-gray-500">{progress}% terminé</p>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Résumé généré
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {result.processingTime}s
                  </span>
                  <Badge>
                    Compression: {result.compressionRatio}%
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {result.originalLength.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Mots originaux</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {result.summaryLength.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Mots résumé</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {result.compressionRatio}%
                  </div>
                  <div className="text-sm text-gray-600">Compression</div>
                </div>
              </div>

              <Tabs defaultValue="executive" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="executive">Résumé exécutif</TabsTrigger>
                  <TabsTrigger value="detailed">Résumé détaillé</TabsTrigger>
                  <TabsTrigger value="keypoints">Points clés</TabsTrigger>
                  <TabsTrigger value="references">Références</TabsTrigger>
                </TabsList>

                <TabsContent value="executive" className="mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {result.executiveSummary}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {result.detailedSummary}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="keypoints" className="mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Points clés identifiés
                    </h4>
                    <ul className="space-y-2">
                      {result.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Thèmes principaux</h4>
                      <div className="flex gap-2 flex-wrap">
                        {result.mainThemes.map((theme, index) => (
                          <Badge key={index} variant="secondary">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="references" className="mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Références juridiques détectées</h4>
                    <ul className="space-y-2">
                      {result.legalReferences.map((ref, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="font-mono text-sm">{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger Word
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
