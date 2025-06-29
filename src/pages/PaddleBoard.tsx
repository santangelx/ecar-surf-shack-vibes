import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Phone, Users, Shield, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ReservationDialog from '@/components/ReservationDialog';
import SEO from '@/components/SEO';

const PaddleBoard = () => {
  const { t, language } = useLanguage();
  
  const paddleContent = {
    en: {
      title: "Paddle Board Almuñécar - SUP Rentals Costa Tropical",
      subtitle: "Stand Up Paddle Board Rentals & Lessons in Granada",
      intro: "Experience the Mediterranean Sea like never before with our premium paddle board rentals in Almuñécar. Perfect conditions for SUP with calm waters, stunning views of the Sierra Nevada, and year-round sunshine.",
      benefits: [
        { icon: Users, title: "Beginner Friendly", desc: "Stable boards and calm bay perfect for first-timers" },
        { icon: Shield, title: "Safety First", desc: "All equipment included with certified instructors available" },
        { icon: Award, title: "Premium Equipment", desc: "Latest SUP boards from top brands for optimal performance" }
      ],
      activities: [
        "Morning SUP Yoga Sessions",
        "Sunset Paddle Tours",
        "SUP Fitness Classes",
        "Family Paddle Adventures"
      ]
    },
    es: {
      title: "Paddle Board Almuñécar - Alquiler SUP Costa Tropical",
      subtitle: "Alquiler de Tablas de Paddle Surf y Clases en Granada",
      intro: "Experimenta el Mar Mediterráneo como nunca antes con nuestro alquiler premium de paddle board en Almuñécar. Condiciones perfectas para SUP con aguas tranquilas, vistas impresionantes de Sierra Nevada y sol todo el año.",
      benefits: [
        { icon: Users, title: "Ideal para Principiantes", desc: "Tablas estables y bahía tranquila perfecta para novatos" },
        { icon: Shield, title: "Seguridad Primero", desc: "Todo el equipo incluido con instructores certificados disponibles" },
        { icon: Award, title: "Equipo Premium", desc: "Últimas tablas SUP de marcas top para rendimiento óptimo" }
      ],
      activities: [
        "Sesiones de SUP Yoga Matutinas",
        "Tours de Paddle al Atardecer",
        "Clases de SUP Fitness",
        "Aventuras Familiares en Paddle"
      ]
    },
    fr: {
      title: "Paddle Board Almuñécar - Location SUP Costa Tropical",
      subtitle: "Location de Stand Up Paddle et Cours à Grenade",
      intro: "Découvrez la Mer Méditerranée comme jamais avec nos locations premium de paddle board à Almuñécar. Conditions parfaites pour le SUP avec des eaux calmes, des vues époustouflantes sur la Sierra Nevada et du soleil toute l'année.",
      benefits: [
        { icon: Users, title: "Adapté aux Débutants", desc: "Planches stables et baie calme parfaites pour les novices" },
        { icon: Shield, title: "Sécurité d'Abord", desc: "Tout l'équipement inclus avec instructeurs certifiés disponibles" },
        { icon: Award, title: "Équipement Premium", desc: "Dernières planches SUP des meilleures marques pour performance optimale" }
      ],
      activities: [
        "Sessions de SUP Yoga Matinales",
        "Tours de Paddle au Coucher du Soleil",
        "Cours de SUP Fitness",
        "Aventures Familiales en Paddle"
      ]
    }
  };

  const content = paddleContent[language];
  
  // SEO metadata
  const seoData = {
    en: {
      title: "Paddle Board Rental Almuñécar | SUP Costa Tropical Granada",
      description: "Rent stand up paddle boards (SUP) in Almuñécar, Granada. Perfect conditions for beginners and experts. SUP yoga, sunset tours, equipment included. Book now!",
      keywords: "paddle board rental Almuñécar, SUP hire Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Granada, SUP yoga Mediterranean"
    },
    es: {
      title: "Alquiler Paddle Surf Almuñécar | SUP Costa Tropical Granada",
      description: "Alquila tablas de paddle surf (SUP) en Almuñécar, Granada. Condiciones perfectas para principiantes y expertos. SUP yoga, tours al atardecer, equipo incluido. ¡Reserva!",
      keywords: "alquiler paddle surf Almuñécar, alquiler SUP Granada, stand up paddle Costa Tropical, SUP Almuñécar, paddle board Granada, SUP yoga Mediterráneo"
    },
    fr: {
      title: "Location Paddle Board Almuñécar | SUP Costa Tropical Grenade",
      description: "Louez des planches de stand up paddle (SUP) à Almuñécar, Grenade. Conditions parfaites pour débutants et experts. SUP yoga, tours au coucher du soleil. Réservez!",
      keywords: "location paddle board Almuñécar, location SUP Grenade, stand up paddle Costa Tropical, SUP Almuñécar, paddle surf Grenade, SUP yoga Méditerranée"
    }
  };
  
  // Structured data for paddle board service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Stand Up Paddle Board Rental",
    "provider": {
      "@type": "LocalBusiness",
      "name": "OpenSea Kayak & Paddle Surf",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pl. San Cristóbal",
        "addressLocality": "Almuñécar",
        "addressRegion": "Granada",
        "postalCode": "18690",
        "addressCountry": "ES"
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": "Costa Tropical, Granada"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "1 Hour SUP Rental",
        "price": "15.00",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "SUP Yoga Class",
        "price": "30.00",
        "priceCurrency": "EUR"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={seoData[language].title}
        description={seoData[language].description}
        keywords={seoData[language].keywords}
        structuredData={structuredData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-b from-cyan-900 to-cyan-700 flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{content.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <ReservationDialog>
              <Button size="lg" className="bg-white text-cyan-900 hover:bg-gray-100">
                {t('reserveButton')}
              </Button>
            </ReservationDialog>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              {t('viewPricesButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-center">
            {content.intro}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Why Choose Our SUP Rentals' : 
             language === 'es' ? 'Por Qué Elegir Nuestro Alquiler SUP' :
             'Pourquoi Choisir Nos Locations SUP'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <Icon className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'SUP Activities in Almuñécar' : 
             language === 'es' ? 'Actividades SUP en Almuñécar' :
             'Activités SUP à Almuñécar'}
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid gap-4">
              {content.activities.map((activity, index) => (
                <Card key={index} className="p-4 flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full" />
                  <span className="text-lg">{activity}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Stand Up Paddle Board Prices' : 
             language === 'es' ? 'Precios de Paddle Surf' :
             'Prix de Stand Up Paddle'}
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t('oneHour')}</span>
                  <span className="text-xl font-bold">15€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t('twoHours')}</span>
                  <span className="text-xl font-bold">25€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t('halfDay')} (4h)</span>
                  <span className="text-xl font-bold">35€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="font-medium">{t('day')} (8h)</span>
                  <span className="text-xl font-bold">50€</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">
                    {language === 'en' ? 'SUP Yoga Class (90 min)' : 
                     language === 'es' ? 'Clase SUP Yoga (90 min)' :
                     'Cours SUP Yoga (90 min)'}
                  </span>
                  <span className="text-xl font-bold">30€</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-600 text-center">
                {t('allEquipment')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'SUP Location in Almuñécar' : 
             language === 'es' ? 'Ubicación SUP en Almuñécar' :
             'Emplacement SUP à Almuñécar'}
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-600" />
              <p className="font-medium">{t('address')}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-cyan-600" />
              <p>{t('everyday')}: 10:00 - 19:00</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-cyan-600" />
              <p>+34 666 666 666</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaddleBoard; 