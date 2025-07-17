
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TabFormField } from './TabFormField';

interface TabData {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

interface SectionTabsProps {
  tabs: TabData[];
  children?: React.ReactNode;
}

export function SectionTabs({ tabs, children }: SectionTabsProps) {
  if (tabs.length === 0) {
    return (
      <div className="space-y-6">
        <TabFormField
          placeholder="Rechercher dans cette section..."
          showActions={true}
        />
        {children}
      </div>
    );
  }

  return (
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
        <TabsContent key={tab.id} value={tab.id} className="mt-6 space-y-6">
          <TabFormField
            placeholder={`Rechercher dans ${tab.label.toLowerCase()}...`}
            showActions={true}
          />
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
