import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MAPS_DIRECTIONS_URL } from '@/lib/site';

interface PageHeroProps {
  /** Optional background image base path, e.g. "/images/kayak.png". Omit for the gradient hero. */
  image?: string;
  imageAlt?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Anchor for the "Ver Precios" button (e.g. "#precios-kayak"). Omit to hide CTAs. */
  pricesAnchor?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ image, imageAlt = '', eyebrow, title, subtitle, pricesAnchor }) => {
  const { t } = useLanguage();
  const base = image ? image.substring(0, image.lastIndexOf('.')) : '';

  return (
    <header
      style={{
        position: 'relative',
        minHeight: image ? 'clamp(440px,64svh,660px)' : 'clamp(420px,60svh,620px)',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        background: image ? '#0A5E74' : 'linear-gradient(155deg, #0A2832 0%, #0A5E74 55%, #0E7C99 100%)',
      }}
    >
      {image ? (
        <picture>
          <source type="image/webp" srcSet={`${base}-800w.webp 800w, ${base}-1200w.webp 1200w, ${base}-1600w.webp 1600w`} sizes="100vw" />
          <img
            src={`${base}-1200w.jpg`}
            alt={imageAlt}
            {...{ fetchpriority: 'high' }}
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </picture>
      ) : (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, background: 'radial-gradient(120% 80% at 80% 10%, rgba(111,197,220,.4) 0%, transparent 55%)' }} />
      )}
      {image && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,40,52,.55) 0%, rgba(8,40,52,.2) 40%, rgba(8,40,52,.82) 100%)' }} />
      )}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1280, margin: '0 auto', padding: 'clamp(110px,15vh,170px) clamp(20px,6vw,96px) clamp(48px,7vw,84px)', color: '#fff' }}>
        <div className="font-display" style={{ fontWeight: 700, letterSpacing: '.28em', fontSize: 13, textTransform: 'uppercase', opacity: 0.9, marginBottom: 18 }}>
          {eyebrow}
        </div>
        <h1 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(34px,6.5vw,80px)', lineHeight: 0.94, letterSpacing: '-.025em', maxWidth: '20ch', margin: '0 0 18px', textWrap: 'balance' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 'clamp(17px,1.8vw,22px)', fontWeight: 600, opacity: 0.92, margin: pricesAnchor ? '0 0 28px' : 0, maxWidth: '48ch' }}>
            {subtitle}
          </p>
        )}
        {pricesAnchor && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a href={pricesAnchor} style={{ background: '#fff', color: '#11313E', padding: '15px 28px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              {t('viewPricesButton')}
            </a>
            <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" style={{ border: '1.5px solid rgba(255,255,255,.55)', color: '#fff', padding: '15px 28px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              {t('getDirections')}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHero;
