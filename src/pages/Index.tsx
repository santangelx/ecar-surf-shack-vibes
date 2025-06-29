
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Prices from '@/components/Prices';
import BusinessHours from '@/components/BusinessHours';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AboutUs from '@/components/AboutUs';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();
  
  // SEO metadata
  const seoData = {
    en: {
      title: "OpenSea Kayak & Paddle Surf Almuñécar | Water Sports Costa Tropical",
      description: "Rent kayaks and paddle boards in Almuñécar, Granada. Experience the Mediterranean with professional equipment, guided tours, and SUP yoga. Open daily 10-19h.",
      keywords: "kayak rental Almuñécar, paddle surf Granada, water sports Costa Tropical, SUP rental Spain, kayak tours Mediterranean, beach activities Almuñécar"
    },
    es: {
      title: "OpenSea Kayak y Paddle Surf Almuñécar | Deportes Acuáticos Costa Tropical",
      description: "Alquila kayaks y tablas de paddle en Almuñécar, Granada. Experimenta el Mediterráneo con equipo profesional, tours guiados y SUP yoga. Abierto diario 10-19h.",
      keywords: "alquiler kayak Almuñécar, paddle surf Granada, deportes acuáticos Costa Tropical, alquiler SUP España, tours kayak Mediterráneo, actividades playa Almuñécar"
    },
    fr: {
      title: "OpenSea Kayak et Paddle Surf Almuñécar | Sports Nautiques Costa Tropical",
      description: "Louez kayaks et planches de paddle à Almuñécar, Grenade. Découvrez la Méditerranée avec équipement professionnel, visites guidées et SUP yoga. Ouvert tous les jours 10-19h.",
      keywords: "location kayak Almuñécar, paddle surf Grenade, sports nautiques Costa Tropical, location SUP Espagne, tours kayak Méditerranée, activités plage Almuñécar"
    }
  };
  
  return (
    <div className="min-h-screen">
      <SEO 
        title={seoData[language].title}
        description={seoData[language].description}
        keywords={seoData[language].keywords}
      />
      <SchemaMarkup />
      <Navbar />
      <Hero />
      <Services />
      <AboutUs />
      <Prices />
      <BusinessHours />
      <Location />
      <Footer />
    </div>
  );
};

export default Index;
