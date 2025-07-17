
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  Clock,
  Building,
  Users,
  Target,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

export function LegislativeImpactReports() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const trendData = [
    { month: 'Jan', impact: 65, organisations: 1200, cout: 2.1 },
    { month: 'Fév', impact: 72, organisations: 1350, cout: 2.4 },
    { month: 'Mar', impact: 68, organisations: 1420, cout: 2.8 },
    { month: 'Avr', impact: 85, organisations: 1680, cout: 3.2 },
    { month: 'Mai', impact: 78, organisations: 1580, cout: 3.0 },
    { month: 'Jun', impact: 92, organisations: 1820, cout: 3.8 }
  ];

  const sectorDistribution = [
    { name: 'Numérique', value: 35, color: '#3B82F6' },
    { name: 'Environnement', value: 25, color: '#10B981' },
    { name: 'RH', value: 20, color: '#F59E0B' },
    { name: 'Finance', value: 12, color: '#EF4444' },
    { name: 'Santé', value: 8, color: '#8B5CF6' }
  ];

  const legislativeChanges = [
    {
      id: 1,
      title: "Nouvelle Loi sur la Protection des Données",
      date: "15 décembre 2024",
      type: "Loi",
      sector: "Numérique",
      impact: "Élevé",
      affectedOrganizations: 1247,
      complianceDeadline: "15 juin 2025",
      status: "En cours d'adaptation",
      estimatedCost: "2,5M€",
      readinessScore: 65
    },
    {
      id: 2,
      title: "Réforme du Code du Travail - Télétravail",
      date: "3 novembre 2024",
      type: "Décret",
      sector: "Ressources Humaines",
      impact: "Moyen",
      affectedOrganizations: 3456,
      complianceDeadline: "1er mars 2025",
      status: "Conforme",
      estimatedCost: "850K€",
      readinessScore: 89
    },
    {
      id: 3,
      title: "Nouvelle Réglementation Environnementale",
      date: "20 octobre 2024",
      type: "Arrêté",
      sector: "Environnement",
      impact: "Très Élevé",
      affectedOrganizations: 892,
      complianceDeadline: "30 avril 2025",
      status: "Action requise",
      estimatedCost: "4,2M€",
      readinessScore: 34
    }
  ];

  const impactMetrics = [
    { 
      label: "Organisations impactées", 
      value: "5,595", 
      change: "+12%", 
      icon: Building, 
      color: "text-blue-600" 
    },
    { 
      label: "Coût estimé total", 
      value: "7,55M€", 
      change: "+23%", 
      icon: Target, 
      color: "text-red-600" 
    },
    { 
      label: "Taux de conformité", 
      value: "67%", 
      change: "+8%", 
      icon: CheckCircle, 
      color: "text-green-600" 
    },
    { 
      label: "Échéances critiques", 
      value: "23", 
      change: "-5%", 
      icon: AlertTriangle, 
      color: "text-orange-600" 
    }
  ];

  const sectorAnalysis = [
    { sector: "Numérique", impact: 85, changes: 12, compliance: 65, trend: "up" },
    { sector: "Environnement", impact: 92, changes: 8, compliance: 45, trend: "up" },
    { sector: "Ressources Humaines", impact: 73, changes: 15, compliance: 78, trend: "down" },
    { sector: "Finance", impact: 68, changes: 6, compliance: 82, trend: "stable" },
    { sector: "Santé", impact: 79, changes: 9, compliance: 71, trend: "up" }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Très Élevé': return 'bg-red-100 text-red-800';
      case 'Élevé': return 'bg-orange-100 text-orange-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Conforme': return 'bg-green-100 text-green-800';
      case 'En cours d\'adaptation': return 'bg-blue-100 text-blue-800';
      case 'Action requise': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Rapports d'Impact des Changements Législatifs</h3>
          <p className="text-gray-600">Analysez l'impact des nouvelles réglementations sur votre organisation</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => (window as any).actionHandlers?.handleFilter?.()}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => (window as any).actionHandlers?.handleExport?.('legislative-impact')}
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="changes">Changements</TabsTrigger>
          <TabsTrigger value="sectors">Par Secteur</TabsTrigger>
          <TabsTrigger value="compliance">Conformité</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {metric.change}
                      </p>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendances d'Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="impact" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                        name="Score d'Impact"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cout" 
                        stroke="#EF4444" 
                        fill="#EF4444" 
                        fillOpacity={0.2}
                        name="Coût (M€)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par Secteur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={sectorDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {sectorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="changes" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des changements..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {legislativeChanges.map((change) => (
              <Card key={change.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-semibold">{change.title}</h3>
                        <Badge variant="outline">{change.type}</Badge>
                        <Badge className={getImpactColor(change.impact)}>
                          {change.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {change.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {change.affectedOrganizations.toLocaleString()} organisations
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Échéance: {change.complianceDeadline}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(change.status)}>
                      {change.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{change.sector}</div>
                      <div className="text-xs text-gray-500">Secteur</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">{change.estimatedCost}</div>
                      <div className="text-xs text-gray-500">Coût estimé</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{change.readinessScore}%</div>
                      <div className="text-xs text-gray-500">Score de préparation</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-center gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => (window as any).actionHandlers?.handleView?.(change.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => (window as any).actionHandlers?.handleDownload?.(change.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Actions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="space-y-4">
            {sectorAnalysis.map((sector, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{sector.sector}</h3>
                    <div className="flex items-center gap-2">
                      {sector.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                      {sector.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                      {sector.trend === 'stable' && <Activity className="w-5 h-5 text-blue-600" />}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Impact Score</span>
                        <span className="font-medium">{sector.impact}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${sector.impact}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Conformité</span>
                        <span className="font-medium">{sector.compliance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${sector.compliance}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{sector.changes}</div>
                      <div className="text-sm text-gray-600">Changements récents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>État de Conformité Global</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <div className="font-medium">Conforme</div>
                        <div className="text-sm text-gray-600">23 réglementations</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">67%</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-blue-600" />
                      <div>
                        <div className="font-medium">En cours</div>
                        <div className="text-sm text-gray-600">8 réglementations</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">23%</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-8 h-8 text-red-600" />
                      <div>
                        <div className="font-medium">Action requise</div>
                        <div className="text-sm text-gray-600">3 réglementations</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-red-600">10%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochaines Échéances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50">
                    <div>
                      <div className="font-medium text-sm">Protection des Données</div>
                      <div className="text-xs text-gray-600">15 juin 2025</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Critique</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <div>
                      <div className="font-medium text-sm">Code du Travail</div>
                      <div className="text-xs text-gray-600">1er mars 2025</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Important</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50">
                    <div>
                      <div className="font-medium text-sm">Réglementation Environnementale</div>
                      <div className="text-xs text-gray-600">30 avril 2025</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Moyen</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
