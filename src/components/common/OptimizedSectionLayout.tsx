import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { UnifiedSectionHeader } from './UnifiedSectionHeader';
import { SectionSearchBar } from './SectionSearchBar';
import { SectionTabs } from './SectionTabs';
import { SectionStats } from './SectionStats';

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

interface OptimizedSectionLayoutProps {
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
  showSearchBar?: boolean;
  showStats?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function OptimizedSectionLayout({
  icon,
  title,
  description,
  searchPlaceholder = "Rechercher...",
  searchContext = 'general',
  onSearch,
  primaryActions = [],
  secondaryActions = [],
  tabs = [],
  stats = [],
  showSearchBar = true,
  showStats = true,
  children,
  className = ""
}: OptimizedSectionLayoutProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* En-tête de section unifié */}
      <UnifiedSectionHeader
        icon={icon}
        title={title}
        description={description}
      >
        {primaryActions.length > 0 && (
          <div className="flex gap-2 mt-4">
            {primaryActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                  ${action.variant === 'outline' 
                    ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50' 
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                  }
                  ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </UnifiedSectionHeader>

      {/* Statistiques si activées */}
      {showStats && stats.length > 0 && (
        <SectionStats stats={stats} />
      )}

      {/* Barre de recherche si activée */}
      {showSearchBar && (
        <SectionSearchBar
          searchQuery={searchQuery}
          searchPlaceholder={searchPlaceholder}
          searchContext={searchContext}
          onSearch={handleSearch}
          secondaryActions={secondaryActions}
        />
      )}

      {/* Onglets ou contenu */}
      {tabs.length > 0 ? (
        <SectionTabs tabs={tabs}>
          {children}
        </SectionTabs>
      ) : (
        <Card>
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      )}
    </div>
  );
}