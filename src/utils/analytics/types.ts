
/**
 * Types pour le système d'analytics
 */

export interface UserAction {
  type: string;
  element: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

export interface PageView {
  path: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  referrer?: string;
  duration?: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'load' | 'interaction' | 'navigation' | 'error';
}

export interface AnalyticsReport {
  session: {
    id: string;
    duration: number;
    pageViews: number;
    actions: number;
  };
  last24h: {
    actions: number;
    pageViews: number;
    averagePageDuration: number;
    topActions: Array<{ type: string; count: number }>;
    topPages: Array<{ path: string; views: number }>;
  };
  performance: {
    averageLoadTime: number;
    averageInteractionTime: number;
    errorCount: number;
  };
}
