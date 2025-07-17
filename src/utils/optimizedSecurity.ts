/**
 * Module de sécurité optimisé - Version allégée et performante
 */

import { z } from 'zod';

// ===== VALIDATION SÉCURISÉE OPTIMISÉE =====
export const secureValidation = {
  // Schémas Zod optimisés
  schemas: {
    searchInput: z.string()
      .min(1, "Le terme de recherche ne peut pas être vide")
      .max(200, "Le terme de recherche est trop long")
      .regex(/^[a-zA-Z0-9\s\-_.,;:!?'"()\[\]À-ÿ]+$/u, "Caractères non autorisés détectés"),

    fileName: z.string()
      .min(1, "Le nom de fichier ne peut pas être vide")
      .max(255, "Le nom de fichier est trop long")
      .regex(/^[a-zA-Z0-9\s\-_.À-ÿ]+$/u, "Nom de fichier contient des caractères non autorisés"),

    email: z.string()
      .email("Format d'email invalide")
      .max(254, "Email trop long"),

    url: z.string()
      .url("URL invalide")
      .max(2048, "URL trop longue"),

    id: z.string()
      .uuid("ID invalide")
  },

  // Validation rapide avec cache
  validateQuick: <T>(schema: z.ZodSchema<T>, data: unknown): boolean => {
    try {
      schema.parse(data);
      return true;
    } catch {
      return false;
    }
  },

  // Validation complète
  validate: <T>(schema: z.ZodSchema<T>, data: unknown): { 
    success: true; data: T 
  } | { 
    success: false; error: string 
  } => {
    try {
      const result = schema.parse(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.errors[0]?.message || "Données invalides" };
      }
      return { success: false, error: "Erreur de validation" };
    }
  }
};

// ===== SANITISATION OPTIMISÉE =====
export const secureSanitizer = {
  // Cache des patterns de sanitisation
  _htmlCache: new Map<string, string>(),
  
  html: (input: string): string => {
    if (secureSanitizer._htmlCache.has(input)) {
      return secureSanitizer._htmlCache.get(input)!;
    }
    
    const sanitized = input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    
    // Cache le résultat (max 100 entrées)
    if (secureSanitizer._htmlCache.size >= 100) {
      const firstKey = secureSanitizer._htmlCache.keys().next().value;
      secureSanitizer._htmlCache.delete(firstKey);
    }
    secureSanitizer._htmlCache.set(input, sanitized);
    
    return sanitized;
  },

  filename: (filename: string): string => {
    return filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_');
  },

  url: (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Protocole non autorisé');
      }
      return urlObj.toString();
    } catch {
      return '';
    }
  },

  input: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  }
};

// ===== UTILITAIRES SÉCURISÉS =====
export const securityUtils = {
  // Cache des tokens générés
  _tokenCache: new Set<string>(),
  
  generateSecureToken: (length: number = 32): string => {
    let token: string;
    do {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    } while (securityUtils._tokenCache.has(token));
    
    securityUtils._tokenCache.add(token);
    
    // Nettoyer le cache si trop grand
    if (securityUtils._tokenCache.size > 1000) {
      const values = Array.from(securityUtils._tokenCache);
      securityUtils._tokenCache.clear();
      values.slice(-500).forEach(t => securityUtils._tokenCache.add(t));
    }
    
    return token;
  },

  validateFileUpload: (file: File): { valid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'Fichier trop volumineux (max 10MB)' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Type de fichier non autorisé' };
    }

    return { valid: true };
  },

  validatePermission: (userRole: string, requiredRole: string): boolean => {
    const roleHierarchy = {
      'admin': 4,
      'manager': 3,
      'editor': 2,
      'viewer': 1,
      'guest': 0
    };
    
    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    
    return userLevel >= requiredLevel;
  },

  // Hash sécurisé avec cache
  _hashCache: new Map<string, string>(),
  
  hashData: async (data: string): Promise<string> => {
    if (securityUtils._hashCache.has(data)) {
      return securityUtils._hashCache.get(data)!;
    }
    
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Cache le résultat
    if (securityUtils._hashCache.size >= 500) {
      const firstKey = securityUtils._hashCache.keys().next().value;
      securityUtils._hashCache.delete(firstKey);
    }
    securityUtils._hashCache.set(data, hash);
    
    return hash;
  }
};

// ===== MONITORING LÉGER =====
class LightSecurityMonitor {
  private events: Array<{
    type: string;
    timestamp: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }> = [];

  logEvent(type: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium') {
    this.events.push({
      type,
      timestamp: Date.now(),
      severity
    });

    // Garder seulement les 100 derniers événements
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }

    // Log les événements critiques
    if (severity === 'critical') {
      console.error(`🚨 CRITICAL SECURITY EVENT: ${type}`);
    }
  }

  getRecentEvents(minutes: number = 5): typeof this.events {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.events.filter(event => event.timestamp > cutoff);
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const lightSecurityMonitor = new LightSecurityMonitor();

// Export par défaut
export default {
  validation: secureValidation,
  sanitizer: secureSanitizer,
  utils: securityUtils,
  monitor: lightSecurityMonitor
};