import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();

  const performRegister = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await register(formData);
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

  return { register: performRegister, loading, error };
};
