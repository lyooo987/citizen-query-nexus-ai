import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Database, 
  BookOpen, 
  Settings, 
  Check,
  ExternalLink,
  Upload
} from 'lucide-react';
import { FormTemplate } from '@/data/formTemplates';
import { useToast } from '@/hooks/use-toast';

interface FormIntegrationHandlerProps {
  isOpen: boolean;
  onClose: () => void;
  template: FormTemplate | null;
  integrationType: 'legal-texts' | 'procedures' | 'database';
}

export function FormIntegrationHandler({ 
  isOpen, 
  onClose, 
  template, 
  integrationType 
}: FormIntegrationHandlerProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('normale');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  if (!template) return null;

  const getIntegrationTitle = () => {
    switch (integrationType) {
      case 'legal-texts':
        return 'Intégration au Catalogue des Textes Juridiques';
      case 'procedures':
        return 'Intégration au Catalogue des Procédures';
      case 'database':
        return 'Alimentation de la Banque de Données';
      default:
        return 'Intégration du Formulaire';
    }
  };

  const getIntegrationIcon = () => {
    switch (integrationType) {
      case 'legal-texts':
        return <BookOpen className="w-5 h-5" />;
      case 'procedures':
        return <Settings className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getSectorOptions = () => {
    return [
      'Justice',
      'Intérieur',
      'Finances',
      'Éducation',
      'Santé',
      'Agriculture',
      'Industrie',
      'Commerce',
      'Travaux Publics',
      'Transports',
      'Environnement',
      'Fonction Publique',
      'Défense',
      'Affaires Étrangères',
      'Tourisme',
      'Jeunesse et Sports'
    ];
  };

  const getCategoryOptions = () => {
    if (integrationType === 'legal-texts') {
      return [
        'Textes Constitutionnels',
        'Textes Législatifs',
        'Textes Réglementaires',
        'Accords Internationaux',
        'Conventions',
        'Circulaires',
        'Instructions'
      ];
    } else if (integrationType === 'procedures') {
      return [
        'Procédures Administratives',
        'Procédures Judiciaires',
        'Procédures Fiscales',
        'Procédures Douanières',
        'Procédures Sociales',
        'Procédures Urbanistiques',
        'Procédures Environnementales'
      ];
    } else {
      return [
        'Données Juridiques',
        'Données Administratives',
        'Données Statistiques',
        'Données Historiques',
        'Données de Référence'
      ];
    }
  };

  const handleIntegration = async () => {
    setIsProcessing(true);
    
    try {
      // Simulation de l'intégration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const integrationData = {
        templateId: template.id,
        templateName: template.name,
        templateType: template.type,
        integrationType,
        category: selectedCategory,
        sector: selectedSector,
        notes,
        priority,
        integratedAt: new Date().toISOString(),
        integratedBy: 'System Administrator',
        status: 'active',
        adaptedForAlgeria: true,
        joradpCompliant: true
      };

      // Ici, vous pourriez envoyer les données à votre API
      console.log('Données d\'intégration:', integrationData);

      toast({
        title: "Intégration réussie",
        description: `Le formulaire "${template.name}" a été intégré avec succès au ${getIntegrationTitle().toLowerCase()}.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erreur d'intégration",
        description: "Une erreur est survenue lors de l'intégration du formulaire.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIntegrationIcon()}
            {getIntegrationTitle()}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Configuration de l'intégration pour le formulaire "{template.name}"
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations du formulaire */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations du formulaire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nom:</span>
                <span className="text-sm">{template.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type:</span>
                <Badge variant="outline">{template.type}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Catégorie:</span>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Champs:</span>
                <span className="text-sm">{template.fields.length} configurés</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Adapté pour l'Algérie:</span>
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Oui</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration de l'intégration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration de l'intégration</CardTitle>
              <CardDescription>
                Configurez les paramètres pour intégrer ce formulaire dans le système algérien
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoryOptions().map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Secteur</Label>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSectorOptions().map(sector => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="haute">Haute</SelectItem>
                    <SelectItem value="normale">Normale</SelectItem>
                    <SelectItem value="basse">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes et commentaires</Label>
                <Textarea
                  id="notes"
                  placeholder="Ajoutez des notes sur l'intégration..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Compatibilité avec les textes algériens */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compatibilité réglementaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conforme au Journal Officiel (joradp.dz)</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Vérifié</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Adapté à la législation algérienne</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Conforme</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Validation par les autorités compétentes</span>
                  <div className="flex items-center gap-1 text-orange-600">
                    <span className="text-sm">En cours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Annuler
          </Button>
          <Button 
            onClick={handleIntegration} 
            disabled={!selectedCategory || !selectedSector || isProcessing}
          >
            {isProcessing ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Intégration en cours...
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Intégrer au système
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}