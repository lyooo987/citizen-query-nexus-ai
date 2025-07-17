
/**
 * Générateur de rapports analytics
 */

import { UserAction, PageView, PerformanceMetric, AnalyticsReport } from './types';

export class AnalyticsReportGenerator {
  generateReport(
    actions: UserAction[],
    pageViews: PageView[],
    metrics: PerformanceMetric[],
    sessionId: string,
    currentPage: PageView | null
  ): AnalyticsReport {
    const now = Date.now();
    const last24h = now - 86400000; // 24 heures

    const recentActions = actions.filter(a => a.timestamp > last24h);
    const recentPageViews = pageViews.filter(p => p.timestamp > last24h);
    const recentMetrics = metrics.filter(m => m.timestamp > last24h);

    return {
      session: {
        id: sessionId,
        duration: currentPage ? now - currentPage.timestamp : 0,
        pageViews: pageViews.length,
        actions: actions.length
      },
      last24h: {
        actions: recentActions.length,
        pageViews: recentPageViews.length,
        averagePageDuration: this.calculateAveragePageDuration(recentPageViews),
        topActions: this.getTopActions(recentActions),
        topPages: this.getTopPages(recentPageViews)
      },
      performance: {
        averageLoadTime: this.calculateAverageMetric(recentMetrics, 'load'),
        averageInteractionTime: this.calculateAverageMetric(recentMetrics, 'interaction'),
        errorCount: recentMetrics.filter(m => m.category === 'error').length
      }
    };
  }

  private calculateAveragePageDuration(pageViews: PageView[]): number {
    const viewsWithDuration = pageViews.filter(p => p.duration);
    if (viewsWithDuration.length === 0) return 0;
    
    const totalDuration = viewsWithDuration.reduce((sum, p) => sum + (p.duration || 0), 0);
    return totalDuration / viewsWithDuration.length;
  }

  private getTopActions(actions: UserAction[]): Array<{ type: string; count: number }> {
    const actionCounts = actions.reduce((acc, action) => {
      acc[action.type] = (acc[action.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(actionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }

  private getTopPages(pageViews: PageView[]): Array<{ path: string; views: number }> {
    const pageCounts = pageViews.reduce((acc, page) => {
      acc[page.path] = (acc[page.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([path, views]) => ({ path, views }));
  }

  private calculateAverageMetric(metrics: PerformanceMetric[], category: string): number {
    const categoryMetrics = metrics.filter(m => m.category === category);
    if (categoryMetrics.length === 0) return 0;
    
    const total = categoryMetrics.reduce((sum, m) => sum + m.value, 0);
    return total / categoryMetrics.length;
  }
}
