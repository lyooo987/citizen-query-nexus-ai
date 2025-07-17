
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ErrorInfo {
  message: string;
  code?: string;
  context?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export function useErrorHandler() {
  const { toast } = useToast();

  const handleError = useCallback((error: ErrorInfo | Error | string) => {
    let errorInfo: ErrorInfo;

    if (typeof error === 'string') {
      errorInfo = { message: error, severity: 'medium' };
    } else if (error instanceof Error) {
      errorInfo = { 
        message: error.message, 
        severity: 'medium',
        context: error.stack 
      };
    } else {
      errorInfo = error;
    }

    // Log sécurisé pour le débogage
    console.error('Application Error:', {
      message: errorInfo.message,
      code: errorInfo.code,
      severity: errorInfo.severity,
      timestamp: new Date().toISOString()
    });

    // Affichage à l'utilisateur
    const userMessage = getSafeUserMessage(errorInfo);
    
    toast({
      title: "Erreur",
      description: userMessage,
      variant: "destructive",
      duration: errorInfo.severity === 'critical' ? 10000 : 5000,
    });

    // Rapport d'erreur pour les erreurs critiques
    if (errorInfo.severity === 'critical') {
      reportCriticalError(errorInfo);
    }
  }, [toast]);

  const handleSuccess = useCallback((message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: "default",
      duration: 3000,
    });
  }, [toast]);

  const handleWarning = useCallback((message: string, description?: string) => {
    toast({
      title: "Attention",
      description: message,
      variant: "destructive",
      duration: 4000,
    });
  }, [toast]);

  return {
    handleError,
    handleSuccess,
    handleWarning
  };
}

function getSafeUserMessage(errorInfo: ErrorInfo): string {
  // Messages utilisateur sécurisés (ne pas exposer d'informations sensibles)
  const safeMessages: Record<string, string> = {
    'NETWORK_ERROR': 'Problème de connexion réseau. Veuillez réessayer.',
    'VALIDATION_ERROR': 'Les données saisies ne sont pas valides.',
    'PERMISSION_ERROR': 'Vous n\'avez pas les permissions nécessaires.',
    'FILE_ERROR': 'Erreur lors du traitement du fichier.',
    'TIMEOUT_ERROR': 'L\'opération a pris trop de temps. Veuillez réessayer.',
  };

  return safeMessages[errorInfo.code || ''] || 'Une erreur inattendue s\'est produite.';
}

function reportCriticalError(errorInfo: ErrorInfo): void {
  // Implémentation future pour rapporter les erreurs critiques
  console.error('CRITICAL ERROR REPORTED:', errorInfo);
}
