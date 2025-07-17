
import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/utils/performance';
import { enhancedCache } from '@/utils/enhancedCache';

interface SearchOptions {
  debounceMs?: number;
  cacheKey?: string;
  cacheTtl?: number;
}

export function useOptimizedSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  options: SearchOptions = {}
) {
  const { debounceMs = 300, cacheKey = 'search', cacheTtl = 300000 } = options;
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useMemo(
    () => debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Vérifier le cache
        const cachedResults = enhancedCache.get(`${cacheKey}_${searchQuery}`) as T[] | null;
        if (cachedResults) {
          setResults(cachedResults);
          setIsLoading(false);
          return;
        }

        // Exécuter la recherche
        const searchResults = await searchFunction(searchQuery);
        
        // Mettre en cache les résultats
        enhancedCache.set(`${cacheKey}_${searchQuery}`, searchResults, cacheTtl);
        
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de recherche');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs),
    [searchFunction, cacheKey, cacheTtl, debounceMs]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearResults: () => setResults([])
  };
}
