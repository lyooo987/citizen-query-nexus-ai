
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucideIcon } from 'lucide-react';
import { SmartAutocomplete } from './SmartAutocomplete';

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  onClick: () => void;
}

interface TabSection {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

interface StatCard {
  label: string;
  value: string | number;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

interface UnifiedSectionBaseProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  searchPlaceholder?: string;
  searchContext?: 'search' | 'legal' | 'procedure' | 'general';
  onSearch?: (query: string) => void;
  primaryActions?: ActionButton[];
  secondaryActions?: ActionButton[];
  tabs?: TabSection[];
  stats?: StatCard[];
  children?: React.ReactNode;
}

export function UnifiedSectionBase({
  icon: Icon,
  title,
  description,
  iconColor = "text-teal-600",
  searchPlaceholder = "Rechercher...",
  searchContext = 'general',
  onSearch,
  primaryActions = [],
  secondaryActions = [],
  tabs = [],
  stats = [],
  children
}: UnifiedSectionBaseProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="space-y-6">
      {/* Header unifié */}
      <Card className="border-l-4 border-l-teal-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Icon className={`w-12 h-12 ${iconColor}`} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {primaryActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || 'default'}
                  className="gap-2"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          {stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Barre de recherche unifiée */}
          <div className="flex gap-3">
            <div className="flex-1">
              <SmartAutocomplete
                value={searchQuery}
                onChange={handleSearch}
                placeholder={searchPlaceholder}
                context={searchContext}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {secondaryActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || 'outline'}
                  className="gap-2"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      {tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0]?.id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="secondary" className="ml-1">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
