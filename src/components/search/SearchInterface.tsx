
import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";
import { SearchService, SearchResult } from './SearchService';
import { StandardizedSectionTemplate } from '@/components/common/StandardizedSectionTemplate';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchInterfaceProps {
  placeholder?: string;
  title?: string;
  description?: string;
}

export function SearchInterface({ 
  placeholder = "Rechercher dans tous les contenus...",
  title = "Recherche",
  description = "Trouvez rapidement les informations dont vous avez besoin"
}: SearchInterfaceProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const searchResults = await SearchService.searchAll(query.trim());
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Résultats trouvés", value: results.length, icon: <Search className="w-4 h-4" /> },
    { label: "Temps de recherche", value: "< 1s", icon: <Search className="w-4 h-4" /> }
  ];

  const searchContent = (
    <div className="space-y-4">
      {hasSearched && (
        <>
          <h3 className="text-xl font-semibold text-gray-900">
            {loading ? "Recherche en cours..." : `Résultats de recherche (${results.length})`}
          </h3>
          
          {!loading && results.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Aucun résultat trouvé</p>
                  <p className="text-sm">Essayez avec d'autres mots-clés ou utilisez la recherche avancée</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {results.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={result.type === 'legal_text' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}>
                        {result.type === 'legal_text' ? 'Texte juridique' : 'Procédure'}
                      </Badge>
                      <Badge variant="outline">{result.category}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(result.relevance * 100)}% pertinent
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h4>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {result.institution && (
                        <span>{result.institution}</span>
                      )}
                      <span>Mis à jour: {new Date(result.lastUpdate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Consulter
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Download className="w-4 h-4 mr-1" />
                      Utiliser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );

  return (
    <StandardizedSectionTemplate
      icon={Search}
      title={title}
      description={description}
      section="search-interface"
      searchPlaceholder={placeholder}
      searchContext="search"
      onSearch={handleSearch}
      stats={hasSearched ? stats : []}
      headerVariant="centered"
    >
      {searchContent}
    </StandardizedSectionTemplate>
  );
}
