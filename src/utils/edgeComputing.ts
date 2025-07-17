
/**
 * Système d'edge computing pour traitement distribué
 */

interface EdgeNode {
  id: string;
  location: string;
  coordinates: [number, number];
  load: number;
  latency: number;
  status: 'optimal' | 'good' | 'warning' | 'critical';
  capabilities: string[];
  lastHeartbeat: number;
}

interface EdgeTask {
  id: string;
  type: 'search' | 'analysis' | 'indexing' | 'ocr' | 'ai_processing';
  payload: any;
  priority: number;
  deadline?: number;
  assignedNode?: string;
  status: 'pending' | 'assigned' | 'processing' | 'completed' | 'failed';
  result?: any;
  startTime?: number;
  endTime?: number;
}

class EdgeComputingManager {
  private nodes: Map<string, EdgeNode> = new Map();
  private tasks: Map<string, EdgeTask> = new Map();
  private taskQueue: EdgeTask[] = [];
  private isScheduling = false;

  constructor() {
    this.initializeEdgeNodes();
    this.startTaskScheduler();
    this.startHealthMonitoring();
  }

  private initializeEdgeNodes() {
    const mockNodes: EdgeNode[] = [
      {
        id: 'node_casablanca',
        location: 'Casablanca',
        coordinates: [33.5731, -7.5898],
        load: 45,
        latency: 8,
        status: 'optimal',
        capabilities: ['search', 'analysis', 'ocr'],
        lastHeartbeat: Date.now()
      },
      {
        id: 'node_rabat',
        location: 'Rabat',
        coordinates: [34.0209, -6.8416],
        load: 67,
        latency: 12,
        status: 'good',
        capabilities: ['search', 'indexing', 'ai_processing'],
        lastHeartbeat: Date.now()
      },
      {
        id: 'node_marrakech',
        location: 'Marrakech',
        coordinates: [31.6295, -7.9811],
        load: 23,
        latency: 15,
        status: 'optimal',
        capabilities: ['search', 'analysis', 'ocr', 'ai_processing'],
        lastHeartbeat: Date.now()
      },
      {
        id: 'node_tanger',
        location: 'Tanger',
        coordinates: [35.7595, -5.8340],
        load: 78,
        latency: 18,
        status: 'warning',
        capabilities: ['search', 'indexing'],
        lastHeartbeat: Date.now()
      }
    ];

    mockNodes.forEach(node => {
      this.nodes.set(node.id, node);
    });
  }

  private startTaskScheduler() {
    // Planifier les tâches toutes les 500ms
    setInterval(() => {
      if (this.taskQueue.length > 0 && !this.isScheduling) {
        this.scheduleTasks();
      }
    }, 500);
  }

  private startHealthMonitoring() {
    // Surveiller la santé des nœuds toutes les 10 secondes
    setInterval(() => {
      this.updateNodeHealth();
    }, 10000);
  }

  private updateNodeHealth() {
    for (const node of this.nodes.values()) {
      // Simuler la variation de charge et latence
      node.load = Math.max(0, Math.min(100, node.load + (Math.random() - 0.5) * 10));
      node.latency = Math.max(5, node.latency + (Math.random() - 0.5) * 5);
      node.lastHeartbeat = Date.now();

      // Mettre à jour le statut basé sur la charge
      if (node.load < 50) {
        node.status = 'optimal';
      } else if (node.load < 75) {
        node.status = 'good';
      } else if (node.load < 90) {
        node.status = 'warning';
      } else {
        node.status = 'critical';
      }
    }
  }

  private async scheduleTasks() {
    if (this.isScheduling) return;
    this.isScheduling = true;

    try {
      // Trier les tâches par priorité et deadline
      this.taskQueue.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        if (a.deadline && b.deadline) {
          return a.deadline - b.deadline;
        }
        return 0;
      });

      // Assigner les tâches aux nœuds les plus appropriés
      const tasksToAssign = this.taskQueue.splice(0, 5); // Traiter 5 tâches à la fois

      for (const task of tasksToAssign) {
        const bestNode = this.findBestNode(task);
        if (bestNode) {
          await this.assignTaskToNode(task, bestNode);
        } else {
          // Remettre la tâche en queue si aucun nœud disponible
          this.taskQueue.unshift(task);
        }
      }
    } finally {
      this.isScheduling = false;
    }
  }

  private findBestNode(task: EdgeTask): EdgeNode | null {
    const eligibleNodes = Array.from(this.nodes.values())
      .filter(node => 
        node.status !== 'critical' &&
        node.capabilities.includes(task.type) &&
        node.load < 95
      );

    if (eligibleNodes.length === 0) return null;

    // Calculer le score pour chaque nœud
    const scoredNodes = eligibleNodes.map(node => ({
      node,
      score: this.calculateNodeScore(node, task)
    }));

    // Retourner le nœud avec le meilleur score
    scoredNodes.sort((a, b) => b.score - a.score);
    return scoredNodes[0].node;
  }

  private calculateNodeScore(node: EdgeNode, task: EdgeTask): number {
    let score = 100;

    // Pénaliser la charge élevée
    score -= node.load;

    // Pénaliser la latence élevée
    score -= node.latency;

    // Bonus pour les nœuds avec status optimal
    if (node.status === 'optimal') score += 20;
    else if (node.status === 'good') score += 10;

    // Bonus pour les tâches urgentes sur des nœuds rapides
    if (task.priority > 8 && node.latency < 15) score += 15;

    return score;
  }

  private async assignTaskToNode(task: EdgeTask, node: EdgeNode) {
    task.assignedNode = node.id;
    task.status = 'assigned';
    task.startTime = Date.now();

    this.tasks.set(task.id, task);

    // Simuler le traitement de la tâche
    this.processTask(task, node);

    console.log(`Tâche ${task.id} assignée au nœud ${node.location}`);
  }

  private async processTask(task: EdgeTask, node: EdgeNode) {
    // Simuler le temps de traitement
    const processingTime = this.getProcessingTime(task.type, node);
    
    task.status = 'processing';
    
    setTimeout(() => {
      // Simuler le résultat du traitement
      task.result = this.generateMockResult(task);
      task.status = 'completed';
      task.endTime = Date.now();

      console.log(`Tâche ${task.id} terminée sur ${node.location} en ${processingTime}ms`);
    }, processingTime);
  }

  private getProcessingTime(taskType: string, node: EdgeNode): number {
    const baseTime = {
      'search': 200,
      'analysis': 1000,
      'indexing': 500,
      'ocr': 2000,
      'ai_processing': 3000
    }[taskType] || 1000;

    // Ajuster selon la charge du nœud
    const loadMultiplier = 1 + (node.load / 100);
    return Math.round(baseTime * loadMultiplier);
  }

  private generateMockResult(task: EdgeTask): any {
    switch (task.type) {
      case 'search':
        return { results: [], totalFound: 0, searchTime: 156 };
      case 'analysis':
        return { confidence: 0.85, categories: ['legal', 'procedure'], score: 78 };
      case 'indexing':
        return { indexed: true, documentsProcessed: 1, indexTime: 234 };
      case 'ocr':
        return { text: 'Texte extrait du document', confidence: 0.92 };
      case 'ai_processing':
        return { result: 'Résultat du traitement IA', confidence: 0.88 };
      default:
        return { success: true };
    }
  }

  // API publique
  submitTask(task: Omit<EdgeTask, 'id' | 'status'>): string {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullTask: EdgeTask = {
      ...task,
      id: taskId,
      status: 'pending'
    };

    this.taskQueue.push(fullTask);
    console.log(`Tâche ${taskId} ajoutée à la queue`);
    
    return taskId;
  }

  getTaskStatus(taskId: string): EdgeTask | null {
    return this.tasks.get(taskId) || null;
  }

  getNodes(): EdgeNode[] {
    return Array.from(this.nodes.values());
  }

  getNodeStats(): Record<string, any> {
    const nodes = Array.from(this.nodes.values());
    return {
      totalNodes: nodes.length,
      healthyNodes: nodes.filter(n => n.status === 'optimal' || n.status === 'good').length,
      averageLoad: nodes.reduce((sum, n) => sum + n.load, 0) / nodes.length,
      averageLatency: nodes.reduce((sum, n) => sum + n.latency, 0) / nodes.length,
      pendingTasks: this.taskQueue.length,
      activeTasks: Array.from(this.tasks.values()).filter(t => t.status === 'processing').length
    };
  }

  // Méthodes pour la gestion des nœuds
  addNode(node: Omit<EdgeNode, 'lastHeartbeat'>): void {
    const fullNode: EdgeNode = {
      ...node,
      lastHeartbeat: Date.now()
    };
    this.nodes.set(node.id, fullNode);
  }

  removeNode(nodeId: string): void {
    this.nodes.delete(nodeId);
  }
}

export const edgeComputingManager = new EdgeComputingManager();

// Hook React pour edge computing
import { useState, useEffect } from 'react';

export function useEdgeComputing() {
  const [nodes, setNodes] = useState(edgeComputingManager.getNodes());
  const [stats, setStats] = useState(edgeComputingManager.getNodeStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(edgeComputingManager.getNodes());
      setStats(edgeComputingManager.getNodeStats());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    nodes,
    stats,
    submitTask: (task: Omit<EdgeTask, 'id' | 'status'>) => edgeComputingManager.submitTask(task),
    getTaskStatus: (taskId: string) => edgeComputingManager.getTaskStatus(taskId)
  };
}
