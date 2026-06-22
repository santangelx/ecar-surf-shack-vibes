import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MAPS_DIRECTIONS_URL } from '@/lib/site';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <header
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        background: '#0A5E74',
      }}
    >
      {/* LCP image: eager + high priority, served as WebP with a JPG fallback. */}
      <picture>
        <source
          type="image/webp"
          srcSet="/images/paddle-800w.webp 800w, /images/paddle-1200w.webp 1200w, /images/paddle-1600w.webp 1600w"
          sizes="100vw"
        />
        <img
          src="/images/paddle-1200w.jpg"
          alt="Paddle surf en el mar Mediterráneo de Almuñécar, Costa Tropical"
          {...{ fetchpriority: 'high' }}
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </picture>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,40,52,.5) 0%, rgba(8,40,52,.05) 32%, rgba(8,40,52,.82) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(120px,16vh,180px) clamp(20px,6vw,96px) clamp(56px,9vw,110px)',
          color: '#fff',
        }}
      >
        <div
          className="font-display"
          style={{ fontWeight: 700, letterSpacing: '.3em', fontSize: 13, textTransform: 'uppercase', opacity: 0.9, marginBottom: 'clamp(18px,3vw,28px)' }}
        >
          {t('heroEyebrow')}
        </div>
        <h1
          className="font-display"
          style={{ fontWeight: 800, fontSize: 'clamp(42px,9vw,112px)', lineHeight: 0.9, letterSpacing: '-.025em', maxWidth: '15ch', margin: '0 0 clamp(20px,3vw,30px)', textWrap: 'balance' }}
        >
          {t('tagline')}
        </h1>
        <p style={{ fontSize: 'clamp(16px,1.8vw,20px)', lineHeight: 1.6, maxWidth: '54ch', opacity: 0.92, margin: '0 0 clamp(28px,4vw,40px)' }}>
          {t('description')}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <a href="#precios" style={{ background: '#fff', color: '#11313E', padding: '16px 30px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            {t('viewPricesButton')}
          </a>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ border: '1.5px solid rgba(255,255,255,.55)', color: '#fff', padding: '16px 30px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
          >
            {t('getDirections')}
          </a>
        </div>
      </div>
      <a
        href="#servicios"
        aria-label={t('services')}
        style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', color: '#fff', textDecoration: 'none', animation: 'osFloat 2.4s ease-in-out infinite' }}
      >
        <ArrowDown style={{ width: 34, height: 34 }} />
      </a>
    </header>
  );
};

export default Hero;
