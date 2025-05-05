import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../auth/services/userService';
import styles from './index.module.css';

const ProfileEdit = () => {
  const { currentUser, userProfile, updateUserProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  // Form verilerini userProfile'dan doldur
  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        birthDate: userProfile.birthDate || '',
        birthTime: userProfile.birthTime || '',
        birthPlace: userProfile.birthPlace || ''
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await userService.updateUserProfile(currentUser.uid, formData);
      console.log('Update result:', result);
      
      if (result.success) {
        console.log('Profile başarıyla kaydedildi, refreshUserProfile çağırılıyor...');
        await refreshUserProfile();
        console.log('refreshUserProfile tamamlandı');
        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        setError(result.error || 'Profil güncellenirken bir hata oluştu');
      }
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null; // AuthGuard zaten handle edecek
  }

  return (
    <div className={styles.profileEditPage}>
      <div className={styles.container}>
        <div className={styles.profileEditCard}>
          {/* Header Section */}
          <div className={styles.profileHeader}>
            <h1 className={styles.title}>Profil Düzenle</h1>
            <p className={styles.subtext}>
              Astrolojik analizlerinizin doğru olması için bilgilerinizi güncel tutun
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  Ad
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Adınızı girin"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Soyad
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Soyadınızı girin"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="birthDate" className={styles.label}>
                  Doğum Tarihi
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="birthTime" className={styles.label}>
                  Doğum Saati
                </label>
                <span className={styles.helperText}>(Opsiyonel)</span>
                <input
                  type="time"
                  id="birthTime"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="birthPlace" className={styles.label}>
                  Doğum Yeri
                </label>
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Doğduğunuz şehri girin"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className={styles.success}>
                Profil başarıyla güncellendi! Yönlendiriliyorsunuz...
              </div>
            )}

            {/* Form Actions */}
            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className={styles.cancelButton}
                disabled={loading}
              >
                İptal
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
