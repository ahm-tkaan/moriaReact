# MORIA TASARIM KILAVUZU

Bu belge, Moria projesi için geçerli olan tasarım kurallarını, prensiplerini ve yönergelerini içerir. Yeni özellik eklerken veya mevcut sayfalarda değişiklik yaparken bu belgeyi referans alarak tutarlılığı koruyunuz.

## 1. RENK PALETİ

### 1.1 Ana Renkler
```css
/* Gradyan Kombinasyonları */
--gradient-primary: linear-gradient(135deg, #ac94ac 0%, #614564 100%)
/* Mor/Pembe gradyanı - Hero, How It Works, Pricing sectionları için */

/* Solid Renkler */
--color-primary: #ce467e          /* Vurgu rengi - Buttonlar, highlights */
--color-primary-hover: #e8cfdf    /* Hover durumu için açık ton */
--color-primary-text: #5c3647     /* Hover'da text rengi */

--color-secondary: #614564        /* Başlıklar ve önemli metinler */
--color-text-light: #6b7280       /* Açıklama metinleri */
--color-text-dark: #374151        /* Koyu metin içerikleri */

--color-background: #f8f9fa       /* Ana sayfa arka planı */
--color-white: #ffffff            /* Card arka planları */
```

### 1.2 Renk Kullanım Kuralları
1. **Gradyan kullanımı**: Sadece önemli sectionlarda (Hero, How It Works, Pricing)
2. **Beyaz metin**: Gradyanlı alanlarda MUTLAKA beyaz kullanın
3. **Vurgu rengi**: CTA buttonları ve önemli elementlerde #ce467e
4. **Section başlıkları**: Beyaz arka planda #614564, gradyanlı arka planda beyaz

## 2. TİPOGRAFİ SİSTEMİ

### 2.1 Font Aileleri
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
```

### 2.2 Başlık Boyutları
```css
/* Desktop Boyutları */
h1: 4rem (64px)
h2: 3rem (48px)  
h3: 1.875rem (30px)

/* Mobile Boyutları */
h1: 3rem (48px)
h2: 2.5rem (40px)
h3: 1.5rem (24px)
```

### 2.3 Metin Boyutları
```css
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)  
--text-xl: 1.25rem (20px)
--text-small: 0.875rem (14px)
```

## 3. LAY OUT PRENSİPLERİ

### 3.1 Container Sistemi
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### 3.2 Section Padding
```css
/* Desktop */
sections: padding: 8rem 0;

/* Mobile */
sections: padding: 6rem 0;
```

### 3.3 Navbar Offset
**ÖNEMLİ**: Tüm sayfalar navbar için padding-top ayarlanmalı:
```css
/* Desktop */
.page-content {
  padding-top: 6rem;
}

/* Mobile */
@media (max-width: 640px) {
  .page-content {
    padding-top: 5rem;
  }
}
```

## 4. COMPONENT STANDARTLARİ

### 4.1 Button Stilleri
```css
/* Primary Button */
.primaryButton {
  background: #ce467e;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.primaryButton:hover {
  background: #e8cfdf;
  color: #5c3647;
  transform: translateY(-2px);
}

/* Secondary Button */
.secondaryButton {
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}
```

### 4.2 Card Stilleri
```css
.card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
```

### 4.3 Form Elemanları
```css
.input {
  padding: 0.875rem;
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #495057;
  transition: all 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #ce467e;
  box-shadow: 0 0 0 3px rgba(206, 70, 126, 0.1);
}
```

## 5. GRİD SİSTEMİ

### 5.1 Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Pricing/Testimonial Grid */
.wideGrid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### 5.2 Flexbox Kullanımı
```css
.flex-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
```

## 6. ANİMASYON VE TRANSİSYONLAR

### 6.1 Standart Animasyonlar
```css
/* Hover Efektleri */
.hover-element {
  transition: all 0.3s ease;
}

.hover-element:hover {
  transform: translateY(-2px); /* Buttonlar için */
  transform: translateY(-5px); /* Cardlar için */
}
```

### 6.2 Arka Plan Animasyonları
```css
/* Yıldız Arka Planı */
.background-stars::before {
  content: '';
  position: absolute;
  background-image: url(../assets/stars-background.png);
  opacity: 0.3-0.4;
  z-index: 1;
}
```

## 7. RESPONSİVE DİZAYN KURALLARI

### 7.1 Breakpoints
```css
/* Tablet: 768px */
@media (min-width: 768px) {
  /* Büyük font boyutları */
  /* Step arrows görünür */
}

/* Desktop: 1024px */
@media (min-width: 1024px) {
  /* Maksimum padding değerleri */
  /* Optimum grid layouts */
}
```

### 7.2 Mobile-First Yaklaşım
1. Önce mobile tasarla
2. Tablet ve desktop için iyileştir
3. Touch-friendly button boyutları (min 44px)
4. Okunabilir font boyutları

## 8. ERİŞİLEBİLİRLİK KURALLARI

### 8.1 Kontrast Oranları
1. WCAG AA standardına uyum: minimum 4.5:1
2. Gradyanlı arka planlarda beyaz metin
3. Butonlarda hover durumunda kontrast korunmalı

### 8.2 Semantik HTML
1. Doğru başlık hiyerarşisi (h1 > h2 > h3)
2. Alt text'ler tüm görsellerde
3. ARIA attributeları gerektiğinde

## 9. YENİ SAYFA OLUŞTURURKEN KONTROL LİSTESİ

### 9.1 Zorunlu Gereksinimler
- [ ] Navbar için padding-top ayarlandı mı?
- [ ] Renk paleti standartlara uygun mu?
- [ ] Responsive breakpoints kontrol edildi mi?
- [ ] Button stilleri standart mu?
- [ ] Grid sistemi doğru kullanılıyor mu?
- [ ] Font boyutları tutarlı mı?
- [ ] Gradyanlı alanlarda beyaz metin kullanıldı mı?

### 9.2 Önerilen İyileştirmeler
- [ ] Hover animasyonları eklendi mi?
- [ ] Loading state'leri düşünüldü mü?
- [ ] Error state'ler tasarlandı mı?
- [ ] Empty state'ler planlandı mı?

## 10. ÖRNEK UYGULAMA

Yeni bir sayfa oluştururken aşağıdaki yapıyı temel alın:

```jsx
import React from 'react';
import styles from './index.module.css';

const YeniSayfa = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* İçerik */}
        </div>
      </div>
    </div>
  );
};

export default YeniSayfa;
```

```css
/* index.module.css */
.page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  padding: 6rem 0 2rem; /* Navbar offset */
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.content {
  /* İçerik stilleri */
}

/* Responsive */
@media (max-width: 640px) {
  .page {
    padding: 5rem 0 1rem;
  }
}
```

Bu kılavuza uyarak, Moria projesinde tutarlı ve profesyonel bir tasarım dili sürdürebilirsiniz.
