
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Globe, 
  Database, 
  Cloud, 
  Shield, 
  FileText,
  Users,
  Building,
  Link,
  GitBranch,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Lock,
  Key,
  Server,
  Webhook,
  Code,
  ExternalLink
} from "lucide-react";

interface IntegrationsInteroperabilitySectionProps {
  language?: string;
}

export function IntegrationsInteroperabilitySection({ language = "fr" }: IntegrationsInteroperabilitySectionProps) {
  const activeIntegrations = [
    { name: "Système National d'Identité", status: "connected", type: "Government", uptime: "99.8%", requests: "1,245/day" },
    { name: "Base Nationale des Entreprises", status: "connected", type: "Business", uptime: "99.5%", requests: "892/day" },
    { name: "Registre du Commerce", status: "connected", type: "Commercial", uptime: "99.9%", requests: "2,156/day" },
    { name: "Système Judiciaire", status: "maintenance", type: "Judicial", uptime: "98.2%", requests: "456/day" },
    { name: "Archives Nationales", status: "connected", type: "Archives", uptime: "99.7%", requests: "678/day" }
  ];

  const apiEndpoints = [
    { endpoint: "/api/v1/legal-texts", method: "GET", status: "active", calls: "15,234", avgTime: "45ms" },
    { endpoint: "/api/v1/procedures", method: "POST", status: "active", calls: "8,567", avgTime: "67ms" },
    { endpoint: "/api/v1/search", method: "GET", status: "active", calls: "23,456", avgTime: "123ms" },
    { endpoint: "/api/v1/documents", method: "PUT", status: "active", calls: "4,123", avgTime: "89ms" },
    { endpoint: "/api/v1/users", method: "GET", status: "maintenance", calls: "2,789", avgTime: "156ms" }
  ];

  const standardsCompliance = [
    { standard: "OpenAPI 3.0", compliance: 100, status: "compliant", description: "Spécification API REST" },
    { standard: "JSON-LD", compliance: 95, status: "compliant", description: "Données liées structurées" },
    { standard: "OAuth 2.0", compliance: 100, status: "compliant", description: "Authentification sécurisée" },
    { standard: "SAML 2.0", compliance: 85, status: "partial", description: "Single Sign-On" },
    { standard: "FHIR R4", compliance: 70, status: "partial", description: "Échange données santé" },
    { standard: "HL7", compliance: 60, status: "development", description: "Standards santé" }
  ];

  const dataFormats = [
    { format: "JSON", support: "Full", usage: "95%", icon: Code },
    { format: "XML", support: "Full", usage: "78%", icon: FileText },
    { format: "CSV", support: "Full", usage: "65%", icon: Database },
    { format: "PDF", support: "Read/Write", usage: "89%", icon: FileText },
    { format: "RDF", support: "Read", usage: "23%", icon: GitBranch },
    { format: "EDI", support: "Partial", usage: "12%", icon: ExternalLink }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'maintenance':
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'error':
      case 'development': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-green-600';
    if (compliance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="integrations">Intégrations Actives</TabsTrigger>
          <TabsTrigger value="apis">APIs & Services</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="formats">Formats de Données</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeIntegrations.map((integration, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status === 'connected' ? 'Connecté' :
                       integration.status === 'maintenance' ? 'Maintenance' : 'Erreur'}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{integration.name}</h4>
                  <Badge variant="outline" className="mb-3">{integration.type}</Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disponibilité:</span>
                      <span className="font-medium">{integration.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requêtes:</span>
                      <span className="font-medium">{integration.requests}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Config
                    </Button>
                    <Button variant="outline" size="sm">
                      <Activity className="w-4 h-4 mr-1" />
                      Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-600" />
                Points de Terminaison API
              </CardTitle>
              <CardDescription>
                Gestion et monitoring des APIs REST
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((api, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="font-mono">
                        {api.method}
                      </Badge>
                      <code className="text-sm bg-white px-2 py-1 rounded">
                        {api.endpoint}
                      </code>
                      <Badge className={getStatusColor(api.status)}>
                        {api.status === 'active' ? 'Actif' : 'Maintenance'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-600">Appels: </span>
                        <span className="font-medium">{api.calls}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Temps moyen: </span>
                        <span className="font-medium">{api.avgTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Documentation API
                </Button>
                <Button variant="outline">
                  <Key className="w-4 h-4 mr-2" />
                  Gestion des clés
                </Button>
                <Button variant="outline">
                  <Webhook className="w-4 h-4 mr-2" />
                  Webhooks
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standardsCompliance.map((standard, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{standard.standard}</h4>
                    <Badge className={getStatusColor(standard.status)}>
                      {standard.status === 'compliant' ? 'Conforme' :
                       standard.status === 'partial' ? 'Partiel' : 'En développement'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{standard.description}</p>
                  <div className="flex items-center gap-3 mb-2">
                    <Progress value={standard.compliance} className="flex-1" />
                    <span className={`font-medium ${getComplianceColor(standard.compliance)}`}>
                      {standard.compliance}%
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Documentation
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="formats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataFormats.map((format, index) => {
              const Icon = format.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <h4 className="font-semibold text-gray-900 mb-2">{format.format}</h4>
                    <Badge variant="outline" className="mb-3">{format.support}</Badge>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Utilisation:</span>
                        <span className="font-medium">{format.usage}</span>
                      </div>
                      <Progress value={parseInt(format.usage)} className="h-2" />
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurer
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">99.7%</div>
                <div className="text-sm text-gray-600">Disponibilité</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">2.3M</div>
                <div className="text-sm text-gray-600">Requêtes/jour</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">78ms</div>
                <div className="text-sm text-gray-600">Latence moyenne</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">15</div>
                <div className="text-sm text-gray-600">Intégrations actives</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Monitoring en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Graphiques de monitoring en temps réel</p>
                  <p className="text-sm text-gray-500">Intégration avec systèmes de monitoring</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Tableau de bord complet
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Configurer alertes
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Rapports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
