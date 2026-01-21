import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const initializeAuth = async () => {
      try {
        console.log('🔄 Verificando sesión...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error al obtener sesión:', error);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('✅ Usuario autenticado:', session.user.email);
        } else {
          console.log('ℹ️ No hay sesión activa');
        }
      } catch (error) {
        console.error('❌ Error en initializeAuth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Evento de auth:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          console.log('✅ Usuario inició sesión:', session?.user?.email);
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Usuario cerró sesión');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refrescado');
        } else if (event === 'USER_UPDATED') {
          console.log('📝 Usuario actualizado');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('🔄 Intentando login...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('✅ Login exitoso:', data.user.email);
      return { data, error: null };
    } catch (error) {
      console.error('❌ Error en login:', error.message);
      return { data: null, error };
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    try {
      console.log('🔄 Intentando registro...');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      console.log('✅ Registro exitoso:', data.user?.email);
      return { data, error: null };
    } catch (error) {
      console.error('❌ Error en registro:', error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🔄 Cerrando sesión...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      console.log('✅ Sesión cerrada exitosamente');
      return { error: null };
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error.message);
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      console.log('🔄 Enviando email de recuperación...');
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/Reset-Password`,
      });

      if (error) throw error;

      console.log('✅ Email de recuperación enviado');
      return { data, error: null };
    } catch (error) {
      console.error('❌ Error al enviar email:', error.message);
      return { data: null, error };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      console.log('🔄 Actualizando contraseña...');
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      console.log('✅ Contraseña actualizada');
      return { data, error: null };
    } catch (error) {
      console.error('❌ Error al actualizar contraseña:', error.message);
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;