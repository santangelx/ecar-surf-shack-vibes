import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { BUSINESS, MAPS_DIRECTIONS_URL } from '@/lib/site';

const SeaActivities = () => {
  const { t, language, routePaths } = useLanguage();

  const activitiesContent = {
    en: {
      eyebrow: 'Sea Activities · Costa Tropical',
      title: 'Sea Activities Costa Tropical — Water Sports Almuñécar',
      subtitle: 'Your Gateway to Mediterranean Adventures in Granada',
      intro:
        'Discover the best water sports and sea activities on the Costa Tropical. From kayaking to paddle boarding, snorkeling to coastal tours, experience the Mediterranean like a local in Almuñécar, Granada.',
      activitiesTitle: 'Our Water Sports & Activities',
      whyTitle: 'Why Choose OpenSea Costa Tropical',
      ctaTitle: 'Ready for Your Mediterranean Adventure?',
      ctaText: 'Visit us today and create unforgettable memories on the Costa Tropical.',
      locationTitle: 'Visit Us in Almuñécar',
      activities: [
        { title: 'Kayak Tours', desc: 'Explore hidden caves and pristine beaches accessible only by kayak', duration: '2-4 hours', price: 'From 25€' },
        { title: 'Stand Up Paddle', desc: 'Perfect for all ages, enjoy the calm waters of our protected bay', duration: '1-8 hours', price: 'From 15€' },
        { title: 'Sunrise & Sunset Tours', desc: 'Magical experiences paddling during golden hour', duration: '90 minutes', price: '35€' },
        { title: 'Photo Safari Tours', desc: 'Capture the beauty of the Costa Tropical from the water', duration: '3 hours', price: '45€' },
      ],
      whyChoose: ['Professional certified instructors', 'Premium equipment from top brands', 'Small group sizes for personalized attention', 'Local expertise since 2015', 'Eco-friendly practices', 'Insurance included'],
    },
    es: {
      eyebrow: 'Actividades Marítimas · Costa Tropical',
      title: 'Actividades Marítimas Costa Tropical — Deportes Acuáticos Almuñécar',
      subtitle: 'Tu Puerta a las Aventuras Mediterráneas en Granada',
      intro:
        'Descubre los mejores deportes acuáticos y actividades marítimas en la Costa Tropical. Desde kayak hasta paddle board, snorkel hasta tours costeros, experimenta el Mediterráneo como un local en Almuñécar, Granada.',
      activitiesTitle: 'Nuestros Deportes y Actividades Acuáticas',
      whyTitle: 'Por Qué Elegir OpenSea Costa Tropical',
      ctaTitle: '¿Listo para tu Aventura Mediterránea?',
      ctaText: 'Visítanos hoy y crea recuerdos inolvidables en la Costa Tropical.',
      locationTitle: 'Visítanos en Almuñécar',
      activities: [
        { title: 'Tours en Kayak', desc: 'Explora cuevas ocultas y playas vírgenes accesibles solo en kayak', duration: '2-4 horas', price: 'Desde 25€' },
        { title: 'Stand Up Paddle', desc: 'Perfecto para todas las edades, disfruta las aguas tranquilas de nuestra bahía protegida', duration: '1-8 horas', price: 'Desde 15€' },
        { title: 'Tours Amanecer y Atardecer', desc: 'Experiencias mágicas remando durante la hora dorada', duration: '90 minutos', price: '35€' },
        { title: 'Tours Safari Fotográfico', desc: 'Captura la belleza de la Costa Tropical desde el agua', duration: '3 horas', price: '45€' },
      ],
      whyChoose: ['Instructores profesionales certificados', 'Equipo premium de las mejores marcas', 'Grupos pequeños para atención personalizada', 'Experiencia local desde 2015', 'Prácticas eco-amigables', 'Seguro incluido'],
    },
    fr: {
      eyebrow: 'Activités Maritimes · Costa Tropical',
      title: 'Activités Maritimes Costa Tropical — Sports Nautiques Almuñécar',
      subtitle: 'Votre Porte vers les Aventures Méditerranéennes à Grenade',
      intro:
        "Découvrez les meilleurs sports nautiques et activités maritimes sur la Costa Tropical. Du kayak au paddle board, du snorkeling aux tours côtiers, vivez la Méditerranée comme un local à Almuñécar, Grenade.",
      activitiesTitle: 'Nos Sports et Activités Nautiques',
      whyTitle: 'Pourquoi Choisir OpenSea Costa Tropical',
      ctaTitle: 'Prêt pour Votre Aventure Méditerranéenne ?',
      ctaText: 'Rendez-nous visite aujourd\'hui et créez des souvenirs inoubliables sur la Costa Tropical.',
      locationTitle: 'Visitez-nous à Almuñécar',
      activities: [
        { title: 'Tours en Kayak', desc: 'Explorez grottes cachées et plages vierges accessibles uniquement en kayak', duration: '2-4 heures', price: 'À partir de 25€' },
        { title: 'Stand Up Paddle', desc: 'Parfait pour tous âges, profitez des eaux calmes de notre baie protégée', duration: '1-8 heures', price: 'À partir de 15€' },
        { title: 'Tours Lever et Coucher de Soleil', desc: "Expériences magiques en pagayant pendant l'heure dorée", duration: '90 minutes', price: '35€' },
        { title: 'Tours Safari Photo', desc: 'Capturez la beauté de la Costa Tropical depuis l\'eau', duration: '3 heures', price: '45€' },
      ],
      whyChoose: ['Instructeurs professionnels certifiés', 'Équipement premium des meilleures marques', 'Petits groupes pour attention personnalisée', 'Expertise locale depuis 2015', 'Pratiques éco-responsables', 'Assurance incluse'],
    },
  };

  const content = activitiesContent[language];

  const seoData = {
    en: {
      title: 'Sea Activities Costa Tropical | Water Sports Almuñécar Granada',
      description:
        'Experience the best water sports on the Costa Tropical. Kayaking, paddle boarding, sunrise tours and more in Almuñécar, Granada. Professional instructors, all equipment included.',
      keywords: 'water sports Almuñécar, sea activities Costa Tropical, water sports Granada, Mediterranean activities, kayak tours Almuñécar, SUP tours Granada',
    },
    es: {
      title: 'Actividades Marítimas Costa Tropical | Deportes Acuáticos Almuñécar',
      description:
        'Experimenta los mejores deportes acuáticos en la Costa Tropical. Kayak, paddle surf, tours al amanecer y más en Almuñécar, Granada. Instructores profesionales, equipo incluido.',
      keywords: 'deportes acuáticos Almuñécar, actividades marítimas Costa Tropical, deportes acuáticos Granada, actividades Mediterráneo, tours kayak Almuñécar, tours SUP Granada',
    },
    fr: {
      title: 'Activités Maritimes Costa Tropical | Sports Nautiques Almuñécar',
      description:
        'Découvrez les meilleurs sports nautiques sur la Costa Tropical. Kayak, paddle board, tours au lever du soleil et plus à Almuñécar, Grenade. Instructeurs professionnels, équipement inclus.',
      keywords: 'sports nautiques Almuñécar, activités maritimes Costa Tropical, sports nautiques Grenade, activités Méditerranée, tours kayak Almuñécar, tours SUP Grenade',
    },
  };

  return (
    <div style={{ background: '#F6F3EC', color: '#11313E', overflowX: 'hidden' }}>
      <SEO title={seoData[language].title} description={seoData[language].description} keywords={seoData[language].keywords} />
      <Navbar />

      <PageHero eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

      <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
        <p style={{ maxWidth: '64ch', margin: '0 auto', textAlign: 'center', fontSize: 'clamp(19px,2.2vw,26px)', lineHeight: 1.55, color: '#11313E', fontWeight: 500 }}>
          {content.intro}
        </p>
      </section>

      <section style={{ padding: 'clamp(64px,9vw,130px) clamp(20px,6vw,96px)', background: '#E3EEF1' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,54px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(36px,5vw,60px)', textWrap: 'balance' }}>
            {content.activitiesTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(16px,2vw,24px)' }}>
            {content.activities.map((a) => (
              <div key={a.title} style={{ background: '#fff', borderRadius: 18, padding: 'clamp(24px,2.6vw,36px)' }}>
                <h3 className="font-display" style={{ fontWeight: 800, fontSize: 23, margin: '0 0 10px', letterSpacing: '-.01em' }}>{a.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(17,49,62,.74)', margin: '0 0 18px' }}>{a.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(17,49,62,.12)', paddingTop: 14 }}>
                  <span style={{ fontSize: 14, color: 'rgba(17,49,62,.6)' }}>{a.duration}</span>
                  <span className="font-display" style={{ fontWeight: 800, color: '#0E7C99', fontSize: 18 }}>{a.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,54px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 clamp(32px,4vw,48px)', textAlign: 'center' }}>
            {content.whyTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px 32px' }}>
            {content.whyChoose.map((reason) => (
              <div key={reason} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#E8623D', marginTop: 8, flex: 'none' }} />
                <p style={{ fontSize: 17, color: '#11313E', margin: 0 }}>{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,6vw,96px)', background: 'linear-gradient(120deg, #0E7C99 0%, #0A5E74 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(28px,4.5vw,52px)', lineHeight: 1.02, letterSpacing: '-.02em', margin: '0 0 18px', textWrap: 'balance' }}>
            {content.ctaTitle}
          </h2>
          <p style={{ fontSize: 'clamp(17px,1.9vw,21px)', lineHeight: 1.55, opacity: 0.92, margin: '0 0 32px' }}>{content.ctaText}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#0A5E74', padding: '15px 30px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              {t('getDirections')}
            </a>
            <Link to={routePaths[language].kayak} style={{ border: '1.5px solid rgba(255,255,255,.55)', color: '#fff', padding: '15px 30px', borderRadius: 999, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              {t('kayakRentals')}
            </Link>
          </div>
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

export default SeaActivities;
