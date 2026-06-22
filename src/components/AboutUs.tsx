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
        "Founded by passionate water sports enthusiasts, OpenSea has been introducing visitors and locals to the beauty of the Costa Tropical's coastline. Our team of experienced kayak and paddle surf instructors ensures safe, memorable experiences on the Mediterranean.",
      certifications:
        'Our experienced team specializes in kayak rentals and paddle surf instruction, providing expert guidance for all skill levels. We prioritize safety and fun on every water sports adventure.',
      commitment:
        'We are committed to sustainable tourism and protecting our beautiful marine environment. All our kayak and paddle surf activities follow eco-friendly practices to preserve the Costa Tropical for future generations.',
      stats: [
        { label: 'Years of Experience', value: '5+' },
        { label: 'Happy Customers', value: '1,000+' },
        { label: '5-Star Reviews', value: '50+' },
        { label: 'Safety Record', value: '100%' },
      ],
      caption: 'Our experienced team ready to guide you on your Mediterranean adventure',
    },
    es: {
      title: 'Sobre OpenSea — Tus Expertos Locales en Deportes Acuáticos',
      subtitle: 'Operando en Playa de San Cristóbal desde 2015',
      description:
        'Fundada por apasionados de los deportes acuáticos, OpenSea lleva años introduciendo a visitantes y locales a la belleza de la costa de la Costa Tropical. Nuestro equipo de instructores experimentados en kayak y paddle surf garantiza experiencias seguras y memorables en el Mediterráneo.',
      certifications:
        'Nuestro equipo experimentado se especializa en alquiler de kayaks e instrucción de paddle surf, proporcionando orientación experta para todos los niveles. Priorizamos la seguridad y la diversión en cada aventura acuática.',
      commitment:
        'Estamos comprometidos con el turismo sostenible y la protección de nuestro hermoso entorno marino. Todas nuestras actividades de kayak y paddle surf siguen prácticas eco-amigables para preservar la Costa Tropical para las futuras generaciones.',
      stats: [
        { label: 'Años de Experiencia', value: '5+' },
        { label: 'Clientes Satisfechos', value: '1.000+' },
        { label: 'Reseñas 5 Estrellas', value: '50+' },
        { label: 'Record de Seguridad', value: '100%' },
      ],
      caption: 'Nuestro equipo experimentado listo para guiarte en tu aventura mediterránea',
    },
    fr: {
      title: "À Propos d'OpenSea — Vos Experts Locaux en Sports Nautiques",
      subtitle: 'Présents sur la Playa de San Cristóbal depuis 2015',
      description:
        "Fondée par des passionnés de sports nautiques, OpenSea initie depuis des années les visiteurs et les locaux à la beauté du littoral de la Costa Tropical. Notre équipe d'instructeurs expérimentés en kayak et paddle surf garantit des expériences sûres et mémorables sur la Méditerranée.",
      certifications:
        "Notre équipe expérimentée se spécialise dans la location de kayaks et l'instruction de paddle surf, offrant des conseils experts pour tous les niveaux. Nous priorisons la sécurité et le plaisir à chaque aventure nautique.",
      commitment:
        'Nous sommes engagés dans un tourisme durable et la protection de notre magnifique environnement marin. Toutes nos activités de kayak et paddle surf suivent des pratiques éco-responsables pour préserver la Costa Tropical pour les générations futures.',
      stats: [
        { label: "Années d'Expérience", value: '5+' },
        { label: 'Clients Satisfaits', value: '1 000+' },
        { label: 'Avis 5 Étoiles', value: '50+' },
        { label: 'Record de Sécurité', value: '100%' },
      ],
      caption: 'Notre équipe expérimentée prête à vous guider dans votre aventure méditerranéenne',
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(14px,2vw,20px)' }}>
            {data.stats.map((s) => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 18, padding: 'clamp(22px,2.6vw,32px)', textAlign: 'center' }}>
                <div className="font-display" style={{ fontWeight: 900, fontSize: 'clamp(34px,4vw,48px)', color: '#0E7C99', letterSpacing: '-.02em' }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'rgba(17,49,62,.7)', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <figure style={{ margin: 'clamp(40px,6vw,72px) 0 0' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '16 / 8', boxShadow: '0 30px 70px -38px rgba(17,49,62,.45)' }}>
            <OptimizedImage
              src="/images/kayak.png"
              alt="Equipo de OpenSea ofreciendo instrucción de kayak en la Playa de San Cristóbal, Almuñécar"
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
