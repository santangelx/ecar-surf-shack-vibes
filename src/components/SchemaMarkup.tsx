import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaMarkup = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OpenSea Kayak & Paddle Surf",
    "alternateName": "OpenSea Almuñécar",
    "url": "https://opensea-almunecar.com",
    "logo": "https://opensea-almunecar.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34-666-666-666",
      "contactType": "customer service",
      "areaServed": "ES",
      "availableLanguage": ["English", "Spanish", "French"]
    },
    "sameAs": [
      "https://www.facebook.com/opensea.almunecar",
      "https://www.instagram.com/opensea.almunecar",
      "https://twitter.com/opensea_kayak"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "OpenSea Kayak & Paddle Surf",
    "image": [
      "https://opensea-almunecar.com/logo.png",
      "https://opensea-almunecar.com/images/kayak.png",
      "https://opensea-almunecar.com/images/paddle.png"
    ],
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
    "url": "https://opensea-almunecar.com",
    "telephone": "+34666666666",
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Water Sports Rentals",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kayak Rental",
            "description": "Single and double kayak rentals for exploring Costa Tropical"
          },
          "price": "15.00",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stand Up Paddle Board Rental",
            "description": "SUP board rentals with all equipment included"
          },
          "price": "15.00",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://opensea-almunecar.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kayak Rental",
        "item": "https://opensea-almunecar.com/kayak-rental-almunecar"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Paddle Board",
        "item": "https://opensea-almunecar.com/paddle-board-almunecar"
      }
    ]
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "OpenSea Kayak & Paddle Surf"
    },
    "ratingValue": "4.8",
    "reviewCount": "523",
    "bestRating": "5"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup; 