import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Moria'ya Hoş Geldiniz</h2>
        <p className="auth-subtitle">Hesabınıza giriş yapın</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="ornek@mail.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="********"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>

          <div className="form-footer">
            <p>
              Hesabınız yok mu? <a href="/register">Kayıt olun</a>
            </p>
            <p>
              <a href="/forgot-password">Şifremi unuttum</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
