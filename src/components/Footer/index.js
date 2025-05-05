import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.container}>
          {/* Footer Grid */}
          <div className={styles.footerGrid}>
            {/* Logo & Description */}
            <div className={styles.footerSection}>
              <div className={styles.logoSection}>
                <img src="/yatayLogo.png" alt="Logo" className={styles.logoImage} />
                <p className={styles.logoDescription}>
                  Yıldızlarınızı keşfedin, geleceğinizi aydınlatın.
                </p>
              </div>
              {/* Social Media */}
              <div className={styles.socialMedia}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">📸</a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Hızlı Bağlantılar</h3>
              <ul className={styles.footerList}>
                <li><Link to="/" className={styles.footerLink}>Ana Sayfa</Link></li>
                <li><Link to="/daily-horoscope" className={styles.footerLink}>Günlük Burç</Link></li>
                <li><Link to="/birth-chart" className={styles.footerLink}>Doğum Haritası</Link></li>
                <li><Link to="/zodiac-signs" className={styles.footerLink}>Burçlar</Link></li>
                <li><Link to="/contact" className={styles.footerLink}>İletişim</Link></li>
              </ul>
            </div>

            {/* About */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Hakkımızda</h3>
              <ul className={styles.footerList}>
                <li><Link to="/about" className={styles.footerLink}>Biz Kimiz?</Link></li>
                <li><Link to="/privacy" className={styles.footerLink}>Gizlilik Politikası</Link></li>
                <li><Link to="/terms" className={styles.footerLink}>Kullanım Şartları</Link></li>
                <li><Link to="/faq" className={styles.footerLink}>Sıkça Sorulan Sorular</Link></li>
                <li><Link to="/blog" className={styles.footerLink}>Blog</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>İletişim</h3>
              <ul className={styles.footerList}>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span>İstanbul, Türkiye</span>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <span>info@moira.com</span>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>+90 (555) 555-5555</span>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>⏰</span>
                  <span>Pzt-Cum: 09:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <div className={styles.copyright}>
              <p>&copy; {currentYear} Moira. Tüm hakları saklıdır.</p>
            </div>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentTitle}>Ödeme Yöntemleri:</span>
              <span className={styles.paymentIcon}>💳</span>
              <span className={styles.paymentIcon}>💰</span>
              <span className={styles.paymentIcon}>🏦</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
