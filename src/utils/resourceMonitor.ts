
/**
 * Moniteur de ressources système pour optimiser les performances
 */

interface ResourceMetrics {
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  } | null;
  networkStatus: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  } | null;
  batteryStatus: {
    level: number;
    charging: boolean;
    dischargingTime: number;
  } | null;
  deviceInfo: {
    cores: number;
    deviceMemory: number;
    platform: string;
  };
}

class ResourceMonitor {
  private metrics: ResourceMetrics;
  private callbacks: Array<(metrics: ResourceMetrics) => void> = [];
  private intervalId: number | null = null;

  constructor() {
    this.metrics = this.initializeMetrics();
    this.startMonitoring();
  }

  private initializeMetrics(): ResourceMetrics {
    return {
      memoryUsage: this.getMemoryUsage(),
      networkStatus: this.getNetworkStatus(),
      batteryStatus: null,
      deviceInfo: this.getDeviceInfo()
    };
  }

  private getMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
      };
    }
    return null;
  }

  private getNetworkStatus() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0
      };
    }
    return null;
  }

  private getDeviceInfo() {
    return {
      cores: navigator.hardwareConcurrency || 4,
      deviceMemory: (navigator as any).deviceMemory || 4,
      platform: navigator.platform
    };
  }

  private async getBatteryStatus() {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return {
          level: battery.level,
          charging: battery.charging,
          dischargingTime: battery.dischargingTime
        };
      } catch (error) {
        console.warn('Battery API not available:', error);
      }
    }
    return null;
  }

  private startMonitoring(): void {
    // Mettre à jour les métriques toutes les 5 secondes
    this.intervalId = window.setInterval(async () => {
      this.metrics = {
        memoryUsage: this.getMemoryUsage(),
        networkStatus: this.getNetworkStatus(),
        batteryStatus: await this.getBatteryStatus(),
        deviceInfo: this.getDeviceInfo()
      };

      // Notifier tous les callbacks
      this.callbacks.forEach(callback => callback(this.metrics));
    }, 5000);

    // Écouter les changements de réseau
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', () => {
        this.metrics.networkStatus = this.getNetworkStatus();
        this.callbacks.forEach(callback => callback(this.metrics));
      });
    }
  }

  getMetrics(): ResourceMetrics {
    return this.metrics;
  }

  subscribe(callback: (metrics: ResourceMetrics) => void): () => void {
    this.callbacks.push(callback);
    
    // Retourner une fonction de désinscription
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  getRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.metrics.memoryUsage && this.metrics.memoryUsage.percentage > 80) {
      recommendations.push('Mémoire élevée: Considérer le nettoyage du cache');
    }

    if (this.metrics.networkStatus && this.metrics.networkStatus.effectiveType === 'slow-2g') {
      recommendations.push('Connexion lente: Réduire la taille des données');
    }

    if (this.metrics.batteryStatus && this.metrics.batteryStatus.level < 0.2 && !this.metrics.batteryStatus.charging) {
      recommendations.push('Batterie faible: Activer le mode économie d\'énergie');
    }

    if (this.metrics.deviceInfo.cores < 4) {
      recommendations.push('Processeur limité: Réduire les calculs intensifs');
    }

    return recommendations;
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const resourceMonitor = new ResourceMonitor();

// Hook React pour utiliser le moniteur de ressources
import { useState, useEffect } from 'react';

export function useResourceMonitor() {
  const [metrics, setMetrics] = useState<ResourceMetrics>(resourceMonitor.getMetrics());
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = resourceMonitor.subscribe((newMetrics) => {
      setMetrics(newMetrics);
      setRecommendations(resourceMonitor.getRecommendations());
    });

    // Mettre à jour immédiatement
    setRecommendations(resourceMonitor.getRecommendations());

    return unsubscribe;
  }, []);

  return { metrics, recommendations };
}
