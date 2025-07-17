
import React from 'react';
import { LegalTextsFilter } from './LegalTextsFilter';
import { LegalTextsInstitutions } from './LegalTextsInstitutions';
import { LegalTextsTypes } from './LegalTextsTypes';
import { LegalTextsFeatured } from './LegalTextsFeatured';
import { LegalTextsTestimonials } from './LegalTextsTestimonials';
import { LegalTextsContribute } from './LegalTextsContribute';
import { LegalTextsStatistics } from './LegalTextsStatistics';
import { LegalTextsSearchActions } from './LegalTextsSearchActions';
import { LegalTextCard } from './LegalTextCard';
import { LegalTextsEmptyState } from './LegalTextsEmptyState';
import { useLegalTextsData } from './hooks/useLegalTextsData';
import { TabSearchField } from '@/components/common/TabSearchField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LegalTextsCatalogTabProps {
  onAddLegalText?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function LegalTextsCatalogTab({ onAddLegalText, onOpenApprovalQueue }: LegalTextsCatalogTabProps) {
  const {
    filteredTexts,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters
  } = useLegalTextsData();

  const handleFilterChange = (newFilters: { type?: string; status?: string }) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handleOpenApprovalQueue = () => {
    console.log('Opening approval queue...');
    if (onOpenApprovalQueue) {
      onOpenApprovalQueue();
    }
  };

  const handleTabSearch = (query: string) => {
    setSearchTerm(query);
    console.log('Tab search:', query);
  };

  return (
    <div className="space-y-6">
      {/* Nouveau champ de recherche avec reconnaissance vocale */}
      <TabSearchField
        placeholder="Rechercher des textes juridiques..."
        onSearch={handleTabSearch}
        suggestions={[
          "Code civil algérien",
          "Loi sur l'investissement 2022",
          "Décret exécutif",
          "Ordonnance présidentielle",
          "Code de procédure civile",
          "Loi de finances",
          "Code pénal",
          "Code du travail"
        ]}
      />

      {/* Statistiques */}
      <LegalTextsStatistics filteredTexts={filteredTexts} />

      {/* Barre de recherche et boutons d'action avec bouton File d'approbation fonctionnel */}
      <LegalTextsSearchActions
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddLegalText={onAddLegalText}
        onOpenApprovalQueue={handleOpenApprovalQueue}
      />

      {/* Filtre avec onglets */}
      <LegalTextsFilter onFilterChange={handleFilterChange} />

      {/* Liste des textes juridiques filtrés */}
      <div className="space-y-4">
        {filteredTexts.length === 0 ? (
          <LegalTextsEmptyState />
        ) : (
          filteredTexts.map((text) => (
            <LegalTextCard key={text.id} text={text} />
          ))
        )}
      </div>

      {/* Onglets horizontaux pour les nouvelles sections */}
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="types">Types de textes juridiques</TabsTrigger>
          <TabsTrigger value="featured">Textes juridiques en vedette</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages récents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="mt-6">
          <LegalTextsInstitutions />
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <LegalTextsTypes />
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <LegalTextsFeatured />
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <LegalTextsTestimonials />
        </TabsContent>
      </Tabs>

      <LegalTextsContribute />
    </div>
  );
}
