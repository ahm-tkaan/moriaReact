import React from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const Profile = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  // Burç hesaplama fonksiyonu
  const getZodiacSign = (birthDate) => {
    if (!birthDate) return null;
    
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Koç';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Boğa';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'İkizler';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Yengeç';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Aslan';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Başak';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Terazi';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Akrep';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Yay';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Oğlak';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Kova';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Balık';
    
    return null;
  };

  // Eğer profil yoksa edit sayfasına yönlendir
  React.useEffect(() => {
    console.log('currentUser:', currentUser);
    console.log('userProfile:', userProfile);
    
    if (currentUser && !userProfile) {
      console.log('Profil bulunamadı, edit sayfasına yönlendiriliyor...');
      navigate('/profile/edit');
    }
  }, [currentUser, userProfile, navigate]);

  if (!currentUser) {
    return null; // AuthGuard zaten handle edecek
  }

  if (!userProfile) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Yükleniyor...</div>
      </div>
    );
  }

  const zodiacSign = getZodiacSign(userProfile.birthDate);

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.profileCard}>
        {/* Header Section */}
        <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
        <h1 className={styles.greeting}>
        Merhaba, {userProfile.firstName || 'Kullanıcı'}!
        </h1>
        <p className={styles.subtext}>Profil sayfanıza hoş geldiniz</p>
        </div>
            <button 
              onClick={() => navigate('/profile/edit')}
              className={styles.editButton}
            >
              Düzenle
            </button>
          </div>

          {/* Profile Info Section */}
          <div className={styles.profileInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.label}>Ad</label>
                <p className={styles.value}>{userProfile.firstName || '-'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.label}>Soyad</label>
                <p className={styles.value}>{userProfile.lastName || '-'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.label}>E-posta</label>
                <p className={styles.value}>{currentUser.email}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.label}>Doğum Tarihi</label>
                <p className={styles.value}>
                  {userProfile.birthDate ? 
                    new Date(userProfile.birthDate).toLocaleDateString('tr-TR') : '-'}
                </p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.label}>Doğum Saati</label>
                <p className={styles.value}>{userProfile.birthTime || '-'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.label}>Doğum Yeri</label>
                <p className={styles.value}>{userProfile.birthPlace || '-'}</p>
              </div>
            </div>

            {/* Zodiac Sign Section */}
            {zodiacSign && (
              <div className={styles.zodiacSection}>
                <div className={styles.zodiacCard}>
                  <div className={styles.zodiacEmoji}>♈</div>
                  <h3 className={styles.zodiacTitle}>Burcunuz: {zodiacSign}</h3>
                  <p className={styles.zodiacText}>
                    Astrolojik analizleriniz için doğum bilgileriniz kullanılacaktır.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
