
/**
 * Moniteur de performance pour optimiser l'application
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'rendering' | 'network' | 'memory' | 'interaction';
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observer pour les métriques de navigation
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(`navigation_${entry.name}`, entry.duration, 'network');
        }
      });

      try {
        navObserver.observe({ entryTypes: ['navigation', 'resource'] });
        this.observers.set('navigation', navObserver);
      } catch (e) {
        console.warn('Performance observer not supported for navigation');
      }

      // Observer pour les métriques de peinture
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(entry.name, entry.startTime, 'rendering');
        }
      });

      try {
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.set('paint', paintObserver);
      } catch (e) {
        console.warn('Performance observer not supported for paint');
      }
    }
  }

  recordMetric(name: string, value: number, category: PerformanceMetric['category']) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      category
    });

    // Garder seulement les 1000 dernières métriques
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  // Mesurer le temps d'exécution d'une fonction
  async measureFunction<T>(name: string, fn: () => Promise<T> | T): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(`function_${name}`, duration, 'interaction');
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`function_${name}_error`, duration, 'interaction');
      throw error;
    }
  }

  // Mesurer les métriques vitales
  getVitalMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      // Time to First Byte
      ttfb: navigation ? navigation.responseStart - navigation.requestStart : 0,
      
      // Dom Content Loaded
      dcl: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
      
      // Load Complete
      loadComplete: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      
      // Memory usage (si disponible)
      memoryUsage: this.getMemoryUsage(),
      
      // Métriques personnalisées récentes
      recentMetrics: this.metrics.slice(-10)
    };
  }

  private getMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return null;
  }

  getPerformanceReport() {
    const vitals = this.getVitalMetrics();
    const slowOperations = this.metrics
      .filter(m => m.category === 'interaction' && m.value > 100)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    return {
      vitals,
      slowOperations,
      recommendations: this.getRecommendations(vitals, slowOperations)
    };
  }

  private getRecommendations(vitals: any, slowOps: PerformanceMetric[]): string[] {
    const recommendations: string[] = [];

    if (vitals.ttfb > 500) {
      recommendations.push('Optimiser le temps de réponse du serveur (TTFB élevé)');
    }

    if (vitals.dcl > 3000) {
      recommendations.push('Réduire la taille des ressources JavaScript/CSS');
    }

    if (slowOps.length > 5) {
      recommendations.push('Optimiser les opérations lentes détectées');
    }

    if (vitals.memoryUsage && vitals.memoryUsage.used > vitals.memoryUsage.total * 0.8) {
      recommendations.push('Optimiser l\'utilisation mémoire');
    }

    return recommendations;
  }

  // Nettoyer les observers
  cleanup() {
    for (const observer of this.observers.values()) {
      observer.disconnect();
    }
    this.observers.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Hook React pour utiliser le monitoring de performance
import { useEffect, useCallback } from 'react';

export function usePerformanceTracking(componentName: string) {
  const trackOperation = useCallback(
    async <T>(operationName: string, operation: () => Promise<T> | T): Promise<T> => {
      return performanceMonitor.measureFunction(`${componentName}_${operationName}`, operation);
    },
    [componentName]
  );

  useEffect(() => {
    performanceMonitor.recordMetric(`component_mount_${componentName}`, performance.now(), 'rendering');
    
    return () => {
      performanceMonitor.recordMetric(`component_unmount_${componentName}`, performance.now(), 'rendering');
    };
  }, [componentName]);

  return { trackOperation };
}
