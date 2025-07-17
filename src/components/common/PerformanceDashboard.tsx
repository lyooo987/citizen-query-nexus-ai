
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { performanceMonitor } from "@/utils/performanceMonitor";
import { enhancedCache } from "@/utils/enhancedCache";
import { Activity, Zap, Database, Clock, RefreshCw } from "lucide-react";

export function PerformanceDashboard() {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [cacheStats, setCacheStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    
    try {
      // Récupérer les données de performance
      const perfReport = performanceMonitor.getPerformanceReport();
      const cacheInfo = enhancedCache.getStats();
      
      setPerformanceData(perfReport);
      setCacheStats(cacheInfo);
    } catch (error) {
      console.error('Erreur lors du chargement des données de performance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!performanceData || !cacheStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-teal-600" />
          <p>Chargement des métriques de performance...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const performanceScore = Math.round(
    ((performanceData.vitals.ttfb < 500 ? 25 : 0) +
    (performanceData.vitals.dcl < 3000 ? 25 : 0) +
    (performanceData.slowOperations.length < 5 ? 25 : 0) +
    (cacheStats.hitRate > 70 ? 25 : 0))
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de bord des performances</h2>
          <p className="text-gray-600">Surveillance en temps réel des performances de l'application</p>
        </div>
        <Button 
          onClick={loadData}
          disabled={isLoading}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Score global */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Score de performance global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className={`text-3xl font-bold ${getScoreColor(performanceScore)}`}>
                {performanceScore}%
              </div>
              <div className="text-sm text-gray-600">Performance globale</div>
            </div>
            <Badge className={
              performanceScore >= 90 ? "bg-green-100 text-green-800" :
              performanceScore >= 70 ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }>
              {performanceScore >= 90 ? "Excellent" :
               performanceScore >= 70 ? "Bon" : "À améliorer"}
            </Badge>
          </div>
          <Progress value={performanceScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Métriques vitales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-sm">TTFB</h4>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(performanceData.vitals.ttfb)}ms
            </div>
            <div className="text-xs text-gray-500">Time to First Byte</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-sm">DCL</h4>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(performanceData.vitals.dcl)}ms
            </div>
            <div className="text-xs text-gray-500">DOM Content Loaded</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-sm">Cache</h4>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(cacheStats.hitRate)}%
            </div>
            <div className="text-xs text-gray-500">Taux de réussite</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-sm">Mémoire</h4>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {performanceData.vitals.memoryUsage ? 
                `${performanceData.vitals.memoryUsage.used}MB` : 
                'N/A'
              }
            </div>
            <div className="text-xs text-gray-500">Utilisation</div>
          </CardContent>
        </Card>
      </div>

      {/* Opérations lentes */}
      {performanceData.slowOperations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Opérations lentes détectées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {performanceData.slowOperations.slice(0, 5).map((op: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div>
                    <div className="font-semibold text-sm">{op.name}</div>
                    <div className="text-xs text-gray-500">{op.category}</div>
                  </div>
                  <Badge variant="destructive">
                    {Math.round(op.value)}ms
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommandations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations d'optimisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {performanceData.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                <Activity className="w-4 h-4 text-blue-600 mt-0.5" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
