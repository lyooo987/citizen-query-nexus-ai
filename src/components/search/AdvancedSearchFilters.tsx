
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedInput } from '@/components/common/EnhancedInput';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Search, Filter, RotateCcw } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface AdvancedSearchFiltersProps {
  onSearch?: (filters: any) => void;
  onReset?: () => void;
}

export function AdvancedSearchFilters({ onSearch, onReset }: AdvancedSearchFiltersProps) {
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    domain: [],
    dateRange: undefined as DateRange | undefined,
    status: '',
    priority: [1, 5],
    tags: []
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    { value: 'legal', label: 'Textes juridiques' },
    { value: 'procedure', label: 'Procédures' },
    { value: 'jurisprudence', label: 'Jurisprudence' },
    { value: 'forms', label: 'Formulaires' }
  ];

  const domains = [
    'Droit civil', 'Droit pénal', 'Droit administratif', 'Droit commercial',
    'Droit du travail', 'Droit fiscal', 'Droit constitutionnel'
  ];

  const statuses = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'pending', label: 'En attente' },
    { value: 'archived', label: 'Archivé' }
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    if (!activeFilters.includes(key) && value) {
      setActiveFilters(prev => [...prev, key]);
    }
  };

  const removeFilter = (key: string) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: key === 'domain' || key === 'tags' ? [] : key === 'dateRange' ? undefined : '' 
    }));
    setActiveFilters(prev => prev.filter(f => f !== key));
  };

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const handleReset = () => {
    setFilters({
      query: '',
      category: '',
      domain: [],
      dateRange: undefined,
      status: '',
      priority: [1, 5],
      tags: []
    });
    setActiveFilters([]);
    onReset?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtres de recherche avancée
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Requête principale */}
        <div>
          <Label htmlFor="search-query">Recherche</Label>
          <EnhancedInput
            id="search-query"
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            placeholder="Mots-clés, termes juridiques..."
            context="search"
            enableVoice={true}
          />
        </div>

        {/* Catégorie */}
        <div>
          <Label>Catégorie</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="legal">Textes juridiques</SelectItem>
              <SelectItem value="procedure">Procédures</SelectItem>
              <SelectItem value="jurisprudence">Jurisprudence</SelectItem>
              <SelectItem value="forms">Formulaires</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Période */}
        <div>
          <Label>Période</Label>
          <DatePickerWithRange
            date={filters.dateRange}
            onDateChange={(dateRange) => handleFilterChange('dateRange', dateRange)}
          />
        </div>

        {/* Domaines */}
        <div>
          <Label>Domaines juridiques</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['Droit civil', 'Droit pénal', 'Droit administratif', 'Droit commercial', 'Droit du travail', 'Droit fiscal', 'Droit constitutionnel'].map(domain => (
              <div key={domain} className="flex items-center space-x-2">
                <Checkbox
                  id={`domain-${domain}`}
                  checked={filters.domain.includes(domain)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleFilterChange('domain', [...filters.domain, domain]);
                    } else {
                      handleFilterChange('domain', filters.domain.filter(d => d !== domain));
                    }
                  }}
                />
                <Label htmlFor={`domain-${domain}`} className="text-sm">
                  {domain}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Statut */}
        <div>
          <Label>Statut</Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
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

        {/* Priorité */}
        <div>
          <Label>Niveau de priorité</Label>
          <div className="mt-2">
            <Slider
              value={filters.priority}
              onValueChange={(value) => handleFilterChange('priority', value)}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Faible ({filters.priority[0]})</span>
              <span>Élevée ({filters.priority[1]})</span>
            </div>
          </div>
        </div>

        {/* Filtres actifs */}
        {activeFilters.length > 0 && (
          <div>
            <Label>Filtres actifs</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
