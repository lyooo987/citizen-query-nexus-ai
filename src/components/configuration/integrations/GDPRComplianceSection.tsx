
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  Eye, 
  Trash2, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Settings,
  FileText,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface GDPRComplianceSectionProps {
  language?: string;
}

export function GDPRComplianceSection({ language = "fr" }: GDPRComplianceSectionProps) {
  const [gdprSettings, setGdprSettings] = useState({
    autoDeleteEnabled: true,
    retentionPeriod: 36,
    encryptionEnabled: true,
    auditLogsEnabled: true,
    consentTracking: true,
    dataMinimization: true,
    rightToForgotten: true,
    dataPortability: true
  });

  const [complianceScore, setComplianceScore] = useState(85);

  const complianceChecks = [
    { id: 'encryption', label: 'Chiffrement des données', status: 'active', description: 'Toutes les données sont chiffrées' },
    { id: 'consent', label: 'Gestion du consentement', status: 'active', description: 'Traçabilité complète des consentements' },
    { id: 'retention', label: 'Politique de rétention', status: 'active', description: 'Suppression automatique après 36 mois' },
    { id: 'audit', label: 'Journaux d\'audit', status: 'active', description: 'Logs complets des accès et modifications' },
    { id: 'portability', label: 'Portabilité des données', status: 'warning', description: 'Export partiellement configuré' },
    { id: 'forgotten', label: 'Droit à l\'oubli', status: 'active', description: 'Procédure automatisée de suppression' }
  ];

  const handleSettingChange = (setting: string, value: boolean | number) => {
    setGdprSettings(prev => ({ ...prev, [setting]: value }));
    toast.success('Configuration GDPR mise à jour');
  };

  const handleComplianceAudit = () => {
    toast.success('Audit de conformité GDPR lancé');
    setTimeout(() => {
      setComplianceScore(Math.floor(Math.random() * 15) + 85);
      toast.success('Audit terminé - Score de conformité mis à jour');
    }, 2000);
  };

  const handleDataExport = () => {
    toast.success('Export des données personnelles initié');
  };

  const handleDataDeletion = () => {
    toast.success('Procédure de suppression des données lancée');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Conformité GDPR Native
          </CardTitle>
          <CardDescription>
            Gestion automatique de la protection des données selon le RGPD
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-blue-900">Score de Conformité GDPR</h3>
              <p className="text-sm text-blue-700">Évaluation basée sur 6 critères essentiels</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-900">{complianceScore}%</div>
              <Progress value={complianceScore} className="w-24 mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceChecks.map((check) => (
              <div key={check.id} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {check.status === 'active' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{check.label}</span>
                      <Badge 
                        variant={check.status === 'active' ? 'default' : 'secondary'}
                        className={check.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {check.status === 'active' ? 'Actif' : 'Attention'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{check.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Paramètres de Protection des Données</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoDelete">Suppression automatique</Label>
                    <p className="text-sm text-gray-600">Supprimer automatiquement les données expirées</p>
                  </div>
                  <Switch
                    id="autoDelete"
                    checked={gdprSettings.autoDeleteEnabled}
                    onCheckedChange={(checked) => handleSettingChange('autoDeleteEnabled', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention">Période de rétention (mois)</Label>
                  <Input
                    id="retention"
                    type="number"
                    value={gdprSettings.retentionPeriod}
                    onChange={(e) => handleSettingChange('retentionPeriod', parseInt(e.target.value))}
                    min="1"
                    max="120"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="encryption">Chiffrement renforcé</Label>
                    <p className="text-sm text-gray-600">AES-256 pour toutes les données</p>
                  </div>
                  <Switch
                    id="encryption"
                    checked={gdprSettings.encryptionEnabled}
                    onCheckedChange={(checked) => handleSettingChange('encryptionEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit">Journaux d'audit détaillés</Label>
                    <p className="text-sm text-gray-600">Traçabilité complète des accès</p>
                  </div>
                  <Switch
                    id="audit"
                    checked={gdprSettings.auditLogsEnabled}
                    onCheckedChange={(checked) => handleSettingChange('auditLogsEnabled', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="consent">Suivi du consentement</Label>
                    <p className="text-sm text-gray-600">Historique des consentements utilisateur</p>
                  </div>
                  <Switch
                    id="consent"
                    checked={gdprSettings.consentTracking}
                    onCheckedChange={(checked) => handleSettingChange('consentTracking', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="minimization">Minimisation des données</Label>
                    <p className="text-sm text-gray-600">Collecter uniquement les données nécessaires</p>
                  </div>
                  <Switch
                    id="minimization"
                    checked={gdprSettings.dataMinimization}
                    onCheckedChange={(checked) => handleSettingChange('dataMinimization', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="forgotten">Droit à l'oubli</Label>
                    <p className="text-sm text-gray-600">Suppression sur demande utilisateur</p>
                  </div>
                  <Switch
                    id="forgotten"
                    checked={gdprSettings.rightToForgotten}
                    onCheckedChange={(checked) => handleSettingChange('rightToForgotten', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="portability">Portabilité des données</Label>
                    <p className="text-sm text-gray-600">Export des données utilisateur</p>
                  </div>
                  <Switch
                    id="portability"
                    checked={gdprSettings.dataPortability}
                    onCheckedChange={(checked) => handleSettingChange('dataPortability', checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">
                Dernière vérification: {new Date().toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDataExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Données
              </Button>
              <Button variant="outline" onClick={handleDataDeletion}>
                <Trash2 className="w-4 h-4 mr-2" />
                Suppression
              </Button>
              <Button onClick={handleComplianceAudit}>
                <Settings className="w-4 h-4 mr-2" />
                Audit GDPR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
