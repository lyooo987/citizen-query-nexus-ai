
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badges?: Array<{
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg';
    disabled?: boolean;
  }>;
  metadata?: Array<{
    label: string;
    value: string | number;
    icon?: LucideIcon;
  }>;
  className?: string;
  children?: React.ReactNode;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  badges = [],
  actions = [],
  metadata = [],
  className = '',
  children
}) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-2">
              {Icon && <Icon className="w-5 h-5 text-teal-600" />}
              {title}
            </CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
            {badges.length > 0 && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    variant={badge.variant || 'outline'}
                    className={badge.className}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      {(metadata.length > 0 || children || actions.length > 0) && (
        <CardContent>
          {metadata.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {metadata.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {item.icon && <item.icon className="w-4 h-4 text-gray-500" />}
                    <div className="text-lg font-bold text-teal-600">{item.value}</div>
                  </div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {children}
          
          {actions.length > 0 && (
            <div className="flex justify-end gap-2 mt-4">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size={action.size || 'sm'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={action.variant === 'default' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
