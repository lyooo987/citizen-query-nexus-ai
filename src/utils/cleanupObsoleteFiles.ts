/**
 * Utilitaire pour identifier et nettoyer les fichiers obsolètes
 */

import { lightSecurityMonitor } from './optimizedSecurity';

// Fichiers potentiellement obsolètes identifiés
const obsoleteFiles = [
  'src/utils/enhancedValidation.ts',
  'src/utils/enhancedSecurity.ts', 
  'src/utils/securityUtils.ts',
  'src/utils/securityEnhanced.ts',
  'src/components/modals/UnifiedModalManager.tsx',
  'src/utils/validation/enhancedValidator.ts'
];

// Fichiers volumineux à refactoriser
const largeFilesToRefactor = [
  {
    file: 'src/utils/unifiedSecurity.ts',
    currentLines: 374,
    reason: 'Fichier de sécurité trop volumineux'
  },
  {
    file: 'src/components/Dashboard.tsx', 
    currentLines: 500,
    reason: 'Composant Dashboard trop complexe'
  }
];

export class CleanupManager {
  private cleanupLog: string[] = [];

  logCleanup(action: string, file: string) {
    const logEntry = `${new Date().toISOString()}: ${action} - ${file}`;
    this.cleanupLog.push(logEntry);
    lightSecurityMonitor.logEvent('file_cleanup', 'low');
    console.log(`🧹 CLEANUP: ${logEntry}`);
  }

  getObsoleteFiles(): string[] {
    return obsoleteFiles;
  }

  getLargeFiles(): typeof largeFilesToRefactor {
    return largeFilesToRefactor;
  }

  getCleanupSummary() {
    return {
      obsoleteFilesCount: obsoleteFiles.length,
      largeFilesCount: largeFilesToRefactor.length,
      cleanupActions: this.cleanupLog.length,
      lastCleanup: this.cleanupLog[this.cleanupLog.length - 1] || 'Aucun nettoyage effectué'
    };
  }

  generateRefactorPlan() {
    return {
      phase1: 'Suppression des fichiers obsolètes',
      phase2: 'Refactorisation des gros composants', 
      phase3: 'Optimisation de la sécurité',
      phase4: 'Harmonisation du design',
      phase5: 'Tests et validation'
    };
  }
}

export const cleanupManager = new CleanupManager();