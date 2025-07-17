import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, FileImage } from "lucide-react";
import { OCRScanner } from "@/components/common/OCRScanner";

interface OCRConfigurationProps {
  showOCRScanner: boolean;
  onShowOCRScanner: (show: boolean) => void;
  onTextExtracted: (text: string) => void;
}

export function OCRConfiguration({
  showOCRScanner,
  onShowOCRScanner,
  onTextExtracted
}: OCRConfigurationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-green-600" />
          Génération par OCR
        </CardTitle>
        <CardDescription>
          Uploadez un document (Image, PDF, Word, Excel) pour générer automatiquement un formulaire
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showOCRScanner ? (
          <div className="text-center py-8">
            <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Scanner un Document</h4>
            <p className="text-gray-600 mb-4">
              Utilisez l'OCR pour extraire automatiquement les champs de votre document
            </p>
            <Button 
              onClick={() => onShowOCRScanner(true)} 
              className="bg-green-600 hover:bg-green-700"
            >
              <Scan className="w-4 h-4 mr-2" />
              Commencer le Scan
            </Button>
          </div>
        ) : (
          <OCRScanner
            onTextExtracted={onTextExtracted}
            onClose={() => onShowOCRScanner(false)}
            title="Scanner pour Générer un Formulaire"
          />
        )}
      </CardContent>
    </Card>
  );
}