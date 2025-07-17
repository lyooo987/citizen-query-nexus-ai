
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedInput } from "@/components/common/EnhancedInput";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Calendar, Building, Star } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  relevance: number;
  location?: string;
  institution?: string;
  lastUpdate: string;
}

interface UnifiedSearchInterfaceProps {
  searchTypes: Array<{
    id: string;
    label: string;
    placeholder: string;
    filters: Array<{ id: string; label: string; options: string[] }>;
  }>;
  onSearch: (query: string, type: string, filters: Record<string, string>) => void;
  results: SearchResult[];
  loading?: boolean;
}

export function UnifiedSearchInterface({ 
  searchTypes, 
  onSearch, 
  results, 
  loading = false 
}: UnifiedSearchInterfaceProps) {
  const [activeTab, setActiveTab] = useState(searchTypes[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currentSearchType = searchTypes.find(type => type.id === activeTab);

  const handleSearch = () => {
    onSearch(searchQuery, activeTab, filters);
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Search className="w-8 h-8 text-teal-600" />
          Recherche unifiée
        </h2>
        <p className="text-gray-600 text-lg">
          Recherchez dans tous les types de contenus avec des outils avancés
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {searchTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {searchTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recherche {type.label.toLowerCase()}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres avancés
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <EnhancedInput
                    placeholder={type.placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    context="search"
                    enableVoice={true}
                  />
                  <Button 
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? "Recherche..." : "Rechercher"}
                  </Button>
                </div>

                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    {type.filters.map((filter) => (
                      <div key={filter.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {filter.label}
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filters[filter.id] || ""}
                          onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        >
                          <option value="">Tous</option>
                          {filter.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Résultats de recherche */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Résultats de recherche ({results.length})
          </h3>
          
          {results.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{result.type}</Badge>
                      <Badge variant="secondary">{result.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        <span>{Math.round(result.relevance * 100)}% pertinent</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {result.institution && (
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {result.institution}
                        </span>
                      )}
                      {result.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {result.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {result.lastUpdate}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Consulter
                    </Button>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      Utiliser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
