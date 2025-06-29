import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Award, Users, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutUs = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "About OpenSea - Your Local Water Sports Experts",
      subtitle: "Operating on Playa de San Cristóbal since 2015",
      description: "Founded by passionate water sports enthusiasts, OpenSea has been introducing visitors and locals to the beauty of Costa Tropical's coastline for 5 years. Our team of experienced kayak and paddle board instructors ensures safe, memorable experiences on the Mediterranean.",
      stats: [
        { icon: Clock, label: "Years of Experience", value: "5+" },
        { icon: Users, label: "Happy Customers", value: "1,000+" },
        { icon: Award, label: "5-Star Reviews", value: "50+" },
        { icon: Shield, label: "Safety Record", value: "100%" }
      ],
      certifications: "Our experienced team specializes in kayak rentals and paddle board instruction, providing expert guidance for all skill levels. We prioritize safety and fun in every water sports adventure.",
      commitment: "We're committed to sustainable tourism and protecting our beautiful marine environment. All our kayak and paddle board activities follow eco-friendly practices to preserve Costa Tropical for future generations."
    },
    es: {
      title: "Sobre OpenSea - Tus Expertos Locales en Deportes Acuáticos",
      subtitle: "Operando en Playa de San Cristóbal desde 2015",
      description: "Fundada por apasionados de los deportes acuáticos, OpenSea ha estado introduciendo a visitantes y locales a la belleza de la costa de la Costa Tropical durante 5 años. Nuestro equipo de instructores experimentados en kayak y paddle surf garantiza experiencias seguras y memorables en el Mediterráneo.",
      stats: [
        { icon: Clock, label: "Años de Experiencia", value: "5+" },
        { icon: Users, label: "Clientes Satisfechos", value: "1,000+" },
        { icon: Award, label: "Reseñas 5 Estrellas", value: "50+" },
        { icon: Shield, label: "Record de Seguridad", value: "100%" }
      ],
      certifications: "Nuestro equipo experimentado se especializa en alquiler de kayaks e instrucción de paddle surf, proporcionando orientación experta para todos los niveles. Priorizamos la seguridad y la diversión en cada aventura acuática.",
      commitment: "Estamos comprometidos con el turismo sostenible y la protección de nuestro hermoso entorno marino. Todas nuestras actividades de kayak y paddle surf siguen prácticas eco-amigables para preservar la Costa Tropical para las futuras generaciones."
    },
    fr: {
      title: "À Propos d'OpenSea - Vos Experts Locaux en Sports Nautiques",
      subtitle: "Opérant sur Playa de San Cristóbal depuis 2015",
      description: "Fondée par des passionnés de sports nautiques, OpenSea initie les visiteurs et les locaux à la beauté du littoral de la Costa Tropical depuis 5 ans. Notre équipe d'instructeurs expérimentés en kayak et paddle garantit des expériences sûres et mémorables sur la Méditerranée.",
      stats: [
        { icon: Clock, label: "Années d'Expérience", value: "5+" },
        { icon: Users, label: "Clients Satisfaits", value: "1,000+" },
        { icon: Award, label: "Avis 5 Étoiles", value: "50+" },
        { icon: Shield, label: "Record de Sécurité", value: "100%" }
      ],
      certifications: "Notre équipe expérimentée se spécialise dans la location de kayaks et l'instruction de paddle, fournissant des conseils experts pour tous les niveaux. Nous priorisons la sécurité et le plaisir dans chaque aventure aquatique.",
      commitment: "Nous sommes engagés dans le tourisme durable et la protection de notre magnifique environnement marin. Toutes nos activités de kayak et paddle suivent des pratiques éco-responsables pour préserver la Costa Tropical pour les générations futures."
    }
  };
  
  const data = content[language];
  
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{data.title}</h2>
          <p className="text-xl text-center text-gray-600 mb-12">{data.subtitle}</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg leading-relaxed mb-6">{data.description}</p>
              <p className="text-gray-700 mb-6">{data.certifications}</p>
              <p className="text-gray-700 italic">{data.commitment}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6 text-center">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Trust Signals */}
          <div className="text-center">
            <img 
              src="/images/kayak.png" 
              alt="OpenSea team providing kayak instruction at Playa San Cristóbal, Almuñécar"
              className="rounded-lg shadow-lg mx-auto mb-4 max-w-full h-auto"
              loading="lazy"
              width="800"
              height="600"
            />
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Our experienced team ready to guide you on your Mediterranean adventure' :
               language === 'es' ? 'Nuestro equipo experimentado listo para guiarte en tu aventura mediterránea' :
               'Notre équipe expérimentée prête à vous guider dans votre aventure méditerranéenne'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 