
/**
 * Système de cache multi-niveaux avec intelligence artificielle
 */

interface CacheStrategy {
  name: string;
  shouldCache: (key: string, data: any) => boolean;
  getTTL: (key: string, data: any) => number;
  getPriority: (key: string, data: any) => number;
}

class AdvancedCacheManager {
  private l1Cache = new Map(); // Mémoire rapide
  private l2Cache = new Map(); // Mémoire étendue
  private strategies: CacheStrategy[] = [];
  private accessPatterns = new Map<string, number[]>();
  private hitRatio = { hits: 0, misses: 0 };

  constructor() {
    this.initializeStrategies();
    this.startBackgroundTasks();
  }

  private initializeStrategies() {
    // Stratégie pour les données fréquemment accédées
    this.strategies.push({
      name: 'frequent_access',
      shouldCache: (key: string) => {
        const pattern = this.accessPatterns.get(key) || [];
        return pattern.length > 5;
      },
      getTTL: () => 10 * 60 * 1000, // 10 minutes
      getPriority: (key: string) => {
        const pattern = this.accessPatterns.get(key) || [];
        return pattern.length;
      }
    });

    // Stratégie pour les données de recherche
    this.strategies.push({
      name: 'search_results',
      shouldCache: (key: string) => key.startsWith('search:'),
      getTTL: () => 5 * 60 * 1000, // 5 minutes
      getPriority: () => 8
    });

    // Stratégie pour les métadonnées
    this.strategies.push({
      name: 'metadata',
      shouldCache: (key: string) => key.includes('meta') || key.includes('config'),
      getTTL: () => 30 * 60 * 1000, // 30 minutes
      getPriority: () => 10
    });

    // Stratégie pour les données utilisateur
    this.strategies.push({
      name: 'user_data',
      shouldCache: (key: string) => key.startsWith('user:'),
      getTTL: () => 15 * 60 * 1000, // 15 minutes
      getPriority: () => 9
    });
  }

  private recordAccess(key: string) {
    const now = Date.now();
    const pattern = this.accessPatterns.get(key) || [];
    pattern.push(now);
    
    // Garder seulement les 100 derniers accès
    if (pattern.length > 100) {
      pattern.splice(0, pattern.length - 100);
    }
    
    this.accessPatterns.set(key, pattern);
  }

  private selectStrategy(key: string, data: any): CacheStrategy | null {
    return this.strategies.find(strategy => strategy.shouldCache(key, data)) || null;
  }

  set(key: string, data: any, customTTL?: number): void {
    const strategy = this.selectStrategy(key, data);
    if (!strategy) return;

    const ttl = customTTL || strategy.getTTL(key, data);
    const priority = strategy.getPriority(key, data);
    const expiry = Date.now() + ttl;

    const cacheEntry = {
      data,
      expiry,
      priority,
      strategy: strategy.name,
      accessCount: 0,
      lastAccess: Date.now()
    };

    // Décider du niveau de cache
    if (priority >= 8 || this.l1Cache.size < 50) {
      this.l1Cache.set(key, cacheEntry);
    } else {
      this.l2Cache.set(key, cacheEntry);
    }

    this.recordAccess(key);
  }

  get(key: string): any {
    this.recordAccess(key);

    // Chercher dans L1 d'abord
    let entry = this.l1Cache.get(key);
    let fromL2 = false;

    // Puis dans L2
    if (!entry) {
      entry = this.l2Cache.get(key);
      fromL2 = true;
    }

    if (!entry) {
      this.hitRatio.misses++;
      return null;
    }

    // Vérifier l'expiration
    if (Date.now() > entry.expiry) {
      this.l1Cache.delete(key);
      this.l2Cache.delete(key);
      this.hitRatio.misses++;
      return null;
    }

    // Mettre à jour les statistiques
    entry.accessCount++;
    entry.lastAccess = Date.now();
    this.hitRatio.hits++;

    // Promouvoir de L2 vers L1 si fréquemment accédé
    if (fromL2 && entry.accessCount > 3) {
      this.l2Cache.delete(key);
      if (this.l1Cache.size >= 50) {
        this.evictFromL1();
      }
      this.l1Cache.set(key, entry);
    }

    return entry.data;
  }

  private evictFromL1() {
    let leastValuable = null;
    let leastValue = Infinity;

    for (const [key, entry] of this.l1Cache) {
      const age = Date.now() - entry.lastAccess;
      const value = (entry.priority * entry.accessCount) / Math.log(age + 1);
      
      if (value < leastValue) {
        leastValue = value;
        leastValuable = key;
      }
    }

    if (leastValuable) {
      const entry = this.l1Cache.get(leastValuable);
      this.l1Cache.delete(leastValuable);
      
      // Dégrader vers L2 si toujours valide
      if (entry && Date.now() < entry.expiry) {
        this.l2Cache.set(leastValuable, entry);
      }
    }
  }

  private startBackgroundTasks() {
    // Nettoyage périodique
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // Toutes les 5 minutes

    // Optimisation des patterns
    setInterval(() => {
      this.optimizePatterns();
    }, 15 * 60 * 1000); // Toutes les 15 minutes
  }

  private cleanup() {
    const now = Date.now();
    
    // Nettoyer L1
    for (const [key, entry] of this.l1Cache) {
      if (now > entry.expiry) {
        this.l1Cache.delete(key);
      }
    }

    // Nettoyer L2
    for (const [key, entry] of this.l2Cache) {
      if (now > entry.expiry) {
        this.l2Cache.delete(key);
      }
    }

    // Nettoyer les anciens patterns d'accès
    for (const [key, pattern] of this.accessPatterns) {
      const recentAccess = pattern.filter(timestamp => now - timestamp < 24 * 60 * 60 * 1000);
      if (recentAccess.length === 0) {
        this.accessPatterns.delete(key);
      } else {
        this.accessPatterns.set(key, recentAccess);
      }
    }
  }

  private optimizePatterns() {
    // Analyser les patterns d'accès et ajuster les stratégies
    const frequentKeys = new Map<string, number>();
    
    for (const [key, pattern] of this.accessPatterns) {
      const recentAccess = pattern.filter(timestamp => Date.now() - timestamp < 60 * 60 * 1000);
      if (recentAccess.length >= 10) {
        frequentKeys.set(key, recentAccess.length);
      }
    }

    console.log(`🧠 Cache intelligence: Found ${frequentKeys.size} frequently accessed keys`);
  }

  getStats() {
    const total = this.hitRatio.hits + this.hitRatio.misses;
    const hitRate = total > 0 ? (this.hitRatio.hits / total) * 100 : 0;

    return {
      hitRate,
      l1Size: this.l1Cache.size,
      l2Size: this.l2Cache.size,
      totalPatterns: this.accessPatterns.size,
      strategies: this.strategies.map(s => s.name)
    };
  }

  prefetch(keys: string[], fetchFn: (key: string) => Promise<any>) {
    // Pré-charger les données probablement nécessaires
    keys.forEach(async (key) => {
      if (!this.get(key)) {
        try {
          const data = await fetchFn(key);
          this.set(key, data);
        } catch (error) {
          console.warn(`Prefetch failed for ${key}:`, error);
        }
      }
    });
  }

  clear() {
    this.l1Cache.clear();
    this.l2Cache.clear();
    this.accessPatterns.clear();
    this.hitRatio = { hits: 0, misses: 0 };
  }
}

export const advancedCache = new AdvancedCacheManager();

// Hook React pour le cache avancé
import { useState, useEffect, useCallback } from 'react';

export function useAdvancedCache<T>(
  key: string, 
  fetchFn: () => Promise<T>, 
  dependencies: any[] = []
): { data: T | null; isLoading: boolean; error: Error | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier le cache en premier
      const cached = advancedCache.get(key);
      if (cached) {
        setData(cached);
        setIsLoading(false);
        return;
      }

      // Récupérer les nouvelles données
      const result = await fetchFn();
      advancedCache.set(key, result);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
