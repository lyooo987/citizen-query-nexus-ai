
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Link2, 
  Shield, 
  Clock, 
  Key, 
  Hash, 
  CheckCircle, 
  AlertCircle,
  Zap,
  FileText,
  Database
} from 'lucide-react';
import { toast } from 'sonner';

interface BlockchainAuthSectionProps {
  language?: string;
}

export function BlockchainAuthSection({ language = "fr" }: BlockchainAuthSectionProps) {
  const [blockchainConfig, setBlockchainConfig] = useState({
    enabled: true,
    network: 'ethereum',
    timestampingEnabled: true,
    certificationEnabled: true,
    smartContractsEnabled: false,
    gasLimit: 100000,
    confirmations: 6
  });

  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [networkHealth, setNetworkHealth] = useState(98);

  const networks = [
    { id: 'ethereum', name: 'Ethereum', status: 'active', gasPrice: '25 Gwei' },
    { id: 'polygon', name: 'Polygon', status: 'active', gasPrice: '2 Gwei' },
    { id: 'binance', name: 'Binance Smart Chain', status: 'active', gasPrice: '5 Gwei' },
    { id: 'avalanche', name: 'Avalanche', status: 'maintenance', gasPrice: '25 nAVAX' }
  ];

  const certifiedDocuments = [
    { id: '1', name: 'Loi Finance 2024', hash: '0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730', timestamp: '2024-01-15', status: 'certified' },
    { id: '2', name: 'Décret Application', hash: '0x2cf24dba4f21d4288094e4c6c8f8a5a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3', timestamp: '2024-01-14', status: 'pending' },
    { id: '3', name: 'Circulaire Ministérielle', hash: '0x8b7df143d91c716ecfa5fc1730022f6b421b05cedee8fd52b1fc65a96030ad52', timestamp: '2024-01-13', status: 'certified' }
  ];

  const handleNetworkChange = (network: string) => {
    setBlockchainConfig(prev => ({ ...prev, network }));
    toast.success(`Réseau blockchain changé vers ${network}`);
  };

  const handleTestConnection = () => {
    toast.success('Test de connexion blockchain réussi');
    setConnectionStatus('connected');
    setNetworkHealth(Math.floor(Math.random() * 10) + 90);
  };

  const handleCertifyDocument = () => {
    toast.success('Certification de document sur blockchain initiée');
  };

  const handleTimestamp = () => {
    toast.success('Horodatage blockchain effectué');
  };

  const handleVerifyDocument = () => {
    toast.success('Vérification de l\'authenticité réussie');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Authentification Blockchain
          </CardTitle>
          <CardDescription>
            Horodatage et certification des documents via blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Statut Réseau</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm capitalize">{connectionStatus}</span>
              </div>
              <Progress value={networkHealth} className="mt-2" />
              <span className="text-xs text-gray-600">{networkHealth}% disponibilité</span>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="font-medium">Documents Certifiés</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                {certifiedDocuments.filter(d => d.status === 'certified').length}
              </div>
              <span className="text-xs text-gray-600">Ce mois</span>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">En Attente</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900">
                {certifiedDocuments.filter(d => d.status === 'pending').length}
              </div>
              <span className="text-xs text-gray-600">Confirmations</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Configuration Blockchain</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="network">Réseau Blockchain</Label>
                  <Select 
                    value={blockchainConfig.network} 
                    onValueChange={handleNetworkChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {networks.map((network) => (
                        <SelectItem key={network.id} value={network.id}>
                          <div className="flex items-center gap-2">
                            <span>{network.name}</span>
                            <Badge 
                              variant={network.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {network.status}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gasLimit">Limite de Gas</Label>
                  <Input
                    id="gasLimit"
                    type="number"
                    value={blockchainConfig.gasLimit}
                    onChange={(e) => setBlockchainConfig({...blockchainConfig, gasLimit: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmations">Confirmations Requises</Label>
                  <Input
                    id="confirmations"
                    type="number"
                    value={blockchainConfig.confirmations}
                    onChange={(e) => setBlockchainConfig({...blockchainConfig, confirmations: parseInt(e.target.value)})}
                    min="1"
                    max="12"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="timestamping">Horodatage Automatique</Label>
                    <p className="text-sm text-gray-600">Horodater automatiquement les nouveaux documents</p>
                  </div>
                  <Switch
                    id="timestamping"
                    checked={blockchainConfig.timestampingEnabled}
                    onCheckedChange={(checked) => setBlockchainConfig({...blockchainConfig, timestampingEnabled: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="certification">Certification Numérique</Label>
                    <p className="text-sm text-gray-600">Générer des certificats d'authenticité</p>
                  </div>
                  <Switch
                    id="certification"
                    checked={blockchainConfig.certificationEnabled}
                    onCheckedChange={(checked) => setBlockchainConfig({...blockchainConfig, certificationEnabled: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smartContracts">Smart Contracts</Label>
                    <p className="text-sm text-gray-600">Utiliser des contrats intelligents</p>
                  </div>
                  <Switch
                    id="smartContracts"
                    checked={blockchainConfig.smartContractsEnabled}
                    onCheckedChange={(checked) => setBlockchainConfig({...blockchainConfig, smartContractsEnabled: checked})}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Documents Certifiés Récents</h3>
            <div className="space-y-2">
              {certifiedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-gray-600 font-mono">{doc.hash.substring(0, 20)}...</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={doc.status === 'certified' ? 'default' : 'secondary'}
                      className={doc.status === 'certified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {doc.status === 'certified' ? 'Certifié' : 'En attente'}
                    </Badge>
                    <span className="text-sm text-gray-500">{doc.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">
                Réseau: {networks.find(n => n.id === blockchainConfig.network)?.name}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleTestConnection}>
                <Zap className="w-4 h-4 mr-2" />
                Test Connexion
              </Button>
              <Button variant="outline" onClick={handleTimestamp}>
                <Clock className="w-4 h-4 mr-2" />
                Horodater
              </Button>
              <Button onClick={handleCertifyDocument}>
                <Shield className="w-4 h-4 mr-2" />
                Certifier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
