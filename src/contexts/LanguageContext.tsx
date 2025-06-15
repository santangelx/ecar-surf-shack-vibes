
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es' | 'fr';

// Define translations structure
type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Our translations
const translations: Translations = {
  en: {
    // Hero section
    tagline: "Kayak & Paddle Surf in Almuñecar, Granada",
    description: "Experience the beautiful Mediterranean coast from a different perspective. Rent kayaks and paddle surf boards with us for an unforgettable adventure.",
    reserveButton: "Reserve Now",
    viewPricesButton: "View Prices",
    // Navbar
    services: "Services",
    prices: "Prices",
    hours: "Hours",
    location: "Location",
    // Services
    ourServices: "Our Services",
    experienceDescription: "Experience the beautiful coast of Almuñecar",
    kayakTitle: "Kayak Rental",
    kayakDescription: "Explore hidden coves and beaches with our comfortable kayaks",
    kayakDetails: "Our kayaks are perfect for exploring the beautiful coastline of Almuñecar. Stable and easy to maneuver, suitable for 1-2 people.",
    paddleTitle: "Paddle Surf",
    paddleDescription: "Try this popular water sport with our stable boards",
    paddleDetails: "Stand-up paddle boarding is a fun and relaxing way to enjoy the sea. Our high-quality boards provide excellent stability for beginners and performance for experienced paddlers.",
    // Prices
    ourPrices: "Our Prices",
    affordable: "Affordable adventures for everyone",
    includeLife: "Prices include life jacket and basic instruction.",
    allEquipment: "All equipment included. Lessons available upon request.",
    type: "Type",
    oneHour: "1 Hour",
    twoHours: "2 Hours",
    halfDay: "Half Day",
    kayakForTwo: "Kayak (1-2 persons)",
    paddleBoard: "Paddle Board (1-2 persons)",
    // Business hours
    businessHours: "Business Hours",
    whenVisit: "When you can visit us",
    openingTimes: "Opening Times",
    seasonInfo: "Open every day",
    dailyHours: "Daily Hours",
    everyday: "Every day",
    pleaseNote: "Please Note",
    weatherNote: "Hours may vary depending on weather conditions. For rentals longer than 2 hours, please book in advance. Last rental is 2 hours before closing time.",
    // Location
    findUs: "Find Us",
    address: "Paseo Marítimo Rey de España, Almuñecar, Granada, Spain",
    getDirections: "Get Directions",
    // For businesses
    forBusinesses: "For Businesses",
    hotelDeals: "Special offers for hotels and accommodations",
    businessDesc: "Are you a hotel or accommodation in Almuñecar? Offer your clients a special discount on our services. Contact us for special rates and packages for your guests.",
    contactUs: "Contact Us",
    // Footer
    quickLinks: "Quick Links",
    allRightsReserved: "All rights reserved.",
    // Reservation modal
    makeReservation: "Make a Reservation",
    selectActivity: "Select Activity",
    selectDuration: "Select Duration",
    selectDate: "Select Date",
    kayak: "Kayak",
    paddleSurf: "Paddle Surf",
    price: "Price",
    reserve: "Reserve",
    cancel: "Cancel",
    yourDetails: "Your Details",
    name: "Name",
    email: "Email",
    phone: "Phone",
    selectTime: "Select Time",
    company: "Company",
    message: "Message",
    businessInquiryPlaceholder: "Hi, this is Hotel Alcazar. I'd like to reserve 10 kayaks for...",
    send: "Send",
    referralProgram: "Referral Program",
    referralDescription: "Partner with us and earn commission on every booking. We offer a 20% commission on all bookings referred by our business partners.",
    referralCommission: "Referrers keep 20% of booking price for all customers referred. For more info, please fill the form.",
    businessReferral: "Businesses can earn 20% commission on all bookings."
  },
  es: {
    // Hero section
    tagline: "Kayak y Paddle Surf en Almuñecar, Granada",
    description: "Experimenta la hermosa costa mediterránea desde una perspectiva diferente. Alquila kayaks y tablas de paddle surf con nosotros para una aventura inolvidable.",
    reserveButton: "Reservar Ahora",
    viewPricesButton: "Ver Precios",
    // Navbar
    services: "Servicios",
    prices: "Precios",
    hours: "Horarios",
    location: "Ubicación",
    // Services
    ourServices: "Nuestros Servicios",
    experienceDescription: "Experimenta la hermosa costa de Almuñecar",
    kayakTitle: "Alquiler de Kayak",
    kayakDescription: "Explora calas y playas escondidas con nuestros cómodos kayaks",
    kayakDetails: "Nuestros kayaks son perfectos para explorar la hermosa costa de Almuñecar. Estables y fáciles de maniobrar, adecuados para 1-2 personas.",
    paddleTitle: "Paddle Surf",
    paddleDescription: "Prueba este popular deporte acuático con nuestras tablas estables",
    paddleDetails: "El paddle surf es una forma divertida y relajante de disfrutar del mar. Nuestras tablas de alta calidad proporcionan excelente estabilidad para principiantes y rendimiento para paddlers experimentados.",
    // Prices
    ourPrices: "Nuestros Precios",
    affordable: "Aventuras asequibles para todos",
    includeLife: "Los precios incluyen chaleco salvavidas e instrucción básica.",
    allEquipment: "Todo el equipo incluido. Lecciones disponibles bajo petición.",
    type: "Tipo",
    oneHour: "1 Hora",
    twoHours: "2 Horas",
    halfDay: "Medio Día",
    kayakForTwo: "Kayak (1-2 personas)",
    paddleBoard: "Tabla de Paddle (1-2 personas)",
    // Business hours
    businessHours: "Horario Comercial",
    whenVisit: "Cuándo puedes visitarnos",
    openingTimes: "Horarios de Apertura",
    seasonInfo: "Abierto todos los días",
    dailyHours: "Horario Diario",
    everyday: "Todos los días",
    pleaseNote: "Nota Importante",
    weatherNote: "Los horarios pueden variar según las condiciones climáticas. Para alquileres de más de 2 horas, reserve con anticipación. El último alquiler es 2 horas antes del cierre.",
    // Location
    findUs: "Encuéntranos",
    address: "Paseo Marítimo Rey de España, Almuñecar, Granada, España",
    getDirections: "Cómo Llegar",
    // For businesses
    forBusinesses: "Para Empresas",
    hotelDeals: "Ofertas especiales para hoteles y alojamientos",
    businessDesc: "¿Eres un hotel o alojamiento en Almuñecar? Ofrece a tus clientes un descuento especial en nuestros servicios. Contáctanos para tarifas y paquetes especiales para tus huéspedes.",
    contactUs: "Contáctanos",
    // Footer
    quickLinks: "Enlaces Rápidos",
    allRightsReserved: "Todos los derechos reservados.",
    // Reservation modal
    makeReservation: "Hacer una Reserva",
    selectActivity: "Seleccionar Actividad",
    selectDuration: "Seleccionar Duración",
    selectDate: "Seleccionar Fecha",
    kayak: "Kayak",
    paddleSurf: "Paddle Surf",
    price: "Precio",
    reserve: "Reservar",
    cancel: "Cancelar",
    yourDetails: "Tus Datos",
    name: "Nombre",
    email: "Correo Electrónico",
    phone: "Teléfono",
    selectTime: "Seleccionar Hora",
    company: "Empresa",
    message: "Mensaje",
    businessInquiryPlaceholder: "Hola, soy el Hotel Alcazar. Me gustaría reservar 10 kayaks para...",
    send: "Enviar",
    referralProgram: "Programa de Referencias",
    referralDescription: "Asóciese con nosotros y gane comisiones por cada reserva. Ofrecemos una comisión del 20% en todas las reservas referidas por nuestros socios comerciales.",
    referralCommission: "Los referentes mantienen el 20% del precio de reserva para todos los clientes referidos. Para más información, complete el formulario.",
    businessReferral: "Las empresas pueden ganar un 20% de comisión en todas las reservas."
  },
  fr: {
    // Hero section
    tagline: "Kayak et Paddle Surf à Almuñecar, Grenade",
    description: "Découvrez la magnifique côte méditerranéenne sous un angle différent. Louez des kayaks et des planches de paddle surf avec nous pour une aventure inoubliable.",
    reserveButton: "Réserver Maintenant",
    viewPricesButton: "Voir les Prix",
    // Navbar
    services: "Services",
    prices: "Prix",
    hours: "Horaires",
    location: "Emplacement",
    // Services
    ourServices: "Nos Services",
    experienceDescription: "Découvrez la magnifique côte d'Almuñecar",
    kayakTitle: "Location de Kayak",
    kayakDescription: "Explorez les criques et plages cachées avec nos kayaks confortables",
    kayakDetails: "Nos kayaks sont parfaits pour explorer la magnifique côte d'Almuñecar. Stables et faciles à manœuvrer, adaptés pour 1-2 personnes.",
    paddleTitle: "Paddle Surf",
    paddleDescription: "Essayez ce sport nautique populaire avec nos planches stables",
    paddleDetails: "Le paddle surf est une façon amusante et relaxante de profiter de la mer. Nos planches de haute qualité offrent une excellente stabilité pour les débutants et des performances pour les paddlers expérimentés.",
    // Prices
    ourPrices: "Nos Prix",
    affordable: "Des aventures abordables pour tous",
    includeLife: "Les prix incluent un gilet de sauvetage et une instruction de base.",
    allEquipment: "Tout l'équipement inclus. Leçons disponibles sur demande.",
    type: "Type",
    oneHour: "1 Heure",
    twoHours: "2 Heures",
    halfDay: "Demi-Journée",
    kayakForTwo: "Kayak (1-2 personnes)",
    paddleBoard: "Planche de Paddle (1-2 personnes)",
    // Business hours
    businessHours: "Heures d'Ouverture",
    whenVisit: "Quand vous pouvez nous rendre visite",
    openingTimes: "Heures d'Ouverture",
    seasonInfo: "Ouvert tous les jours",
    dailyHours: "Horaires Quotidiens",
    everyday: "Tous les jours",
    pleaseNote: "Veuillez Noter",
    weatherNote: "Les horaires peuvent varier selon les conditions météorologiques. Pour les locations de plus de 2 heures, veuillez réserver à l'avance. La dernière location est 2 heures avant la fermeture.",
    // Location
    findUs: "Trouvez-Nous",
    address: "Paseo Marítimo Rey de España, Almuñecar, Grenade, Espagne",
    getDirections: "Obtenir l'Itinéraire",
    // For businesses
    forBusinesses: "Pour les Entreprises",
    hotelDeals: "Offres spéciales pour les hôtels et hébergements",
    businessDesc: "Êtes-vous un hôtel ou un hébergement à Almuñecar? Offrez à vos clients une réduction spéciale sur nos services. Contactez-nous pour des tarifs et des forfaits spéciaux pour vos invités.",
    contactUs: "Contactez-Nous",
    // Footer
    quickLinks: "Liens Rapides",
    allRightsReserved: "Tous droits réservés.",
    // Reservation modal
    makeReservation: "Faire une Réservation",
    selectActivity: "Sélectionner l'Activité",
    selectDuration: "Sélectionner la Durée",
    selectDate: "Sélectionner la Date",
    kayak: "Kayak",
    paddleSurf: "Paddle Surf",
    price: "Prix",
    reserve: "Réserver",
    cancel: "Annuler",
    yourDetails: "Vos Coordonnées",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    selectTime: "Sélectionner l'Heure",
    company: "Entreprise",
    message: "Message",
    businessInquiryPlaceholder: "Bonjour, c'est l'Hôtel Alcazar. Je voudrais réserver 10 kayaks pour...",
    send: "Envoyer",
    referralProgram: "Programme de Parrainage",
    referralDescription: "Associez-vous avec nous et gagnez une commission sur chaque réservation. Nous offrons une commission de 20% sur toutes les réservations référées par nos partenaires commerciaux.",
    referralCommission: "Les référents conservent 20% du prix de réservation pour tous les clients référés. Pour plus d'informations, veuillez remplir le formulaire.",
    businessReferral: "Les entreprises peuvent gagner 20% de commission sur toutes les réservations."
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
