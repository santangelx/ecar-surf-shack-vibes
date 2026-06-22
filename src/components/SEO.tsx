import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { SITE_URL, BUSINESS, GBP_URL } from '@/lib/site';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  structuredData?: unknown;
}

const stripTrailingSlash = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = `${SITE_URL}/logo.png`,
  type = 'website',
  structuredData,
}) => {
  const location = useLocation();
  const { language, routePaths } = useLanguage();

  const path = stripTrailingSlash(location.pathname);
  const currentUrl = `${SITE_URL}${path}`;

  // Correct hreflang by construction: find which page-type the current path is,
  // then emit the registered URL for each language (handles differing slugs).
  const types = ['home', 'kayak', 'paddle', 'activities'] as const;
  const langs: Language[] = ['en', 'es', 'fr'];
  let routeType: (typeof types)[number] = 'home';
  for (const t of types) {
    if (langs.some((l) => stripTrailingSlash(routePaths[l][t]) === path)) {
      routeType = t;
      break;
    }
  }
  const hreflangUrls = {
    en: `${SITE_URL}${routePaths.en[routeType]}`,
    es: `${SITE_URL}${routePaths.es[routeType]}`,
    fr: `${SITE_URL}${routePaths.fr[routeType]}`,
  };

  // Default LocalBusiness JSON-LD (overridable via the structuredData prop).
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    image,
    url: currentUrl,
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Language and Alternative URLs */}
      <html lang={language} />
      <link rel="alternate" hrefLang="en" href={hreflangUrls.en} />
      <link rel="alternate" hrefLang="es" href={hreflangUrls.es} />
      <link rel="alternate" hrefLang="fr" href={hreflangUrls.fr} />
      <link rel="alternate" hrefLang="x-default" href={hreflangUrls.es} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'es' ? 'es_ES' : language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content={BUSINESS.name} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={BUSINESS.name} />
      <meta name="geo.region" content="ES-AN" />
      <meta name="geo.placename" content="Almuñécar" />
      <meta name="geo.position" content={`${BUSINESS.latitude};${BUSINESS.longitude}`} />
      <meta name="ICBM" content={`${BUSINESS.latitude}, ${BUSINESS.longitude}`} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(finalStructuredData)}</script>
    </Helmet>
  );
};

export default SEO;
