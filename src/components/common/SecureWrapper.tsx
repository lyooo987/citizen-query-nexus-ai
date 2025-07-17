
import React, { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { LoginForm } from '@/components/auth/LoginForm';
import { Loader2 } from 'lucide-react';
import { securityMonitor } from '@/utils/enhancedSecurity';

interface SecureWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Make authentication optional
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export function SecureWrapper({ children, requireAuth = false, requiredRole, fallback }: SecureWrapperProps) {
  const { user, userRole, loading } = useAuth();

  useEffect(() => {
    // Monitor unauthorized access attempts only if auth is required
    if (requireAuth && !loading && !user && requiredRole) {
      securityMonitor.logSecurityEvent('unauthorized_access_attempt', {
        requiredRole,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    }
  }, [user, loading, requiredRole, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If authentication is not required, always show content
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <LoginForm />;
  }

  // Check role requirements only if user is authenticated
  if (user && requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Accès refusé</h2>
          <p className="text-gray-600">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Rôle requis: {requiredRole} | Votre rôle: {userRole || 'Aucun'}
          </p>
          {fallback}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
