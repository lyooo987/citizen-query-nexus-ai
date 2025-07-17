
export interface DataItem {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
  content?: string;
  metadata?: any;
}

class DataService {
  private data: Map<string, DataItem[]> = new Map();

  // Initialize with mock data
  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const legalTexts: DataItem[] = [
      {
        id: '1',
        title: 'Code Civil Algérien',
        type: 'civil',
        status: 'Publié',
        date: '2024-01-15',
        content: 'Contenu du code civil...',
        metadata: { institution: 'Ministère de la Justice' }
      },
      {
        id: '2',
        title: 'Loi sur le Commerce Électronique',
        type: 'commercial',
        status: 'En révision',
        date: '2024-02-20',
        content: 'Dispositions relatives au commerce électronique...',
        metadata: { institution: 'Ministère du Commerce' }
      }
    ];

    const procedures: DataItem[] = [
      {
        id: '1',
        title: 'Demande de Passeport',
        type: 'état-civil',
        status: 'Actif',
        date: '2024-01-10',
        content: 'Procédure pour obtenir un passeport...',
        metadata: { institution: 'Direction de la Population' }
      },
      {
        id: '2',
        title: 'Création d\'Entreprise',
        type: 'commercial',
        status: 'Actif',
        date: '2024-01-25',
        content: 'Étapes pour créer une entreprise...',
        metadata: { institution: 'CNRC' }
      }
    ];

    this.data.set('legal-texts', legalTexts);
    this.data.set('procedures', procedures);
    this.data.set('favorites', []);
    this.data.set('comparisons', []);
  }

  // CRUD Operations
  getItems(category: string, filters?: any): DataItem[] {
    const items = this.data.get(category) || [];
    
    if (!filters) return items;

    return items.filter(item => {
      if (filters.status && item.status !== filters.status) return false;
      if (filters.type && item.type !== filters.type) return false;
      if (filters.keywords) {
        const searchTerm = filters.keywords.toLowerCase();
        return item.title.toLowerCase().includes(searchTerm) ||
               item.content?.toLowerCase().includes(searchTerm);
      }
      return true;
    });
  }

  getItem(category: string, id: string): DataItem | undefined {
    const items = this.data.get(category) || [];
    return items.find(item => item.id === id);
  }

  addItem(category: string, item: Omit<DataItem, 'id'>): DataItem {
    const items = this.data.get(category) || [];
    const newItem: DataItem = {
      ...item,
      id: Date.now().toString()
    };
    items.push(newItem);
    this.data.set(category, items);
    return newItem;
  }

  updateItem(category: string, id: string, updates: Partial<DataItem>): DataItem | null {
    const items = this.data.get(category) || [];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updates };
    this.data.set(category, items);
    return items[index];
  }

  deleteItem(category: string, id: string): boolean {
    const items = this.data.get(category) || [];
    const newItems = items.filter(item => item.id !== id);
    
    if (newItems.length === items.length) return false;
    
    this.data.set(category, newItems);
    return true;
  }

  // Favorites Management
  addToFavorites(item: DataItem): void {
    const favorites = this.data.get('favorites') || [];
    if (!favorites.find(fav => fav.id === item.id)) {
      favorites.push(item);
      this.data.set('favorites', favorites);
    }
  }

  removeFromFavorites(id: string): void {
    const favorites = this.data.get('favorites') || [];
    const newFavorites = favorites.filter(item => item.id !== id);
    this.data.set('favorites', newFavorites);
  }

  getFavorites(): DataItem[] {
    return this.data.get('favorites') || [];
  }

  // Comparison Management
  addToComparison(items: DataItem[]): string {
    const comparisons = this.data.get('comparisons') || [];
    const comparisonId = Date.now().toString();
    const comparison = {
      id: comparisonId,
      title: `Comparaison ${comparisons.length + 1}`,
      type: 'comparison',
      status: 'Active',
      date: new Date().toISOString().split('T')[0],
      content: JSON.stringify(items),
      metadata: { itemCount: items.length }
    };
    comparisons.push(comparison);
    this.data.set('comparisons', comparisons);
    return comparisonId;
  }

  // Export/Import
  exportData(category: string, format: 'json' | 'csv' | 'excel' = 'json'): string {
    const items = this.data.get(category) || [];
    
    switch (format) {
      case 'csv':
        return this.convertToCSV(items);
      case 'json':
        return JSON.stringify(items, null, 2);
      default:
        return JSON.stringify(items, null, 2);
    }
  }

  importData(category: string, data: DataItem[]): void {
    const existingItems = this.data.get(category) || [];
    const newItems = data.map(item => ({
      ...item,
      id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    this.data.set(category, [...existingItems, ...newItems]);
  }

  private convertToCSV(items: DataItem[]): string {
    if (!items.length) return '';
    
    const headers = ['id', 'title', 'type', 'status', 'date'];
    const csvContent = [
      headers.join(','),
      ...items.map(item => 
        headers.map(header => 
          JSON.stringify(item[header as keyof DataItem] || '')
        ).join(',')
      )
    ].join('\n');
    
    return csvContent;
  }

  // Statistics and Analytics
  getStatistics(category: string) {
    const items = this.data.get(category) || [];
    const statusCounts = items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeCounts = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: items.length,
      byStatus: statusCounts,
      byType: typeCounts,
      recent: items.filter(item => {
        const itemDate = new Date(item.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return itemDate >= weekAgo;
      }).length
    };
  }
}

export const dataService = new DataService();
