import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const DailyHoroscope = () => {
  const [generalHoroscope, setGeneralHoroscope] = useState('');
  const [featuredSign, setFeaturedSign] = useState({ sign: '', horoscope: '' });
  const [planetaryTransit, setPlanetaryTransit] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translating, setTranslating] = useState(false);

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // Burç isimlerinin Türkçe karşılıkları
  const zodiacSignsInTurkish = {
    'Aries': 'Koç',
    'Taurus': 'Boğa',
    'Gemini': 'İkizler',
    'Cancer': 'Yengeç',
    'Leo': 'Aslan',
    'Virgo': 'Başak',
    'Libra': 'Terazi',
    'Scorpio': 'Akrep',
    'Sagittarius': 'Yay',
    'Capricorn': 'Oğlak',
    'Aquarius': 'Kova',
    'Pisces': 'Balık'
  };

  // Günün tarihini YYYY-MM-DD formatında al
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // LocalStorage'dan günün verisini al
  const getTodayHoroscopeData = () => {
    const todayDate = getTodayDate();
    const storedData = localStorage.getItem('dailyHoroscope');
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.date === todayDate) {
        return parsedData;
      }
    }
    return null;
  };

  // Veriyi localStorage'a kaydet
  const saveTodayHoroscopeData = (data) => {
    const todayDate = getTodayDate();
    const dataToStore = {
      date: todayDate,
      ...data
    };
    localStorage.setItem('dailyHoroscope', JSON.stringify(dataToStore));
  };

  // Çeviri fonksiyonu
  const translateText = async (text) => {
    try {
      const response = await fetch('http://localhost:3001/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadHoroscopes = async () => {
      try {
        setLoading(true);
        
        // Önce localStorage'dan veri deneyelim
        const cachedData = getTodayHoroscopeData();
        
        if (cachedData) {
          // Cache'den veriyi yükle
          setGeneralHoroscope(cachedData.generalHoroscope);
          setFeaturedSign(cachedData.featuredSign);
          setPlanetaryTransit(cachedData.planetaryTransit);
          setLoading(false);
          return;
        }

        // Cache yoksa, API'den veriyi çek
        const proxyUrl = 'http://localhost:3001/api/horoscope';
        
        // Günün burçlarını belirle (deterministik olsun diye bugünün tarihinden seed oluşturuyoruz)
        const today = new Date();
        const seed = today.getFullYear() * 10000 + today.getMonth() * 100 + today.getDate();
        
        // Sabit burç seçimi için seed kullan
        const randomIndex = seed % zodiacSigns.length;
        const featuredIndex = (seed + 3) % zodiacSigns.length; // Farklı bir burç seçsin diye
        
        const randomSign = zodiacSigns[randomIndex].toLowerCase();
        const featuredSignName = zodiacSigns[featuredIndex];
        
        console.log('Random sign:', randomSign);
        console.log('Featured sign:', featuredSignName);
        
        const randomResponse = await fetch(`${proxyUrl}?sign=${randomSign}&day=today`);
        console.log('Random response status:', randomResponse.status);
        
        const randomData = await randomResponse.json();
        console.log('Random data:', randomData);
        
        const featuredResponse = await fetch(`${proxyUrl}?sign=${featuredSignName.toLowerCase()}&day=today`);
        const featuredData = await featuredResponse.json();
        
        // Metinleri çevir
        setTranslating(true);
        
        const generalHoroscopeEnglish = randomData?.data?.horoscope_data || 'Burç yorumu getirilemiyor';
        const featuredHoroscopeEnglish = featuredData?.data?.horoscope_data || 'Burç yorumu getirilemiyor';
        
        const [translatedGeneral, translatedFeatured] = await Promise.all([
          translateText(generalHoroscopeEnglish),
          translateText(featuredHoroscopeEnglish)
        ]);
        
        // Astrolojik kavşak verisi (bugün için sabit)
        const transitMessages = [
          'Bugün Merkür İkizler burcuna geçiş yapıyor, iletişim güçleniyor.',
          'Venüs Boğa burcunda, aşk ve güzellik için harika bir gün.',
          'Mars Aslan burcunda, cesaret ve güveniniz dorukta.',
          'Jüpiter Oğlak burcunda, kariyer fırsatları önünüzde.'
        ];
        const transitIndex = seed % transitMessages.length;
        const selectedTransit = transitMessages[transitIndex];
        
        // Veriyi state'lere set et
        const horoscopeData = {
          generalHoroscope: translatedGeneral,
          featuredSign: { 
            sign: featuredSignName, 
            signInTurkish: zodiacSignsInTurkish[featuredSignName],
            horoscope: translatedFeatured
          },
          planetaryTransit: selectedTransit
        };
        
        setGeneralHoroscope(horoscopeData.generalHoroscope);
        setFeaturedSign(horoscopeData.featuredSign);
        setPlanetaryTransit(horoscopeData.planetaryTransit);
        
        // Veriyi localStorage'a kaydet
        saveTodayHoroscopeData(horoscopeData);
        
        setTranslating(false);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        
        // Demo verilerle devam et
        setGeneralHoroscope('Bugün gezegenler size olumlu enerji gönderiyor. Ruh haliniz içindeki zit duyguları dengelemeye yönelik. Aşıksanız belki biraz duygusal olabilirsiniz. Karmaşık duygularınız varsa enerjinizi yaşama odaklayın.');
        setFeaturedSign({ 
          sign: zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)], 
          signInTurkish: zodiacSignsInTurkish[zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)]],
          horoscope: 'Bugün sizin için Şanslı bir gün olabilir. Yeni fırsatlar karşınıza çıkabilir.' 
        });
        setError('API hatası: Demo veriler gösteriliyor.');
        setTranslating(false);
        setLoading(false);
      }
    };

    loadHoroscopes();
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
      {(loading || translating) && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>{translating ? 'Burç yorumları çevriliyor...' : 'Astrolojik veriler yükleniyor...'}</p>
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
      {!loading && !translating && !error && (
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
                      {featuredSign.signInTurkish || featuredSign.sign}
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
