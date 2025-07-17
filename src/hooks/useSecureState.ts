
import { useState, useCallback } from 'react';
import { sanitizeInput } from '@/utils/security';

/**
 * Hook pour gérer l'état avec validation de sécurité
 */
export function useSecureState<T>(initialValue: T, validator?: (value: T) => boolean) {
  const [value, setValue] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(true);

  const setSecureValue = useCallback((newValue: T) => {
    let valid = true;
    
    // Validation par défaut pour les chaînes
    if (typeof newValue === 'string') {
      // Use sanitizeInput and check if the value was modified
      const sanitized = sanitizeInput(newValue as string);
      valid = sanitized === newValue; // Valid if no sanitization was needed
    }
    
    // Validation personnalisée
    if (validator) {
      valid = valid && validator(newValue);
    }
    
    setIsValid(valid);
    if (valid) {
      setValue(newValue);
    }
  }, [validator]);

  return [value, setSecureValue, isValid] as const;
}
