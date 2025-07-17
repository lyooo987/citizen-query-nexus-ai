
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Download, Eye, Wand2, CheckCircle2, AlertCircle } from 'lucide-react';

export function DataExtractionSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractionComplete, setExtractionComplete] = useState(false);

  const recentExtractions = [
    {
      id: 1,
      fileName: "Journal Officiel N° 12 - 2025",
      status: "Complété",
      extractedTime: "il y a 2 heures",
      textsIdentified: 15,
      processingTime: "3 min 24s"
    },
    {
      id: 2,
      fileName: "Bulletin Législatif - Décembre 2024",
      status: "En cours",
      extractedTime: "il y a 1 heure",
      textsIdentified: 8,
      processingTime: "2 min 15s"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setExtractionComplete(true);
      }, 3000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setExtractionComplete(true);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Upload className="w-8 h-8 text-emerald-600" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Extraction automatique des données</h1>
          <p className="text-muted-foreground">
            Convertir les documents PDF des journaux officiels en texte et tables structurés
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardContent className="p-8">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-emerald-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Déposer un document PDF</h3>
            <p className="text-gray-600 mb-4">
              Glissez et déposez votre fichier PDF du journal officiel ou cliquez pour parcourir
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Sélectionner un fichier
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {(isProcessing || extractionComplete) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isProcessing ? (
                <Wand2 className="w-5 h-5 text-blue-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
              {isProcessing ? 'Traitement en cours...' : 'Extraction terminée'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyse du document...</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            )}
            
            {extractionComplete && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">15</p>
                  <p className="text-sm text-green-700">Textes identifiés</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-blue-700">Articles extraits</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">8</p>
                  <p className="text-sm text-purple-700">Métadonnées</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">3</p>
                  <p className="text-sm text-orange-700">Tables extraites</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Extraction intelligente</h3>
                <p className="text-gray-600 mb-4">
                  Identification automatique des métadonnées, articles et références juridiques
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Reconnaissance OCR avancée</li>
                  <li>• Structure juridique automatique</li>
                  <li>• Validation des références</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Nettoyage avancé</h3>
                <p className="text-gray-600 mb-4">
                  Suppression des éléments parasites et standardisation du format
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Correction automatique OCR</li>
                  <li>• Suppression des artefacts</li>
                  <li>• Normalisation du texte</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Extractions */}
      <Card>
        <CardHeader>
          <CardTitle>Extractions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExtractions.map((extraction) => (
              <div key={extraction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{extraction.fileName}</h4>
                    <p className="text-sm text-gray-600">
                      Extrait {extraction.extractedTime} • {extraction.textsIdentified} textes identifiés
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={extraction.status === 'Complété' ? 'default' : 'secondary'}>
                    {extraction.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Voir les résultats
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
