
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { securityMonitor } from '@/utils/unifiedSecurity';
import { Shield, AlertTriangle, Activity, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export function SecurityMonitor() {
  const { userRole } = useAuth();
  const [report, setReport] = useState(securityMonitor.getSecurityReport());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setReport(securityMonitor.getSecurityReport());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Only show to admins
  if (userRole !== 'admin') {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="shadow-lg"
        >
          <Shield className="w-4 h-4 mr-2" />
          Sécurité
          {report.last24h > 0 && (
            <Badge variant="destructive" className="ml-2">
              {report.last24h}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Monitoring Sécurité
          </CardTitle>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
          >
            <EyeOff className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Événements (24h):</span>
            <Badge variant={report.last24h > 10 ? "destructive" : "secondary"}>
              {report.last24h}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total événements:</span>
            <Badge variant="outline">{report.totalEvents}</Badge>
          </div>

          {Object.entries(report.threatTypes).length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Types de menaces:</span>
              {Object.entries(report.threatTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between text-xs">
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                  <Badge variant="destructive" className="text-xs">
                    {String(count)}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {report.recommendations.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-orange-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Recommandations:
              </span>
              {report.recommendations.map((rec, index) => (
                <p key={index} className="text-xs text-gray-600">
                  • {rec}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center text-xs text-gray-500">
            <Activity className="w-3 h-3 mr-1" />
            Mis à jour il y a {new Date().toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
