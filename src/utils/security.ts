
// Utilitaires de sécurité pour l'application

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+213|0)[5-7][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateAlgerianId = (id: string): boolean => {
  // Validation basique pour les numéros d'identité algériens
  const idRegex = /^[0-9]{12}$/;
  return idRegex.test(id);
};

export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const hashSensitiveData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'La taille du fichier dépasse 10MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Type de fichier non autorisé' };
  }

  return { valid: true };
};

export const logSecurityEvent = (event: {
  type: 'login' | 'logout' | 'access_denied' | 'data_access' | 'file_upload';
  userId?: string;
  details: string;
  timestamp?: Date;
}) => {
  const logEntry = {
    ...event,
    timestamp: event.timestamp || new Date(),
    userAgent: navigator.userAgent,
    ip: 'client-side' // En production, ceci serait géré côté serveur
  };

  console.log('Security Event:', logEntry);
  
  // En production, ceci serait envoyé à un service de logging sécurisé
  if (typeof window !== 'undefined') {
    const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    logs.push(logEntry);
    
    // Garder seulement les 100 derniers logs
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    localStorage.setItem('security_logs', JSON.stringify(logs));
  }
};

export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 20;
  } else {
    feedback.push('Le mot de passe doit contenir au moins 8 caractères');
  }

  if (/[a-z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Ajouter des lettres minuscules');
  }

  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Ajouter des lettres majuscules');
  }

  if (/[0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Ajouter des chiffres');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Ajouter des caractères spéciaux');
  }

  return { score, feedback };
};
