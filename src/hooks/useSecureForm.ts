
import { useState, useCallback } from 'react';
import { enhancedValidation, secureSanitizer } from '@/utils/enhancedSecurity';

interface ValidationRule {
  type: 'email' | 'phone' | 'password' | 'custom';
  validator?: (value: string) => boolean;
  message: string;
  required?: boolean;
}

interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export function useSecureForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRule>>
) {
  const [fields, setFields] = useState<Record<keyof T, FormField>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key] || '',
        touched: false
      };
      return acc;
    }, {} as Record<keyof T, FormField>)
  );

  const validateField = useCallback((name: keyof T, value: string): string | undefined => {
    const rule = validationRules[name];
    if (!rule) return undefined;

    if (rule.required && !value.trim()) {
      return 'Ce champ est requis';
    }

    if (!value && !rule.required) return undefined;

    switch (rule.type) {
      case 'email':
        return enhancedValidation.email(value) ? undefined : rule.message;
      case 'phone':
        return enhancedValidation.phone(value) ? undefined : rule.message;
      case 'password':
        const passwordResult = enhancedValidation.strongPassword(value);
        return passwordResult.valid ? undefined : passwordResult.feedback.join(', ');
      case 'custom':
        return rule.validator?.(value) ? undefined : rule.message;
      default:
        return undefined;
    }
  }, [validationRules]);

  const updateField = useCallback((name: keyof T, value: string) => {
    const sanitizedValue = secureSanitizer.html(value);
    const error = validateField(name, sanitizedValue);
    
    setFields(prev => ({
      ...prev,
      [name]: {
        value: sanitizedValue,
        error,
        touched: true
      }
    }));
  }, [validateField]);

  const validateAll = useCallback((): boolean => {
    let isValid = true;
    const updatedFields = { ...fields };

    Object.keys(fields).forEach(key => {
      const fieldKey = key as keyof T;
      const error = validateField(fieldKey, fields[fieldKey].value);
      updatedFields[fieldKey] = {
        ...updatedFields[fieldKey],
        error,
        touched: true
      };
      if (error) isValid = false;
    });

    setFields(updatedFields);
    return isValid;
  }, [fields, validateField]);

  const getValues = useCallback((): T => {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key as keyof T] = fields[key as keyof T].value as any;
      return acc;
    }, {} as T);
  }, [fields]);

  const reset = useCallback(() => {
    setFields(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = {
          value: initialValues[key] || '',
          touched: false
        };
        return acc;
      }, {} as Record<keyof T, FormField>)
    );
  }, [initialValues]);

  return {
    fields,
    updateField,
    validateAll,
    getValues,
    reset,
    isValid: Object.values(fields).every(field => !field.error)
  };
}
