
/**
 * Gestionnaire de cache unifié et centralisé
 * Consolide tous les systèmes de cache en une solution cohérente
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
  accessCount: number;
  lastAccess: number;
  priority: number;
  size: number;
  tags: string[];
  compressed: boolean;
}

interface CacheStrategy {
  name: string;
  shouldCache: (key: string, data: any, context?: string) => boolean;
  getTTL: (key: string, data: any, context?: string) => number;
  getPriority: (key: string, data: any, context?: string) => number;
  getTags: (key: string, data: any, context?: string) => string[];
}

interface CacheStats {
  hits: number;
  misses: number;
  totalSize: number;
  entries: number;
  hitRate: number;
  averageAccessTime: number;
  memoryUsage: number;
  compressionRatio: number;
}

interface CacheConfig {
  maxSize?: number;
  maxMemoryMB?: number;
  defaultTTL?: number;
  compressionThreshold?: number;
  enableCompression?: boolean;
  enablePredictive?: boolean;
  enableAnalytics?: boolean;
}

class UnifiedCacheManager<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    totalSize: 0,
    entries: 0,
    hitRate: 0,
    averageAccessTime: 0,
    memoryUsage: 0,
    compressionRatio: 0
  };
  
  private strategies: CacheStrategy[] = [];
  private accessPatterns = new Map<string, number[]>();
  private predictivePatterns = new Map<string, string[]>();
  private config: Required<CacheConfig>;
  
  constructor(config: CacheConfig = {}) {
    this.config = {
      maxSize: config.maxSize || 500,
      maxMemoryMB: config.maxMemoryMB || 100,
      defaultTTL: config.defaultTTL || 600000, // 10 minutes
      compressionThreshold: config.compressionThreshold || 1000,
      enableCompression: config.enableCompression !== false,
      enablePredictive: config.enablePredictive !== false,
      enableAnalytics: config.enableAnalytics !== false
    };

    this.initializeStrategies();
    this.startBackgroundTasks();
  }

  private initializeStrategies() {
    // Stratégie pour les données fréquemment accédées
    this.strategies.push({
      name: 'frequent_access',
      shouldCache: (key: string) => {
        const pattern = this.accessPatterns.get(key) || [];
        return pattern.length > 3;
      },
      getTTL: () => 15 * 60 * 1000, // 15 minutes
      getPriority: (key: string) => {
        const pattern = this.accessPatterns.get(key) || [];
        return Math.min(pattern.length, 10);
      },
      getTags: () => ['frequent']
    });

    // Stratégie pour les recherches
    this.strategies.push({
      name: 'search_results',
      shouldCache: (key: string) => key.startsWith('search:') || key.includes('query'),
      getTTL: () => 5 * 60 * 1000, // 5 minutes
      getPriority: () => 7,
      getTags: (key: string) => ['search', key.includes('legal') ? 'legal' : 'general']
    });

    // Stratégie pour les métadonnées et configuration
    this.strategies.push({
      name: 'metadata',
      shouldCache: (key: string) => 
        key.includes('meta') || 
        key.includes('config') || 
        key.includes('settings'),
      getTTL: () => 30 * 60 * 1000, // 30 minutes
      getPriority: () => 9,
      getTags: () => ['metadata', 'config']
    });

    // Stratégie pour les données utilisateur
    this.strategies.push({
      name: 'user_data',
      shouldCache: (key: string) => key.startsWith('user:') || key.includes('profile'),
      getTTL: () => 20 * 60 * 1000, // 20 minutes
      getPriority: () => 8,
      getTags: (key: string) => ['user', key.includes('profile') ? 'profile' : 'data']
    });

    // Stratégie pour les contenus juridiques
    this.strategies.push({
      name: 'legal_content',
      shouldCache: (key: string, data: any, context?: string) => 
        context === 'legal' || 
        key.includes('legal') || 
        key.includes('procedure') ||
        key.includes('text'),
      getTTL: () => 60 * 60 * 1000, // 1 heure
      getPriority: () => 9,
      getTags: (key: string, data: any, context?: string) => {
        const tags = ['legal'];
        if (key.includes('procedure')) tags.push('procedure');
        if (key.includes('text')) tags.push('text');
        if (context) tags.push(context);
        return tags;
      }
    });
  }

  // ===== MÉTHODES PRINCIPALES =====

  set(key: string, data: T, customTTL?: number, context?: string): void {
    const strategy = this.selectStrategy(key, data, context);
    if (!strategy) {
      console.warn(`No cache strategy found for key: ${key}`);
      return;
    }

    const size = this.calculateSize(data);
    
    // Vérifier si on a assez d'espace
    while (this.needsEviction(size)) {
      this.evictLeastValuable();
    }

    const ttl = customTTL || strategy.getTTL(key, data, context);
    const priority = strategy.getPriority(key, data, context);
    const tags = strategy.getTags(key, data, context);
    const shouldCompress = this.config.enableCompression && size > this.config.compressionThreshold;

    const entry: CacheEntry<T> = {
      data: shouldCompress ? this.compress(data) : data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl,
      accessCount: 0,
      lastAccess: Date.now(),
      priority,
      size,
      tags,
      compressed: shouldCompress
    };

    this.cache.set(key, entry);
    this.stats.totalSize += size;
    this.stats.entries = this.cache.size;
    
    this.recordAccess(key);
    this.updatePredictivePatterns(key);

    if (this.config.enableAnalytics) {
      this.logCacheOperation('set', key, { strategy: strategy.name, size, ttl });
    }
  }

  get(key: string): T | null {
    const startTime = performance.now();
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      this.updateAverageAccessTime(performance.now() - startTime);
      return null;
    }

    // Vérifier l'expiration
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.stats.totalSize -= entry.size;
      this.stats.entries = this.cache.size;
      this.stats.misses++;
      this.updateAverageAccessTime(performance.now() - startTime);
      return null;
    }

    // Mettre à jour les statistiques d'accès
    entry.accessCount++;
    entry.lastAccess = Date.now();
    this.stats.hits++;
    this.updateAverageAccessTime(performance.now() - startTime);
    this.updateHitRate();

    this.recordAccess(key);

    // Pré-charger les données prédites si activé
    if (this.config.enablePredictive) {
      this.predictivePreload(key);
    }

    if (this.config.enableAnalytics) {
      this.logCacheOperation('get', key, { hit: true, accessCount: entry.accessCount });
    }

    return entry.compressed ? this.decompress(entry.data) : entry.data;
  }

  // ===== MÉTHODES DE GESTION =====

  invalidate(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      this.cache.delete(key);
      this.stats.totalSize -= entry.size;
      this.stats.entries = this.cache.size;
      return true;
    }
    return false;
  }

  invalidateByTag(tag: string): number {
    let count = 0;
    for (const [key, entry] of this.cache) {
      if (entry.tags.includes(tag)) {
        this.cache.delete(key);
        this.stats.totalSize -= entry.size;
        count++;
      }
    }
    this.stats.entries = this.cache.size;
    return count;
  }

  invalidateByPattern(pattern: RegExp): number {
    let count = 0;
    for (const [key, entry] of this.cache) {
      if (pattern.test(key)) {
        this.cache.delete(key);
        this.stats.totalSize -= entry.size;
        count++;
      }
    }
    this.stats.entries = this.cache.size;
    return count;
  }

  clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      totalSize: 0,
      entries: 0,
      hitRate: 0,
      averageAccessTime: 0,
      memoryUsage: 0,
      compressionRatio: 0
    };
    this.accessPatterns.clear();
    this.predictivePatterns.clear();
  }

  // ===== MÉTHODES UTILITAIRES =====

  private selectStrategy(key: string, data: T, context?: string): CacheStrategy | null {
    return this.strategies.find(strategy => strategy.shouldCache(key, data, context)) || null;
  }

  private calculateSize(data: T): number {
    return JSON.stringify(data).length * 2; // Approximation en bytes
  }

  private needsEviction(newSize: number): boolean {
    return (
      this.cache.size >= this.config.maxSize ||
      this.stats.totalSize + newSize > this.config.maxMemoryMB * 1024 * 1024
    );
  }

  private evictLeastValuable(): void {
    let leastValuableKey = '';
    let leastValue = Infinity;

    for (const [key, entry] of this.cache) {
      const age = Date.now() - entry.lastAccess;
      const score = (entry.priority * entry.accessCount) / Math.log(age + 1);
      
      if (score < leastValue) {
        leastValue = score;
        leastValuableKey = key;
      }
    }

    if (leastValuableKey) {
      const entry = this.cache.get(leastValuableKey);
      if (entry) {
        this.stats.totalSize -= entry.size;
        this.cache.delete(leastValuableKey);
        this.stats.entries = this.cache.size;
      }
    }
  }

  private compress(data: T): any {
    if (!this.config.enableCompression) return data;
    // Simulation de compression (en réalité, utiliser une lib comme lz-string)
    return { _compressed: JSON.stringify(data) };
  }

  private decompress(data: any): T {
    if (data && typeof data === 'object' && data._compressed) {
      return JSON.parse(data._compressed);
    }
    return data;
  }

  private recordAccess(key: string): void {
    const now = Date.now();
    const pattern = this.accessPatterns.get(key) || [];
    pattern.push(now);
    
    // Garder seulement les 50 derniers accès
    if (pattern.length > 50) {
      pattern.splice(0, pattern.length - 50);
    }
    
    this.accessPatterns.set(key, pattern);
  }

  private updatePredictivePatterns(key: string): void {
    if (!this.config.enablePredictive) return;

    const recentKeys = Array.from(this.cache.keys()).slice(-5);
    if (!this.predictivePatterns.has(key)) {
      this.predictivePatterns.set(key, []);
    }
    
    const patterns = this.predictivePatterns.get(key)!;
    recentKeys.forEach(recentKey => {
      if (recentKey !== key && !patterns.includes(recentKey)) {
        patterns.push(recentKey);
        if (patterns.length > 3) patterns.shift();
      }
    });
  }

  private predictivePreload(key: string): void {
    const patterns = this.predictivePatterns.get(key);
    if (patterns) {
      patterns.forEach(predictedKey => {
        if (!this.cache.has(predictedKey)) {
          console.log(`Prédiction: ${predictedKey} pourrait être demandé bientôt`);
        }
      });
    }
  }

  private updateAverageAccessTime(accessTime: number): void {
    const totalAccesses = this.stats.hits + this.stats.misses;
    this.stats.averageAccessTime = 
      (this.stats.averageAccessTime * (totalAccesses - 1) + accessTime) / totalAccesses;
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  private logCacheOperation(operation: string, key: string, details: any): void {
    console.debug(`Cache ${operation}:`, { key, ...details, timestamp: Date.now() });
  }

  private startBackgroundTasks(): void {
    // Nettoyage périodique
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // Toutes les 5 minutes

    // Mise à jour des statistiques
    setInterval(() => {
      this.updateStats();
    }, 30 * 1000); // Toutes les 30 secondes
  }

  private cleanup(): void {
    const now = Date.now();
    let deletedSize = 0;
    
    // Nettoyer les entrées expirées
    for (const [key, entry] of this.cache) {
      if (now > entry.expiry) {
        deletedSize += entry.size;
        this.cache.delete(key);
      }
    }

    this.stats.totalSize -= deletedSize;
    this.stats.entries = this.cache.size;

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

  private updateStats(): void {
    let compressedSize = 0;
    let originalSize = 0;
    
    for (const entry of this.cache.values()) {
      if (entry.compressed) {
        compressedSize += entry.size;
        originalSize += entry.size * 2; // Estimation
      }
    }
    
    this.stats.compressionRatio = originalSize > 0 ? compressedSize / originalSize : 1;
    this.stats.memoryUsage = (this.stats.totalSize / (this.config.maxMemoryMB * 1024 * 1024)) * 100;
  }

  // ===== API PUBLIQUE =====

  getStats(): CacheStats {
    return { ...this.stats };
  }

  getEntries(): Array<{ key: string; entry: CacheEntry<T> }> {
    return Array.from(this.cache.entries()).map(([key, entry]) => ({ key, entry }));
  }

  prefetch(keys: string[], fetchFn: (key: string) => Promise<T>): Promise<void[]> {
    return Promise.all(
      keys.map(async (key) => {
        if (!this.get(key)) {
          try {
            const data = await fetchFn(key);
            this.set(key, data);
          } catch (error) {
            console.warn(`Prefetch failed for ${key}:`, error);
          }
        }
      })
    );
  }

  export(): string {
    const exportData = {
      entries: Array.from(this.cache.entries()),
      stats: this.stats,
      timestamp: Date.now()
    };
    return JSON.stringify(exportData);
  }

  import(data: string): void {
    try {
      const imported = JSON.parse(data);
      this.cache.clear();
      
      imported.entries.forEach(([key, entry]: [string, CacheEntry<T>]) => {
        this.cache.set(key, entry);
      });
      
      this.stats = imported.stats;
    } catch (error) {
      console.error('Failed to import cache data:', error);
    }
  }
}

// ===== HOOK REACT =====

import { useState, useEffect, useCallback } from 'react';

export function useUnifiedCache<T>(
  key: string, 
  fetchFn: () => Promise<T>, 
  options: {
    ttl?: number;
    context?: string;
    dependencies?: any[];
    enabled?: boolean;
  } = {}
): { 
  data: T | null; 
  isLoading: boolean; 
  error: Error | null; 
  refetch: () => void;
  invalidate: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    setIsLoading(true);
    setError(null);

    try {
      // Vérifier le cache en premier
      const cached = unifiedCacheManager.get(key);
      if (cached) {
        setData(cached);
        setIsLoading(false);
        return;
      }

      // Récupérer les nouvelles données
      const result = await fetchFn();
      unifiedCacheManager.set(key, result, options.ttl, options.context);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, options.ttl, options.context, options.enabled, ...(options.dependencies || [])]);

  const invalidate = useCallback(() => {
    unifiedCacheManager.invalidate(key);
    setData(null);
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData, invalidate };
}

// ===== INSTANCES GLOBALES =====

// Instance par défaut
export const unifiedCacheManager = new UnifiedCacheManager();

// Instance spécialisée pour les recherches
export const searchCacheManager = new UnifiedCacheManager({
  maxSize: 200,
  maxMemoryMB: 50,
  defaultTTL: 300000, // 5 minutes
  enablePredictive: true
});

// Instance spécialisée pour les contenus juridiques
export const legalCacheManager = new UnifiedCacheManager({
  maxSize: 1000,
  maxMemoryMB: 200,
  defaultTTL: 3600000, // 1 heure
  enableCompression: true
});

// Export par défaut
export default unifiedCacheManager;
