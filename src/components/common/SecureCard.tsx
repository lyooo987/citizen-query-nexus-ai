
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecureCardProps {
  title: string;
  description?: string;
  status: 'secure' | 'warning' | 'danger';
  score?: number;
  lastUpdate?: string;
  children: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'destructive';
  }>;
}

export function SecureCard({
  title,
  description,
  status,
  score,
  lastUpdate,
  children,
  actions = []
}: SecureCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'secure': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'secure': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'danger': return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge className={getStatusColor()}>
              {status === 'secure' ? 'Sécurisé' : 
               status === 'warning' ? 'Attention' : 'Danger'}
            </Badge>
          </div>
        </div>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
        {score && (
          <div className="text-sm">
            <span className="font-medium">Score de sécurité: </span>
            <span className={score >= 90 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-red-600'}>
              {score}%
            </span>
          </div>
        )}
        {lastUpdate && (
          <p className="text-xs text-gray-500">
            Dernière mise à jour: {lastUpdate}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {children}
        {actions.length > 0 && (
          <div className="flex gap-2 mt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
