
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  disabled?: boolean;
}

interface TabData {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

interface StatCard {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
}

interface OptimizedSectionTemplateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  searchPlaceholder?: string;
  searchContext?: 'search' | 'legal' | 'procedure' | 'general';
  onSearch?: (query: string) => void;
  primaryActions?: ActionButton[];
  secondaryActions?: ActionButton[];
  tabs?: TabData[];
  stats?: StatCard[];
  children?: React.ReactNode;
}

export function OptimizedSectionTemplate({
  icon: Icon,
  title,
  description,
  searchPlaceholder = "Rechercher...",
  searchContext = 'general',
  onSearch,
  primaryActions = [],
  secondaryActions = [],
  tabs = [],
  stats = [],
  children
}: OptimizedSectionTemplateProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="space-y-6">
      {/* Header unifié avec tailles réduites */}
      <Card className="mb-6 border-l-4 border-l-teal-500">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Icon className="w-12 h-12 text-teal-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            {primaryActions.length > 0 && (
              <div className="flex gap-2">
                {primaryActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.onClick}
                    variant={action.variant || 'default'}
                    disabled={action.disabled}
                    className="gap-2"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  {stat.icon && (
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {stat.icon}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Interface de recherche */}
      <Card>
        <CardContent className="pt-6">
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
                  disabled={action.disabled}
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

      {/* Contenu avec onglets ou direct */}
      {tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0]?.id} className="w-full">
          <TabsList className={`grid w-full ${tabs.length <= 4 ? `grid-cols-${tabs.length}` : 'grid-cols-4'}`}>
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
        children
      )}
    </div>
  );
}
