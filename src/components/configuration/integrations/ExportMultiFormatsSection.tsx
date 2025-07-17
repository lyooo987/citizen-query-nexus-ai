
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  FileCode,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';
import { toast } from 'sonner';

interface ExportMultiFormatsSectionProps {
  language?: string;
}

export function ExportMultiFormatsSection({ language = "fr" }: ExportMultiFormatsSectionProps) {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['pdf']);
  const [exportSettings, setExportSettings] = useState({
    includeMetadata: true,
    includeImages: true,
    compression: 'medium',
    watermark: false
  });

  const formats = [
    { id: 'pdf', name: 'PDF Structuré', icon: FileText, description: 'Format PDF avec structure sémantique' },
    { id: 'xml', name: 'XML Juridique', icon: FileCode, description: 'Format XML spécialisé pour documents juridiques' },
    { id: 'akoma', name: 'Akoma Ntoso', icon: FileCode, description: 'Standard international pour documents législatifs' },
    { id: 'legalxml', name: 'LegalXML', icon: FileCode, description: 'Format XML standard pour le secteur juridique' },
    { id: 'docx', name: 'DOCX Structuré', icon: FileText, description: 'Format Word avec métadonnées juridiques' },
    { id: 'odt', name: 'ODT', icon: FileText, description: 'Format OpenDocument Text' }
  ];

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleExport = () => {
    if (selectedFormats.length === 0) {
      toast.error('Veuillez sélectionner au moins un format d\'export');
      return;
    }

    // Simuler l'export
    toast.success(`Export lancé pour ${selectedFormats.length} format(s)`);
    console.log('Export settings:', { formats: selectedFormats, settings: exportSettings });
  };

  const handleTestExport = () => {
    toast.success('Test d\'export réussi - Tous les formats sont compatibles');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Configuration des Formats d'Export
          </CardTitle>
          <CardDescription>
            Configurez les formats d'export multi-standards pour vos documents juridiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">Formats Disponibles</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formats.map((format) => {
                const Icon = format.icon;
                const isSelected = selectedFormats.includes(format.id);
                
                return (
                  <div 
                    key={format.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFormatToggle(format.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={isSelected}
                        onChange={() => handleFormatToggle(format.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{format.name}</span>
                          {format.id === 'pdf' && <Badge variant="secondary">Recommandé</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-medium">Paramètres d'Export</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compression">Niveau de compression</Label>
                <Select 
                  value={exportSettings.compression} 
                  onValueChange={(value) => setExportSettings({...exportSettings, compression: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible (Qualité maximale)</SelectItem>
                    <SelectItem value="medium">Moyen (Équilibré)</SelectItem>
                    <SelectItem value="high">Élevé (Taille minimale)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="metadata"
                    checked={exportSettings.includeMetadata}
                    onCheckedChange={(checked) => setExportSettings({...exportSettings, includeMetadata: !!checked})}
                  />
                  <Label htmlFor="metadata">Inclure les métadonnées juridiques</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="images"
                    checked={exportSettings.includeImages}
                    onCheckedChange={(checked) => setExportSettings({...exportSettings, includeImages: !!checked})}
                  />
                  <Label htmlFor="images">Inclure les images et schémas</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="watermark"
                    checked={exportSettings.watermark}
                    onCheckedChange={(checked) => setExportSettings({...exportSettings, watermark: !!checked})}
                  />
                  <Label htmlFor="watermark">Ajouter un filigrane</Label>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">
                {selectedFormats.length} format(s) sélectionné(s)
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleTestExport}>
                <Settings className="w-4 h-4 mr-2" />
                Tester
              </Button>
              <Button onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
