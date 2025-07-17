
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { securityMonitor } from '@/utils/enhancedSecurity';
import { AlertTriangle } from 'lucide-react';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  context?: string;
  showSecurityWarning?: boolean;
}

export function SecureInput({ 
  context = 'general', 
  showSecurityWarning = true,
  onChange,
  ...props 
}: SecureInputProps) {
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);
  const [value, setValue] = useState(props.value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Validate input for security threats
    const validation = securityMonitor.validateInput(inputValue, context);
    
    if (!validation.isValid && showSecurityWarning) {
      setSecurityWarning('Contenu potentiellement dangereux détecté');
    } else {
      setSecurityWarning(null);
    }

    // Call original onChange with sanitized value
    if (onChange) {
      const sanitizedEvent = {
        ...e,
        target: {
          ...e.target,
          value: validation.sanitized
        }
      };
      onChange(sanitizedEvent);
    }
  };

  return (
    <div className="space-y-2">
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        className={securityWarning ? 'border-red-500' : undefined}
      />
      {securityWarning && (
        <Alert variant="destructive" className="py-2">
          <AlertTriangle className="w-4 h-4" />
          <AlertDescription className="text-sm">
            {securityWarning}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
