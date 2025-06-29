import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  structuredData?: any;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  image = 'https://opensea-almunecar.com/logo.png',
  type = 'website',
  structuredData
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  
  const baseUrl = 'https://opensea-almunecar.com';
  const currentUrl = `${baseUrl}${location.pathname}`;
  
  // Generate hreflang URLs for all language versions
  const hreflangUrls = {
    en: location.pathname.replace(/^\/(es|fr)/, ''),
    es: location.pathname.startsWith('/es') ? location.pathname : `/es${location.pathname}`,
    fr: location.pathname.startsWith('/fr') ? location.pathname : `/fr${location.pathname}`
  };
  
  // Clean up paths
  Object.keys(hreflangUrls).forEach(lang => {
    hreflangUrls[lang as keyof typeof hreflangUrls] = hreflangUrls[lang as keyof typeof hreflangUrls]
      .replace(/\/\//g, '/')
      .replace(/\/$/, '') || '/';
  });
  
  // Default structured data for LocalBusiness
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "OpenSea Kayak & Paddle Surf",
    "image": image,
    "url": currentUrl,
    "telephone": "+34666666666",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pl. San Cristóbal",
      "addressLocality": "Almuñécar",
      "addressRegion": "Granada",
      "postalCode": "18690",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.7334,
      "longitude": -3.6909
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/opensea.almunecar",
      "https://www.instagram.com/opensea.almunecar"
    ]
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
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${hreflangUrls.en}`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}${hreflangUrls.es}`} />
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}${hreflangUrls.fr}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'es' ? 'es_ES' : language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:site_name" content="OpenSea Kayak & Paddle Surf" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@opensea_kayak" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="OpenSea Kayak & Paddle Surf" />
      <meta name="geo.region" content="ES-AN" />
      <meta name="geo.placename" content="Almuñécar" />
      <meta name="geo.position" content="36.7334;-3.6909" />
      <meta name="ICBM" content="36.7334, -3.6909" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;