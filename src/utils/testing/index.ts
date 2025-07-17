
/**
 * Point d'entrée principal pour le système de tests automatisés
 */

export * from './types';
export * from './testRunner';
export * from './testSuites';
export * from './hooks';

// Instance principale exportée pour compatibilité
import { AutomatedTestRunner } from './testRunner';
export const automatedTestRunner = new AutomatedTestRunner();
