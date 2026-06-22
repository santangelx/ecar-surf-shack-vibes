import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { BUSINESS } from '@/lib/site';

const PaddleBoard = () => {
  const { t, language } = useLanguage();

  const paddleContent = {
    en: {
      eyebrow: 'Paddle Surf · SUP · Almuñécar',
      title: 'Paddle Board Almuñécar — SUP Rentals Costa Tropical',
      subtitle: 'Stand Up Paddle Board Rentals & Lessons in Granada',
      intro:
        'Experience the Mediterranean Sea like never before with our premium paddle board rentals in Almuñécar. Perfect conditions for SUP with calm waters, stunning views of the Sierra Nevada, and year-round sunshine.',
      whyTitle: 'Why Choose Our SUP Rentals',
      activitiesTitle: 'SUP Activities in Almuñécar',
      pricesTitle: 'Paddle Surf Prices',
      locationTitle: 'SUP Location in Almuñécar',
      yogaLabel: 'SUP Yoga Class (90 min)',
      benefits: [
        { title: 'Beginner Friendly', desc: 'Stable boards and calm bay perfect for first-timers' },
        { title: 'Safety First', desc: 'All equipment included with certified instructors available' },
        { title: 'Premium Equipment', desc: 'Latest SUP boards from top brands for optimal performance' },
      ],
      activities: ['Morning SUP Yoga Sessions', 'Sunset Paddle Tours', 'SUP Fitness Classes', 'Family Paddle Adventures'],
    },
    es: {
      eyebrow: 'Paddle Surf · SUP · Almuñécar',
      title: 'Paddle Board Almuñécar — Alquiler SUP Costa Tropical',
      subtitle: 'Alquiler de Tablas de Paddle Surf y Clases en Granada',
      intro:
        'Experimenta el Mar Mediterráneo como nunca antes con nuestro alquiler premium de paddle board en Almuñécar. Condiciones perfectas para SUP con aguas tranquilas, vistas impresionantes de Sierra Nevada y sol todo el año.',
      whyTitle: 'Por Qué Elegir Nuestro Alquiler SUP',
      activitiesTitle: 'Actividades SUP en Almuñécar',
      pricesTitle: 'Precios de Paddle Surf',
      locationTitle: 'Ubicación SUP en Almuñécar',
      yogaLabel: 'Clase SUP Yoga (90 min)',
      benefits: [
        { title: 'Ideal para Principiantes', desc: 'Tablas estables y bahía tranquila perfecta para novatos' },
        { title: 'Seguridad Primero', desc: 'Todo el equipo incluido con instructores certificados disponibles' },
        { title: 'Equipo Premium', desc: 'Últimas tablas SUP de marcas top para rendimiento óptimo' },
      ],
      activities: ['Sesiones de SUP Yoga Matutinas', 'Tours de Paddle al Atardecer', 'Clases de SUP Fitness', 'Aventuras Familiares en Paddle'],
    },
    fr: {
      eyebrow: 'Paddle Surf · SUP · Almuñécar',
      title: 'Paddle Board Almuñécar — Location SUP Costa Tropical',
      subtitle: 'Location de Stand Up Paddle et Cours à Grenade',
      intro:
        'Découvrez la Mer Méditerranée comme jamais avec nos locations premium de paddle board à Almuñécar. Conditions parfaites pour le SUP avec des eaux calmes, des vues époustouflantes sur la Sierra Nevada et du soleil toute l\'année.',
      whyTitle: 'Pourquoi Choisir Nos Locations SUP',
      activitiesTitle: 'Activités SUP à Almuñécar',
      pricesTitle: 'Prix de Stand Up Paddle',
      locationTitle: 'Emplacement SUP à Almuñécar',
      yogaLabel: 'Cours SUP Yoga (90 min)',
      benefits: [
        { title: 'Adapté aux Débutants', desc: 'Planches stables et baie calme parfaites pour les novices' },
        { title: "Sécurité d'Abord", desc: 'Tout l\'équipement inclus avec instructeurs certifiés disponibles' },
        { title: 'Équipement Premium', desc: 'Dernières planches SUP des meilleures marques pour performance optimale' },
      ],
      activities: ['Sessions de SUP Yoga Matinales', 'Tours de Paddle au Coucher du Soleil', 'Cours de SUP Fitness', 'Aventures Familiales en Paddle'],
    },
  };

  const content = paddleContent[language];

  const seoData = {
    en: {
      title: 'Paddle Board Rental Almuñécar | SUP Costa Tropical Granada',
      description:
        'Rent stand up paddle boards (SUP) in Almuñécar, Granada. Perfect conditions for beginners and experts. SUP yoga, sunset tours, equipment included.',
      keywords: 'paddle board rental Almuñécar, SUP hire Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Granada, SUP yoga Mediterranean',
    },
    es: {
      title: 'Alquiler Paddle Surf Almuñécar | SUP Costa Tropical Granada',
      description:
        'Alquila tablas de paddle surf (SUP) en Almuñécar, Granada. Condiciones perfectas para principiantes y expertos. SUP yoga, tours al atardecer, equipo incluido.',
      keywords: 'alquiler paddle surf Almuñécar, alquiler SUP Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle board Granada, SUP yoga Mediterráneo',
    },
    fr: {
      title: 'Location Paddle Board Almuñécar | SUP Costa Tropical Grenade',
      description:
        'Louez des planches de stand up paddle (SUP) à Almuñécar, Grenade. Conditions parfaites pour débutants et experts. SUP yoga, tours au coucher du soleil.',
      keywords: 'location paddle board Almuñécar, location SUP Grenade, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Grenade, SUP yoga Méditerranée',
    },
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Stand Up Paddle Board Rental',
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.addressCountry,
      },
    },
    areaServed: { '@type': 'Place', name: 'Costa Tropical, Granada' },
    offers: [
      { '@type': 'Offer', name: '1 Hour SUP Rental', price: '12.00', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'SUP Yoga Class', price: '30.00', priceCurrency: 'EUR' },
    ],
  };

  const priceRows: [string, string][] = [
    [t('oneHour'), '15€'],
    [t('twoHours'), '25€'],
    [`${t('halfDay')} (4h)`, '35€'],
    [`${t('day')} (8h)`, '50€'],
    [content.yogaLabel, '30€'],
  ];

  return (
    <div style={{ background: '#F6F3EC', color: '#11313E', overflowX: 'hidden' }}>
      <SEO
        title={seoData[language].title}
        description={seoData[language].description}
        keywords={seoData[language].keywords}
        structuredData={structuredData}
      />
      <Navbar />

      <PageHero
        image="/images/paddle.png"
        imageAlt="Paddle surf y SUP yoga sobre aguas tranquilas del Mediterráneo en Almuñécar, Costa Tropical"
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        pricesAnchor="#precios-paddle"
      />

      <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
        <p style={{ maxWidth: '62ch', margin: '0 auto', textAlign: 'center', fontSize: 'clamp(19px,2.2vw,26px)', lineHeight: 1.55, color: '#11313E', fontWeight: 500 }}>
          {content.intro}
        </p>
      </section>

      <section style={{ padding: 'clamp(64px,9vw,130px) clamp(20px,6vw,96px)', background: '#E3EEF1' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,54px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(36px,5vw,60px)', textWrap: 'balance' }}>
            {content.whyTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(16px,2vw,24px)' }}>
            {content.benefits.map((b) => (
              <div key={b.title} style={{ background: '#fff', borderRadius: 18, padding: 'clamp(26px,3vw,40px)', textAlign: 'center' }}>
                <h3 className="font-display" style={{ fontWeight: 800, fontSize: 22, margin: '0 0 12px', letterSpacing: '-.01em' }}>{b.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(17,49,62,.74)', margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,54px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(32px,4vw,48px)', textAlign: 'center' }}>
            {content.activitiesTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {content.activities.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 14, padding: '20px 24px' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#0E7C99', flex: 'none' }} />
                <span style={{ fontSize: 17, fontWeight: 600 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios-paddle" style={{ scrollMarginTop: 80, padding: 'clamp(64px,9vw,130px) clamp(20px,6vw,96px)', background: '#11313E', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,54px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(32px,4vw,48px)', textAlign: 'center' }}>
            {content.pricesTitle}
          </h2>
          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, overflow: 'hidden' }}>
            {priceRows.map(([label, price], i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px clamp(22px,3vw,34px)', borderBottom: i < priceRows.length - 1 ? '1px solid rgba(255,255,255,.1)' : 'none' }}>
                <span style={{ fontSize: 18 }}>{label}</span>
                <span className="font-display" style={{ fontWeight: 800, fontSize: 24 }}>{price}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,.55)', margin: '22px 0 0' }}>{t('allEquipment')}</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(26px,4vw,46px)', letterSpacing: '-.02em', margin: '0 0 clamp(28px,4vw,44px)' }}>
            {content.locationTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', fontSize: 18, color: '#11313E' }}>
            <p style={{ margin: 0 }}><strong>{t('address')}</strong></p>
            <p style={{ margin: 0, color: 'rgba(17,49,62,.74)' }}>{t('everyday')}: {BUSINESS.opens} – {BUSINESS.closes}</p>
            <p style={{ margin: 0, color: 'rgba(17,49,62,.74)' }}>{BUSINESS.telephoneDisplay}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaddleBoard;
