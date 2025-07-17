
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SmartAutocomplete } from './SmartAutocomplete';

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
}

interface SectionSearchBarProps {
  searchQuery: string;
  searchPlaceholder: string;
  searchContext: 'search' | 'legal' | 'procedure' | 'general';
  onSearch: (query: string) => void;
  secondaryActions: ActionButton[];
}

export function SectionSearchBar({
  searchQuery,
  searchPlaceholder,
  searchContext,
  onSearch,
  secondaryActions
}: SectionSearchBarProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <SmartAutocomplete
              value={searchQuery}
              onChange={onSearch}
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
  );
}
