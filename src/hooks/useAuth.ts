import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');

      // 1. Sign up the user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!user) throw new Error('Signup failed');

      // 2. Create initial profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            full_name: '',
            updated_at: new Date().toISOString(),
          },
        ]);

      if (profileError) throw profileError;

      return { user, error: null };
    } catch (err: any) {
      setError(err.message);
      return { user: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    loading,
    error,
  };
}