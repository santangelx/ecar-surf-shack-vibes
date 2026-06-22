import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from './OptimizedImage';
import SectionEyebrow from './SectionEyebrow';

const AboutUs = () => {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: 'About OpenSea — Your Local Water Sports Experts',
      subtitle: 'Operating on Playa de San Cristóbal since 2015',
      description:
        "Founded by passionate water sports enthusiasts, OpenSea has been introducing visitors and locals to the beauty of the Costa Tropical's coastline. We rent quality kayaks and paddle boards right on the beach so everyone can enjoy the Mediterranean safely.",
      certifications:
        'We specialize in kayak and paddle surf rentals for all ages and skill levels, with stable equipment and life jackets included. We prioritize safety and fun on the water.',
      commitment:
        'We are committed to sustainable tourism and protecting our beautiful marine environment. All our kayak and paddle surf activities follow eco-friendly practices to preserve the Costa Tropical for future generations.',
      caption: 'Quality kayaks and paddle boards on Playa de San Cristóbal, ready for your Mediterranean day out',
    },
    es: {
      title: 'Sobre OpenSea — Tus Expertos Locales en Deportes Acuáticos',
      subtitle: 'Operando en Playa de San Cristóbal desde 2015',
      description:
        'Fundada por apasionados de los deportes acuáticos, OpenSea lleva años acercando a visitantes y locales a la belleza de la costa de la Costa Tropical. Alquilamos kayaks y tablas de paddle de calidad en la misma playa para que todos disfruten del Mediterráneo con seguridad.',
      certifications:
        'Nos especializamos en el alquiler de kayaks y paddle surf para todas las edades y niveles, con equipo estable y chaleco salvavidas incluido. Priorizamos la seguridad y la diversión en el agua.',
      commitment:
        'Estamos comprometidos con el turismo sostenible y la protección de nuestro hermoso entorno marino. Todas nuestras actividades de kayak y paddle surf siguen prácticas eco-amigables para preservar la Costa Tropical para las futuras generaciones.',
      caption: 'Kayaks y tablas de paddle de calidad en la Playa de San Cristóbal, listos para tu día en el Mediterráneo',
    },
    fr: {
      title: "À Propos d'OpenSea — Vos Experts Locaux en Sports Nautiques",
      subtitle: 'Présents sur la Playa de San Cristóbal depuis 2015',
      description:
        "Fondée par des passionnés de sports nautiques, OpenSea initie depuis des années les visiteurs et les locaux à la beauté du littoral de la Costa Tropical. Nous louons des kayaks et des planches de paddle de qualité directement sur la plage pour que chacun profite de la Méditerranée en toute sécurité.",
      certifications:
        "Nous sommes spécialisés dans la location de kayaks et de paddle surf pour tous les âges et niveaux, avec un matériel stable et un gilet de sauvetage inclus. Nous priorisons la sécurité et le plaisir sur l'eau.",
      commitment:
        'Nous sommes engagés dans un tourisme durable et la protection de notre magnifique environnement marin. Toutes nos activités de kayak et paddle surf suivent des pratiques éco-responsables pour préserver la Costa Tropical pour les générations futures.',
      caption: 'Kayaks et planches de paddle de qualité sur la Playa de San Cristóbal, prêts pour votre journée en Méditerranée',
    },
  };

  const data = content[language];

  return (
    <section id="sobre" style={{ scrollMarginTop: 80, padding: 'clamp(72px,11vw,150px) clamp(20px,6vw,96px)', background: '#F6F3EC' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow number="05" label={t('aboutUs')} />
        <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(30px,5vw,60px)', lineHeight: 1, letterSpacing: '-.02em', margin: '0 0 6px', maxWidth: '22ch', textWrap: 'balance' }}>
          {data.title}
        </h2>
        <p style={{ fontSize: 'clamp(18px,2vw,22px)', color: '#0E7C99', fontWeight: 600, margin: '0 0 clamp(40px,6vw,64px)' }}>{data.subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.7, margin: '0 0 22px', color: '#11313E' }}>{data.description}</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: '0 0 22px', color: 'rgba(17,49,62,.74)' }}>{data.certifications}</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, color: 'rgba(17,49,62,.74)', fontStyle: 'italic' }}>{data.commitment}</p>
          </div>
        </div>
        <figure style={{ margin: 'clamp(40px,6vw,72px) 0 0' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '16 / 8', boxShadow: '0 30px 70px -38px rgba(17,49,62,.45)' }}>
            <OptimizedImage
              src="/images/kayak.png"
              alt="Kayaks de alquiler de OpenSea en la Playa de San Cristóbal, Almuñécar"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
          <figcaption style={{ fontSize: 14, color: 'rgba(17,49,62,.6)', marginTop: 14, textAlign: 'center' }}>{data.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AboutUs;
