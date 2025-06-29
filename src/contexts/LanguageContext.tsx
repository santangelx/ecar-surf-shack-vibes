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
    allEquipment: "All equipment included.",
    type: "Type",
    oneHour: "1 Hour",
    twoHours: "2 Hours",
    halfDay: "Half Day",
    day: "Day",
    thirtyMinutes: "30 Minutes",
    kayakForTwo: "Kayak (1-2 persons)",
    paddleBoard: "Paddle Board (1-2 persons)",
    twoPersonKayak: "2 Person Kayak",
    onePersonKayak: "1 Person Kayak",
    waterBike: "Water Bike",
    kayakRental: "Kayak Rental",
    waterBikeRental: "Water Bike Rental",
    // Business hours
    businessHours: "Business Hours",
    whenVisit: "When you can visit us",
    openingTimes: "Opening Times",
    seasonInfo: "Open every day",
    dailyHours: "Daily Hours",
    everyday: "Every day",
    pleaseNote: "Please Note",
    weatherNote: "Hours may vary depending on weather conditions.",
    // Location
    findUs: "Find Us",
    locationSubtitle: "We're located on the beautiful beach of Almuñecar",
    address: "Pl. San Cristóbal, 18690 Almuñécar, Granada, Spain",
    howToFindUs: "How to find us",
    locationDescription: "We're located on San Cristóbal beach, right next to the blue flag area. Look for our blue and white flags with the OpenSea logo.",
    getDirections: "Get Directions",
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
    send: "Send"
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
    allEquipment: "Todo el equipo incluido.",
    type: "Tipo",
    oneHour: "1 Hora",
    twoHours: "2 Horas",
    halfDay: "Medio Día",
    day: "Día",
    thirtyMinutes: "30 Minutos",
    kayakForTwo: "Kayak (1-2 personas)",
    paddleBoard: "Tabla de Paddle (1-2 personas)",
    twoPersonKayak: "Kayak de 2 Personas",
    onePersonKayak: "Kayak de 1 Persona",
    waterBike: "Bicicleta de Agua",
    kayakRental: "Alquiler de Kayak",
    waterBikeRental: "Alquiler de Bicicleta de Agua",
    // Business hours
    businessHours: "Horario Comercial",
    whenVisit: "Cuándo puedes visitarnos",
    openingTimes: "Horarios de Apertura",
    seasonInfo: "Abierto todos los días",
    dailyHours: "Horario Diario",
    everyday: "Todos los días",
    pleaseNote: "Nota Importante",
    weatherNote: "Los horarios pueden variar según las condiciones climáticas.",
    // Location
    findUs: "Encuéntranos",
    locationSubtitle: "Estamos ubicados en la hermosa playa de Almuñecar",
    address: "Pl. San Cristóbal, 18690 Almuñécar, Granada, España",
    howToFindUs: "Cómo encontrarnos",
    locationDescription: "Estamos ubicados en la playa de San Cristóbal, justo al lado de la zona pavillon bleu. Busca nuestras banderas azules y blancas con el logo OpenSea.",
    getDirections: "Cómo Llegar",
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
    send: "Enviar"
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
    allEquipment: "Tout l'équipement inclus.",
    type: "Type",
    oneHour: "1 Heure",
    twoHours: "2 Heures",
    halfDay: "Demi-Journée",
    day: "Journée",
    thirtyMinutes: "30 Minutes",
    kayakForTwo: "Kayak (1-2 personnes)",
    paddleBoard: "Planche de Paddle (1-2 personnes)",
    twoPersonKayak: "Kayak de 2 Personnes",
    onePersonKayak: "Kayak de 1 Personne",
    waterBike: "Vélo Aquatique",
    kayakRental: "Location de Kayak",
    waterBikeRental: "Location de Vélo Aquatique",
    // Business hours
    businessHours: "Heures d'Ouverture",
    whenVisit: "Quand vous pouvez nous rendre visite",
    openingTimes: "Heures d'Ouverture",
    seasonInfo: "Ouvert tous les jours",
    dailyHours: "Horaires Quotidiens",
    everyday: "Tous les jours",
    pleaseNote: "Veuillez Noter",
    weatherNote: "Les horaires peuvent varier selon les conditions météorologiques.",
    // Location
    findUs: "Trouvez-Nous",
    locationSubtitle: "Nous sommes situés sur la magnifique plage d'Almuñecar",
    address: "Pl. San Cristóbal, 18690 Almuñécar, Grenade, Espagne",
    howToFindUs: "Comment nous trouver",
    locationDescription: "Nous sommes situés sur la plage de San Cristóbal, juste à côté de la zone pavillon bleu. Cherchez nos drapeaux bleus et blancs avec le logo OpenSea.",
    getDirections: "Obtenir l'Itinéraire",
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
    send: "Envoyer"
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
