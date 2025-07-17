
import React from 'react';
import { TabFormField } from './TabFormField';

interface EnhancedTabContentProps {
  tabTitle: string;
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  onFilter?: () => void;
  onSort?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
  onView?: () => void;
  placeholder?: string;
}

export function EnhancedTabContent({
  tabTitle,
  children,
  onSearch,
  onAdd,
  onFilter,
  onSort,
  onExport,
  onRefresh,
  onView,
  placeholder
}: EnhancedTabContentProps) {
  return (
    <div className="space-y-6">
      <TabFormField
        placeholder={placeholder || `Rechercher dans ${tabTitle.toLowerCase()}...`}
        onSearch={onSearch}
        onAdd={onAdd}
        onFilter={onFilter}
        onSort={onSort}
        onExport={onExport}
        onRefresh={onRefresh}
        onView={onView}
        showActions={true}
      />
      {children}
    </div>
  );
}
