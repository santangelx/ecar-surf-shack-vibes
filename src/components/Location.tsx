import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionEyebrow from './SectionEyebrow';
import { MAPS_DIRECTIONS_URL } from '@/lib/site';

const Location = () => {
  const { t } = useLanguage();

  return (
    <section id="ubicacion" style={{ scrollMarginTop: 80, padding: 'clamp(72px,11vw,150px) clamp(20px,6vw,96px)', background: '#E3EEF1' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow number="04" label={t('findUs')} />
        <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(32px,6vw,68px)', lineHeight: 0.98, letterSpacing: '-.02em', margin: '0 0 clamp(36px,5vw,60px)', maxWidth: '20ch', textWrap: 'balance' }}>
          {t('locationSubtitle')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(20px,3vw,40px)', alignItems: 'stretch' }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(28px,3.4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28 }}>
            <div>
              <h3 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(24px,3vw,32px)', margin: '0 0 12px', letterSpacing: '-.01em' }}>
                Open Sea
              </h3>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(17,49,62,.8)', margin: 0 }}>
                Paseo Miguel Ángel Blanco, 2<br />18690 Almuñécar<br />Granada, España
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(17,49,62,.74)', margin: '22px 0 0' }}>
                <strong style={{ color: '#11313E' }}>{t('howToFindUs')}:</strong> {t('locationDescription')}
              </p>
            </div>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ alignSelf: 'flex-start', background: '#0E7C99', color: '#fff', padding: '15px 28px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
            >
              {t('getDirections')} →
            </a>
          </div>
          <div style={{ borderRadius: 24, overflow: 'hidden', minHeight: 340, boxShadow: '0 24px 60px -34px rgba(17,49,62,.4)' }}>
            <iframe
              title="Mapa de OpenSea en la Playa de San Cristóbal, Almuñécar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.3!2d-3.695261!3d36.7294014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7189a876287c0f:0x38a35eb411bcec10!2sOpen+Sea!5e0!3m2!1ses!2ses!4v1716400674084!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: 340 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
