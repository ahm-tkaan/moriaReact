import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const performLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { login: performLogin, loading, error };
};
