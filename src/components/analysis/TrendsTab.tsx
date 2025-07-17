
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Users, FileText, Activity, Eye, Brain, Target, Zap, Calendar, AlertTriangle, CheckCircle2, ArrowUpRight, ArrowDownRight, Download, Share2, Search, Filter, Settings, RefreshCw, Bell } from 'lucide-react';

export function TrendsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const trendsData = [
    {
      title: "Consultations de textes juridiques",
      value: "+23%",
      trend: "up",
      description: "Augmentation par rapport au mois dernier",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actualValue: "45,234",
      previousValue: "36,783"
    },
    {
      title: "Nouvelles procédures ajoutées",
      value: "+15%",
      trend: "up",
      description: "Croissance continue de la base de données",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      actualValue: "127",
      previousValue: "110"
    },
    {
      title: "Utilisateurs actifs",
      value: "+8%",
      trend: "up",
      description: "Engagement utilisateur en hausse",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      actualValue: "8,456",
      previousValue: "7,829"
    },
    {
      title: "Temps de session moyen",
      value: "-3%",
      trend: "down",
      description: "Légère diminution du temps passé",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      actualValue: "12.3 min",
      previousValue: "12.7 min"
    }
  ];

  const advancedMetrics = [
    {
      title: "Taux de satisfaction utilisateur",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      description: "Basé sur 1,247 évaluations",
      icon: CheckCircle2,
      color: "text-emerald-600"
    },
    {
      title: "Temps moyen de résolution",
      value: "4.2 min",
      change: "-18%",
      trend: "up",
      description: "Amélioration de l'efficacité",
      icon: Zap,
      color: "text-blue-600"
    },
    {
      title: "Taux de conversion recherche",
      value: "76.8%",
      change: "+5.3%",
      trend: "up",
      description: "Recherches aboutissant à une consultation",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Alertes juridiques créées",
      value: "342",
      change: "+28%",
      trend: "up",
      description: "Nouvelles alertes ce mois",
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ];

  const topSearchTrends = [
    { term: "Droit du travail", searches: 1245, growth: "+18%", category: "Social", priority: "high" },
    { term: "Code civil", searches: 989, growth: "+12%", category: "Civil", priority: "medium" },
    { term: "Procédures administratives", searches: 756, growth: "+25%", category: "Admin", priority: "high" },
    { term: "Droit commercial", searches: 623, growth: "+8%", category: "Commercial", priority: "medium" },
    { term: "Fiscalité", searches: 445, growth: "+15%", category: "Fiscal", priority: "low" },
    { term: "Droit pénal", searches: 389, growth: "+22%", category: "Pénal", priority: "medium" },
    { term: "Urbanisme", searches: 267, growth: "+31%", category: "Urbanisme", priority: "high" }
  ];

  const monthlyTrends = [
    { month: "Jan", consultations: 1200, procedures: 45, satisfaction: 89, users: 756 },
    { month: "Fév", consultations: 1450, procedures: 52, satisfaction: 91, users: 823 },
    { month: "Mar", consultations: 1680, procedures: 48, satisfaction: 88, users: 891 },
    { month: "Avr", consultations: 1920, procedures: 61, satisfaction: 93, users: 945 },
    { month: "Mai", consultations: 2150, procedures: 58, satisfaction: 92, users: 1023 },
    { month: "Juin", consultations: 2380, procedures: 67, satisfaction: 94, users: 1156 }
  ];

  const regionalTrends = [
    { region: "Alger", consultations: 3456, growth: "+15%", color: "bg-blue-500" },
    { region: "Oran", consultations: 2234, growth: "+12%", color: "bg-green-500" },
    { region: "Constantine", consultations: 1890, growth: "+8%", color: "bg-purple-500" },
    { region: "Annaba", consultations: 1245, growth: "+22%", color: "bg-orange-500" },
    { region: "Tlemcen", consultations: 967, growth: "+18%", color: "bg-red-500" }
  ];

  const predictiveInsights = [
    {
      title: "Prédiction Demande",
      description: "Augmentation prévue de 15% des consultations en droit du travail",
      confidence: "87%",
      timeframe: "Prochains 30 jours",
      type: "prediction",
      icon: Brain
    },
    {
      title: "Alerte Tendance",
      description: "Pic inhabituel de recherches sur les procédures de divorce",
      confidence: "94%",
      timeframe: "Dernières 48h",
      type: "alert",
      icon: AlertTriangle
    },
    {
      title: "Opportunité",
      description: "Demande croissante pour contenu en droit de l'environnement",
      confidence: "76%",
      timeframe: "Tendance 3 mois",
      type: "opportunity",
      icon: Target
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'border-l-blue-500 bg-blue-50';
      case 'alert': return 'border-l-red-500 bg-red-50';
      case 'opportunity': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête enrichi avec nouvelles fonctionnalités */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tendances et Analyses Avancées</h2>
          <p className="text-gray-600 mt-2">Insights en temps réel sur l'utilisation et les performances avec fonctionnalités d'analyse prédictive</p>
        </div>
        
        {/* Contrôles avancés */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher des tendances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Filtres */}
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">7 jours</SelectItem>
                <SelectItem value="month">30 jours</SelectItem>
                <SelectItem value="quarter">3 mois</SelectItem>
                <SelectItem value="year">1 an</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="legal">Juridique</SelectItem>
                <SelectItem value="admin">Administratif</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="fiscal">Fiscal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Alertes
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </div>

      {/* Métriques principales enrichies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendsData.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  {item.trend === 'up' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`text-sm font-semibold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.value}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
              <div className="space-y-1">
                <p className={`text-xl font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.actualValue}
                </p>
                <p className="text-xs text-gray-500">vs {item.previousValue} précédent</p>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nouvelles métriques avancées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advancedMetrics.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <item.icon className={`w-8 h-8 ${item.color}`} />
                <Badge variant="outline" className={item.trend === 'up' ? 'text-green-700 border-green-300' : 'text-red-700 border-red-300'}>
                  {item.change}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
              <p className={`text-2xl font-bold mb-1 ${item.color}`}>
                {item.value}
              </p>
              <p className="text-xs text-gray-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tendances de recherche enrichies */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Tendances de recherche avancées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSearchTrends.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.term}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">{item.searches} recherches</span>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {item.growth}
                    </p>
                    <p className="text-xs text-gray-500">vs mois dernier</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tendances régionales */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Répartition régionale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalTrends.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="font-medium text-gray-900">{item.region}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.consultations}</p>
                    <p className="text-xs text-green-600 font-medium">{item.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique d'évolution enrichi */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-purple-600" />
            Évolution multi-métriques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 p-4">
            <div className="h-full relative">
              {/* Graphique multi-lignes enrichi */}
              <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-gray-300">
                {/* Lignes de grille */}
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div
                    key={percent}
                    className="absolute w-full border-t border-gray-200"
                    style={{ bottom: `${percent}%` }}
                  >
                    <span className="absolute -left-12 text-xs text-gray-500 -translate-y-1/2">
                      {Math.round((percent / 100) * 2500)}
                    </span>
                  </div>
                ))}
                
                {/* Barres et lignes de données */}
                <div className="absolute bottom-0 w-full h-full flex items-end justify-between px-6">
                  {monthlyTrends.map((data, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      {/* Barres empilées */}
                      <div className="flex gap-1 items-end mb-2">
                        <div 
                          className="bg-blue-500 w-4 rounded-t shadow-sm"
                          style={{ height: `${(data.consultations / 2500) * 200}px`, minHeight: '8px' }}
                          title={`Consultations: ${data.consultations}`}
                        />
                        <div 
                          className="bg-green-500 w-4 rounded-t shadow-sm"
                          style={{ height: `${(data.procedures / 70) * 200}px`, minHeight: '4px' }}
                          title={`Procédures: ${data.procedures}`}
                        />
                        <div 
                          className="bg-purple-500 w-4 rounded-t shadow-sm"
                          style={{ height: `${(data.users / 1200) * 200}px`, minHeight: '6px' }}
                          title={`Utilisateurs: ${data.users}`}
                        />
                      </div>
                      
                      {/* Indicateur de satisfaction */}
                      <div className={`w-3 h-3 rounded-full mb-1 ${
                        data.satisfaction >= 92 ? 'bg-green-400' : 
                        data.satisfaction >= 90 ? 'bg-yellow-400' : 'bg-red-400'
                      }`} title={`Satisfaction: ${data.satisfaction}%`} />
                      
                      <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Légende enrichie */}
              <div className="absolute top-0 right-0 text-xs space-y-2 bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Consultations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Procédures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Utilisateurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights prédictifs et recommandations enrichis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-green-600" />
              Insights prédictifs IA enrichis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${getInsightTypeColor(insight.type)} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-3">
                    <insight.icon className="w-6 h-6 text-gray-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>Confiance: {insight.confidence}</span>
                        <span>{insight.timeframe}</span>
                      </div>
                      {/* Actions disponibles */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Analyser plus
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Créer alerte
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Rapport
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Exemples d'analyses avancées */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Exemples d'analyses disponibles
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                    <h6 className="font-medium text-sm text-gray-900">Analyse des pics d'utilisation</h6>
                    <p className="text-xs text-gray-600 mt-1">Détection automatique des périodes de forte affluence</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 hover:border-green-300 transition-colors cursor-pointer">
                    <h6 className="font-medium text-sm text-gray-900">Prédiction saisonnière</h6>
                    <p className="text-xs text-gray-600 mt-1">Anticipation des besoins selon les cycles annuels</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                    <h6 className="font-medium text-sm text-gray-900">Analyse comportementale</h6>
                    <p className="text-xs text-gray-600 mt-1">Patterns d'utilisation des différents profils utilisateurs</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                    <h6 className="font-medium text-sm text-gray-900">Optimisation du contenu</h6>
                    <p className="text-xs text-gray-600 mt-1">Recommandations pour améliorer l'engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600" />
              Recommandations stratégiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Optimisation de contenu
                </h4>
                <p className="text-sm text-blue-800 mb-3">
                  Enrichir le contenu sur les procédures administratives pour répondre à la demande croissante (+25%).
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-200 text-blue-800 text-xs">Priorité Haute</Badge>
                  <Badge variant="outline" className="text-xs">ROI Estimé: +15%</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Expansion régionale
                </h4>
                <p className="text-sm text-green-800 mb-3">
                  Opportunité de croissance en régions Sud avec une demande latente identifiée.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-200 text-green-800 text-xs">Opportunité</Badge>
                  <Badge variant="outline" className="text-xs">Impact: Moyen-terme</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Amélioration UX
                </h4>
                <p className="text-sm text-purple-800 mb-3">
                  Optimiser le temps de réponse des recherches pour maintenir l'engagement utilisateur.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-200 text-purple-800 text-xs">Performance</Badge>
                  <Badge variant="outline" className="text-xs">Impact: Immédiat</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nouvelle section : Analyses Interactives et Exemples Concrets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Analyses Interactives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Exemple d'analyse prédictive concrète */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Exemple : Prédiction "Permis de Construire"
                </h4>
                <div className="space-y-3">
                  <div className="text-sm text-blue-800">
                    <p><strong>Analyse :</strong> Augmentation prévue de 35% des demandes de permis de construire</p>
                    <p><strong>Période :</strong> Mars-Mai 2024 (saison du bâtiment)</p>
                    <p><strong>Facteurs :</strong> Nouveau plan d'urbanisme + Subventions gouvernementales</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-blue-600 text-white">Fiabilité: 91%</Badge>
                    <Button size="sm" variant="outline" className="text-xs">
                      Voir détails complets
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Exemple d'alerte tendance */}
              <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alerte : Pic inhabituel "Aide Sociale"
                </h4>
                <div className="space-y-3">
                  <div className="text-sm text-orange-800">
                    <p><strong>Détection :</strong> +127% de recherches sur "allocation chômage" en 48h</p>
                    <p><strong>Cause probable :</strong> Annonce gouvernementale du 12/12</p>
                    <p><strong>Action suggérée :</strong> Renforcer le contenu et les FAQ</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-orange-600 text-white">Critique</Badge>
                    <Button size="sm" variant="outline" className="text-xs">
                      Action immédiate
                    </Button>
                  </div>
                </div>
              </div>

              {/* Exemple d'optimisation */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Succès : Optimisation "Carte d'Identité"
                </h4>
                <div className="space-y-3">
                  <div className="text-sm text-green-800">
                    <p><strong>Amélioration :</strong> Temps de traitement réduit de 15 à 8 minutes</p>
                    <p><strong>Impact :</strong> Satisfaction utilisateur +12% (86% → 98%)</p>
                    <p><strong>Méthode :</strong> Simplification du formulaire basée sur l'analyse</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-600 text-white">Succès</Badge>
                    <Button size="sm" variant="outline" className="text-xs">
                      Répliquer ailleurs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Fonctionnalités Avancées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Analyse comparative */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  Analyse Comparative Régionale
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Comparez les performances et tendances entre différentes régions
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">Alger: +15% vs national</div>
                  <div className="bg-gray-50 p-2 rounded">Oran: +12% vs national</div>
                  <div className="bg-red-50 p-2 rounded">Sud: -8% vs national</div>
                  <div className="bg-green-50 p-2 rounded">Est: +18% vs national</div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                  Analyser toutes les régions
                </Button>
              </div>

              {/* Prédictions personnalisées */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  Prédictions Personnalisées
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Créez des modèles prédictifs adaptés à vos besoins spécifiques
                </p>
                <div className="space-y-2">
                  <Input placeholder="Ex: Prédire la demande pour 'Passeport'" className="text-xs" />
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="text-xs">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">1 semaine</SelectItem>
                        <SelectItem value="month">1 mois</SelectItem>
                        <SelectItem value="quarter">3 mois</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" className="text-xs">
                      Analyser
                    </Button>
                  </div>
                </div>
              </div>

              {/* Alertes intelligentes */}
              <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-orange-600" />
                  Alertes Intelligentes
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Notifications automatiques basées sur vos seuils personnalisés
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                    <span>Pic de trafic &gt; 150%</span>
                    <Badge className="bg-orange-200 text-orange-800">Actif</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span>Nouvelle tendance émergente</span>
                    <Badge className="bg-blue-200 text-blue-800">Actif</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Baisse satisfaction &lt; 85%</span>
                    <Badge variant="outline">Inactif</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                  Configurer alertes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Cas d'Usage et Exemples Pratiques */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Cas d'Usage et Exemples Pratiques
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Découvrez comment utiliser les analyses de tendances pour améliorer vos services
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cas d'usage 1 */}
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Gestion des Pics</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Problème :</strong> Surcharge pendant la rentrée scolaire
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Solution :</strong> Prédiction des demandes de certificats de scolarité 2 semaines à l'avance
              </p>
              <p className="text-sm text-green-600 font-medium">
                <strong>Résultat :</strong> -40% temps d'attente
              </p>
            </div>

            {/* Cas d'usage 2 */}
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Amélioration UX</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Problème :</strong> Utilisateurs perdus dans les démarches
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Solution :</strong> Analyse des parcours et optimisation des chemins les plus fréquents
              </p>
              <p className="text-sm text-green-600 font-medium">
                <strong>Résultat :</strong> +25% taux de réussite
              </p>
            </div>

            {/* Cas d'usage 3 */}
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Contenu Intelligent</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Problème :</strong> Questions récurrentes non documentées
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Solution :</strong> Détection automatique des lacunes de contenu via les recherches
              </p>
              <p className="text-sm text-green-600 font-medium">
                <strong>Résultat :</strong> +30% satisfaction utilisateur
              </p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Actions Rapides</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Rapport PDF
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Share2 className="w-3 h-3 mr-1" />
                Partager analyse
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Bell className="w-3 h-3 mr-1" />
                Créer alerte
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Personnaliser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
