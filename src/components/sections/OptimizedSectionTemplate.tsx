
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { UnifiedSectionBase } from '@/components/common/UnifiedSectionBase';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useGlobalActions } from '@/hooks/useGlobalActions';

interface OptimizedSectionTemplateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  section: string;
  language: string;
  iconColor?: string;
  customActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'destructive' | 'secondary';
  }>;
  children?: React.ReactNode;
}

export function OptimizedSectionTemplate({
  icon,
  title,
  description,
  section,
  language,
  iconColor,
  customActions = [],
  children
}: OptimizedSectionTemplateProps) {
  const { handleError, handleSuccess } = useErrorHandler();
  const actions = useGlobalActions();

  // Actions par défaut basées sur le type de section
  const getDefaultActions = () => {
    const commonActions = [
      {
        label: "Filtrer",
        icon: <span>🔍</span>,
        onClick: () => actions.handleFilter('general'),
        variant: 'outline' as const
      },
      {
        label: "Exporter",
        icon: <span>📤</span>,
        onClick: () => actions.handleExport([], `${section}-export`),
        variant: 'outline' as const
      }
    ];

    const primaryActions = [];

    if (section.includes('enrichment') || section.includes('catalog')) {
      primaryActions.push({
        label: "Nouveau",
        icon: <span>➕</span>,
        onClick: () => {
          handleSuccess("Fonctionnalité disponible", "Utilisez les actions spécifiques à chaque section.");
        }
      });
    }

    return { primaryActions, secondaryActions: commonActions };
  };

  const { primaryActions, secondaryActions } = getDefaultActions();

  const handleSearch = (query: string) => {
    console.log(`Recherche dans ${section}:`, query);
    // Implémentation de la recherche spécifique à chaque section
  };

  return (
    <UnifiedSectionBase
      icon={icon}
      title={title}
      description={description}
      iconColor={iconColor}
      searchPlaceholder={`Rechercher dans ${title.toLowerCase()}...`}
      searchContext={section.includes('legal') ? 'legal' : section.includes('procedure') ? 'procedure' : 'general'}
      onSearch={handleSearch}
      primaryActions={[...primaryActions, ...customActions.filter(a => a.variant === 'default' || !a.variant)]}
      secondaryActions={[...secondaryActions, ...customActions.filter(a => a.variant === 'outline')]}
    >
      {children}
    </UnifiedSectionBase>
  );
}
