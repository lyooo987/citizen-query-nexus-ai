
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, Download, Share } from 'lucide-react';

interface ConsolidatedItem {
  id: number;
  title: string;
  type: string;
  category: string;
  lastUpdate: string;
  status: string;
  metrics: Array<{
    label: string;
    value: string;
    color: string;
  }>;
}

interface ConsolidatedSectionLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  searchPlaceholder: string;
  items: ConsolidatedItem[];
  statistics: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  onSearch: (query: string) => void;
  onFilter: () => void;
  onItemAction: (itemId: number, action: string) => void;
}

export function ConsolidatedSectionLayout({
  title,
  description,
  icon,
  iconColor,
  searchPlaceholder,
  items,
  statistics,
  onSearch,
  onFilter,
  onItemAction
}: ConsolidatedSectionLayoutProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${iconColor}`}>
              {icon}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={onFilter}>
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Items Grid */}
      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Item Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{item.type}</Badge>
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge 
                          className={
                            item.status === 'À jour' || item.status === 'Validée' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-lg font-bold ${metric.color}`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500">
                    Dernière mise à jour : {item.lastUpdate}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => onItemAction(item.id, 'view')}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Consulter
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onItemAction(item.id, 'download')}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onItemAction(item.id, 'share')}
                  >
                    <Share className="w-4 h-4 mr-1" />
                    Partager
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
