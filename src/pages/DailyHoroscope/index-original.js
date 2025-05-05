import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const DailyHoroscope = () => {
  const [generalHoroscope, setGeneralHoroscope] = useState('');
  const [featuredSign, setFeaturedSign] = useState({ sign: '', horoscope: '' });
  const [planetaryTransit, setPlanetaryTransit] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        setLoading(true);
        
        // Backend proxy'yi kullan
        const proxyUrl = 'http://localhost:3001/api/horoscope';
        
        // Genel burç yorumu için rastgele bir burcun verisi
        const randomSign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)].toLowerCase();
        console.log('Random sign:', randomSign);
        
        const randomResponse = await fetch(`${proxyUrl}?sign=${randomSign}&day=today`);
        console.log('Random response status:', randomResponse.status);
        
        const randomData = await randomResponse.json();
        console.log('Random data:', randomData);
        
        // Öne çıkan burç yorumu
        const featuredSignName = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
        const featuredResponse = await fetch(`${proxyUrl}?sign=${featuredSignName.toLowerCase()}&day=today`);
        const featuredData = await featuredResponse.json();
        
        setGeneralHoroscope(randomData?.data?.horoscope_data || 'Burç yorumu getirilemiyor');
        setFeaturedSign({ 
          sign: featuredSignName, 
          horoscope: featuredData?.data?.horoscope_data || 'Burç yorumu getirilemiyor'
        });
        
        // Simülasyon: Astrolojik kavşak verisi
        const transitMessages = [
          'Bugün Merkür İkizler burcuna geçiş yapıyor, iletişim güçleniyor.',
          'Venüs Boğa burcunda, aşk ve güzellik için harika bir gün.',
          'Mars Aslan burcunda, cesaret ve güveniniz dorukta.',
          'Jüpiter Oğlak burcunda, kariyer fırsatları önünüzde.'
        ];
        setPlanetaryTransit(transitMessages[Math.floor(Math.random() * transitMessages.length)]);
        
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        
        // Demo verilerle devam et
        setGeneralHoroscope('Bugün gezegenler size olumlu enerji gönderiyor. Ruh haliniz içindeki zit duyguları dengelemeye yönelik. Aşıksanız belki biraz duygusal olabilirsiniz. Karmaşık duygularınız varsa enerjinizi yaşama odaklayın.');
        setFeaturedSign({ 
          sign: zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)], 
          horoscope: 'Bugün sizin için Şanslı bir gün olabilir. Yeni fırsatlar karşınıza çıkabilir.' 
        });
        setError('API hatası: Demo veriler gösteriliyor.');
        setLoading(false);
      }
    };

    fetchHoroscopes();
  }, []);

  const zodiacIcons = {
    Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
    Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
    Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓'
  };

  return (
    <div className={styles.dailyHoroscopePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Günlük Burç Yorumları
          </h1>
          <p className={styles.subtitle}>
            {new Date().toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Astrolojik veriler yükleniyor...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <section className={styles.mainContent}>
          <div className={styles.container}>
            <div className={styles.overviewGrid}>
              {/* Genel Bakış Kartı */}
              <div className={styles.overviewCard}>
                <h2 className={styles.cardTitle}>
                  <span className={styles.cardIcon}>🌟</span>
                  Bugünün Genel Enerjisi
                </h2>
                <p className={styles.cardContent}>
                  {generalHoroscope}
                </p>
              </div>

              {/* Öne Çıkan Burç Kartı */}
              <div className={styles.overviewCard}>
                <h2 className={styles.cardTitle}>
                  <span className={styles.cardIcon}>✨</span>
                  Günün Öne Çıkan Burcu
                </h2>
                <div className={styles.featuredSign}>
                  <div className={styles.signContainer}>
                    <span className={styles.zodiacSymbol}>
                      {zodiacIcons[featuredSign.sign]}
                    </span>
                    <span className={styles.signName}>
                      {featuredSign.sign}
                    </span>
                  </div>
                  <p className={styles.cardContent}>
                    {featuredSign.horoscope}
                  </p>
                </div>
              </div>

              {/* Astrolojik Kavşak Kartı */}
              <div className={styles.overviewCard}>
                <h2 className={styles.cardTitle}>
                  <span className={styles.cardIcon}>🔮</span>
                  Astrolojik Kavşaklar
                </h2>
                <p className={styles.cardContent}>
                  {planetaryTransit}
                </p>
              </div>
            </div>

            {/* Kişisel Burç Yorumları için Kayıt Çağrısı */}
            <div className={styles.registerPrompt}>
              <h2>Kişisel Burç Yorumlarınızı Görmek İster Misiniz?</h2>
              <p>
                Size özel günlük burç yorumları, detaylı analizler ve kişisel öneriler için giriş yapın veya hesap oluşturun.
              </p>
              <div className={styles.registerButtons}>
                <Link to="/login" className={styles.loginButton}>
                  Giriş Yap
                </Link>
                <Link to="/register" className={styles.registerButton}>
                  Kayıt Ol
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DailyHoroscope;
