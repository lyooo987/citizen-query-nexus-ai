
import { useState, useCallback } from 'react';

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: Date;
}

export function useErrorBoundary() {
  const [error, setError] = useState<ErrorInfo | null>(null);

  const captureError = useCallback((error: Error, errorInfo?: any) => {
    const errorData: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date()
    };

    setError(errorData);
    
    // Log l'erreur pour le monitoring
    console.error('Error captured:', errorData);
    
    // En production, envoyer à un service de monitoring
    if (process.env.NODE_ENV === 'production') {
      // Exemple: Sentry, LogRocket, etc.
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetErrorBoundary = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    captureError,
    clearError,
    resetErrorBoundary,
    hasError: error !== null
  };
}
