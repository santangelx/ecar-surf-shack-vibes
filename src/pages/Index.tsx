
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
      description: "Rent kayaks, paddle boards (SUP), and water bikes in Almuñécar, Granada. Calm-bay conditions for all ages on the Costa Tropical. Open daily 11:00–20:00.",
      keywords: "kayak rental Almuñécar, paddle surf Almuñécar, water sports Costa Tropical, SUP rental Granada, kayak Almuñécar, beach activities Almuñécar"
    },
    es: {
      title: "OpenSea Kayak y Paddle Surf Almuñécar | Deportes Acuáticos Costa Tropical",
      description: "Alquila kayaks, tablas de paddle surf (SUP) y bicicletas de agua en Almuñécar, Granada. Aguas tranquilas para todas las edades en la Costa Tropical. Abierto todos los días 11:00–20:00.",
      keywords: "alquiler kayak Almuñécar, paddle surf Almuñécar, deportes acuáticos Costa Tropical, alquiler SUP Granada, kayak Almuñécar, actividades playa Almuñécar"
    },
    fr: {
      title: "OpenSea Kayak et Paddle Surf Almuñécar | Sports Nautiques Costa Tropical",
      description: "Louez kayaks, planches de paddle (SUP) et vélos aquatiques à Almuñécar, Grenade. Eaux calmes pour tous les âges sur la Costa Tropical. Ouvert tous les jours 11h–20h.",
      keywords: "location kayak Almuñécar, paddle surf Almuñécar, sports nautiques Costa Tropical, location SUP Grenade, kayak Almuñécar, activités plage Almuñécar"
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
      <Prices />
      <BusinessHours />
      <Location />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Index;
