
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { advancedCache } from '@/utils/advancedCaching';
import { automatedTestRunner, useTestRunner } from '@/utils/testing';
import { securityMonitor } from '@/utils/enhancedSecurity';
import { 
  Activity, 
  Zap, 
  Shield, 
  TestTube, 
  BarChart3, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database
} from 'lucide-react';

export function EnhancedPerformanceDashboard() {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [cacheStats, setCacheStats] = useState<any>(null);
  const [securityReport, setSecurityReport] = useState<any>(null);
  const { isRunning, report, runTests } = useTestRunner();

  useEffect(() => {
    const updateData = () => {
      setPerformanceData(performanceMonitor.getVitalMetrics());
      setCacheStats(advancedCache.getStats());
      setSecurityReport(securityMonitor.getSecurityReport());
    };

    updateData();
    const interval = setInterval(updateData, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getHealthScore = () => {
    if (!performanceData || !cacheStats || !report) return 0;
    
    let score = 100;
    
    // Performance penalties
    if (performanceData.ttfb > 1000) score -= 20;
    if (performanceData.dcl > 5000) score -= 15;
    if (cacheStats.hitRate < 50) score -= 10;
    
    // Test failures penalty
    if (report) {
      score -= (report.summary.failed * 5);
      score -= (report.summary.critical * 15);
    }
    
    // Security issues penalty
    if (securityReport && securityReport.last24h > 10) score -= 10;
    
    return Math.max(0, score);
  };

  const healthScore = getHealthScore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Tableau de bord des performances
        </h2>
        <div className="flex items-center gap-3">
          <Badge 
            variant={healthScore >= 80 ? "default" : healthScore >= 60 ? "secondary" : "destructive"}
            className="px-3 py-1"
          >
            Score de santé: {healthScore}%
          </Badge>
          <Button onClick={() => window.location.reload()} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Score de santé global */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Santé globale du système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={healthScore} className="w-full h-3" />
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {performanceData?.ttfb || 0}ms
                </div>
                <div className="text-xs text-gray-600">TTFB</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {cacheStats?.hitRate?.toFixed(1) || 0}%
                </div>
                <div className="text-xs text-gray-600">Cache Hit Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {report?.summary.passed || 0}/{report?.summary.total || 0}
                </div>
                <div className="text-xs text-gray-600">Tests passés</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {securityReport?.last24h || 0}
                </div>
                <div className="text-xs text-gray-600">Événements sécurité</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="cache" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Cache
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="tests" className="flex items-center gap-2">
            <TestTube className="w-4 h-4" />
            Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          {performanceData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Métriques vitales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to First Byte</span>
                    <Badge variant={performanceData.ttfb < 500 ? "default" : "destructive"}>
                      {performanceData.ttfb}ms
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DOM Content Loaded</span>
                    <Badge variant={performanceData.dcl < 3000 ? "default" : "destructive"}>
                      {performanceData.dcl}ms
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Load Complete</span>
                    <Badge variant={performanceData.loadComplete < 5000 ? "default" : "destructive"}>
                      {performanceData.loadComplete}ms
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {performanceData.memoryUsage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Utilisation mémoire</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilisé: {performanceData.memoryUsage.used}MB</span>
                        <span>Limite: {performanceData.memoryUsage.limit}MB</span>
                      </div>
                      <Progress 
                        value={(performanceData.memoryUsage.used / performanceData.memoryUsage.limit) * 100} 
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cache" className="space-y-4">
          {cacheStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistiques du cache</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taux de réussite</span>
                    <Badge variant={cacheStats.hitRate > 70 ? "default" : "secondary"}>
                      {cacheStats.hitRate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cache L1</span>
                    <span className="text-sm font-mono">{cacheStats.l1Size} entrées</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cache L2</span>
                    <span className="text-sm font-mono">{cacheStats.l2Size} entrées</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Patterns d'accès</span>
                    <span className="text-sm font-mono">{cacheStats.totalPatterns}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stratégies actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cacheStats.strategies.map((strategy: string) => (
                      <Badge key={strategy} variant="outline" className="text-xs">
                        {strategy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          {securityReport && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Événements de sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dernières 24h</span>
                    <Badge variant={securityReport.last24h > 5 ? "destructive" : "default"}>
                      {securityReport.last24h}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total événements</span>
                    <span className="text-sm font-mono">{securityReport.totalEvents}</span>
                  </div>
                </CardContent>
              </Card>

              {securityReport.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Recommandations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {securityReport.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tests automatisés</h3>
            <Button 
              onClick={() => runTests()} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <TestTube className="w-4 h-4" />
              )}
              {isRunning ? 'Tests en cours...' : 'Lancer les tests'}
            </Button>
          </div>

          {report && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Résumé des tests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Tests réussis
                    </span>
                    <Badge variant="default">{report.summary.passed}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      Tests échoués
                    </span>
                    <Badge variant="destructive">{report.summary.failed}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-orange-600" />
                      Critiques
                    </span>
                    <Badge variant="destructive">{report.summary.critical}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suites de tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {report.suites.map((suite: any) => (
                      <div key={suite.name} className="flex justify-between items-center">
                        <span className="text-sm">{suite.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={suite.failed === 0 ? "default" : "destructive"} className="text-xs">
                            {suite.passed}/{suite.passed + suite.failed}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {suite.duration.toFixed(0)}ms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {report?.criticalFailures.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Échecs critiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {report.criticalFailures.map((failure: any, index: number) => (
                    <div key={index} className="text-sm text-red-700">
                      <span className="font-medium">{failure.suite}</span> - {failure.test}: {failure.message}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
