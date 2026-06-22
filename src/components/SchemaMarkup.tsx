import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { SITE_URL, BUSINESS, GBP_URL } from '@/lib/site';

// Localized FAQ — emitted as FAQPage JSON-LD. Note: Google retired FAQ rich
// results for non-gov/health sites (2023); kept for entity clarity and AI/LLM
// answer engines (GEO), and it's harmless. No self-serving review markup here.
const FAQ: Record<Language, { q: string; a: string }[]> = {
  es: [
    {
      q: '¿Qué actividades acuáticas hay disponibles en Almuñécar?',
      a: 'Alquilamos kayaks individuales y dobles, tablas de paddle surf (SUP) y bicicletas de agua en la Playa de San Cristóbal, Almuñécar.',
    },
    {
      q: '¿Necesito experiencia para los deportes acuáticos en Almuñécar?',
      a: '¡No se necesita experiencia! Nuestro equipo estable y las aguas tranquilas de la bahía son perfectos para principiantes. Te explicamos lo básico antes de salir y proporcionamos todo el equipo de seguridad.',
    },
    {
      q: '¿Qué incluye el precio del alquiler?',
      a: 'Todos los alquileres incluyen el equipo (kayak o tabla de SUP), el remo y el chaleco salvavidas.',
    },
    {
      q: '¿Cuáles son las mejores condiciones para los deportes acuáticos en la Costa Tropical?',
      a: 'La Costa Tropical disfruta de más de 300 días de sol al año. Las mañanas suelen ofrecer las aguas más tranquilas; las tardes traen brisas suaves ideales para remar con más aventura.',
    },
    {
      q: '¿Cómo reservo actividades acuáticas en Almuñécar?',
      a: 'Puedes visitarnos directamente en la Playa de San Cristóbal en Almuñécar. Recomendamos venir con antelación durante la temporada alta (julio y agosto).',
    },
  ],
  en: [
    {
      q: 'What water activities are available in Almuñécar?',
      a: 'We rent single and double kayaks, stand-up paddle boards (SUP), and water bikes on Playa de San Cristóbal, Almuñécar.',
    },
    {
      q: 'Do I need experience for water sports in Almuñécar?',
      a: 'No experience needed! Our stable equipment and the calm bay waters are perfect for beginners. We show you the basics before you set off and provide all safety equipment.',
    },
    {
      q: 'What does the rental price include?',
      a: 'Every rental includes the equipment (kayak or SUP board), paddle, and life jacket.',
    },
    {
      q: 'What are the best conditions for water sports on the Costa Tropical?',
      a: 'The Costa Tropical enjoys over 300 days of sunshine a year. Mornings usually offer the calmest water; afternoons bring gentle breezes ideal for more adventurous paddling.',
    },
    {
      q: 'How do I book water activities in Almuñécar?',
      a: 'Visit us directly on Playa de San Cristóbal in Almuñécar. We recommend arriving early during high season (July and August).',
    },
  ],
  fr: [
    {
      q: 'Quelles activités nautiques sont disponibles à Almuñécar ?',
      a: 'Nous louons des kayaks simples et doubles, des planches de paddle surf (SUP) et des vélos aquatiques sur la Playa de San Cristóbal, Almuñécar.',
    },
    {
      q: "Ai-je besoin d'expérience pour les sports nautiques à Almuñécar ?",
      a: "Aucune expérience requise ! Notre matériel stable et les eaux calmes de la baie sont parfaits pour les débutants. Nous vous expliquons les bases avant le départ et fournissons tout l'équipement de sécurité.",
    },
    {
      q: 'Que comprend le prix de la location ?',
      a: "Chaque location comprend le matériel (kayak ou planche SUP), la pagaie et le gilet de sauvetage.",
    },
    {
      q: 'Quelles sont les meilleures conditions pour les sports nautiques sur la Costa Tropical ?',
      a: 'La Costa Tropical bénéficie de plus de 300 jours de soleil par an. Les matins offrent les eaux les plus calmes ; les après-midis apportent de légères brises idéales pour pagayer.',
    },
    {
      q: 'Comment réserver des activités nautiques à Almuñécar ?',
      a: 'Rendez-nous visite directement sur la Playa de San Cristóbal à Almuñécar. Nous recommandons de venir tôt en haute saison (juillet et août).',
    },
  ],
};

const SchemaMarkup = () => {
  const { language } = useLanguage();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    alternateName: 'OpenSea Almuñécar',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.telephone,
      contactType: 'customer service',
      areaServed: 'ES',
      availableLanguage: ['Spanish', 'English', 'French'],
    },
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: BUSINESS.name,
    description:
      'Alquiler de kayak y paddle surf en Almuñécar, Granada. Costa Tropical.',
    image: [
      `${SITE_URL}/logo.png`,
      `${SITE_URL}/images/kayak-1200w.jpg`,
      `${SITE_URL}/images/paddle-1200w.jpg`,
    ],
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    hasMap: GBP_URL,
    areaServed: { '@type': 'Place', name: 'Costa Tropical, Granada' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Water Sports Rentals',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kayak Rental',
            description: 'Single and double kayak rentals for exploring the Costa Tropical',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '10.00',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stand Up Paddle Board Rental',
            description: 'SUP board rentals with all equipment included',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '12.00',
            priceCurrency: 'EUR',
          },
        },
      ],
    },
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ[language].map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
};

export default SchemaMarkup;
