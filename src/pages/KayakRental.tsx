import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Phone, Euro } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ReservationDialog from '@/components/ReservationDialog';
import SEO from '@/components/SEO';

const KayakRental = () => {
  const { t, language } = useLanguage();
  
  // SEO-optimized content for kayak rentals
  const kayakContent = {
    en: {
      title: "Kayak Rental Almuñécar - Explore the Costa Tropical",
      subtitle: "Premium Kayak Rentals on the Mediterranean Coast",
      intro: "Discover the stunning coastline of Almuñécar, Granada with our high-quality kayak rentals. Perfect for exploring hidden coves, crystal-clear waters, and the beautiful beaches of Costa Tropical.",
      features: [
        { title: "Stable & Safe Kayaks", desc: "Modern sit-on-top kayaks suitable for beginners and experts" },
        { title: "Guided Tours Available", desc: "Explore secret beaches with our experienced local guides" },
        { title: "All Equipment Included", desc: "Life jackets, paddles, and waterproof bags provided" },
        { title: "Family Friendly", desc: "Double kayaks perfect for couples or parent-child adventures" }
      ]
    },
    es: {
      title: "Alquiler de Kayak Almuñécar - Explora la Costa Tropical",
      subtitle: "Alquiler Premium de Kayaks en la Costa Mediterránea",
      intro: "Descubre la impresionante costa de Almuñécar, Granada con nuestro alquiler de kayaks de alta calidad. Perfecto para explorar calas ocultas, aguas cristalinas y las hermosas playas de la Costa Tropical.",
      features: [
        { title: "Kayaks Estables y Seguros", desc: "Kayaks modernos tipo sit-on-top aptos para principiantes y expertos" },
        { title: "Tours Guiados Disponibles", desc: "Explora playas secretas con nuestros guías locales experimentados" },
        { title: "Todo el Equipo Incluido", desc: "Chalecos salvavidas, remos y bolsas impermeables incluidos" },
        { title: "Ideal para Familias", desc: "Kayaks dobles perfectos para parejas o aventuras padre-hijo" }
      ]
    },
    fr: {
      title: "Location de Kayak Almuñécar - Explorez la Costa Tropical",
      subtitle: "Location Premium de Kayaks sur la Côte Méditerranéenne",
      intro: "Découvrez le magnifique littoral d'Almuñécar, Grenade avec nos locations de kayaks de haute qualité. Parfait pour explorer les criques cachées, les eaux cristallines et les belles plages de la Costa Tropical.",
      features: [
        { title: "Kayaks Stables et Sûrs", desc: "Kayaks modernes sit-on-top adaptés aux débutants et experts" },
        { title: "Visites Guidées Disponibles", desc: "Explorez des plages secrètes avec nos guides locaux expérimentés" },
        { title: "Tout l'Équipement Inclus", desc: "Gilets de sauvetage, pagaies et sacs étanches fournis" },
        { title: "Convivial pour les Familles", desc: "Kayaks doubles parfaits pour couples ou aventures parent-enfant" }
      ]
    }
  };

  const content = kayakContent[language];
  
  // SEO metadata
  const seoData = {
    en: {
      title: "Kayak Rental Almuñécar | OpenSea Costa Tropical Granada",
      description: "Rent kayaks in Almuñécar, Granada. Explore Costa Tropical's hidden beaches and crystal-clear waters. Premium equipment, guided tours available. Book online now!",
      keywords: "kayak rental Almuñécar, kayak hire Granada, Costa Tropical kayaking, sea kayak Almuñécar, kayak tours Granada, Mediterranean kayaking Spain"
    },
    es: {
      title: "Alquiler de Kayak Almuñécar | OpenSea Costa Tropical Granada",
      description: "Alquila kayaks en Almuñécar, Granada. Explora las playas ocultas y aguas cristalinas de la Costa Tropical. Equipo premium, tours guiados disponibles. ¡Reserva online!",
      keywords: "alquiler kayak Almuñécar, alquiler kayak Granada, kayak Costa Tropical, kayak de mar Almuñécar, tours kayak Granada, kayak Mediterráneo España"
    },
    fr: {
      title: "Location de Kayak Almuñécar | OpenSea Costa Tropical Grenade",
      description: "Louez des kayaks à Almuñécar, Grenade. Explorez les plages cachées et les eaux cristallines de la Costa Tropical. Équipement premium, visites guidées disponibles. Réservez en ligne!",
      keywords: "location kayak Almuñécar, location kayak Grenade, kayak Costa Tropical, kayak de mer Almuñécar, tours kayak Grenade, kayak Méditerranée Espagne"
    }
  };
  
  // Structured data for kayak rental service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Kayak Rental",
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
        "name": "1 Hour Kayak Rental",
        "price": "15.00",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Full Day Kayak Rental",
        "price": "50.00",
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
      
      {/* Hero Section with H1 */}
      <section className="relative h-[60vh] bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{content.subtitle}</p>
          <ReservationDialog>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              {t('reserveButton')}
            </Button>
          </ReservationDialog>
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

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Why Choose Our Kayak Rentals' : 
             language === 'es' ? 'Por Qué Elegir Nuestro Alquiler de Kayaks' :
             'Pourquoi Choisir Nos Locations de Kayaks'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.features.map((feature, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Kayak Rental Prices' : 
             language === 'es' ? 'Precios de Alquiler de Kayak' :
             'Prix de Location de Kayak'}
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
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">{t('day')} (8h)</span>
                  <span className="text-xl font-bold">50€</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-600 text-center">
                {t('includeLife')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Find Us in Almuñécar' : 
             language === 'es' ? 'Encuéntranos en Almuñécar' :
             'Trouvez-nous à Almuñécar'}
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <p className="font-medium">{t('address')}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p>{t('everyday')}: 10:00 - 19:00</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <p>+34 666 666 666</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KayakRental; 