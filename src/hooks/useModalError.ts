
import { useState, useCallback } from 'react';
import { ModalErrorState } from '@/types/modalTypes';
import { useToast } from '@/hooks/use-toast';

export function useModalError() {
  const [error, setError] = useState<ModalErrorState>({ hasError: false });
  const { toast } = useToast();

  const handleError = useCallback((errorMessage: string, showToast = true) => {
    console.error('Modal Error:', errorMessage);
    
    setError({
      hasError: true,
      error: errorMessage,
      retry: () => setError({ hasError: false })
    });

    if (showToast) {
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [toast]);

  const clearError = useCallback(() => {
    setError({ hasError: false });
  }, []);

  const retryWithCallback = useCallback((callback: () => void | Promise<void>) => {
    setError(prev => ({
      ...prev,
      retry: async () => {
        try {
          await callback();
          clearError();
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la tentative';
          handleError(errorMessage);
        }
      }
    }));
  }, [handleError, clearError]);

  return {
    error,
    handleError,
    clearError,
    retryWithCallback
  };
}
