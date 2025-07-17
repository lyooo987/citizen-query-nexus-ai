
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bot, FileText, BarChart3, File, Wand2, Download } from 'lucide-react';

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'form' | 'report' | 'document';
  data?: any;
}

export function AIGenerationModal({ isOpen, onClose, type, data }: AIGenerationModalProps) {
  const [generationConfig, setGenerationConfig] = useState({
    title: '',
    description: '',
    template: '',
    language: 'fr',
    format: 'pdf',
    includeData: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const getGenerationConfig = () => {
    switch (type) {
      case 'form':
        return {
          title: 'Générer le Formulaire de Base',
          icon: <FileText className="w-5 h-5" />,
          description: 'Créez automatiquement un formulaire basé sur vos critères',
          templates: ['Formulaire de demande', 'Formulaire de réclamation', 'Formulaire d\'inscription']
        };
      case 'report':
        return {
          title: 'Générer rapport',
          icon: <BarChart3 className="w-5 h-5" />,
          description: 'Générez un rapport détaillé avec l\'IA',
          templates: ['Rapport d\'activité', 'Rapport d\'analyse', 'Rapport de synthèse']
        };
      case 'document':
        return {
          title: 'Générer avec l\'IA',
          icon: <File className="w-5 h-5" />,
          description: 'Créez un document personnalisé avec l\'IA',
          templates: ['Document juridique', 'Guide pratique', 'Procédure détaillée']
        };
      default:
        return {
          title: 'Génération IA',
          icon: <Bot className="w-5 h-5" />,
          description: 'Générez du contenu avec l\'IA',
          templates: []
        };
    }
  };

  const config = getGenerationConfig();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulation du processus de génération IA
    const steps = [
      { progress: 20, message: 'Analyse des données...' },
      { progress: 40, message: 'Génération du contenu...' },
      { progress: 60, message: 'Structuration du document...' },
      { progress: 80, message: 'Mise en forme...' },
      { progress: 100, message: 'Finalisation...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }

    // Contenu généré simulé
    setGeneratedContent({
      title: generationConfig.title || `${config.title} généré`,
      content: `Contenu généré automatiquement par l'IA pour: ${generationConfig.description}`,
      format: generationConfig.format,
      size: '2.5 MB',
      pages: type === 'form' ? 3 : type === 'report' ? 15 : 8,
      timestamp: new Date().toISOString()
    });

    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (generatedContent) {
      const blob = new Blob([generatedContent.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${generatedContent.title}.${generationConfig.format}`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setGenerationProgress(0);
    setGenerationConfig({
      title: '',
      description: '',
      template: '',
      language: 'fr',
      format: 'pdf',
      includeData: true
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </DialogTitle>
          <p className="text-sm text-gray-600">{config.description}</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {!generatedContent && !isGenerating && (
            <>
              {/* Configuration de génération */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      placeholder="Titre du document à générer"
                      value={generationConfig.title}
                      onChange={(e) => setGenerationConfig({...generationConfig, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez ce que vous souhaitez générer..."
                      rows={3}
                      value={generationConfig.description}
                      onChange={(e) => setGenerationConfig({...generationConfig, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Modèle</Label>
                      <Select value={generationConfig.template} onValueChange={(value) => setGenerationConfig({...generationConfig, template: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un modèle" />
                        </SelectTrigger>
                        <SelectContent>
                          {config.templates.map(template => (
                            <SelectItem key={template} value={template}>{template}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Format de sortie</Label>
                      <Select value={generationConfig.format} onValueChange={(value) => setGenerationConfig({...generationConfig, format: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="docx">Word</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="txt">Texte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeData"
                      checked={generationConfig.includeData}
                      onChange={(e) => setGenerationConfig({...generationConfig, includeData: e.target.checked})}
                    />
                    <Label htmlFor="includeData">Inclure les données existantes</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Données source */}
              {data && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Données source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Données disponibles pour la génération : {Array.isArray(data) ? `${data.length} éléments` : '1 élément'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* État de génération en cours */}
          {isGenerating && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <Bot className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold">Génération en cours...</h3>
                  <p className="text-sm text-gray-600">
                    L'IA génère votre contenu personnalisé
                  </p>
                  <Progress value={generationProgress} className="w-full" />
                  <p className="text-xs text-gray-500">{generationProgress}% terminé</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contenu généré */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  Génération terminée
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold">{generatedContent.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{generatedContent.content}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{generatedContent.pages}</div>
                    <div className="text-xs text-gray-600">Pages</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{generatedContent.size}</div>
                    <div className="text-xs text-gray-600">Taille</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{generationConfig.format.toUpperCase()}</div>
                    <div className="text-xs text-gray-600">Format</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          {!isGenerating && !generatedContent && (
            <>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                onClick={handleGenerate} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!generationConfig.title || !generationConfig.description}
              >
                <Bot className="w-4 h-4 mr-2" />
                Générer avec l'IA
              </Button>
            </>
          )}
          
          {generatedContent && (
            <>
              <Button variant="outline" onClick={handleReset}>
                Recommencer
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
              <Button onClick={onClose}>
                Fermer
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
