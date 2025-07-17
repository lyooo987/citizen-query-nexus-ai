
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  FileImage, 
  Languages, 
  Eye, 
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap,
  FileText,
  Search
} from 'lucide-react';

interface OCRResult {
  id: string;
  filename: string;
  language: string;
  confidence: number;
  extractedText: string;
  processedAt: string;
  status: 'processing' | 'completed' | 'error';
  documentType: string;
}

export function AdvancedOCR() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const results: OCRResult[] = [
    {
      id: '1',
      filename: 'contrat_manuscrit.jpg',
      language: 'ar',
      confidence: 94.5,
      extractedText: 'هذا العقد يتضمن شروط وأحكام البيع والشراء للعقار الواقع في الجزائر العاصمة...',
      processedAt: '2024-01-15 14:30',
      status: 'completed',
      documentType: 'Contrat manuscrit'
    },
    {
      id: '2',
      filename: 'ordonnance_tribunal.pdf',
      language: 'fr',
      confidence: 98.2,
      extractedText: 'Par ces motifs, le tribunal ordonne la restitution du bien litigieux...',
      processedAt: '2024-01-15 13:45',
      status: 'completed',
      documentType: 'Ordonnance judiciaire'
    },
    {
      id: '3',
      filename: 'acte_naissance.jpg',
      language: 'ar',
      confidence: 87.3,
      extractedText: 'شهادة ميلاد رقم ٢٣٤٥٦٧ الصادرة عن بلدية الجزائر الوسطى...',
      processedAt: '2024-01-15 12:20',
      status: 'processing',
      documentType: 'Acte d\'état civil'
    }
  ];

  const features = [
    {
      icon: <Languages className="w-5 h-5 text-blue-600" />,
      title: 'Reconnaissance Multilingue',
      description: 'Support de l\'arabe manuscrit, français et anglais'
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      title: 'IA Avancée',
      description: 'Algorithmes de deep learning pour la précision'
    },
    {
      icon: <FileText className="w-5 h-5 text-green-600" />,
      title: 'Détection Intelligente',
      description: 'Identification automatique du type de document'
    },
    {
      icon: <Search className="w-5 h-5 text-orange-600" />,
      title: 'Extraction Structurée',
      description: 'Extraction des données clés automatiquement'
    }
  ];

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulation du traitement OCR
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-blue-600" />
            OCR Avancé - Reconnaissance Manuscrite Arabe
          </CardTitle>
          <p className="text-gray-600">
            Reconnaissance optique avancée avec support de l'écriture manuscrite arabe
          </p>
        </CardHeader>
      </Card>

      {/* Zone d'upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-green-600" />
            Traitement de Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sélection de langue */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Langue du document:</span>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="gap-1"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Zone d'upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Glissez-déposez vos documents ici</h3>
              <p className="text-gray-600 mb-4">
                Formats acceptés: JPG, PNG, PDF, TIFF
              </p>
              <div className="flex justify-center gap-2">
                <Button onClick={handleFileUpload}>
                  <Upload className="w-4 h-4 mr-2" />
                  Sélectionner fichiers
                </Button>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Prendre photo
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />

            {/* Progression */}
            {isProcessing && (
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Traitement OCR en cours...</span>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <div className="text-sm text-gray-600">
                      {progress < 30 && "Analyse de l'image..."}
                      {progress >= 30 && progress < 60 && "Reconnaissance des caractères..."}
                      {progress >= 60 && progress < 90 && "Correction et validation..."}
                      {progress >= 90 && "Finalisation..."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités */}
      <Card>
        <CardHeader>
          <CardTitle>Fonctionnalités OCR Avancées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Résultats OCR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.filename}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{result.documentType}</Badge>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(result.status)}`}></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-sm">
                    <span className="font-medium">Langue:</span>
                    <span className="ml-2">
                      {languages.find(l => l.code === result.language)?.name}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Confiance:</span>
                    <span className={`ml-2 font-bold ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Traité le:</span>
                    <span className="ml-2">{result.processedAt}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-3 mb-3">
                  <p className="text-sm font-medium mb-2">Texte extrait:</p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {result.extractedText}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Voir complet
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Télécharger
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="w-3 h-3 mr-1" />
                    Rechercher
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
