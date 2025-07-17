
/**
 * Système de cache intelligent avec compression et expiration
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
  accessCount: number;
  compressed: boolean;
}

class EnhancedCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private maxSize: number;
  private compressionThreshold: number;

  constructor(maxSize = 100, compressionThreshold = 1000) {
    this.maxSize = maxSize;
    this.compressionThreshold = compressionThreshold;
  }

  set(key: string, data: T, ttlMs = 300000): void {
    // Nettoyer le cache si nécessaire
    if (this.cache.size >= this.maxSize) {
      this.evictLeastUsed();
    }

    const serialized = JSON.stringify(data);
    const shouldCompress = serialized.length > this.compressionThreshold;

    this.cache.set(key, {
      data: shouldCompress ? this.compress(data) : data,
      timestamp: Date.now(),
      expiry: Date.now() + ttlMs,
      accessCount: 0,
      compressed: shouldCompress
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    item.accessCount++;
    return item.compressed ? this.decompress(item.data) : item.data;
  }

  private compress(data: T): any {
    // Simulation de compression (en réalité, utiliser une lib comme lz-string)
    return { _compressed: JSON.stringify(data) };
  }

  private decompress(data: any): T {
    return JSON.parse(data._compressed);
  }

  private evictLeastUsed(): void {
    let leastUsedKey = '';
    let leastAccessCount = Infinity;

    for (const [key, item] of this.cache) {
      if (item.accessCount < leastAccessCount) {
        leastAccessCount = item.accessCount;
        leastUsedKey = key;
      }
    }

    if (leastUsedKey) {
      this.cache.delete(leastUsedKey);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      entries: Array.from(this.cache.entries()).map(([key, item]) => ({
        key,
        size: JSON.stringify(item.data).length,
        accessCount: item.accessCount,
        age: Date.now() - item.timestamp
      }))
    };
  }

  private calculateHitRate(): number {
    const totalAccess = Array.from(this.cache.values())
      .reduce((sum, item) => sum + item.accessCount, 0);
    return totalAccess > 0 ? (totalAccess / (totalAccess + this.cache.size)) * 100 : 0;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const enhancedCache = new EnhancedCache();

// Hook pour utiliser le cache dans les composants React
import { useState, useEffect } from 'react';

export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 300000
): { data: T | null; isLoading: boolean; error: Error | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier le cache d'abord
      const cached = enhancedCache.get(key) as T | null;
      if (cached) {
        setData(cached);
        setIsLoading(false);
        return;
      }

      // Récupérer les nouvelles données
      const result = await fetcher();
      enhancedCache.set(key, result, ttl);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  return { data, isLoading, error, refetch: fetchData };
}
