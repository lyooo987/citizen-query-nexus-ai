
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { securityMonitor } from '@/utils/unifiedSecurity';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>('citoyen');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data: roleData } = await supabase.rpc('get_current_user_role');
              setUserRole(roleData || 'citoyen');
              
              securityMonitor.logSecurityEvent('user_login', {
                userId: session.user.id,
                email: session.user.email,
                timestamp: new Date().toISOString()
              });
            } catch (error) {
              console.error('Error fetching user role:', error);
              setUserRole('citoyen');
            }
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, userRole, loading };
}
