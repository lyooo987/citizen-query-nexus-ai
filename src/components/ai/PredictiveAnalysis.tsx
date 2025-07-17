
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, BarChart3, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Trend {
  id: string;
  title: string;
  category: string;
  probability: number;
  impact: 'high' | 'medium' | 'low';
  timeline: string;
  description: string;
  confidence: number;
}

interface LegislativeChange {
  id: string;
  title: string;
  type: 'proposition' | 'projet' | 'modification';
  status: string;
  probability: number;
  expectedDate: string;
  affectedSectors: string[];
}

export function PredictiveAnalysis() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [changes, setChanges] = useState<LegislativeChange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données d'analyse prédictive
    setTimeout(() => {
      setTrends([
        {
          id: '1',
          title: 'Renforcement des réglementations environnementales',
          category: 'Environnement',
          probability: 0.87,
          impact: 'high',
          timeline: '6-12 mois',
          description: 'Nouvelles exigences pour les entreprises industrielles',
          confidence: 0.92
        },
        {
          id: '2',
          title: 'Évolution du droit numérique',
          category: 'Technologie',
          probability: 0.76,
          impact: 'medium',
          timeline: '3-6 mois',
          description: 'Adaptation aux nouvelles technologies IA',
          confidence: 0.84
        },
        {
          id: '3',
          title: 'Réformes fiscales sectorielles',
          category: 'Fiscal',
          probability: 0.68,
          impact: 'high',
          timeline: '12-18 mois',
          description: 'Impacts sur les PME et startups',
          confidence: 0.79
        }
      ]);

      setChanges([
        {
          id: '1',
          title: 'Loi sur la transition énergétique - Modification',
          type: 'modification',
          status: 'En discussion',
          probability: 0.82,
          expectedDate: '2024-06-15',
          affectedSectors: ['Énergie', 'Transport', 'Industrie']
        },
        {
          id: '2',
          title: 'Code du travail - Article L1234-5',
          type: 'projet',
          status: 'Première lecture',
          probability: 0.73,
          expectedDate: '2024-09-01',
          affectedSectors: ['RH', 'Social']
        }
      ]);

      setLoading(false);
    }, 1200);
  }, []);

  const trendData = [
    { month: 'Jan', environmental: 65, digital: 45, fiscal: 30 },
    { month: 'Fév', environmental: 72, digital: 52, fiscal: 35 },
    { month: 'Mar', environmental: 78, digital: 58, fiscal: 42 },
    { month: 'Avr', environmental: 85, digital: 65, fiscal: 48 },
    { month: 'Mai', environmental: 87, digital: 76, fiscal: 68 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Tendances Prédictives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="environmental" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="digital" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="fiscal" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Environnement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Numérique</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Fiscal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Changements Législatifs Prévus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {changes.map((change) => (
              <div key={change.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{change.title}</h4>
                  <Badge className="text-xs">
                    {Math.round(change.probability * 100)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{change.status}</span>
                  <span>•</span>
                  <span>{change.expectedDate}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {change.affectedSectors.map((sector) => (
                    <Badge key={sector} variant="secondary" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyse des Tendances Juridiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.map((trend) => (
              <div key={trend.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{trend.title}</h3>
                    <p className="text-gray-600 mt-1">{trend.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getImpactColor(trend.impact)}>
                      {trend.impact.toUpperCase()}
                    </Badge>
                    <div className="text-right text-sm">
                      <div className="font-medium">{Math.round(trend.probability * 100)}%</div>
                      <div className="text-gray-500">probabilité</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {trend.timeline}
                    </span>
                    <Badge variant="outline">{trend.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      Confiance: {Math.round(trend.confidence * 100)}%
                    </span>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
