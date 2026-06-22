import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { BUSINESS } from '@/lib/site';
import { PRODUCTS } from '@/lib/prices';

const PaddleBoard = () => {
  const { t, language } = useLanguage();

  const paddleContent = {
    en: {
      eyebrow: 'Paddle Surf · SUP · Almuñécar',
      title: 'Paddle Board Almuñécar — SUP Rentals Costa Tropical',
      subtitle: 'Stand Up Paddle Board Rentals in Granada',
      intro:
        'Experience the Mediterranean Sea like never before with our paddle board rentals in Almuñécar. Perfect conditions for SUP with calm waters, stunning views of the Sierra Nevada, and year-round sunshine.',
      whyTitle: 'Why Choose Our SUP Rentals',
      pricesTitle: 'Paddle Surf Prices',
      locationTitle: 'SUP Location in Almuñécar',
      benefits: [
        { title: 'Beginner Friendly', desc: 'Stable boards and calm bay perfect for first-timers' },
        { title: 'All Equipment Included', desc: 'Life jackets and paddles provided with every board' },
        { title: 'Easy to Paddle', desc: 'Stable boards suited to the calm waters of our bay' },
      ],
    },
    es: {
      eyebrow: 'Paddle Surf · SUP · Almuñécar',
      title: 'Paddle Board Almuñécar — Alquiler SUP Costa Tropical',
      subtitle: 'Alquiler de Tablas de Paddle Surf en Granada',
      intro:
        'Experimenta el Mar Mediterráneo como nunca antes con nuestro alquiler de paddle board en Almuñécar. Condiciones perfectas para SUP con aguas tranquilas, vistas impresionantes de Sierra Nevada y sol todo el año.',
      whyTitle: 'Por Qué Elegir Nuestro Alquiler SUP',
      pricesTitle: 'Precios de Paddle Surf',
      locationTitle: 'Ubicación SUP en Almuñécar',
      benefits: [
        { title: 'Ideal para Principiantes', desc: 'Tablas estables y bahía tranquila perfecta para novatos' },
        { title: 'Todo el Equipo Incluido', desc: 'Chalecos salvavidas y remos incluidos con cada tabla' },
        { title: 'Fácil de Remar', desc: 'Tablas estables ideales para las aguas tranquilas de nuestra bahía' },
      ],
    },
    fr: {
      eyebrow: 'Paddle Surf · SUP · Almuñécar',
      title: 'Paddle Board Almuñécar — Location SUP Costa Tropical',
      subtitle: 'Location de Stand Up Paddle à Grenade',
      intro:
        'Découvrez la Mer Méditerranée comme jamais avec nos locations de paddle board à Almuñécar. Conditions parfaites pour le SUP avec des eaux calmes, des vues époustouflantes sur la Sierra Nevada et du soleil toute l\'année.',
      whyTitle: 'Pourquoi Choisir Nos Locations SUP',
      pricesTitle: 'Prix de Stand Up Paddle',
      locationTitle: 'Emplacement SUP à Almuñécar',
      benefits: [
        { title: 'Adapté aux Débutants', desc: 'Planches stables et baie calme parfaites pour les novices' },
        { title: "Tout l'Équipement Inclus", desc: 'Gilets de sauvetage et pagaies fournis avec chaque planche' },
        { title: 'Facile à Pagayer', desc: 'Planches stables idéales pour les eaux calmes de notre baie' },
      ],
    },
  };

  const content = paddleContent[language];

  const seoData = {
    en: {
      title: 'Paddle Board Rental Almuñécar | SUP Costa Tropical Granada',
      description:
        'Rent stand up paddle boards (SUP) in Almuñécar, Granada. Perfect conditions for beginners and experts. Life jackets and paddles included.',
      keywords: 'paddle board rental Almuñécar, SUP hire Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Granada',
    },
    es: {
      title: 'Alquiler Paddle Surf Almuñécar | SUP Costa Tropical Granada',
      description:
        'Alquila tablas de paddle surf (SUP) en Almuñécar, Granada. Condiciones perfectas para principiantes y expertos. Chalecos salvavidas y remos incluidos.',
      keywords: 'alquiler paddle surf Almuñécar, alquiler SUP Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle board Granada',
    },
    fr: {
      title: 'Location Paddle Board Almuñécar | SUP Costa Tropical Grenade',
      description:
        'Louez des planches de stand up paddle (SUP) à Almuñécar, Grenade. Conditions parfaites pour débutants et experts. Gilets de sauvetage et pagaies inclus.',
      keywords: 'location paddle board Almuñécar, location SUP Grenade, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Grenade',
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
      { '@type': 'Offer', name: 'Full Day SUP Rental', price: '50.00', priceCurrency: 'EUR' },
    ],
  };

  // Paddle-surf prices straight from the canonical source (matches home).
  const priceRows: [string, string][] = PRODUCTS.paddleSurf.rows.map((r) => [t(r.labelKey), r.price]);

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
        imageAlt="Paddle surf sobre aguas tranquilas del Mediterráneo en Almuñécar, Costa Tropical"
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
