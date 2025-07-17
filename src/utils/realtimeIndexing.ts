
/**
 * Système d'indexation temps réel pour la recherche
 */

interface IndexDocument {
  id: string;
  type: 'legal' | 'procedure' | 'metadata';
  content: string;
  metadata: Record<string, any>;
  timestamp: number;
  tokens?: string[];
  searchableContent?: string;
}

interface IndexStats {
  documentsIndexed: number;
  lastUpdate: number;
  indexSize: number;
  averageIndexTime: number;
}

class RealtimeIndexer {
  private indexQueue: IndexDocument[] = [];
  private isProcessing = false;
  private indexStats: Record<string, IndexStats> = {};
  private searchIndex = new Map<string, IndexDocument[]>();
  private observers: Set<(stats: Record<string, IndexStats>) => void> = new Set();

  constructor() {
    this.initializeIndexes();
    this.startBackgroundProcessing();
  }

  private initializeIndexes() {
    // Initialiser les stats pour chaque type d'index
    ['legal', 'procedure', 'metadata'].forEach(type => {
      this.indexStats[type] = {
        documentsIndexed: 0,
        lastUpdate: Date.now(),
        indexSize: 0,
        averageIndexTime: 0
      };
      this.searchIndex.set(type, []);
    });
  }

  private startBackgroundProcessing() {
    // Traiter la queue d'indexation toutes les 100ms
    setInterval(() => {
      if (this.indexQueue.length > 0 && !this.isProcessing) {
        this.processIndexQueue();
      }
    }, 100);

    // Notifier les observateurs toutes les 5 secondes
    setInterval(() => {
      this.notifyObservers();
    }, 5000);
  }

  addDocument(document: Omit<IndexDocument, 'timestamp'>) {
    const indexDoc: IndexDocument = {
      ...document,
      timestamp: Date.now()
    };

    this.indexQueue.push(indexDoc);
    console.log(`Document ajouté à la queue d'indexation: ${document.id}`);
  }

  private async processIndexQueue() {
    if (this.isProcessing || this.indexQueue.length === 0) return;

    this.isProcessing = true;
    const startTime = performance.now();

    try {
      // Traiter jusqu'à 10 documents à la fois
      const batch = this.indexQueue.splice(0, 10);
      
      for (const doc of batch) {
        await this.indexDocument(doc);
      }

      const processingTime = performance.now() - startTime;
      console.log(`Batch d'indexation traité: ${batch.length} documents en ${processingTime.toFixed(2)}ms`);

    } catch (error) {
      console.error('Erreur lors de l\'indexation:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  private async indexDocument(document: IndexDocument) {
    const startTime = performance.now();
    
    try {
      // Simuler l'indexation (en réalité, utiliser Elasticsearch ou Algolia)
      const tokens = this.tokenizeContent(document.content);
      const searchableDoc: IndexDocument = {
        ...document,
        tokens,
        searchableContent: document.content.toLowerCase()
      };

      // Ajouter au bon index
      const typeIndex = this.searchIndex.get(document.type) || [];
      const existingIndex = typeIndex.findIndex(d => d.id === document.id);
      
      if (existingIndex >= 0) {
        typeIndex[existingIndex] = searchableDoc;
      } else {
        typeIndex.push(searchableDoc);
      }

      this.searchIndex.set(document.type, typeIndex);

      // Mettre à jour les statistiques
      const stats = this.indexStats[document.type];
      const indexTime = performance.now() - startTime;
      
      stats.documentsIndexed++;
      stats.lastUpdate = Date.now();
      stats.indexSize = typeIndex.length;
      stats.averageIndexTime = (stats.averageIndexTime + indexTime) / 2;

      console.log(`Document indexé: ${document.id} (${indexTime.toFixed(2)}ms)`);

    } catch (error) {
      console.error(`Erreur lors de l'indexation du document ${document.id}:`, error);
    }
  }

  private tokenizeContent(content: string): string[] {
    // Tokenisation simple (en réalité, utiliser un tokenizer plus sophistiqué)
    return content
      .toLowerCase()
      .replace(/[^\w\s\u00C0-\u017F]/g, '') // Garder les caractères arabes et français
      .split(/\s+/)
      .filter(token => token.length > 2);
  }

  search(query: string, type?: string): IndexDocument[] {
    const searchTokens = this.tokenizeContent(query);
    const results: { doc: IndexDocument; score: number }[] = [];

    const indexesToSearch = type ? [type] : ['legal', 'procedure', 'metadata'];

    for (const indexType of indexesToSearch) {
      const typeIndex = this.searchIndex.get(indexType) || [];
      
      for (const doc of typeIndex) {
        let score = 0;
        const docTokens = doc.tokens || [];

        // Calcul du score de pertinence
        for (const searchToken of searchTokens) {
          const matches = docTokens.filter(token => token.includes(searchToken)).length;
          score += matches;
        }

        if (score > 0) {
          results.push({ doc, score });
        }
      }
    }

    // Trier par score de pertinence
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 50) // Limiter à 50 résultats
      .map(result => result.doc);
  }

  getStats(): Record<string, IndexStats> {
    return { ...this.indexStats };
  }

  getQueueSize(): number {
    return this.indexQueue.length;
  }

  isIndexing(): boolean {
    return this.isProcessing;
  }

  // Observer pattern pour les mises à jour temps réel
  subscribe(callback: (stats: Record<string, IndexStats>) => void) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  private notifyObservers() {
    for (const observer of this.observers) {
      observer(this.getStats());
    }
  }

  // Forcer la réindexation complète
  reindexAll() {
    console.log('Début de la réindexation complète...');
    
    // Simuler la réindexation (en réalité, récupérer toutes les données)
    const mockData = [
      { id: 'legal_1', type: 'legal' as const, content: 'Texte juridique exemple', metadata: {} },
      { id: 'proc_1', type: 'procedure' as const, content: 'Procédure administrative', metadata: {} },
      { id: 'meta_1', type: 'metadata' as const, content: 'Métadonnées système', metadata: {} }
    ];

    // Vider les index existants
    this.searchIndex.clear();
    this.initializeIndexes();

    // Ajouter tous les documents à la queue
    mockData.forEach(doc => this.addDocument(doc));
  }
}

export const realtimeIndexer = new RealtimeIndexer();

// Hook React pour l'indexation temps réel
import { useState, useEffect } from 'react';

export function useRealtimeIndexing() {
  const [stats, setStats] = useState(realtimeIndexer.getStats());
  const [queueSize, setQueueSize] = useState(realtimeIndexer.getQueueSize());
  const [isIndexing, setIsIndexing] = useState(realtimeIndexer.isIndexing());

  useEffect(() => {
    const unsubscribe = realtimeIndexer.subscribe(setStats);
    
    const interval = setInterval(() => {
      setQueueSize(realtimeIndexer.getQueueSize());
      setIsIndexing(realtimeIndexer.isIndexing());
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return {
    stats,
    queueSize,
    isIndexing,
    addDocument: (doc: Omit<IndexDocument, 'timestamp'>) => realtimeIndexer.addDocument(doc),
    search: (query: string, type?: string) => realtimeIndexer.search(query, type),
    reindexAll: () => realtimeIndexer.reindexAll()
  };
}
