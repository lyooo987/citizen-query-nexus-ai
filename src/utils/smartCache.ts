
/**
 * Système de cache intelligent avec prédiction et pré-chargement
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
  accessCount: number;
  lastAccess: number;
  priority: number;
  size: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  totalSize: number;
  averageAccessTime: number;
}

class SmartCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private stats: CacheStats = { hits: 0, misses: 0, totalSize: 0, averageAccessTime: 0 };
  private maxSize: number;
  private maxMemory: number;
  private predictivePatterns = new Map<string, string[]>();

  constructor(maxSize = 200, maxMemoryMB = 50) {
    this.maxSize = maxSize;
    this.maxMemory = maxMemoryMB * 1024 * 1024; // Convert to bytes
  }

  set(key: string, data: T, ttlMs = 600000, priority = 1): void {
    const size = this.calculateSize(data);
    
    // Vérifier si on a assez d'espace
    while (this.needsEviction(size)) {
      this.evictLeastValuable();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttlMs,
      accessCount: 0,
      lastAccess: Date.now(),
      priority,
      size
    };

    this.cache.set(key, entry);
    this.stats.totalSize += size;
    this.updatePredictivePatterns(key);
  }

  get(key: string): T | null {
    const startTime = performance.now();
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      this.updateAverageAccessTime(performance.now() - startTime);
      return null;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.stats.totalSize -= entry.size;
      this.stats.misses++;
      this.updateAverageAccessTime(performance.now() - startTime);
      return null;
    }

    // Mettre à jour les statistiques d'accès
    entry.accessCount++;
    entry.lastAccess = Date.now();
    this.stats.hits++;
    this.updateAverageAccessTime(performance.now() - startTime);

    // Pré-charger les données prédites
    this.predictivePreload(key);

    return entry.data;
  }

  private calculateSize(data: T): number {
    return JSON.stringify(data).length * 2; // Approximation en bytes
  }

  private needsEviction(newSize: number): boolean {
    return (
      this.cache.size >= this.maxSize ||
      this.stats.totalSize + newSize > this.maxMemory
    );
  }

  private evictLeastValuable(): void {
    let leastValuableKey = '';
    let leastValue = Infinity;

    for (const [key, entry] of this.cache) {
      // Score basé sur l'âge, la fréquence d'accès et la priorité
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
      }
    }
  }

  private updatePredictivePatterns(key: string): void {
    // Analyser les patterns d'accès pour la prédiction
    const recentKeys = Array.from(this.cache.keys()).slice(-10);
    if (!this.predictivePatterns.has(key)) {
      this.predictivePatterns.set(key, []);
    }
    
    const patterns = this.predictivePatterns.get(key)!;
    recentKeys.forEach(recentKey => {
      if (recentKey !== key && !patterns.includes(recentKey)) {
        patterns.push(recentKey);
        if (patterns.length > 5) patterns.shift();
      }
    });
  }

  private predictivePreload(key: string): void {
    const patterns = this.predictivePatterns.get(key);
    if (patterns) {
      // Simuler le pré-chargement (en réalité, on déclencherait des requêtes)
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

  getStats(): CacheStats & { hitRate: number; entries: number } {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      hitRate: total > 0 ? (this.stats.hits / total) * 100 : 0,
      entries: this.cache.size
    };
  }

  clear(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, totalSize: 0, averageAccessTime: 0 };
    this.predictivePatterns.clear();
  }
}

export const smartCache = new SmartCache();
