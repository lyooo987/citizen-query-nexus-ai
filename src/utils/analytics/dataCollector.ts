
/**
 * Collecteur de données analytics
 */

import { UserAction, PageView, PerformanceMetric } from './types';

export class AnalyticsDataCollector {
  private actions: UserAction[] = [];
  private pageViews: PageView[] = [];
  private metrics: PerformanceMetric[] = [];
  private sessionId: string;
  private currentPage: PageView | null = null;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.initializeTracking();
  }

  private initializeTracking() {
    // Tracker les clics
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      this.trackAction('click', this.getElementSelector(target), {
        x: event.clientX,
        y: event.clientY,
        button: event.button
      });
    });

    // Tracker les changements de page
    if (typeof window !== 'undefined') {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = (...args) => {
        originalPushState.apply(history, args);
        this.trackPageView(window.location.pathname);
      };

      history.replaceState = (...args) => {
        originalReplaceState.apply(history, args);
        this.trackPageView(window.location.pathname);
      };

      window.addEventListener('popstate', () => {
        this.trackPageView(window.location.pathname);
      });

      // Page initiale
      this.trackPageView(window.location.pathname);
    }
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  trackAction(type: string, element: string, metadata?: Record<string, any>) {
    const action: UserAction = {
      type,
      element,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      metadata
    };

    this.actions.push(action);
    
    // Garder seulement les 1000 dernières actions
    if (this.actions.length > 1000) {
      this.actions = this.actions.slice(-1000);
    }
  }

  trackPageView(path: string) {
    // Terminer la page précédente
    if (this.currentPage) {
      this.currentPage.duration = Date.now() - this.currentPage.timestamp;
    }

    // Commencer une nouvelle page
    this.currentPage = {
      path,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      referrer: document.referrer
    };

    this.pageViews.push(this.currentPage);
  }

  trackMetric(name: string, value: number, category: PerformanceMetric['category'] = 'interaction') {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      category
    });
  }

  getActions(): UserAction[] {
    return [...this.actions];
  }

  getPageViews(): PageView[] {
    return [...this.pageViews];
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getCurrentPage(): PageView | null {
    return this.currentPage;
  }

  clear() {
    this.actions = [];
    this.pageViews = [];
    this.metrics = [];
    this.currentPage = null;
  }
}
