import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionEyebrow from './SectionEyebrow';
import { BUSINESS } from '@/lib/site';

const BusinessHours = () => {
  const { t } = useLanguage();
  const hours = `${BUSINESS.opens} – ${BUSINESS.closes}`;

  return (
    <section id="horarios" style={{ scrollMarginTop: 80, padding: 'clamp(72px,11vw,150px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
        <div>
          <SectionEyebrow number="03" label={t('businessHours')} />
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(32px,6vw,68px)', lineHeight: 0.98, letterSpacing: '-.02em', margin: '0 0 20px', textWrap: 'balance' }}>
            {t('whenVisit')}
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(17,49,62,.74)', margin: 0, maxWidth: '42ch' }}>{t('hoursIntro')}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(28px,3.4vw,48px)', boxShadow: '0 24px 60px -34px rgba(17,49,62,.4)' }}>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.22em', textTransform: 'uppercase', color: '#0E7C99', marginBottom: 14 }}>
            {t('dailyHours')}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, paddingBottom: 24, borderBottom: '1px solid rgba(17,49,62,.12)' }}>
            <span style={{ fontSize: 20, fontWeight: 600 }}>{t('everyday')}</span>
            <span className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(24px,3vw,38px)', color: '#11313E', letterSpacing: '-.01em' }}>{hours}</span>
          </div>
          <div style={{ marginTop: 22, background: '#FBF1DD', border: '1px solid #F0DFB8', borderRadius: 14, padding: '18px 20px' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#9A6B17', margin: '0 0 4px' }}>{t('pleaseNote')}</p>
            <p style={{ fontSize: 14, color: '#9A6B17', margin: 0, lineHeight: 1.5 }}>{t('weatherNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHours;
