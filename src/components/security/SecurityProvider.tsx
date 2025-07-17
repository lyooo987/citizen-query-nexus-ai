
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { securityMonitor } from '@/utils/unifiedSecurity';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecurityContextType {
  securityLevel: 'low' | 'medium' | 'high';
  threats: number;
  isSecure: boolean;
  reportThreat: (threat: string, details: any) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [threats, setThreats] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const reportThreat = useCallback((threat: string, details: any) => {
    securityMonitor.logSecurityEvent(threat, details);
    setThreats(prev => prev + 1);
    
    if (threats > 3) {
      setSecurityLevel('high');
      setShowAlert(true);
    }
  }, [threats]);

  useEffect(() => {
    const interval = setInterval(() => {
      const report = securityMonitor.getSecurityReport();
      
      if (report.last24h > 10) {
        setSecurityLevel('high');
      } else if (report.last24h > 3) {
        setSecurityLevel('medium');
      } else {
        setSecurityLevel('low');
      }
      
      setThreats(report.last24h);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const value: SecurityContextType = useMemo(() => ({
    securityLevel,
    threats,
    isSecure: securityLevel !== 'high',
    reportThreat
  }), [securityLevel, threats, reportThreat]);

  return (
    <SecurityContext.Provider value={value}>
      {showAlert && (
        <Alert className="fixed top-4 right-4 z-50 w-80 border-red-500 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Activité suspecte détectée. Sécurité renforcée activée.
          </AlertDescription>
        </Alert>
      )}
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within SecurityProvider');
  }
  return context;
}
