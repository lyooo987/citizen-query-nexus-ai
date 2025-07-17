
/**
 * Système de monitoring et d'analytics refactorisé
 */

import { AnalyticsDataCollector } from './analytics/dataCollector';
import { AnalyticsReportGenerator } from './analytics/reportGenerator';
import { AnalyticsReport } from './analytics/types';

class AnalyticsMonitor {
  private dataCollector: AnalyticsDataCollector;
  private reportGenerator: AnalyticsReportGenerator;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.dataCollector = new AnalyticsDataCollector(this.sessionId);
    this.reportGenerator = new AnalyticsReportGenerator();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  trackAction(type: string, element: string, metadata?: Record<string, any>) {
    this.dataCollector.trackAction(type, element, metadata);
  }

  trackPageView(path: string) {
    this.dataCollector.trackPageView(path);
  }

  trackMetric(name: string, value: number, category: 'load' | 'interaction' | 'navigation' | 'error' = 'interaction') {
    this.dataCollector.trackMetric(name, value, category);
  }

  getAnalytics(): AnalyticsReport {
    return this.reportGenerator.generateReport(
      this.dataCollector.getActions(),
      this.dataCollector.getPageViews(),
      this.dataCollector.getMetrics(),
      this.sessionId,
      this.dataCollector.getCurrentPage()
    );
  }

  exportData() {
    return {
      actions: this.dataCollector.getActions(),
      pageViews: this.dataCollector.getPageViews(),
      metrics: this.dataCollector.getMetrics(),
      analytics: this.getAnalytics()
    };
  }

  clear() {
    this.dataCollector.clear();
  }
}

export const analyticsMonitor = new AnalyticsMonitor();

// Hook React pour utiliser les analytics
import { useEffect, useCallback } from 'react';

export function useAnalytics(componentName: string) {
  const trackComponentAction = useCallback(
    (action: string, metadata?: Record<string, any>) => {
      analyticsMonitor.trackAction(`${componentName}_${action}`, componentName, metadata);
    },
    [componentName]
  );

  const trackComponentMetric = useCallback(
    (metricName: string, value: number) => {
      analyticsMonitor.trackMetric(`${componentName}_${metricName}`, value);
    },
    [componentName]
  );

  useEffect(() => {
    analyticsMonitor.trackMetric(`component_mount_${componentName}`, performance.now(), 'load');
    
    return () => {
      analyticsMonitor.trackMetric(`component_unmount_${componentName}`, performance.now(), 'load');
    };
  }, [componentName]);

  return {
    trackAction: trackComponentAction,
    trackMetric: trackComponentMetric,
    getAnalytics: analyticsMonitor.getAnalytics
  };
}
