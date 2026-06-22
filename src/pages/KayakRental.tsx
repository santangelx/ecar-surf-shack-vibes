import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { BUSINESS } from '@/lib/site';
import { PRODUCTS } from '@/lib/prices';

const KayakRental = () => {
  const { t, language } = useLanguage();

  const kayakContent = {
    en: {
      eyebrow: 'Kayak Rental · Almuñécar',
      title: 'Kayak Rental Almuñécar — Explore the Costa Tropical',
      subtitle: 'Premium Kayak Rentals on the Mediterranean Coast',
      intro:
        "Discover the stunning coastline of Almuñécar, Granada with our high-quality kayak rentals. Perfect for exploring hidden coves, crystal-clear waters, and the beautiful beaches of the Costa Tropical.",
      whyTitle: 'Why Choose Our Kayak Rentals',
      pricesTitle: 'Kayak Rental Prices',
      locationTitle: 'Find Us in Almuñécar',
      features: [
        { title: 'Stable & Safe Kayaks', desc: 'Modern sit-on-top kayaks suitable for beginners and experts' },
        { title: 'All Equipment Included', desc: 'Life jackets and paddles provided with every rental' },
        { title: 'Family Friendly', desc: 'Double kayaks perfect for couples or parent-child outings' },
      ],
    },
    es: {
      eyebrow: 'Alquiler de Kayak · Almuñécar',
      title: 'Alquiler de Kayak Almuñécar — Explora la Costa Tropical',
      subtitle: 'Alquiler Premium de Kayaks en la Costa Mediterránea',
      intro:
        'Descubre la impresionante costa de Almuñécar, Granada con nuestro alquiler de kayaks de alta calidad. Perfecto para explorar calas ocultas, aguas cristalinas y las hermosas playas de la Costa Tropical.',
      whyTitle: 'Por Qué Elegir Nuestro Alquiler de Kayaks',
      pricesTitle: 'Precios de Alquiler de Kayak',
      locationTitle: 'Encuéntranos en Almuñécar',
      features: [
        { title: 'Kayaks Estables y Seguros', desc: 'Kayaks modernos tipo sit-on-top aptos para principiantes y expertos' },
        { title: 'Todo el Equipo Incluido', desc: 'Chalecos salvavidas y remos incluidos en cada alquiler' },
        { title: 'Ideal para Familias', desc: 'Kayaks dobles perfectos para parejas o salidas en familia' },
      ],
    },
    fr: {
      eyebrow: 'Location de Kayak · Almuñécar',
      title: 'Location de Kayak Almuñécar — Explorez la Costa Tropical',
      subtitle: 'Location Premium de Kayaks sur la Côte Méditerranéenne',
      intro:
        "Découvrez le magnifique littoral d'Almuñécar, Grenade avec nos locations de kayaks de haute qualité. Parfait pour explorer les criques cachées, les eaux cristallines et les belles plages de la Costa Tropical.",
      whyTitle: 'Pourquoi Choisir Nos Locations de Kayaks',
      pricesTitle: 'Prix de Location de Kayak',
      locationTitle: 'Trouvez-nous à Almuñécar',
      features: [
        { title: 'Kayaks Stables et Sûrs', desc: 'Kayaks modernes sit-on-top adaptés aux débutants et experts' },
        { title: "Tout l'Équipement Inclus", desc: 'Gilets de sauvetage et pagaies fournis avec chaque location' },
        { title: 'Convivial pour les Familles', desc: 'Kayaks doubles parfaits pour couples ou sorties en famille' },
      ],
    },
  };

  const content = kayakContent[language];

  const seoData = {
    en: {
      title: 'Kayak Rental Almuñécar | OpenSea Costa Tropical Granada',
      description:
        "Rent single and double kayaks in Almuñécar, Granada. Explore the Costa Tropical's hidden beaches and crystal-clear waters. Life jackets and paddles included.",
      keywords: 'kayak rental Almuñécar, kayak hire Granada, Costa Tropical kayaking, sea kayak Almuñécar, double kayak Almuñécar',
    },
    es: {
      title: 'Alquiler de Kayak Almuñécar | OpenSea Costa Tropical Granada',
      description:
        'Alquila kayaks individuales y dobles en Almuñécar, Granada. Explora las playas ocultas y aguas cristalinas de la Costa Tropical. Chalecos y remos incluidos.',
      keywords: 'alquiler kayak Almuñécar, alquiler kayak Granada, kayak Costa Tropical, kayak de mar Almuñécar, kayak doble Almuñécar',
    },
    fr: {
      title: 'Location de Kayak Almuñécar | OpenSea Costa Tropical Grenade',
      description:
        'Louez des kayaks simples et doubles à Almuñécar, Grenade. Explorez les plages cachées et les eaux cristallines de la Costa Tropical. Gilets et pagaies inclus.',
      keywords: 'location kayak Almuñécar, location kayak Grenade, kayak Costa Tropical, kayak de mer Almuñécar, kayak double Almuñécar',
    },
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Kayak Rental',
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
      { '@type': 'Offer', name: 'Single Kayak Rental (1 hour)', price: '10.00', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Double Kayak Rental (1 hour)', price: '15.00', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Double Kayak Rental (full day)', price: '60.00', priceCurrency: 'EUR' },
    ],
  };

  // Both kayak tiers, straight from the canonical price source (matches home).
  const kayakProducts = [PRODUCTS.twoPersonKayak, PRODUCTS.onePersonKayak].map((p) => ({
    name: t(p.nameKey),
    rows: p.rows.map((r) => [t(r.labelKey), r.price] as const),
  }));

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
        image="/images/kayak.png"
        imageAlt="Kayaks de colores en la playa de San Cristóbal en Almuñécar listos para alquilar, Costa Tropical"
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        pricesAnchor="#precios-kayak"
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(16px,2vw,24px)' }}>
            {content.features.map((f) => (
              <div key={f.title} style={{ background: '#fff', borderRadius: 18, padding: 'clamp(24px,2.6vw,34px)' }}>
                <h3 className="font-display" style={{ fontWeight: 800, fontSize: 21, margin: '0 0 10px', letterSpacing: '-.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(17,49,62,.74)', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios-kayak" style={{ scrollMarginTop: 80, padding: 'clamp(64px,9vw,130px) clamp(20px,6vw,96px)', background: '#11313E', color: '#fff' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,54px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(32px,4vw,48px)', textAlign: 'center' }}>
            {content.pricesTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(16px,2vw,28px)' }}>
            {kayakProducts.map((product) => (
              <div key={product.name} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, padding: 'clamp(24px,2.6vw,36px)' }}>
                <h3 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(22px,2.4vw,28px)', margin: '0 0 24px', letterSpacing: '-.01em' }}>
                  {product.name}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {product.rows.map(([label, price]) => (
                    <div key={label}>
                      <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#6FC5DC', marginBottom: 8, lineHeight: 1.2, minHeight: '2.4em', display: 'flex', alignItems: 'flex-end' }}>
                        {label}
                      </div>
                      <div className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(22px,2.4vw,30px)' }}>{price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,.55)', margin: '22px 0 0' }}>{t('includeLife')}</p>
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

export default KayakRental;
