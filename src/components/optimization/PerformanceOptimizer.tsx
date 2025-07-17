
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { cacheManager } from '@/utils/cacheManager';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, Zap } from 'lucide-react';
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance';

interface PerformanceStats {
  loadTime: number;
  memoryUsage: number;
  interactions: number;
  slowOperations: number;
}

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  enableMonitoring?: boolean;
  optimizeImages?: boolean;
  enableCaching?: boolean;
}

export function PerformanceOptimizer({ 
  children, 
  enableMonitoring = true,
  optimizeImages = true,
  enableCaching = true 
}: PerformanceOptimizerProps) {
  const { recordCustomMetric } = useOptimizedPerformance('PerformanceOptimizer');
  const [stats, setStats] = useState<PerformanceStats>({
    loadTime: 0,
    memoryUsage: 0,
    interactions: 0,
    slowOperations: 0
  });
  
  const [showAlert, setShowAlert] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Image optimization
  const optimizeImageLoading = useCallback(() => {
    if (!optimizeImages || !isClient) return;

    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));

    return () => {
      images.forEach((img) => imageObserver.unobserve(img));
    };
  }, [optimizeImages, isClient]);

  // Performance monitoring
  useEffect(() => {
    if (!enableMonitoring || !isClient) return;

    const startTime = performance.now();
    const interval = setInterval(() => {
      const report = performanceMonitor.getPerformanceReport();
      const newStats = {
        loadTime: report.vitals.loadComplete || performance.now(),
        memoryUsage: report.vitals.memoryUsage?.used || (performance as any).memory?.usedJSHeapSize || 0,
        interactions: report.vitals.recentMetrics?.filter((m: any) => m.category === 'interaction').length || 0,
        slowOperations: report.slowOperations?.length || 0
      };
      
      setStats(newStats);
      
      // Show alert if performance is degraded
      if (newStats.slowOperations > 5 || newStats.memoryUsage > 50000000) {
        setShowAlert(true);
      }
    }, 30000);

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          recordCustomMetric('long_task', entry.duration, 'interaction');
        }
      });
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Performance observers not supported');
    }

    return () => {
      clearInterval(interval);
      longTaskObserver.disconnect();
      
      const endTime = performance.now();
      recordCustomMetric('component_lifetime', endTime - startTime, 'rendering');
    };
  }, [enableMonitoring, isClient, recordCustomMetric]);

  // Image loading optimization
  useEffect(() => {
    const cleanup = optimizeImageLoading();
    return cleanup;
  }, [optimizeImageLoading]);

  // Memory cleanup
  useEffect(() => {
    const cleanup = () => {
      if (enableCaching) {
        cacheManager.cleanup();
      }
    };

    const interval = setInterval(cleanup, 2 * 60 * 1000); // Every 2 minutes
    return () => clearInterval(interval);
  }, [enableCaching]);

  // Memoized children to prevent unnecessary re-renders
  const memoizedChildren = useMemo(() => children, [children]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      {showAlert && (
        <Alert className="fixed top-16 right-4 z-[70] w-80 border-yellow-500 bg-yellow-50">
          <Activity className="w-4 h-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Performance dégradée détectée. Optimisation en cours...
            <button 
              onClick={() => setShowAlert(false)}
              className="ml-2 text-sm underline hover:no-underline"
            >
              OK
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Performance Monitor */}
      <div className="fixed bottom-16 right-4 z-[60]">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-gray-600">
            {stats.interactions} interactions
          </span>
        </div>
      </div>
      
      {memoizedChildren}
    </>
  );
}

// HOC for performance optimization
export function withPerformanceOptimization<P extends object>(
  Component: React.ComponentType<P>
) {
  return React.memo((props: P) => {
    return (
      <PerformanceOptimizer>
        <Component {...props} />
      </PerformanceOptimizer>
    );
  });
}
