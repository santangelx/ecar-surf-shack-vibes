import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Phone, Waves, Anchor, Sun, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ReservationDialog from '@/components/ReservationDialog';
import SEO from '@/components/SEO';

const SeaActivities = () => {
  const { t, language } = useLanguage();
  
  const activitiesContent = {
    en: {
      title: "Sea Activities Costa Tropical - Water Sports Almuñécar",
      subtitle: "Your Gateway to Mediterranean Adventures in Granada",
      intro: "Discover the best water sports and sea activities in Costa Tropical. From kayaking to paddle boarding, snorkeling to coastal tours, experience the Mediterranean like a local in Almuñécar, Granada.",
      activities: [
        { 
          icon: Waves, 
          title: "Kayak Tours", 
          desc: "Explore hidden caves and pristine beaches accessible only by kayak",
          duration: "2-4 hours",
          price: "From 25€"
        },
        { 
          icon: Anchor, 
          title: "Stand Up Paddle", 
          desc: "Perfect for all ages, enjoy the calm waters of our protected bay",
          duration: "1-8 hours",
          price: "From 15€"
        },
        { 
          icon: Sun, 
          title: "Sunrise & Sunset Tours", 
          desc: "Magical experiences paddling during golden hour",
          duration: "90 minutes",
          price: "35€"
        },
        { 
          icon: Camera, 
          title: "Photo Safari Tours", 
          desc: "Capture the beauty of Costa Tropical from the water",
          duration: "3 hours",
          price: "45€"
        }
      ],
      whyChoose: [
        "Professional certified instructors",
        "Premium equipment from top brands",
        "Small group sizes for personalized attention",
        "Local expertise since 2015",
        "Eco-friendly practices",
        "Insurance included"
      ]
    },
    es: {
      title: "Actividades Marítimas Costa Tropical - Deportes Acuáticos Almuñécar",
      subtitle: "Tu Puerta a las Aventuras Mediterráneas en Granada",
      intro: "Descubre los mejores deportes acuáticos y actividades marítimas en la Costa Tropical. Desde kayak hasta paddle board, snorkel hasta tours costeros, experimenta el Mediterráneo como un local en Almuñécar, Granada.",
      activities: [
        { 
          icon: Waves, 
          title: "Tours en Kayak", 
          desc: "Explora cuevas ocultas y playas vírgenes accesibles solo en kayak",
          duration: "2-4 horas",
          price: "Desde 25€"
        },
        { 
          icon: Anchor, 
          title: "Stand Up Paddle", 
          desc: "Perfecto para todas las edades, disfruta las aguas tranquilas de nuestra bahía protegida",
          duration: "1-8 horas",
          price: "Desde 15€"
        },
        { 
          icon: Sun, 
          title: "Tours Amanecer y Atardecer", 
          desc: "Experiencias mágicas remando durante la hora dorada",
          duration: "90 minutos",
          price: "35€"
        },
        { 
          icon: Camera, 
          title: "Tours Safari Fotográfico", 
          desc: "Captura la belleza de la Costa Tropical desde el agua",
          duration: "3 horas",
          price: "45€"
        }
      ],
      whyChoose: [
        "Instructores profesionales certificados",
        "Equipo premium de las mejores marcas",
        "Grupos pequeños para atención personalizada",
        "Experiencia local desde 2015",
        "Prácticas eco-amigables",
        "Seguro incluido"
      ]
    },
    fr: {
      title: "Activités Maritimes Costa Tropical - Sports Nautiques Almuñécar",
      subtitle: "Votre Porte vers les Aventures Méditerranéennes à Grenade",
      intro: "Découvrez les meilleurs sports nautiques et activités maritimes sur la Costa Tropical. Du kayak au paddle board, de la plongée aux tours côtiers, vivez la Méditerranée comme un local à Almuñécar, Grenade.",
      activities: [
        { 
          icon: Waves, 
          title: "Tours en Kayak", 
          desc: "Explorez grottes cachées et plages vierges accessibles uniquement en kayak",
          duration: "2-4 heures",
          price: "À partir de 25€"
        },
        { 
          icon: Anchor, 
          title: "Stand Up Paddle", 
          desc: "Parfait pour tous âges, profitez des eaux calmes de notre baie protégée",
          duration: "1-8 heures",
          price: "À partir de 15€"
        },
        { 
          icon: Sun, 
          title: "Tours Lever et Coucher de Soleil", 
          desc: "Expériences magiques en pagayant pendant l'heure dorée",
          duration: "90 minutes",
          price: "35€"
        },
        { 
          icon: Camera, 
          title: "Tours Safari Photo", 
          desc: "Capturez la beauté de la Costa Tropical depuis l'eau",
          duration: "3 heures",
          price: "45€"
        }
      ],
      whyChoose: [
        "Instructeurs professionnels certifiés",
        "Équipement premium des meilleures marques",
        "Petits groupes pour attention personnalisée",
        "Expertise locale depuis 2015",
        "Pratiques éco-responsables",
        "Assurance incluse"
      ]
    }
  };

  const content = activitiesContent[language];
  
  // SEO metadata
  const seoData = {
    en: {
      title: "Sea Activities Costa Tropical | Water Sports Almuñécar Granada",
      description: "Experience the best water sports in Costa Tropical. Kayaking, paddle boarding, sunrise tours, and more in Almuñécar, Granada. Professional instructors, all equipment included.",
      keywords: "water sports Almuñécar, sea activities Costa Tropical, water sports Granada, Mediterranean activities, kayak tours Almuñécar, SUP tours Granada"
    },
    es: {
      title: "Actividades Marítimas Costa Tropical | Deportes Acuáticos Almuñécar",
      description: "Experimenta los mejores deportes acuáticos en la Costa Tropical. Kayak, paddle surf, tours al amanecer y más en Almuñécar, Granada. Instructores profesionales, equipo incluido.",
      keywords: "deportes acuáticos Almuñécar, actividades marítimas Costa Tropical, deportes acuáticos Granada, actividades Mediterráneo, tours kayak Almuñécar, tours SUP Granada"
    },
    fr: {
      title: "Activités Maritimes Costa Tropical | Sports Nautiques Almuñécar",
      description: "Découvrez les meilleurs sports nautiques sur la Costa Tropical. Kayak, paddle board, tours au lever du soleil et plus à Almuñécar, Grenade. Instructeurs professionnels, équipement inclus.",
      keywords: "sports nautiques Almuñécar, activités maritimes Costa Tropical, sports nautiques Grenade, activités Méditerranée, tours kayak Almuñécar, tours SUP Grenade"
    }
  };
  
  // Structured data for FAQPage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What water activities are available in Almuñécar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer kayak rentals, stand up paddle board (SUP) rentals, guided kayak tours, SUP yoga classes, sunrise and sunset paddle tours, and photo safari tours along the Costa Tropical."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need experience for water sports in Almuñécar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No experience necessary! Our stable equipment and calm bay conditions are perfect for beginners. We provide basic instruction and all safety equipment. Professional certified instructors are available for lessons."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in the rental price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All rentals include the equipment (kayak/SUP board), paddle, life jacket, and basic instruction. For tours, we also provide waterproof bags for your belongings and experienced guides."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best conditions for water sports in Costa Tropical?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Costa Tropical enjoys excellent conditions year-round with over 300 days of sunshine. Morning hours typically offer the calmest waters, while afternoons may have light winds perfect for more adventurous paddling."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book water activities in Almuñécar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book online through our website, call us at +34 666 666 666, or visit us directly at Playa San Cristóbal in Almuñécar. We recommend booking in advance during peak season (July-August)."
        }
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
      <section className="relative h-[60vh] bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-700 flex items-center justify-center text-white">
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

      {/* Activities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Our Water Sports & Activities' : 
             language === 'es' ? 'Nuestros Deportes y Actividades Acuáticas' :
             'Nos Sports et Activités Nautiques'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex gap-4">
                    <Icon className="w-10 h-10 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                      <p className="text-gray-600 mb-3">{activity.desc}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{activity.duration}</span>
                        <span className="font-semibold text-blue-600">{activity.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Why Choose OpenSea Costa Tropical' : 
             language === 'es' ? 'Por Qué Elegir OpenSea Costa Tropical' :
             'Pourquoi Choisir OpenSea Costa Tropical'}
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {content.whyChoose.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready for Your Mediterranean Adventure?' : 
             language === 'es' ? '¿Listo para tu Aventura Mediterránea?' :
             'Prêt pour Votre Aventure Méditerranéenne?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'en' ? 'Book your water sports experience today and create unforgettable memories on the Costa Tropical' : 
             language === 'es' ? 'Reserva tu experiencia de deportes acuáticos hoy y crea recuerdos inolvidables en la Costa Tropical' :
             'Réservez votre expérience de sports nautiques aujourd\'hui et créez des souvenirs inoubliables sur la Costa Tropical'}
          </p>
          <div className="flex gap-4 justify-center">
            <ReservationDialog>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('reserveButton')}
              </Button>
            </ReservationDialog>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              {language === 'en' ? 'Call Us' : language === 'es' ? 'Llámanos' : 'Appelez-nous'}
            </Button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Visit Us in Almuñécar' : 
             language === 'es' ? 'Visítanos en Almuñécar' :
             'Visitez-nous à Almuñécar'}
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

export default SeaActivities; 