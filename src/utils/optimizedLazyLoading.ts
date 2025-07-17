
/**
 * Système de lazy loading optimisé avec prédiction et mise en cache
 */

import { lazy, ComponentType } from 'react';
import { smartCache } from './smartCache';

interface LazyLoadConfig {
  preload?: boolean;
  timeout?: number;
  retries?: number;
  priority?: number;
}

interface ComponentCache {
  component: ComponentType<any>;
  loaded: boolean;
  loading: boolean;
  error?: Error;
}

class OptimizedLazyLoader {
  private componentCache = new Map<string, ComponentCache>();
  private loadingQueue = new Set<string>();
  private intersectionObserver: IntersectionObserver | null = null;
  private preloadQueue: string[] = [];

  constructor() {
    this.initializeIntersectionObserver();
    this.startPreloadScheduler();
  }

  private initializeIntersectionObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const componentId = entry.target.getAttribute('data-component-id');
              if (componentId && !this.componentCache.has(componentId)) {
                this.schedulePreload(componentId);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );
    }
  }

  private startPreloadScheduler(): void {
    // Traiter la queue de préchargement toutes les 100ms
    setInterval(() => {
      if (this.preloadQueue.length > 0 && this.loadingQueue.size < 3) {
        const nextComponent = this.preloadQueue.shift();
        if (nextComponent) {
          this.processPreload(nextComponent);
        }
      }
    }, 100);
  }

  createLazyComponent<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>,
    componentId: string,
    config: LazyLoadConfig = {}
  ): ComponentType<any> {
    const { preload = false, timeout = 10000, retries = 3, priority = 1 } = config;

    // Vérifier le cache intelligent d'abord
    const cachedComponent = smartCache.get(`lazy_${componentId}`) as ComponentCache | null;
    if (cachedComponent?.loaded) {
      return cachedComponent.component;
    }

    // Créer le composant lazy
    const LazyComponent = lazy(async () => {
      let attempts = 0;
      const loadWithRetry = async (): Promise<{ default: T }> => {
        try {
          const startTime = performance.now();
          
          // Simuler un timeout
          const module = await Promise.race([
            importFn(),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ]);

          const loadTime = performance.now() - startTime;
          console.log(`Component ${componentId} loaded in ${loadTime.toFixed(2)}ms`);

          // Mettre en cache le résultat
          const cacheEntry: ComponentCache = {
            component: module.default,
            loaded: true,
            loading: false
          };
          
          smartCache.set(`lazy_${componentId}`, cacheEntry, 3600000, priority); // 1 heure
          this.componentCache.set(componentId, cacheEntry);

          return module;
        } catch (error) {
          attempts++;
          if (attempts < retries) {
            console.warn(`Loading ${componentId} failed, retry ${attempts}/${retries}`);
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
            return loadWithRetry();
          }
          throw error;
        }
      };

      return loadWithRetry();
    });

    // Précharger si demandé
    if (preload) {
      this.schedulePreload(componentId);
    }

    return LazyComponent;
  }

  private schedulePreload(componentId: string): void {
    if (!this.preloadQueue.includes(componentId) && !this.loadingQueue.has(componentId)) {
      this.preloadQueue.push(componentId);
      // Trier par priorité (non implémenté dans cette version simple)
    }
  }

  private async processPreload(componentId: string): Promise<void> {
    if (this.componentCache.has(componentId)) return;

    this.loadingQueue.add(componentId);
    
    try {
      // Ici on déclencherait le préchargement réel
      console.log(`Préchargement de ${componentId}...`);
      
      // Simuler le préchargement
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`Erreur lors du préchargement de ${componentId}:`, error);
    } finally {
      this.loadingQueue.delete(componentId);
    }
  }

  observeElement(element: HTMLElement, componentId: string): void {
    if (this.intersectionObserver) {
      element.setAttribute('data-component-id', componentId);
      this.intersectionObserver.observe(element);
    }
  }

  unobserveElement(element: HTMLElement): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }
  }

  getStats() {
    return {
      cached: this.componentCache.size,
      loading: this.loadingQueue.size,
      queued: this.preloadQueue.length,
      cacheHitRate: smartCache.getStats().hitRate
    };
  }
}

export const optimizedLazyLoader = new OptimizedLazyLoader();

// Helper function pour créer des composants lazy optimisés
export function createOptimizedLazy<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentId: string,
  config?: LazyLoadConfig
) {
  return optimizedLazyLoader.createLazyComponent(importFn, componentId, config);
}
