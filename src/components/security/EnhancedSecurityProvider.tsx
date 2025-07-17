
import React, { createContext, useContext, useEffect, useState } from 'react';
import { securityMonitor } from '@/utils/enhancedSecurity';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityState {
  level: 'low' | 'medium' | 'high' | 'critical';
  threats: number;
  isSecure: boolean;
  lastCheck: Date;
}

interface SecurityContextType extends SecurityState {
  reportThreat: (threat: string, details: any) => void;
  clearAlerts: () => void;
  runSecurityCheck: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function EnhancedSecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityState, setSecurityState] = useState<SecurityState>({
    level: 'medium',
    threats: 0,
    isSecure: true,
    lastCheck: new Date()
  });
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const reportThreat = (threat: string, details: any) => {
    securityMonitor.logSecurityEvent(threat, details, 'medium');
    setSecurityState(prev => ({
      ...prev,
      threats: prev.threats + 1,
      level: prev.threats > 5 ? 'high' : prev.threats > 2 ? 'medium' : 'low'
    }));
    
    if (securityState.threats > 3) {
      setAlertMessage(`Menace de sécurité détectée: ${threat}`);
      setShowAlert(true);
    }
  };

  const clearAlerts = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const runSecurityCheck = () => {
    const report = securityMonitor.getSecurityReport();
    setSecurityState(prev => ({
      ...prev,
      threats: report.last24h,
      level: report.last24h > 10 ? 'critical' : report.last24h > 5 ? 'high' : 'medium',
      isSecure: report.last24h < 5,
      lastCheck: new Date()
    }));
  };

  useEffect(() => {
    const interval = setInterval(runSecurityCheck, 60000); // Check every minute
    runSecurityCheck(); // Initial check
    return () => clearInterval(interval);
  }, []);

  const value: SecurityContextType = {
    ...securityState,
    reportThreat,
    clearAlerts,
    runSecurityCheck
  };

  return (
    <SecurityContext.Provider value={value}>
      {showAlert && (
        <Alert className="fixed top-4 right-4 z-[70] w-80 border-red-500 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {alertMessage}
            <button 
              onClick={clearAlerts}
              className="ml-2 text-sm underline hover:no-underline"
            >
              Ignorer
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Security Status Indicator */}
      <div className="fixed bottom-4 right-4 z-[60]">
        <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
          {securityState.isSecure ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <Shield className="w-4 h-4 text-yellow-600" />
          )}
          <span className="text-xs text-gray-600">
            Sécurité: {securityState.level}
          </span>
        </div>
      </div>
      
      {children}
    </SecurityContext.Provider>
  );
}

export function useEnhancedSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useEnhancedSecurity must be used within EnhancedSecurityProvider');
  }
  return context;
}
