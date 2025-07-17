
import React, { useState } from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersApply: (filters: any) => void;
  filterType: 'legal' | 'procedure' | 'general';
}

export function FilterModal({ isOpen, onClose, onFiltersApply, filterType }: FilterModalProps) {
  const [filters, setFilters] = useState({
    keyword: '',
    dateFrom: '',
    dateTo: '',
    category: '',
    status: '',
    domain: '',
    includeArchived: false
  });

  const handleApply = () => {
    onFiltersApply(filters);
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      dateFrom: '',
      dateTo: '',
      category: '',
      status: '',
      domain: '',
      includeArchived: false
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Filtres avancés"
      size="medium"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="keyword">Mot-clé</Label>
          <Input
            id="keyword"
            value={filters.keyword}
            onChange={(e) => setFilters({...filters, keyword: e.target.value})}
            placeholder="Rechercher..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date de début</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTo">Date de fin</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
            />
          </div>
        </div>

        {filterType === 'legal' && (
          <div className="space-y-2">
            <Label>Domaine juridique</Label>
            <Select value={filters.domain} onValueChange={(value) => setFilters({...filters, domain: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Droit civil</SelectItem>
                <SelectItem value="penal">Droit pénal</SelectItem>
                <SelectItem value="commercial">Droit commercial</SelectItem>
                <SelectItem value="administratif">Droit administratif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Statut</Label>
          <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="archived">Archivé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="includeArchived"
            checked={filters.includeArchived}
            onCheckedChange={(checked) => setFilters({...filters, includeArchived: !!checked})}
          />
          <Label htmlFor="includeArchived">Inclure les éléments archivés</Label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleReset}>
          Réinitialiser
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleApply}>
            Appliquer
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
