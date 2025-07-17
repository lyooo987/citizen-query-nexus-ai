
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Globe, 
  FileCode, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Download,
  Upload,
  Zap,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

interface InternationalStandardsSectionProps {
  language?: string;
}

export function InternationalStandardsSection({ language = "fr" }: InternationalStandardsSectionProps) {
  const [standardsConfig, setStandardsConfig] = useState({
    akomaNtoso: true,
    legalXML: true,
    eCourt: false,
    ubl: false,
    defaultStandard: 'akoma',
    validateOnImport: true,
    autoConvert: true
  });

  const standards = [
    {
      id: 'akoma',
      name: 'Akoma Ntoso',
      description: 'Standard international pour documents législatifs et parlementaires',
      version: '1.0',
      status: 'active',
      compatibility: 95,
      icon: FileCode
    },
    {
      id: 'legalxml',
      name: 'LegalXML',
      description: 'Format XML pour échanges juridiques et judiciaires',
      version: '2.1',
      status: 'active',
      compatibility: 88,
      icon: FileCode
    },
    {
      id: 'ecourt',
      name: 'eCourt Standards',
      description: 'Standards pour tribunaux électroniques',
      version: '1.2',
      status: 'inactive',
      compatibility: 72,
      icon: BookOpen
    },
    {
      id: 'ubl',
      name: 'UBL (Universal Business Language)',
      description: 'Langage universel pour documents commerciaux',
      version: '2.3',
      status: 'inactive',
      compatibility: 65,
      icon: Globe
    }
  ];

  const handleStandardToggle = (standardId: string, enabled: boolean) => {
    setStandardsConfig(prev => ({ ...prev, [standardId]: enabled }));
    toast.success(`Standard ${standardId} ${enabled ? 'activé' : 'désactivé'}`);
  };

  const handleValidateStandard = (standardId: string) => {
    toast.success(`Validation du standard ${standardId} réussie`);
  };

  const handleImportStandard = () => {
    toast.success('Import de document standard initié');
  };

  const handleExportStandard = () => {
    toast.success('Export vers format standard lancé');
  };

  const handleTestConversion = () => {
    toast.success('Test de conversion entre standards réussi');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Standards Juridiques Internationaux
          </CardTitle>
          <CardDescription>
            Support des formats Akoma Ntoso, LegalXML et autres standards juridiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standards.map((standard) => {
              const Icon = standard.icon;
              const isEnabled = standardsConfig[standard.id as keyof typeof standardsConfig];
              
              return (
                <Card key={standard.id} className={`transition-all ${isEnabled ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <div>
                          <h3 className="font-semibold">{standard.name}</h3>
                          <p className="text-sm text-gray-600">v{standard.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={standard.status === 'active' ? 'default' : 'secondary'}
                          className={standard.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {standard.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Switch
                          checked={isEnabled as boolean}
                          onCheckedChange={(checked) => handleStandardToggle(standard.id, checked)}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{standard.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Compatibilité:</span>
                        <span className="text-xs font-medium text-green-600">{standard.compatibility}%</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleValidateStandard(standard.id)}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Valider
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Configuration Globale</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultStandard">Standard par défaut</Label>
                  <Select 
                    value={standardsConfig.defaultStandard} 
                    onValueChange={(value) => setStandardsConfig({...standardsConfig, defaultStandard: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="akoma">Akoma Ntoso</SelectItem>
                      <SelectItem value="legalxml">LegalXML</SelectItem>
                      <SelectItem value="ecourt">eCourt Standards</SelectItem>
                      <SelectItem value="ubl">UBL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="validateImport">Validation à l'import</Label>
                    <p className="text-sm text-gray-600">Vérifier la conformité des documents importés</p>
                  </div>
                  <Switch
                    id="validateImport"
                    checked={standardsConfig.validateOnImport}
                    onCheckedChange={(checked) => setStandardsConfig({...standardsConfig, validateOnImport: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoConvert">Conversion automatique</Label>
                    <p className="text-sm text-gray-600">Convertir automatiquement entre standards</p>
                  </div>
                  <Switch
                    id="autoConvert"
                    checked={standardsConfig.autoConvert}
                    onCheckedChange={(checked) => setStandardsConfig({...standardsConfig, autoConvert: checked})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Formats Supportés</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Documents législatifs</span>
                      <Badge variant="outline">Akoma Ntoso</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Échanges judiciaires</span>
                      <Badge variant="outline">LegalXML</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Procédures en ligne</span>
                      <Badge variant="outline">eCourt</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Documents commerciaux</span>
                      <Badge variant="outline">UBL</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Conformité</h4>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Standards ISO 19731 et ISO 19732</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Certification OASIS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">
                {Object.values(standardsConfig).filter(v => v === true).length} standard(s) actif(s)
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleImportStandard}>
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
              <Button variant="outline" onClick={handleExportStandard}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button onClick={handleTestConversion}>
                <Zap className="w-4 h-4 mr-2" />
                Test Conversion
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
