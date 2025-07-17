
import React from 'react';
import { ComparisonModal } from '../ComparisonModal';
import { FilterModal } from '../FilterModal';
import { AdvancedSearchModal } from '../AdvancedSearchModal';
import { GeolocationSearchModal } from '../GeolocationSearchModal';

interface SearchModalGroupProps {
  modals: any;
  closeModal: (modalName: string) => void;
}

export function SearchModalGroup({ modals, closeModal }: SearchModalGroupProps) {
  return (
    <>
      <ComparisonModal
        isOpen={modals.comparison.isOpen}
        onClose={() => closeModal('comparison')}
        items={modals.comparison.data}
      />

      <FilterModal
        isOpen={modals.filter.isOpen}
        onClose={() => closeModal('filter')}
        onFiltersApply={(filters) => {
          console.log('Filters applied:', filters);
          closeModal('filter');
        }}
        filterType={modals.filter.type}
      />

      <AdvancedSearchModal
        isOpen={modals.advancedSearch.isOpen}
        onClose={() => closeModal('advancedSearch')}
        onSearch={(criteria) => {
          console.log('Advanced search:', criteria);
          closeModal('advancedSearch');
        }}
      />

      <GeolocationSearchModal
        isOpen={modals.geolocationSearch.isOpen}
        onClose={() => closeModal('geolocationSearch')}
        onLocationSelect={(location) => {
          console.log('Location selected:', location);
          closeModal('geolocationSearch');
        }}
      />
    </>
  );
}
