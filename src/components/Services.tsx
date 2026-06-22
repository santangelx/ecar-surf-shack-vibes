import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from './OptimizedImage';
import SectionEyebrow from './SectionEyebrow';

const Services = () => {
  const { t } = useLanguage();

  const cards = [
    {
      img: '/images/kayak.png',
      alt: 'Alquiler de kayaks dobles e individuales en la playa de Almuñécar para explorar la Costa Tropical',
      title: t('kayakTitle'),
      lead: t('kayakDescription'),
      body: t('kayakDetails'),
    },
    {
      img: '/images/paddle.png',
      alt: 'Alquiler de tablas de paddle surf SUP en Almuñécar para principiantes y expertos en el Mediterráneo',
      title: t('paddleTitle'),
      lead: t('paddleDescription'),
      body: t('paddleDetails'),
    },
  ];

  return (
    <section id="servicios" style={{ scrollMarginTop: 80, padding: 'clamp(72px,11vw,150px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow number="01" label={t('ourServices')} />
        <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(32px,6vw,68px)', lineHeight: 0.98, letterSpacing: '-.02em', margin: '0 0 clamp(40px,6vw,72px)', maxWidth: '18ch', textWrap: 'balance' }}>
          {t('experienceDescription')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(20px,3vw,40px)' }}>
          {cards.map((c) => (
            <article key={c.title} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px -32px rgba(17,49,62,.4)' }}>
              <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                <OptimizedImage src={c.img} alt={c.alt} sizes="(max-width: 880px) 100vw, 50vw" />
              </div>
              <div style={{ padding: 'clamp(24px,3vw,40px)' }}>
                <h3 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(24px,3vw,34px)', letterSpacing: '-.01em', margin: '0 0 10px' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#0E7C99', margin: '0 0 16px' }}>{c.lead}</p>
                <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(17,49,62,.74)', margin: 0 }}>{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
