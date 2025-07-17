import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Wand2, Database, Scan, Settings } from 'lucide-react';
import { OCRScanner } from '@/components/common/OCRScanner';
import { useGlobalActions } from '@/hooks/useGlobalActions';
import { ApiImportModal } from '@/components/modals/ApiImportModal';
import { useApiModalHandler } from '@/hooks/useApiModalHandler';

interface LegalTextsEnrichmentTabProps {
  onAddLegalText: () => void;
  onOCRTextExtracted?: (text: string) => void;
}

export function LegalTextsEnrichmentTab({ onAddLegalText, onOCRTextExtracted }: LegalTextsEnrichmentTabProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const actions = useGlobalActions();
  const { showApiModal, apiContext, openApiModal, closeApiModal } = useApiModalHandler();

  const handleOCRExtracted = (text: string) => {
    console.log('Texte OCR extrait:', text);
    if (onOCRTextExtracted) {
      onOCRTextExtracted(text);
    }
    setShowOCRScanner(false);
  };

  const handleScanOCRClick = () => {
    // Rediriger vers l'onglet OCR du formulaire de texte juridique
    console.log('Redirection vers onglet OCR du formulaire de texte juridique');
    const event = new CustomEvent('open-legal-text-form-ocr');
    window.dispatchEvent(event);
  };

  const handleImportCSVExcel = () => {
    actions.handleImport(['.csv', '.xlsx', '.xls']);
  };

  const handleAutoFill = () => {
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'ai-generation',
        title: 'Auto-remplissage intelligent',
        data: { feature: 'auto-fill', context: 'legal-texts' }
      }
    });
    window.dispatchEvent(event);
  };

  const handleAutoExtraction = () => {
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'extraction',
        title: 'Extraction automatique',
        data: { feature: 'auto-extraction', context: 'legal-texts' }
      }
    });
    window.dispatchEvent(event);
  };

  const handleApiImport = () => {
    openApiModal('legal-texts');
  };

  if (showOCRScanner) {
    return (
      <OCRScanner
        title="Scanner un document juridique"
        onTextExtracted={handleOCRExtracted}
        onClose={() => setShowOCRScanner(false)}
      />
    );
  }

  const actionsConfig = [
    {
      icon: Plus,
      title: "Ajouter un texte juridique",
      description: "Saisir manuellement un nouveau texte juridique algérien",
      buttonText: "Nouveau texte",
      color: "emerald",
      onClick: onAddLegalText
    },
    {
      icon: Scan,
      title: "Scanner un document",
      description: "Numériser et extraire le texte d'un document avec OCR",
      buttonText: "Scanner OCR",
      color: "blue",
      onClick: handleScanOCRClick
    },
    {
      icon: Upload,
      title: "Import en lot",
      description: "Importer plusieurs textes depuis un fichier Excel/CSV",
      buttonText: "Import CSV/Excel",
      color: "blue",
      onClick: handleImportCSVExcel
    },
    {
      icon: Wand2,
      title: "Auto-remplissage intelligent",
      description: "Remplissage automatique avec IA",
      buttonText: "Auto-remplissage",
      color: "purple",
      onClick: handleAutoFill
    },
    {
      icon: Database,
      title: "Extraction automatique",
      description: "Importer et traiter automatiquement des textes juridiques",
      buttonText: "Extraction auto",
      color: "orange",
      onClick: handleAutoExtraction
    },
    {
      icon: Settings,
      title: "Import API",
      description: "Importer le contenu depuis des sources API configurées",
      buttonText: "Import API",
      color: "purple",
      onClick: handleApiImport
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section principale avec les 2 choix principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option Manuelle */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={onAddLegalText}>
          <CardHeader className="text-center p-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
              <Plus className="w-10 h-10 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900 mb-2">Saisie Manuelle</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Saisir manuellement un nouveau texte juridique algérien via le formulaire complet
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Button 
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium" 
              onClick={onAddLegalText}
            >
              <Plus className="w-5 h-5 mr-3" />
              Formulaire Manuel
            </Button>
          </CardContent>
        </Card>

        {/* Option OCR */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={handleScanOCRClick}>
          <CardHeader className="text-center p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <Scan className="w-10 h-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900 mb-2">Scan OCR</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Scanner et extraire automatiquement le texte d'un document avec reconnaissance optique
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Button 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium" 
              onClick={handleScanOCRClick}
            >
              <Scan className="w-5 h-5 mr-3" />
              Scanner Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Autres options d'enrichissement */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Options d'enrichissement avancées</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {actionsConfig.slice(2).map((action, index) => (
            <Card key={index + 2} className="hover:shadow-md transition-shadow cursor-pointer border-gray-200" onClick={action.onClick}>
              <CardHeader className="text-center">
                <action.icon className={`w-12 h-12 mx-auto text-${action.color}-600 mb-4`} />
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  className={`w-full border-${action.color}-300 text-${action.color}-700 hover:bg-${action.color}-50`} 
                  onClick={action.onClick}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ApiImportModal
        isOpen={showApiModal}
        onClose={closeApiModal}
        context={apiContext}
      />
    </div>
  );
}
