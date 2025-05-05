import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import styles from './index.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const menuRef = useRef(null);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const menuItems = [
    { 
      name: 'Ana Sayfa', 
      path: '/', 
      icon: '🏠'
    },
    { 
      name: 'Günlük Burç', 
      path: '/daily-horoscope', 
      icon: '⭐'
    },
    { 
      name: 'Doğum Haritası', 
      path: '/birth-chart', 
      icon: '🌟'
    },
    { 
      name: 'Burçlar', 
      path: '/zodiac-signs',
      icon: '♈',
      dropdown: [
        { name: 'Koç', path: '/zodiac/aries', icon: '♈' },
        { name: 'Boğa', path: '/zodiac/taurus', icon: '♉' },
        { name: 'İkizler', path: '/zodiac/gemini', icon: '♊' },
        { name: 'Yengeç', path: '/zodiac/cancer', icon: '♋' },
        { name: 'Aslan', path: '/zodiac/leo', icon: '♌' },
        { name: 'Başak', path: '/zodiac/virgo', icon: '♍' },
        { name: 'Terazi', path: '/zodiac/libra', icon: '♎' },
        { name: 'Akrep', path: '/zodiac/scorpio', icon: '♏' },
        { name: 'Yay', path: '/zodiac/sagittarius', icon: '♐' },
        { name: 'Oğlak', path: '/zodiac/capricorn', icon: '♑' },
        { name: 'Kova', path: '/zodiac/aquarius', icon: '♒' },
        { name: 'Balık', path: '/zodiac/pisces', icon: '♓' }
      ]
    },
    { 
      name: 'İletişim', 
      path: '/contact', 
      icon: '📫'
    }
  ];

  // Kullanıcı giriş yaptıysa ekstra menü öğeleri
  const authenticatedMenuItems = currentUser ? [
    { 
      name: 'Profil', 
      path: '/profile', 
      icon: '👤'
    }
  ] : [];

  const allMenuItems = [...menuItems, ...authenticatedMenuItems];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img 
            src="/yatayLogo.png" 
            alt="Moria Logo" 
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            {allMenuItems.map((item, index) => (
              <li 
                key={index} 
                className={styles.navItem}
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <Link 
                  to={item.path} 
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.name}</span>
                  {item.dropdown && <span className={styles.dropdownArrow}>▼</span>}
                </Link>

                {/* Desktop Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <ul className={styles.dropdown}>
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex} className={styles.dropdownItem}>
                        <Link 
                          to={subItem.path} 
                          className={styles.dropdownLink}
                        >
                          <span className={styles.dropdownIcon}>{subItem.icon}</span>
                          <span className={styles.dropdownText}>{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          
          {/* Auth Section */}
          <div className={styles.authContainer}>
            {currentUser ? (
              <>
                <span className={styles.userGreeting}>
                  Merhaba, {currentUser.displayName || currentUser.email}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.loginButton}>Giriş Yap</Link>
                <Link to="/register" className={styles.registerButton}>Kayıt Ol</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`} ref={menuRef}>
          <div className={styles.mobileMenuContent}>
            <ul className={styles.mobileNavList}>
              {allMenuItems.map((item, index) => (
                <li key={index} className={styles.mobileNavItem}>
                  {item.dropdown ? (
                    <>
                      <button
                        className={styles.mobileNavLink}
                        onClick={() => handleDropdownToggle(item.name)}
                      >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navText}>{item.name}</span>
                        <span className={styles.dropdownArrow}>
                          {activeDropdown === item.name ? '▲' : '▼'}
                        </span>
                      </button>
                      
                      {activeDropdown === item.name && (
                        <ul className={styles.mobileDropdown}>
                          {item.dropdown.map((subItem, subIndex) => (
                            <li key={subIndex} className={styles.mobileDropdownItem}>
                              <Link 
                                to={subItem.path} 
                                className={styles.mobileDropdownLink}
                                onClick={closeMenu}
                              >
                                <span className={styles.dropdownIcon}>{subItem.icon}</span>
                                <span className={styles.dropdownText}>{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={styles.mobileNavLink}
                      onClick={closeMenu}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navText}>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Mobile Auth Section */}
            <div className={styles.mobileAuthContainer}>
              {currentUser ? (
                <>
                  <span className={styles.mobileUserGreeting}>
                    Merhaba, {currentUser.displayName || currentUser.email}
                  </span>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.loginButton} onClick={closeMenu}>Giriş Yap</Link>
                  <Link to="/register" className={styles.registerButton} onClick={closeMenu}>Kayıt Ol</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
