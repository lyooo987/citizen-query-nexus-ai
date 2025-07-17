
import { useState } from "react";
import { Star } from "lucide-react";
import { SearchFilter } from "./saved-searches/SearchFilter";
import { StatisticsCards } from "./saved-searches/StatisticsCards";
import { SavedSearchCard } from "./saved-searches/SavedSearchCard";
import { EmptyState } from "./saved-searches/EmptyState";
import { savedSearches } from "./saved-searches/mockData";

export function SavedSearchesEnhanced() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSearches = savedSearches.filter(search =>
    search.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    search.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    search.filters.some(filter => filter.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Star className="w-8 h-8 text-yellow-500" />
          Recherches Sauvegardées
        </h2>
        <p className="text-gray-600 text-lg">
          Accédez rapidement à vos recherches juridiques algériennes précédentes
        </p>
      </div>

      <SearchFilter 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <StatisticsCards savedSearches={savedSearches} />

      <div className="space-y-4">
        {filteredSearches.length > 0 ? (
          filteredSearches.map((search) => (
            <SavedSearchCard key={search.id} search={search} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
