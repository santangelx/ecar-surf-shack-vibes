import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionEyebrow from './SectionEyebrow';

const Prices = () => {
  const { t } = useLanguage();

  const products = [
    {
      name: t('twoPersonKayak'),
      note: t('includeLife'),
      rows: [
        [t('oneHour'), '€15'],
        [t('twoHours'), '€25'],
        [t('halfDay'), '€35'],
        [t('day'), '€60'],
      ],
    },
    {
      name: t('onePersonKayak'),
      note: t('includeLife'),
      rows: [
        [t('oneHour'), '€10'],
        [t('twoHours'), '€18'],
        [t('halfDay'), '€30'],
        [t('day'), '€50'],
      ],
    },
    {
      name: t('paddleSurf'),
      note: t('allEquipment'),
      rows: [
        [t('oneHour'), '€12'],
        [t('twoHours'), '€20'],
        [t('halfDay'), '€30'],
        [t('day'), '€50'],
      ],
    },
    {
      name: t('waterBike'),
      note: t('allEquipment'),
      rows: [
        [t('thirtyMinutes'), '€15'],
        [t('oneHour'), '€20'],
        [t('halfDay'), '€50'],
        [t('day'), '€90'],
      ],
    },
  ];

  return (
    <section id="precios" style={{ scrollMarginTop: 80, padding: 'clamp(72px,11vw,150px) clamp(20px,6vw,96px)', background: '#11313E', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow number="02" label={t('ourPrices')} labelColor="#6FC5DC" />
        <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(32px,6vw,68px)', lineHeight: 0.98, letterSpacing: '-.02em', margin: '0 0 clamp(40px,6vw,72px)', textWrap: 'balance' }}>
          {t('affordable')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(16px,2vw,28px)' }}>
          {products.map((p) => (
            <div key={p.name} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, padding: 'clamp(24px,2.6vw,36px)' }}>
              <h3 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(22px,2.4vw,28px)', margin: '0 0 24px', letterSpacing: '-.01em' }}>
                {p.name}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {p.rows.map(([label, price]) => (
                  <div key={label}>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#6FC5DC', marginBottom: 8, lineHeight: 1.2, minHeight: '2.4em', display: 'flex', alignItems: 'flex-end' }}>
                      {label}
                    </div>
                    <div className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(22px,2.4vw,30px)' }}>{price}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', margin: '22px 0 0' }}>{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prices;
