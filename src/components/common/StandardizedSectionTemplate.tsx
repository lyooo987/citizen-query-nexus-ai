
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { SectionStats } from './SectionStats';
import { SectionSearchBar } from './SectionSearchBar';
import { SectionTabs } from './SectionTabs';

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

interface StandardizedSectionTemplateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  section: string;
  searchPlaceholder?: string;
  searchContext?: 'search' | 'legal' | 'procedure' | 'general';
  onSearch?: (query: string) => void;
  primaryActions?: ActionButton[];
  secondaryActions?: ActionButton[];
  tabs?: TabData[];
  stats?: StatCard[];
  headerVariant?: 'default' | 'centered';
  children?: React.ReactNode;
}

export function StandardizedSectionTemplate({
  icon,
  title,
  description,
  section,
  searchPlaceholder = "Rechercher...",
  searchContext = 'general',
  onSearch,
  primaryActions = [],
  secondaryActions = [],
  tabs = [],
  stats = [],
  headerVariant = 'default',
  children
}: StandardizedSectionTemplateProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={icon}
        title={title}
        description={description}
        primaryActions={primaryActions}
        headerVariant={headerVariant}
      />

      <SectionStats stats={stats} />

      <SectionSearchBar
        searchQuery={searchQuery}
        searchPlaceholder={searchPlaceholder}
        searchContext={searchContext}
        onSearch={handleSearch}
        secondaryActions={secondaryActions}
      />

      <SectionTabs tabs={tabs}>
        {children}
      </SectionTabs>
    </div>
  );
}
