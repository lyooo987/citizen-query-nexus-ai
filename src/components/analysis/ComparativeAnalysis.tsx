
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitCompareArrows, Play, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const comparisonData = [
  { metric: 'Performance', periode1: 85, periode2: 92, difference: 7 },
  { metric: 'Utilisation', periode1: 78, periode2: 85, difference: 7 },
  { metric: 'Satisfaction', periode1: 90, periode2: 94, difference: 4 },
  { metric: 'Conformité', periode1: 88, periode2: 91, difference: 3 },
  { metric: 'Efficacité', periode1: 82, periode2: 89, difference: 7 },
  { metric: 'Qualité', periode1: 95, periode2: 97, difference: 2 }
];

const trendData = [
  { month: 'Jan', q1: 85, q4: 78 },
  { month: 'Fév', q1: 88, q4: 82 },
  { month: 'Mar', q1: 92, q4: 85 },
  { month: 'Avr', q1: 87, q4: 88 },
  { month: 'Mai', q1: 94, q4: 91 },
  { month: 'Jun', q1: 91, q4: 89 }
];

export function ComparativeAnalysis() {
  const [period1, setPeriod1] = useState('q1-2024');
  const [period2, setPeriod2] = useState('q4-2024');
  const [comparisonType, setComparisonType] = useState('periods');
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({
    Performance: true,
    Utilisation: true,
    Satisfaction: true,
    Conformité: true,
    Efficacité: true,
    Qualité: true,
    'Temps de réponse': false,
    'Taux de succès': false
  });

  const handleMetricChange = (metric: string, checked: boolean) => {
    setSelectedMetrics(prev => ({ ...prev, [metric]: checked }));
  };

  const handleStartComparison = () => {
    console.log('Lancement de la comparaison:', { comparisonType, period1, period2, selectedMetrics });
    setAnalysisStarted(true);
    
    // Simulation d'analyse IA
    setTimeout(() => {
      console.log('Analyse comparative terminée');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompareArrows className="w-5 h-5 text-purple-600" />
            Analyse Comparative
          </CardTitle>
          <CardDescription>
            Comparez les performances entre différentes périodes avec l'aide de l'IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration de la comparaison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de comparaison</label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="periods">Périodes</SelectItem>
                  <SelectItem value="departments">Départements</SelectItem>
                  <SelectItem value="metrics">Métriques</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période 1</label>
              <Select value={period1} onValueChange={setPeriod1}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner période 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période 2</label>
              <Select value={period2} onValueChange={setPeriod2}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner période 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bouton de lancement fonctionnel */}
          <div className="text-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700" 
              size="lg"
              onClick={handleStartComparison}
              disabled={analysisStarted}
            >
              <Play className="w-5 h-5 mr-2" />
              {analysisStarted ? 'Analyse en cours...' : 'Lancer la comparaison'}
            </Button>
          </div>

          {/* Métriques à comparer avec fonctionnalité */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métriques à comparer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(selectedMetrics).map(([metric, checked]) => (
                  <div key={metric} className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={metric} 
                      checked={checked}
                      onChange={(e) => handleMetricChange(metric, e.target.checked)}
                      className="rounded" 
                    />
                    <label htmlFor={metric} className="text-sm">{metric}</label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Résultats de la comparaison */}
          {analysisStarted && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Résultats de la Comparaison</CardTitle>
                  <CardDescription>
                    Comparaison entre {period1.toUpperCase()} et {period2.toUpperCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="periode1" fill="#3b82f6" name={period1.toUpperCase()} />
                        <Bar dataKey="periode2" fill="#10b981" name={period2.toUpperCase()} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Évolution Temporelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="q1" stroke="#3b82f6" strokeWidth={2} name="Q1 2024" />
                        <Line type="monotone" dataKey="q4" stroke="#10b981" strokeWidth={2} name="Q4 2024" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analyse des Écarts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{item.metric}</span>
                        <div className="flex items-center gap-2">
                          {item.difference > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={item.difference > 0 ? 'text-green-600' : 'text-red-600'}>
                            {item.difference > 0 ? '+' : ''}{item.difference}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
