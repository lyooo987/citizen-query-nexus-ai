
import { supabase } from '@/integrations/supabase/client';
import { securityMonitor } from '@/utils/unifiedSecurity';
import { useToast } from '@/hooks/use-toast';

export function useAuthActions() {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const validation = securityMonitor.validateInput(email, 'email');
      if (!validation.isValid) {
        return { error: { message: 'Email invalide détecté' } };
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        securityMonitor.logSecurityEvent('signup_failed', {
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return { error };
      }

      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const validation = securityMonitor.validateInput(email, 'email');
      if (!validation.isValid) {
        return { error: { message: 'Email invalide détecté' } };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        securityMonitor.logSecurityEvent('login_failed', {
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return { error };
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'application !",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Signin error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { error: { message: 'Utilisateur non connecté' } };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) return { error };

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return { error };
    }
  };

  return { signUp, signIn, signOut, updateProfile };
}
