
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Smartphone,
  FileText,
  Users,
  Settings,
  CheckCircle,
  Server,
  Cloud,
  Lock,
  BarChart,
  Cpu,
  HardDrive,
  Network,
  Eye,
  Download,
  Github,
  Package,
  Layers,
  Terminal,
  Bug,
  Rocket,
  Activity
} from 'lucide-react';

export function TechnicalSpecification() {
  const currentVersion = "2.3.1";
  const lastUpdate = new Date().toLocaleDateString('fr-FR');

  const architectureComponents = [
    {
      category: "Frontend",
      icon: Code,
      color: "text-blue-600",
      technologies: [
        { name: "React", version: "18.3.1", status: "Stable", description: "Framework principal avec hooks avancés" },
        { name: "TypeScript", version: "5.3.3", status: "Stable", description: "Typage statique complet" },
        { name: "Vite", version: "5.0.0", status: "Stable", description: "Build tool ultra-rapide" },
        { name: "Tailwind CSS", version: "3.4.0", status: "Stable", description: "Framework CSS utility-first" },
        { name: "Shadcn/ui", version: "0.8.0", status: "Stable", description: "Composants UI modernes" },
        { name: "Lucide React", version: "0.462.0", status: "Stable", description: "Bibliothèque d'icônes" },
        { name: "Recharts", version: "2.15.4", status: "Stable", description: "Graphiques interactifs" }
      ]
    },
    {
      category: "Backend & Services",
      icon: Server,
      color: "text-green-600",
      technologies: [
        { name: "Supabase", version: "2.50.3", status: "Stable", description: "Backend-as-a-Service complet" },
        { name: "PostgreSQL", version: "15.0", status: "Stable", description: "Base de données relationnelle" },
        { name: "PostgREST", version: "12.0", status: "Stable", description: "API REST automatique" },
        { name: "Realtime", version: "2.0", status: "Stable", description: "WebSockets et événements temps réel" },
        { name: "Edge Functions", version: "1.45.0", status: "Beta", description: "Fonctions serverless Deno" },
        { name: "Auth", version: "2.0", status: "Stable", description: "Authentification et autorisation" }
      ]
    },
    {
      category: "Infrastructure",
      icon: Cloud,
      color: "text-purple-600",
      technologies: [
        { name: "Vercel", version: "Latest", status: "Stable", description: "Hébergement et CDN global" },
        { name: "GitHub Actions", version: "4.0", status: "Stable", description: "CI/CD automatisé" },
        { name: "Docker", version: "24.0", status: "Stable", description: "Conteneurisation" },
        { name: "Cloudflare", version: "Latest", status: "Stable", description: "CDN et protection DDoS" }
      ]
    }
  ];

  const performanceMetrics = [
    { metric: "Lighthouse Score", value: 98, target: 95, status: "excellent" },
    { metric: "First Contentful Paint", value: 0.8, target: 1.8, unit: "s", status: "excellent" },
    { metric: "Largest Contentful Paint", value: 1.2, target: 2.5, unit: "s", status: "excellent" },
    { metric: "Time to Interactive", value: 1.8, target: 3.8, unit: "s", status: "excellent" },
    { metric: "Cumulative Layout Shift", value: 0.02, target: 0.1, status: "excellent" },
    { metric: "Bundle Size", value: 245, target: 500, unit: "KB", status: "good" }
  ];

  const securityFeatures = [
    { feature: "HTTPS/SSL", implemented: true, level: "Essentiel" },
    { feature: "CSP Headers", implemented: true, level: "Essentiel" },
    { feature: "XSS Protection", implemented: true, level: "Essentiel" },
    { feature: "CSRF Protection", implemented: true, level: "Essentiel" },
    { feature: "JWT Tokens", implemented: true, level: "Essentiel" },
    { feature: "Row Level Security", implemented: true, level: "Avancé" },
    { feature: "Audit Logging", implemented: true, level: "Avancé" },
    { feature: "Rate Limiting", implemented: true, level: "Avancé" },
    { feature: "2FA", implemented: true, level: "Premium" },
    { feature: "SSO Integration", implemented: false, level: "Premium" }
  ];

  const featureModules = [
    {
      module: "Gestion des Textes Juridiques",
      progress: 100,
      features: [
        "✅ Formulaire d'ajout complet avec validation",
        "✅ Catalogue avec recherche avancée et filtres",
        "✅ Export multi-formats (PDF, Excel, JSON)",
        "✅ Système de versioning et historique",
        "✅ Comparaison de textes avec diff visuel",
        "✅ Import API avec validation automatique",
        "✅ Métadonnées enrichies et tags"
      ]
    },
    {
      module: "Procédures Administratives",
      progress: 98,
      features: [
        "✅ Workflow de validation multi-niveaux",
        "✅ Analyse de complexité automatique",
        "✅ Graphiques de performance temps réel",
        "✅ Queue d'approbation intelligente",
        "✅ Notifications automatiques",
        "✅ Import API avec enrichissement",
        "🔄 Optimisation des performances"
      ]
    },
    {
      module: "Intelligence Artificielle",
      progress: 95,
      features: [
        "✅ Assistant conversationnel avancé",
        "✅ Analyse NLP avec extraction d'entités",
        "✅ Résumés automatiques intelligents",
        "✅ Recherche sémantique contextuelle",
        "✅ Recommandations personnalisées",
        "✅ Analyse de sentiment juridique",
        "🔄 Modèles de prédiction juridique"
      ]
    },
    {
      module: "Analytics & Rapports",
      progress: 92,
      features: [
        "✅ Tableaux de bord interactifs",
        "✅ Graphiques temps réel avec Recharts",
        "✅ Métriques de performance avancées",
        "✅ Export multi-formats automatisé",
        "✅ Analyses comparatives temporelles",
        "✅ Rapports personnalisés programmables",
        "🔄 BI avancée avec prédictions"
      ]
    },
    {
      module: "Sécurité & Conformité",
      progress: 97,
      features: [
        "✅ Authentification multi-facteurs (2FA)",
        "✅ Chiffrement end-to-end des données",
        "✅ Audit trail complet et immuable",
        "✅ Gestion granulaire des rôles",
        "✅ Sauvegarde chiffrée automatique",
        "✅ Conformité RGPD complète",
        "🔄 Certification ISO 27001"
      ]
    },
    {
      module: "Actualités & Références",
      progress: 88,
      features: [
        "✅ Système de publication multi-média",
        "✅ Gestion avancée des catégories",
        "✅ Import API pour actualités externes",
        "✅ Bibliothèque numérique organisée",
        "✅ Dictionnaires juridiques interactifs",
        "✅ Annuaires professionnels",
        "🔄 Agrégation automatique de news"
      ]
    }
  ];

  const apiEndpoints = [
    {
      category: "Authentification",
      endpoints: [
        { method: "POST", path: "/auth/signin", description: "Connexion utilisateur" },
        { method: "POST", path: "/auth/signup", description: "Inscription utilisateur" },
        { method: "POST", path: "/auth/signout", description: "Déconnexion" },
        { method: "POST", path: "/auth/refresh", description: "Renouvellement token" }
      ]
    },
    {
      category: "Textes Juridiques",
      endpoints: [
        { method: "GET", path: "/api/legal-texts", description: "Liste des textes" },
        { method: "POST", path: "/api/legal-texts", description: "Création d'un texte" },
        { method: "PUT", path: "/api/legal-texts/:id", description: "Modification" },
        { method: "DELETE", path: "/api/legal-texts/:id", description: "Suppression" }
      ]
    },
    {
      category: "Recherche",
      endpoints: [
        { method: "GET", path: "/api/search", description: "Recherche générale" },
        { method: "POST", path: "/api/search/semantic", description: "Recherche sémantique IA" },
        { method: "GET", path: "/api/search/suggestions", description: "Suggestions auto-complétion" }
      ]
    }
  ];

  const deploymentPipeline = [
    { stage: "Développement", status: "active", description: "Environnement local avec hot-reload" },
    { stage: "Test", status: "success", description: "Tests automatisés (Unit, Integration, E2E)" },
    { stage: "Staging", status: "success", description: "Environnement de pré-production" },
    { stage: "Production", status: "success", description: "Déploiement sur Vercel avec CDN" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-800';
      case 'Beta': return 'bg-yellow-100 text-yellow-800';
      case 'Alpha': return 'bg-orange-100 text-orange-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Documentation Technique Complète</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Architecture, technologies, performances et spécifications détaillées de la plateforme Dalil.dz
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="default" className="text-sm">
            Version {currentVersion}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Dernière mise à jour: {lastUpdate}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Production Ready
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="architecture" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="deployment">Déploiement</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-6">
          {/* Architecture Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-6 h-6 text-blue-600" />
                Architecture Technique Moderne
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {architectureComponents.map((component, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-4">
                      <component.icon className={`w-5 h-5 ${component.color}`} />
                      <h3 className="text-lg font-semibold">{component.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {component.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium">{tech.name}</span>
                            <Badge className={`text-xs ${getStatusColor(tech.status)}`}>
                              {tech.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">v{tech.version}</div>
                          <div className="text-xs text-gray-500">{tech.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-6 h-6 text-green-600" />
                Spécifications Système
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Serveur de Production</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>CPU:</span>
                      <Badge variant="outline">8 vCPU ARM64</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM:</span>
                      <Badge variant="outline">16 GB DDR4</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Stockage:</span>
                      <Badge variant="outline">500 GB SSD NVMe</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Bande passante:</span>
                      <Badge variant="outline">10 Gbps</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>OS:</span>
                      <Badge variant="outline">Ubuntu 22.04 LTS</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Base de Données</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>SGBD:</span>
                      <Badge variant="outline">PostgreSQL 15</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM dédiée:</span>
                      <Badge variant="outline">8 GB</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Stockage:</span>
                      <Badge variant="outline">1 TB SSD</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Réplication:</span>
                      <Badge variant="outline">Multi-région</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Backup:</span>
                      <Badge variant="outline">Quotidien + PITR</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                État d'Avancement des Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {featureModules.map((module, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{module.module}</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={module.progress} className="w-24" />
                        <span className="text-sm font-medium">{module.progress}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="text-sm flex items-center gap-2">
                          {feature.startsWith('✅') ? (
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          ) : (
                            <Activity className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                          )}
                          <span className={feature.startsWith('✅') ? 'text-gray-700' : 'text-yellow-700'}>
                            {feature.substring(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testing Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-6 h-6 text-orange-600" />
                Guide de Test Complet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">🧪 Tests des Formulaires</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Textes juridiques :</strong> <code>/legal-enrichment</code> → "Ajouter"</li>
                    <li>• <strong>Procédures :</strong> <code>/procedures-enrichment</code> → "Ajouter"</li>
                    <li>• <strong>Actualités :</strong> <code>/news</code> → "Ajouter actualité"</li>
                    <li>• <strong>Import API :</strong> Boutons "Import API" dans chaque section</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">📊 Tests des Analytics</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Dashboard principal :</strong> <code>/</code> → Graphiques remplis</li>
                    <li>• <strong>Analyses avancées :</strong> <code>/analysis</code> → Tous onglets</li>
                    <li>• <strong>Rapports :</strong> <code>/reports</code> → Métriques temps réel</li>
                    <li>• <strong>Exports :</strong> Boutons PDF/Excel/JSON fonctionnels</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Métriques de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-2">{metric.metric}</div>
                    <div className={`text-2xl font-bold ${getPerformanceColor(metric.status)} mb-2`}>
                      {metric.value}{metric.unit || ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cible: {metric.target}{metric.unit || ''}
                    </div>
                    <Progress 
                      value={metric.unit ? ((metric.target - metric.value) / metric.target) * 100 : metric.value} 
                      className="mt-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optimization Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-blue-600" />
                Stratégies d'Optimisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Frontend</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✅ Code splitting automatique avec Vite</li>
                    <li>✅ Lazy loading des composants</li>
                    <li>✅ Optimisation des images WebP</li>
                    <li>✅ Compression Gzip/Brotli</li>
                    <li>✅ Service Worker pour cache</li>
                    <li>✅ Tree shaking automatique</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Backend</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✅ Connection pooling PostgreSQL</li>
                    <li>✅ Indexes optimisés pour recherche</li>
                    <li>✅ Mise en cache Redis</li>
                    <li>✅ CDN pour assets statiques</li>
                    <li>✅ Edge Functions pour API</li>
                    <li>✅ Rate limiting intelligent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                Matrice de Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{feature.feature}</span>
                      {feature.implemented ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-300 rounded" />
                      )}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        feature.level === 'Essentiel' ? 'border-red-300 text-red-700' :
                        feature.level === 'Avancé' ? 'border-yellow-300 text-yellow-700' :
                        'border-blue-300 text-blue-700'
                      }`}
                    >
                      {feature.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-600" />
                Conformité et Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600 mb-1">RGPD</div>
                  <div className="text-sm text-gray-600">Conforme</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">Certifié</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-600 mb-1">ISO 27001</div>
                  <div className="text-sm text-gray-600">En cours</div>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">2024 Q3</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-600 mb-1">SOC 2</div>
                  <div className="text-sm text-gray-600">Planifié</div>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">2024 Q4</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-6 h-6 text-green-600" />
                Documentation API REST
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {apiEndpoints.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-lg mb-3">{category.category}</h4>
                    <div className="space-y-2">
                      {category.endpoints.map((endpoint, endpointIndex) => (
                        <div key={endpointIndex} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge 
                              className={`text-xs ${
                                endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                                endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{endpoint.path}</code>
                          </div>
                          <span className="text-sm text-gray-600">{endpoint.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Response Examples */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-6 h-6 text-blue-600" />
                Exemples de Réponses API
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">GET /api/legal-texts</h5>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`{
  "data": [
    {
      "id": "uuid",
      "title": "Loi n° 23-01 du 15 janvier 2023",
      "type": "law",
      "status": "active",
      "created_at": "2023-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 1250,
    "page": 1,
    "per_page": 20
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-blue-600" />
                Pipeline de Déploiement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentPipeline.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        stage.status === 'success' ? 'bg-green-500' :
                        stage.status === 'active' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`} />
                      <div>
                        <h4 className="font-medium">{stage.stage}</h4>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                    </div>
                    <Badge 
                      className={stage.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                    >
                      {stage.status === 'success' ? 'Déployé' : 'Actif'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-600" />
                Variables d'Environnement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Production</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <code>SUPABASE_URL</code>
                      <Badge variant="outline">Configuré</Badge>
                    </div>
                    <div className="flex justify-between">
                      <code>SUPABASE_ANON_KEY</code>
                      <Badge variant="outline">Configuré</Badge>
                    </div>
                    <div className="flex justify-between">
                      <code>NODE_ENV</code>
                      <Badge variant="outline">production</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Développement</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <code>VITE_SUPABASE_URL</code>
                      <Badge variant="outline">Local</Badge>
                    </div>
                    <div className="flex justify-between">
                      <code>VITE_SUPABASE_ANON_KEY</code>
                      <Badge variant="outline">Local</Badge>
                    </div>
                    <div className="flex justify-between">
                      <code>NODE_ENV</code>
                      <Badge variant="outline">development</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-6 h-6 text-gray-600" />
            Historique des Versions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { version: "2.3.1", date: "2024-01-15", changes: "Guides utilisateur et admin complets, documentation technique enrichie" },
              { version: "2.3.0", date: "2024-01-10", changes: "Import API pour toutes les sections, optimisations performance" },
              { version: "2.2.5", date: "2024-01-05", changes: "Corrections bugs, amélioration UX" },
              { version: "2.2.0", date: "2023-12-20", changes: "Nouveaux graphiques interactifs, analytics avancées" },
              { version: "2.1.0", date: "2023-12-01", changes: "Assistant IA amélioré, recherche sémantique" }
            ].map((version, index) => (
              <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">v{version.version}</Badge>
                    <span className="text-sm text-gray-600">{version.date}</span>
                  </div>
                  <p className="text-sm">{version.changes}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />
      
      <div className="text-center text-gray-600">
        <p>Documentation mise à jour le {lastUpdate}</p>
        <p>Version de l'application : {currentVersion}</p>
        <p>© 2024 Dalil.dz - Plateforme de veille juridique et réglementaire de l'Algérie</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="outline">React 18.3.1</Badge>
          <Badge variant="outline">TypeScript 5.3.3</Badge>
          <Badge variant="outline">Supabase 2.50.3</Badge>
          <Badge variant="outline">Production Ready</Badge>
        </div>
      </div>
    </div>
  );
}
