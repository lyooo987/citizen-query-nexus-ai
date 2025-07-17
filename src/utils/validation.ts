
import { z } from 'zod';

// Schemas de validation pour différents types de données
export const userProfileSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  department: z.string().optional(),
});

export const legalTextSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  category: z.string().min(1, 'La catégorie est requise'),
  type: z.string().min(1, 'Le type est requis'),
  content: z.string().min(50, 'Le contenu doit contenir au moins 50 caractères'),
  description: z.string().optional(),
  institution: z.string().optional(),
  journalNumber: z.string().optional(),
  journalDate: z.string().optional(),
  pageNumber: z.string().optional(),
  sector: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const procedureSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères'),
  category: z.string().min(1, 'La catégorie est requise'),
  institution: z.string().min(1, 'L\'institution est requise'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  duration: z.string().optional(),
  cost: z.string().optional(),
  difficulty: z.enum(['facile', 'moyenne', 'difficile']).optional(),
  tags: z.array(z.string()).optional(),
});

export const searchQuerySchema = z.object({
  query: z.string().min(1, 'La requête ne peut pas être vide'),
  filters: z.object({
    category: z.string().optional(),
    type: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    institution: z.string().optional(),
  }).optional(),
});

// Fonction utilitaire pour valider les données
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: string[];
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return {
      success: false,
      errors: ['Erreur de validation inconnue']
    };
  }
}

// Validation d'email renforcée
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && !email.includes('..') && email.length <= 254;
}

// Validation de mot de passe sécurisé
export function validatePassword(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  else feedback.push('Au moins 8 caractères');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Au moins une minuscule');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Au moins une majuscule');

  if (/\d/.test(password)) score += 1;
  else feedback.push('Au moins un chiffre');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Au moins un caractère spécial');

  // Vérifier les patterns faibles
  const weakPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /azerty/i,
    /admin/i,
    /(.)\1{3,}/  // Caractères répétés
  ];

  for (const pattern of weakPatterns) {
    if (pattern.test(password)) {
      feedback.push('Évitez les mots de passe courants');
      score = Math.max(0, score - 1);
      break;
    }
  }

  return {
    isValid: score >= 4 && feedback.length === 0,
    score,
    feedback
  };
}

// Validation d'upload de fichier
export function validateFileUpload(file: File): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  if (file.size > maxSize) {
    errors.push('Le fichier ne peut pas dépasser 10MB');
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Type de fichier non autorisé');
  }

  // Vérifier l'extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif'];
  
  if (!extension || !allowedExtensions.includes(extension)) {
    errors.push('Extension de fichier non autorisée');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
