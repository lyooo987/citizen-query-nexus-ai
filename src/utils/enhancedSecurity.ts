
/**
 * Module de sécurité renforcée - Consolidation et réexportation
 */

// Réexportation depuis les modules existants
export * from './unifiedSecurity';
export * from './optimizedSecurity';

// Imports pour la consolidation
import { unifiedValidation, securityMonitor as unifiedMonitor } from './unifiedSecurity';
import { secureValidation, lightSecurityMonitor } from './optimizedSecurity';

// Alias pour compatibilité
export const securityMonitor = {
  ...unifiedMonitor,
  ...lightSecurityMonitor,
  
  // Méthodes consolidées
  validateInput: (input: string, context: string = 'general') => {
    return unifiedMonitor.validateInput(input, context);
  },
  
  logSecurityEvent: (type: string, details: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') => {
    unifiedMonitor.logSecurityEvent(type, details, severity);
  },
  
  getSecurityReport: () => {
    return unifiedMonitor.getSecurityReport();
  }
};

// Validateur renforcé pour la compatibilité
export const enhancedValidator = {
  validate: (type: string, value: any) => {
    switch (type) {
      case 'string':
        return secureValidation.validate(secureValidation.schemas.searchInput, value);
      case 'email':
        return secureValidation.validate(secureValidation.schemas.email, value);
      case 'url':
        return secureValidation.validate(secureValidation.schemas.url, value);
      case 'fileName':
        return secureValidation.validate(secureValidation.schemas.fileName, value);
      case 'id':
        return secureValidation.validate(secureValidation.schemas.id, value);
      default:
        return secureValidation.validate(secureValidation.schemas.searchInput, value);
    }
  },
  
  validateObject: (schema: Record<string, string>, data: Record<string, any>, context?: string) => {
    const results: Record<string, any> = {};
    let isValid = true;
    
    for (const [field, rule] of Object.entries(schema)) {
      const value = data[field];
      const validation = secureValidation.validate(secureValidation.schemas.searchInput, value);
      results[field] = validation;
      if (!validation.success) {
        isValid = false;
      }
    }
    
    return {
      isValid,
      results,
      summary: {
        total: Object.keys(schema).length,
        passed: Object.values(results).filter((r: any) => r.success).length,
        failed: Object.values(results).filter((r: any) => !r.success).length
      }
    };
  }
};

// Validation enrichie avec toutes les méthodes nécessaires
export const enhancedValidation = {
  ...unifiedValidation,
  ...secureValidation,
  
  // Méthodes de validation spécialisées
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone: string): boolean => {
    const phoneRegex = /^(\+213|0)[5-7][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  
  strongPassword: (password: string): { valid: boolean; score: number; feedback: string[] } => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 25;
    else feedback.push('Au moins 8 caractères requis');

    if (/[a-z]/.test(password)) score += 25;
    else feedback.push('Lettres minuscules requises');

    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('Lettres majuscules requises');

    if (/[0-9]/.test(password)) score += 25;
    else feedback.push('Chiffres requis');

    return { valid: score === 100, score, feedback };
  }
};
