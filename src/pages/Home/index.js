import React from 'react';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Yıldızlarınızı Keşfedin,<br />
              Geleceğinizi Aydınlatın
            </h1>
            <p className={styles.heroText}>
              Profesyonel burç yorumları ve kişisel doğum haritanızla<br />
              astrolojinin gizli dünyasına adım atın
            </p>
            <div className={styles.heroButtons}>
              <a href="/register" className={styles.primaryButton}>
                Ücretsiz Başla
              </a>
              <a href="/birth-chart" className={styles.secondaryButton}>
                Doğum Haritanı Keşfet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Neler Sunuyoruz?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⭐</div>
              <h3 className={styles.featureTitle}>Günlük Burç Yorumları</h3>
              <p className={styles.featureText}>
                Güncel ve kişiselleştirilmiş burç yorumlarınızı her gün takip edin
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌟</div>
              <h3 className={styles.featureTitle}>Doğum Haritası Analizi</h3>
              <p className={styles.featureText}>
                Doğum tarihinize göre detaylı astrolojik haritanızı inceleyin
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔮</div>
              <h3 className={styles.featureTitle}>Kişisel Öngörüler</h3>
              <p className={styles.featureText}>
                Size özel gelecek tahminleri ve yaşam önerileri alın
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>❤️</div>
              <h3 className={styles.featureTitle}>Burç Uyumluluk</h3>
              <p className={styles.featureText}>
                Partnerinizle astrolojik uyumluluğunuzu keşfedin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nasıl Çalışır?</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Kaydol</h3>
              <p className={styles.stepText}>Ücretsiz hesap oluştur</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Bilgileri Gir</h3>
              <p className={styles.stepText}>Doğum tarih ve saatini gir</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Keşfet</h3>
              <p className={styles.stepText}>Haritanı incele ve öngörüleri takip et</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Kullanıcı Yorumları</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                "Bu uygulama hayatımı değiştirdi! Günlük burç yorumları gerçekten çok doğru."
              </p>
              <p className={styles.testimonialAuthor}>- Ayşe K.</p>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                "Doğum haritam gerçekten çok doğruydu. Kendimi daha iyi anlıyorum artık."
              </p>
              <p className={styles.testimonialAuthor}>- Mehmet T.</p>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                "Premium üyelik gerçekten değerli özellikler sunuyor. Kesinlikle tavsiye ederim!"
              </p>
              <p className={styles.testimonialAuthor}>- Zeynep A.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Üyelik Planları</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingTitle}>Ücretsiz</h3>
              <div className={styles.pricingPrice}>₺0<span>/ay</span></div>
              <ul className={styles.pricingFeatures}>
                <li>✓ Günlük burç yorumları</li>
                <li>✓ Temel doğum haritası</li>
                <li>✗ Detaylı analizler</li>
                <li>✗ Premium öngörüler</li>
              </ul>
              <a href="/register" className={styles.pricingButton}>Başla</a>
            </div>
            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.popularBadge}>En Popüler</div>
              <h3 className={styles.pricingTitle}>Premium</h3>
              <div className={styles.pricingPrice}>₺99<span>/ay</span></div>
              <ul className={styles.pricingFeatures}>
                <li>✓ Tüm ücretsiz özellikler</li>
                <li>✓ Detaylı doğum haritası analizi</li>
                <li>✓ Kişisel astrolojik rehberlik</li>
                <li>✓ Premium öngörüler ve raporlar</li>
              </ul>
              <a href="/register?plan=premium" className={styles.pricingButton}>Premium'a Geç</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Astrolojinin gücünü keşfetmeye hazır mısınız?</h2>
          <p className={styles.ctaText}>Hemen kaydolun ve ilk doğum haritanızı ücretsiz keşfedin!</p>
          <a href="/register" className={styles.ctaButton}>Hemen Başla - Ücretsiz</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
