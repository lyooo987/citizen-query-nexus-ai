
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Tablet, LogOut, Shield, Clock } from 'lucide-react';

interface SessionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  onAction: (action: string, data: any) => void;
}

export function SessionManagementModal({ isOpen, onClose, data, onAction }: SessionManagementModalProps) {
  const [sessions] = useState([
    {
      id: 1,
      device: 'Windows PC - Chrome',
      location: 'Alger, Algeria',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      isCurrent: true,
      deviceType: 'desktop'
    },
    {
      id: 2,
      device: 'iPhone 14 - Safari',
      location: 'Oran, Algeria',
      ip: '192.168.1.101',
      lastActive: '1 hour ago',
      isCurrent: false,
      deviceType: 'mobile'
    },
    {
      id: 3,
      device: 'iPad - Safari',
      location: 'Constantine, Algeria',
      ip: '192.168.1.102',
      lastActive: '2 days ago',
      isCurrent: false,
      deviceType: 'tablet'
    }
  ]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const handleTerminateSession = (sessionId: number) => {
    onAction('terminate', { sessionId });
  };

  const handleTerminateAllOthers = () => {
    const otherSessions = sessions.filter(s => !s.isCurrent);
    onAction('terminateAll', { sessions: otherSessions });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Gestion des sessions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {sessions.length} session(s) active(s)
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleTerminateAllOthers}
              className="text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Terminer les autres
            </Button>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <Card key={session.id} className={session.isCurrent ? 'ring-2 ring-blue-500' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getDeviceIcon(session.deviceType)}
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium flex items-center gap-2">
                          {session.device}
                          {session.isCurrent && (
                            <Badge variant="default" className="text-xs">
                              Session actuelle
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <span>📍 {session.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>🌐 {session.ip}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Dernière activité: {session.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!session.isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <LogOut className="w-4 h-4 mr-1" />
                        Terminer
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 mb-1">Conseils de sécurité</p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Terminez les sessions que vous ne reconnaissez pas</li>
                    <li>• Vérifiez régulièrement vos sessions actives</li>
                    <li>• Utilisez un mot de passe fort et unique</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
