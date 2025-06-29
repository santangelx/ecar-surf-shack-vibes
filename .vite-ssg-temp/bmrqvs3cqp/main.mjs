var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _q, _r;
import { jsx, jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import * as React from "react";
import React__default, { createContext, useState, useEffect, useContext, Component } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ChevronRight, Check, Circle, Globe, Menu, ArrowDown, Ship, Waves, Users, User, Bike, Clock, MapPin, Award, Shield, ChevronDown, ChevronUp, ChevronLeft, CalendarIcon, Phone, Anchor, Sun, Camera } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, useNavigate, Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { Slot } from "@radix-ui/react-slot";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format } from "date-fns";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      });
    case "UPDATE_TOAST":
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? __spreadValues(__spreadValues({}, t), action.toast) : t
        )
      });
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? __spreadProps(__spreadValues({}, t), {
            open: false
          }) : t
        )
      });
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return __spreadProps(__spreadValues({}, state), {
          toasts: []
        });
      }
      return __spreadProps(__spreadValues({}, state), {
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      });
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast(_a) {
  var props = __objRest(_a, []);
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: __spreadProps(__spreadValues({}, props2), { id })
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: __spreadProps(__spreadValues({}, props), {
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    })
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return __spreadProps(__spreadValues({}, state), {
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef((_b, ref) => {
  var _c = _b, { className } = _c, props = __objRest(_c, ["className"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Viewport,
    __spreadValues({
      ref,
      className: cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )
    }, props)
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef((_d, ref) => {
  var _e = _d, { className, variant } = _e, props = __objRest(_e, ["className", "variant"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    __spreadValues({
      ref,
      className: cn(toastVariants({ variant }), className)
    }, props)
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef((_f, ref) => {
  var _g = _f, { className } = _g, props = __objRest(_g, ["className"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Action,
    __spreadValues({
      ref,
      className: cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className
      )
    }, props)
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef((_h, ref) => {
  var _i = _h, { className } = _i, props = __objRest(_i, ["className"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Close,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        className
      ),
      "toast-close": ""
    }, props), {
      children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
    })
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef((_j, ref) => {
  var _k = _j, { className } = _k, props = __objRest(_k, ["className"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Title,
    __spreadValues({
      ref,
      className: cn("text-sm font-semibold", className)
    }, props)
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef((_l, ref) => {
  var _m = _l, { className } = _m, props = __objRest(_m, ["className"]);
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Description,
    __spreadValues({
      ref,
      className: cn("text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function(_a) {
      var _b = _a, { id, title, description, action } = _b, props = __objRest(_b, ["id", "title", "description", "action"]);
      return /* @__PURE__ */ jsxs(Toast, __spreadProps(__spreadValues({}, props), { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }), id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = (_n) => {
  var props = __objRest(_n, []);
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    __spreadValues({
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }
    }, props)
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef((_o, ref) => {
  var _p = _o, { className, sideOffset = 4 } = _p, props = __objRest(_p, ["className", "sideOffset"]);
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const translations = {
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
    home: "Home",
    kayakRentals: "Kayak Rentals",
    paddleBoardNav: "Paddle Board",
    seaActivities: "Sea Activities",
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
    home: "Inicio",
    kayakRentals: "Alquiler Kayak",
    paddleBoardNav: "Paddle Surf",
    seaActivities: "Actividades Marítimas",
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
    home: "Accueil",
    kayakRentals: "Location Kayak",
    paddleBoardNav: "Paddle Board",
    seaActivities: "Activités Maritimes",
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
const routePaths = {
  en: {
    home: "/",
    kayak: "/kayak-rental-almunecar",
    paddle: "/paddle-board-almunecar",
    activities: "/sea-activities-costa-tropical"
  },
  es: {
    home: "/es",
    kayak: "/es/alquiler-kayak-almunecar",
    paddle: "/es/paddle-surf-almunecar",
    activities: "/es/actividades-maritimas-costa-tropical"
  },
  fr: {
    home: "/fr",
    kayak: "/fr/location-kayak-almunecar",
    paddle: "/fr/paddle-board-almunecar",
    activities: "/fr/activites-maritimes-costa-tropical"
  }
};
const LanguageContext = createContext(void 0);
const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguageState] = useState("en");
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/es")) {
      setLanguageState("es");
    } else if (path.startsWith("/fr")) {
      setLanguageState("fr");
    } else {
      setLanguageState("en");
    }
  }, [location.pathname]);
  const setLanguage = (newLanguage) => {
    setLanguageState(newLanguage);
    const currentPath = location.pathname;
    let routeType = "home";
    if (currentPath.includes("kayak")) {
      routeType = "kayak";
    } else if (currentPath.includes("paddle")) {
      routeType = "paddle";
    } else if (currentPath.includes("activities") || currentPath.includes("actividades") || currentPath.includes("activites")) {
      routeType = "activities";
    }
    const newPath = routePaths[newLanguage][routeType];
    navigate(newPath);
  };
  const t = (key) => {
    return translations[language][key] || key;
  };
  const getLocalizedPath = (path) => {
    if (language === "en") return path;
    return `/${language}${path}`;
  };
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value: { language, setLanguage, t, getLocalizedPath, routePaths }, children });
};
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === void 0) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => __spreadValues(__spreadValues({}, tagAttrs), current), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = __spreadValues(__spreadValues({}, approvedSeenTags[attributeKey]), instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return __spreadProps(__spreadValues({}, obj), {
    [key]: void 0
  });
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_q = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _q.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_q, "canUseDOM", isDocument), _q);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a;
    return (_a = tag.parentNode) == null ? void 0 : _a.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = __spreadValues({}, instance.props);
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_r = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return __spreadProps(__spreadValues({}, arrayTypeChildren), {
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        __spreadValues(__spreadValues({}, newChildProps), this.mapNestedChildrenToProps(child, nestedChildren))
      ]
    });
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return __spreadProps(__spreadValues({}, newProps), {
          [child.type]: nestedChildren,
          titleAttributes: __spreadValues({}, newChildProps)
        });
      case "body":
        return __spreadProps(__spreadValues({}, newProps), {
          bodyAttributes: __spreadValues({}, newChildProps)
        });
      case "html":
        return __spreadProps(__spreadValues({}, newProps), {
          htmlAttributes: __spreadValues({}, newChildProps)
        });
      default:
        return __spreadProps(__spreadValues({}, newProps), {
          [child.type]: __spreadValues({}, newChildProps)
        });
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = __spreadValues({}, newProps);
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = __spreadProps(__spreadValues({}, newFlattenedProps), {
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      });
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const _a = child.props, { children: nestedChildren } = _a, childProps = __objRest(_a, ["children"]);
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const _a = this.props, { children } = _a, props = __objRest(_a, ["children"]);
    let newProps = __spreadValues({}, props);
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, __spreadProps(__spreadValues({}, newProps), { context: helmetData.value })) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, __spreadProps(__spreadValues({}, newProps), { context })));
  }
}, __publicField(_r, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _r);
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  (_s, ref) => {
    var _t = _s, { className, variant, size, asChild = false } = _t, props = __objRest(_t, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      __spreadValues({
        className: cn(buttonVariants({ variant, size, className })),
        ref
      }, props)
    );
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef((_u, ref) => {
  var _v = _u, { className, inset, children } = _v, props = __objRest(_v, ["className", "inset", "children"]);
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.SubTrigger,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
      ]
    })
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef((_w, ref) => {
  var _x = _w, { className } = _x, props = __objRest(_x, ["className"]);
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.SubContent,
    __spreadValues({
      ref,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef((_y, ref) => {
  var _z = _y, { className, sideOffset = 4 } = _z, props = __objRest(_z, ["className", "sideOffset"]);
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ) });
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef((_A, ref) => {
  var _B = _A, { className, inset } = _B, props = __objRest(_B, ["className", "inset"]);
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    __spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )
    }, props)
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef((_C, ref) => {
  var _D = _C, { className, children, checked } = _D, props = __objRest(_D, ["className", "children", "checked"]);
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      checked
    }, props), {
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
        children
      ]
    })
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef((_E, ref) => {
  var _F = _E, { className, children } = _F, props = __objRest(_F, ["className", "children"]);
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.RadioItem,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
        children
      ]
    })
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef((_G, ref) => {
  var _H = _G, { className, inset } = _H, props = __objRest(_H, ["className", "inset"]);
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    __spreadValues({
      ref,
      className: cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )
    }, props)
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef((_I, ref) => {
  var _J = _I, { className } = _J, props = __objRest(_J, ["className"]);
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" }
  ];
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: language.toUpperCase() })
    ] }) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "bg-white", children: languages.map((lang) => /* @__PURE__ */ jsx(
      DropdownMenuItem,
      {
        onClick: () => setLanguage(lang.code),
        className: `${language === lang.code ? "bg-ocean-light text-ocean-dark" : ""} cursor-pointer`,
        children: lang.label
      },
      lang.code
    )) })
  ] });
};
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, routePaths: routePaths2, language } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isHomePage = location.pathname === "/" || location.pathname === "/es" || location.pathname === "/fr";
  const navLinks = [
    { href: routePaths2[language].home, label: t("home"), isRoute: true },
    { href: routePaths2[language].kayak, label: t("kayakRentals"), isRoute: true },
    { href: routePaths2[language].paddle, label: t("paddleBoardNav"), isRoute: true },
    { href: routePaths2[language].activities, label: t("seaActivities"), isRoute: true }
  ];
  const homePageLinks = [
    { href: "#services", label: t("services"), isRoute: false },
    { href: "#prices", label: t("prices"), isRoute: false },
    { href: "#hours", label: t("hours"), isRoute: false },
    { href: "#location", label: t("location"), isRoute: false }
  ];
  const links = isHomePage ? [...navLinks.slice(0, 1), ...homePageLinks] : navLinks;
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(Link, { to: routePaths2[language].home, className: "text-2xl font-bold text-ocean-dark", children: "OpenSea" }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-6", children: [
            links.map((link) => link.isRoute ? /* @__PURE__ */ jsx(
              Link,
              {
                to: link.href,
                className: cn(
                  "font-medium transition-colors",
                  location.pathname === link.href ? "text-ocean-dark font-semibold" : "text-gray-700 hover:text-ocean"
                ),
                children: link.label
              },
              link.href
            ) : /* @__PURE__ */ jsx(
              "a",
              {
                href: link.href,
                className: "font-medium text-gray-700 hover:text-ocean transition-colors",
                children: link.label
              },
              link.href
            )),
            /* @__PURE__ */ jsx(LanguageSelector, {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 md:hidden", children: [
            /* @__PURE__ */ jsx(LanguageSelector, {}),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "md:hidden",
                onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                children: /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
              }
            )
          ] })
        ] }),
        mobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-white shadow-lg rounded-lg mt-4 p-4 animate-fade-in", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-4", children: links.map((link) => link.isRoute ? /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            className: cn(
              "font-medium transition-colors px-3 py-2",
              location.pathname === link.href ? "text-ocean-dark font-semibold" : "text-gray-700 hover:text-ocean"
            ),
            onClick: () => setMobileMenuOpen(false),
            children: link.label
          },
          link.href
        ) : /* @__PURE__ */ jsx(
          "a",
          {
            href: link.href,
            className: "font-medium text-gray-700 hover:text-ocean transition-colors px-3 py-2",
            onClick: () => setMobileMenuOpen(false),
            children: link.label
          },
          link.href
        )) }) })
      ] })
    }
  );
};
const Hero = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxs("section", { className: "relative h-screen flex items-center bg-hero-pattern bg-cover bg-center pt-16", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white/50 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6 z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-black mb-4 animate-fade-in tracking-tight", style: { fontFamily: "Arial Black, sans-serif", fontWeight: 900 }, children: [
        /* @__PURE__ */ jsx("span", { className: "block text-ocean", children: "OPEN" }),
        /* @__PURE__ */ jsx("span", { className: "text-ocean", children: "SEA" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-medium text-gray-800 mb-6 animate-fade-in", children: t("tagline") }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700 mb-8 animate-fade-in", children: t("description") })
    ] }) }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#services",
        className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-ocean hover:text-ocean-dark transition-colors",
        children: /* @__PURE__ */ jsx(ArrowDown, { className: "h-10 w-10 animate-bounce" })
      }
    )
  ] });
};
const Card = React.forwardRef((_K, ref) => {
  var _L = _K, { className } = _L, props = __objRest(_L, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      ref,
      className: cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )
    }, props)
  );
});
Card.displayName = "Card";
const CardHeader = React.forwardRef((_M, ref) => {
  var _N = _M, { className } = _N, props = __objRest(_N, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      ref,
      className: cn("flex flex-col space-y-1.5 p-6", className)
    }, props)
  );
});
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef((_O, ref) => {
  var _P = _O, { className } = _P, props = __objRest(_P, ["className"]);
  return /* @__PURE__ */ jsx(
    "h3",
    __spreadValues({
      ref,
      className: cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef((_Q, ref) => {
  var _R = _Q, { className } = _R, props = __objRest(_R, ["className"]);
  return /* @__PURE__ */ jsx(
    "p",
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef((_S, ref) => {
  var _T = _S, { className } = _T, props = __objRest(_T, ["className"]);
  return /* @__PURE__ */ jsx("div", __spreadValues({ ref, className: cn("p-6 pt-0", className) }, props));
});
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef((_U, ref) => {
  var _V = _U, { className } = _V, props = __objRest(_V, ["className"]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      ref,
      className: cn("flex items-center p-6 pt-0", className)
    }, props)
  );
});
CardFooter.displayName = "CardFooter";
const Services = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id: "services", className: "py-20 bg-ocean-light", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: t("ourServices") }),
      /* @__PURE__ */ jsx("p", { className: "section-subtitle", children: t("experienceDescription") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden bg-white/70 backdrop-blur-sm border border-ocean-light hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "h-64 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/lovable-uploads/kayak.jpeg",
            alt: "Kayak rental service in Almuñécar beach - Double and single kayaks available for exploring Costa Tropical coastline",
            className: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
            loading: "lazy",
            width: "400",
            height: "256"
          }
        ) }),
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Ship, { className: "h-6 w-6 text-ocean" }),
            /* @__PURE__ */ jsx(CardTitle, { children: t("kayakTitle") })
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: t("kayakDescription") })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: t("kayakDetails") }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden bg-white/70 backdrop-blur-sm border border-ocean-light hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsx("div", { className: "h-64 overflow-hidden", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/lovable-uploads/paddle.jpeg",
            alt: "Stand up paddle board (SUP) rental in Almuñécar - Professional boards for beginners and advanced paddlers on Mediterranean Sea",
            className: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
            loading: "lazy",
            width: "400",
            height: "256"
          }
        ) }),
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Waves, { className: "h-6 w-6 text-ocean" }),
            /* @__PURE__ */ jsx(CardTitle, { children: t("paddleTitle") })
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: t("paddleDescription") })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: t("paddleDetails") }) })
      ] })
    ] })
  ] }) });
};
const Table = React.forwardRef((_W, ref) => {
  var _X = _W, { className } = _X, props = __objRest(_X, ["className"]);
  return /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
    "table",
    __spreadValues({
      ref,
      className: cn("w-full caption-bottom text-sm", className)
    }, props)
  ) });
});
Table.displayName = "Table";
const TableHeader = React.forwardRef((_Y, ref) => {
  var _Z = _Y, { className } = _Z, props = __objRest(_Z, ["className"]);
  return /* @__PURE__ */ jsx("thead", __spreadValues({ ref, className: cn("[&_tr]:border-b", className) }, props));
});
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef((__, ref) => {
  var _$ = __, { className } = _$, props = __objRest(_$, ["className"]);
  return /* @__PURE__ */ jsx(
    "tbody",
    __spreadValues({
      ref,
      className: cn("[&_tr:last-child]:border-0", className)
    }, props)
  );
});
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef((_aa, ref) => {
  var _ba = _aa, { className } = _ba, props = __objRest(_ba, ["className"]);
  return /* @__PURE__ */ jsx(
    "tfoot",
    __spreadValues({
      ref,
      className: cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )
    }, props)
  );
});
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef((_ca, ref) => {
  var _da = _ca, { className } = _da, props = __objRest(_da, ["className"]);
  return /* @__PURE__ */ jsx(
    "tr",
    __spreadValues({
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )
    }, props)
  );
});
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef((_ea, ref) => {
  var _fa = _ea, { className } = _fa, props = __objRest(_fa, ["className"]);
  return /* @__PURE__ */ jsx(
    "th",
    __spreadValues({
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )
    }, props)
  );
});
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef((_ga, ref) => {
  var _ha = _ga, { className } = _ha, props = __objRest(_ha, ["className"]);
  return /* @__PURE__ */ jsx(
    "td",
    __spreadValues({
      ref,
      className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)
    }, props)
  );
});
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef((_ia, ref) => {
  var _ja = _ia, { className } = _ja, props = __objRest(_ja, ["className"]);
  return /* @__PURE__ */ jsx(
    "caption",
    __spreadValues({
      ref,
      className: cn("mt-4 text-sm text-muted-foreground", className)
    }, props)
  );
});
TableCaption.displayName = "TableCaption";
const Prices = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id: "prices", className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: t("ourPrices") }),
      /* @__PURE__ */ jsx("p", { className: "section-subtitle", children: t("affordable") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 md:p-6 border border-ocean-light overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-6 w-6 text-ocean" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-ocean-dark", children: t("twoPersonKayak") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableCaption, { children: t("includeLife") }),
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: t("type") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("oneHour") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("twoHours") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("halfDay") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("day") })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: t("twoPersonKayak") }),
            /* @__PURE__ */ jsx(TableCell, { children: "€15" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€25" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€35" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€60" })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 md:p-6 border border-ocean-light overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(User, { className: "h-6 w-6 text-ocean" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-ocean-dark", children: t("onePersonKayak") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableCaption, { children: t("includeLife") }),
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: t("type") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("oneHour") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("twoHours") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("halfDay") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("day") })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: t("onePersonKayak") }),
            /* @__PURE__ */ jsx(TableCell, { children: "€10" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€18" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€30" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€50" })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 md:p-6 border border-ocean-light overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Waves, { className: "h-6 w-6 text-ocean" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-ocean-dark", children: t("paddleTitle") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableCaption, { children: t("allEquipment") }),
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: t("type") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("oneHour") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("twoHours") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("halfDay") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("day") })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: t("paddleBoard") }),
            /* @__PURE__ */ jsx(TableCell, { children: "€12" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€20" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€30" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€50" })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 md:p-6 border border-ocean-light overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Bike, { className: "h-6 w-6 text-ocean" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-ocean-dark", children: t("waterBike") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableCaption, { children: t("allEquipment") }),
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: t("type") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("thirtyMinutes") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("oneHour") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("halfDay") }),
            /* @__PURE__ */ jsx(TableHead, { children: t("day") })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: t("waterBike") }),
            /* @__PURE__ */ jsx(TableCell, { children: "€15" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€20" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€50" }),
            /* @__PURE__ */ jsx(TableCell, { children: "€90" })
          ] }) })
        ] }) })
      ] })
    ] })
  ] }) });
};
const BusinessHours = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id: "hours", className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: t("businessHours") }),
      /* @__PURE__ */ jsx("p", { className: "section-subtitle", children: t("whenVisit") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-8 w-8 text-ocean" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-ocean-dark", children: t("dailyHours") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-gray-200", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: t("everyday") }),
        /* @__PURE__ */ jsx("span", { className: "text-ocean font-semibold", children: "11:00 AM - 8:00 PM" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-yellow-800 mb-2", children: t("pleaseNote") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700", children: t("weatherNote") })
      ] })
    ] }) })
  ] }) });
};
const Location = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id: "location", className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-title", children: t("findUs") }),
      /* @__PURE__ */ jsx("p", { className: "section-subtitle", children: t("locationSubtitle") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "md:flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-ocean mt-1" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-ocean-dark", children: "OpenSea Almuñecar" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
              "Pl. San Cristóbal",
              /* @__PURE__ */ jsx("br", {}),
              "18690 Almuñécar",
              /* @__PURE__ */ jsx("br", {}),
              "Granada, Spain"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              t("howToFindUs"),
              ":"
            ] }),
            " ",
            t("locationDescription")
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://maps.google.com/?q=36.729069,-3.694842",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "btn-primary inline-flex items-center gap-2",
              children: [
                t("getDirections"),
                /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4 rotate-[135deg]" })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:w-1/2 h-72 md:h-auto", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.3!2d-3.694842!3d36.729069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQzJzQ0LjYiTiAzwrA0MSczOS40Ilc!5e0!3m2!1sen!2ses!4v1716400674084!5m2!1sen!2ses",
          width: "100%",
          height: "100%",
          style: { border: 0 },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade"
        }
      ) })
    ] }) })
  ] }) });
};
const Footer = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("footer", { className: "bg-ocean-dark text-white pt-16 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "OpenSea" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6", children: t("description") })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-4", children: t("quickLinks") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#services", className: "hover:text-ocean-light transition-colors", children: t("ourServices") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#prices", className: "hover:text-ocean-light transition-colors", children: t("ourPrices") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#hours", className: "hover:text-ocean-light transition-colors", children: t("businessHours") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#location", className: "hover:text-ocean-light transition-colors", children: t("findUs") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xl font-semibold mb-4", children: t("businessHours") }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5 text-ocean-light" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: t("everyday") }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "11:00 AM - 8:00 PM" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-ocean-light" }),
            /* @__PURE__ */ jsx("span", { children: t("address") })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/20 mt-12 pt-6 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " OpenSea Kayak & Paddle Surf. ",
      t("allRightsReserved")
    ] }) })
  ] }) });
};
const SEO = ({
  title,
  description,
  keywords,
  image = "https://opensea-almunecar.com/images/og-default.jpg",
  type = "website",
  structuredData
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const baseUrl = "https://opensea-almunecar.com";
  const currentUrl = `${baseUrl}${location.pathname}`;
  const hreflangUrls = {
    en: location.pathname.replace(/^\/(es|fr)/, ""),
    es: location.pathname.startsWith("/es") ? location.pathname : `/es${location.pathname}`,
    fr: location.pathname.startsWith("/fr") ? location.pathname : `/fr${location.pathname}`
  };
  Object.keys(hreflangUrls).forEach((lang) => {
    hreflangUrls[lang] = hreflangUrls[lang].replace(/\/\//g, "/").replace(/\/$/, "") || "/";
  });
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
    },
    "sameAs": [
      "https://www.facebook.com/opensea.almunecar",
      "https://www.instagram.com/opensea.almunecar"
    ]
  };
  const finalStructuredData = structuredData || defaultStructuredData;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: currentUrl }),
    /* @__PURE__ */ jsx("html", { lang: language }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: `${baseUrl}${hreflangUrls.en}` }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "es", href: `${baseUrl}${hreflangUrls.es}` }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "fr", href: `${baseUrl}${hreflangUrls.fr}` }),
    /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: `${baseUrl}/` }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: currentUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: language === "es" ? "es_ES" : language === "fr" ? "fr_FR" : "en_US" }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "OpenSea Kayak & Paddle Surf" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@opensea_kayak" }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
    /* @__PURE__ */ jsx("meta", { name: "googlebot", content: "index, follow" }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: "OpenSea Kayak & Paddle Surf" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "ES-AN" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: "Almuñécar" }),
    /* @__PURE__ */ jsx("meta", { name: "geo.position", content: "36.7334;-3.6909" }),
    /* @__PURE__ */ jsx("meta", { name: "ICBM", content: "36.7334, -3.6909" }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(finalStructuredData) })
  ] });
};
const AboutUs = () => {
  const { language } = useLanguage();
  const content = {
    en: {
      title: "About OpenSea - Your Local Water Sports Experts",
      subtitle: "Operating on Playa de San Cristóbal since 2015",
      description: "Founded by passionate water sports enthusiasts, OpenSea has been introducing visitors and locals to the beauty of Costa Tropical's coastline for nearly a decade. Our team of certified instructors and local guides ensures safe, memorable experiences on the Mediterranean.",
      stats: [
        { icon: Clock, label: "Years of Experience", value: "5+" },
        { icon: Users, label: "Happy Customers", value: "1,000+" },
        { icon: Award, label: "5-Star Reviews", value: "50+" },
        { icon: Shield, label: "Safety Record", value: "100%" }
      ],
      certifications: "All our instructors are certified by the Spanish Federation of Surfing and Paddling (FES) and hold current first aid and water rescue certifications.",
      commitment: "We're committed to sustainable tourism and protecting our beautiful marine environment. All our activities follow eco-friendly practices to preserve Costa Tropical for future generations."
    },
    es: {
      title: "Sobre OpenSea - Tus Expertos Locales en Deportes Acuáticos",
      subtitle: "Operando en Playa de San Cristóbal desde 2015",
      description: "Fundada por apasionados de los deportes acuáticos, OpenSea ha estado introduciendo a visitantes y locales a la belleza de la costa de la Costa Tropical durante casi una década. Nuestro equipo de instructores certificados y guías locales garantiza experiencias seguras y memorables en el Mediterráneo.",
      stats: [
        { icon: Clock, label: "Años de Experiencia", value: "5+" },
        { icon: Users, label: "Clientes Satisfechos", value: "1,000+" },
        { icon: Award, label: "Reseñas 5 Estrellas", value: "50+" },
        { icon: Shield, label: "Record de Seguridad", value: "100%" }
      ],
      certifications: "Todos nuestros instructores están certificados por la Federación Española de Surf (FES) y poseen certificaciones actuales de primeros auxilios y rescate acuático.",
      commitment: "Estamos comprometidos con el turismo sostenible y la protección de nuestro hermoso entorno marino. Todas nuestras actividades siguen prácticas eco-amigables para preservar la Costa Tropical para las futuras generaciones."
    },
    fr: {
      title: "À Propos d'OpenSea - Vos Experts Locaux en Sports Nautiques",
      subtitle: "Opérant sur Playa de San Cristóbal depuis 2015",
      description: "Fondée par des passionnés de sports nautiques, OpenSea initie les visiteurs et les locaux à la beauté du littoral de la Costa Tropical depuis près d'une décennie. Notre équipe d'instructeurs certifiés et de guides locaux garantit des expériences sûres et mémorables sur la Méditerranée.",
      stats: [
        { icon: Clock, label: "Années d'Expérience", value: "5+" },
        { icon: Users, label: "Clients Satisfaits", value: "1,000+" },
        { icon: Award, label: "Avis 5 Étoiles", value: "50+" },
        { icon: Shield, label: "Record de Sécurité", value: "100%" }
      ],
      certifications: "Tous nos instructeurs sont certifiés par la Fédération Espagnole de Surf (FES) et détiennent des certifications actuelles en premiers secours et sauvetage aquatique.",
      commitment: "Nous sommes engagés dans le tourisme durable et la protection de notre magnifique environnement marin. Toutes nos activités suivent des pratiques éco-responsables pour préserver la Costa Tropical pour les générations futures."
    }
  };
  const data = content[language];
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-4", children: data.title }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-center text-gray-600 mb-12", children: data.subtitle }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center mb-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed mb-6", children: data.description }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-6", children: data.certifications }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 italic", children: data.commitment })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: data.stats.map((stat, index) => {
        const Icon = stat.icon;
        return /* @__PURE__ */ jsxs(Card, { className: "p-6 text-center", children: [
          /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-blue-600 mx-auto mb-3" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold mb-1", children: stat.value }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: stat.label })
        ] }, index);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/lovable-uploads/kayak.jpeg",
          alt: "OpenSea team providing kayak instruction at Playa San Cristóbal, Almuñécar",
          className: "rounded-lg shadow-lg mx-auto mb-4 max-w-full h-auto",
          loading: "lazy",
          width: "800",
          height: "600"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: language === "en" ? "Our experienced team ready to guide you on your Mediterranean adventure" : language === "es" ? "Nuestro equipo experimentado listo para guiarte en tu aventura mediterránea" : "Notre équipe expérimentée prête à vous guider dans votre aventure méditerranéenne" })
    ] })
  ] }) }) });
};
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
      "https://opensea-almunecar.com/images/kayak-beach.jpg",
      "https://opensea-almunecar.com/images/paddle-surf.jpg",
      "https://opensea-almunecar.com/images/location.jpg"
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
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(organizationSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(reviewSchema) })
  ] });
};
const Index = () => {
  const { language } = useLanguage();
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords
      }
    ),
    /* @__PURE__ */ jsx(SchemaMarkup, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Services, {}),
    /* @__PURE__ */ jsx(Prices, {}),
    /* @__PURE__ */ jsx(BusinessHours, {}),
    /* @__PURE__ */ jsx(Location, {}),
    /* @__PURE__ */ jsx(AboutUs, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef((_ka, ref) => {
  var _la = _ka, { className } = _la, props = __objRest(_la, ["className"]);
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    __spreadValues({
      ref,
      className: cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef((_ma, ref) => {
  var _na = _ma, { className, children } = _na, props = __objRest(_na, ["className", "children"]);
  return /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )
      }, props), {
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = (_oa) => {
  var _pa = _oa, {
    className
  } = _pa, props = __objRest(_pa, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DialogHeader.displayName = "DialogHeader";
const DialogFooter = (_qa) => {
  var _ra = _qa, {
    className
  } = _ra, props = __objRest(_ra, [
    "className"
  ]);
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef((_sa, ref) => {
  var _ta = _sa, { className } = _ta, props = __objRest(_ta, ["className"]);
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    __spreadValues({
      ref,
      className: cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )
    }, props)
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef((_ua, ref) => {
  var _va = _ua, { className } = _va, props = __objRest(_va, ["className"]);
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    __spreadValues({
      ref,
      className: cn("text-sm text-muted-foreground", className)
    }, props)
  );
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Input = React.forwardRef(
  (_wa, ref) => {
    var _xa = _wa, { className, type } = _xa, props = __objRest(_xa, ["className", "type"]);
    return /* @__PURE__ */ jsx(
      "input",
      __spreadValues({
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref
      }, props)
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef((_ya, ref) => {
  var _za = _ya, { className } = _za, props = __objRest(_za, ["className"]);
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    __spreadValues({
      ref,
      className: cn(labelVariants(), className)
    }, props)
  );
});
Label.displayName = LabelPrimitive.Root.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef((_Aa, ref) => {
  var _Ba = _Aa, { className, children } = _Ba, props = __objRest(_Ba, ["className", "children"]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
      ]
    })
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef((_Ca, ref) => {
  var _Da = _Ca, { className } = _Da, props = __objRest(_Da, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
    })
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef((_Ea, ref) => {
  var _Fa = _Ea, { className } = _Fa, props = __objRest(_Fa, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
    })
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef((_Ga, ref) => {
  var _Ha = _Ga, { className, children, position = "popper" } = _Ha, props = __objRest(_Ha, ["className", "children", "position"]);
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position
    }, props), {
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    })
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef((_Ia, ref) => {
  var _Ja = _Ia, { className } = _Ja, props = __objRest(_Ja, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    __spreadValues({
      ref,
      className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
    }, props)
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef((_Ka, ref) => {
  var _La = _Ka, { className, children } = _La, props = __objRest(_La, ["className", "children"]);
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    })
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef((_Ma, ref) => {
  var _Na = _Ma, { className } = _Na, props = __objRest(_Na, ["className"]);
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    __spreadValues({
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className)
    }, props)
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const RadioGroup = React.forwardRef((_Oa, ref) => {
  var _Pa = _Oa, { className } = _Pa, props = __objRest(_Pa, ["className"]);
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    __spreadProps(__spreadValues({
      className: cn("grid gap-2", className)
    }, props), {
      ref
    })
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef((_Qa, ref) => {
  var _Ra = _Qa, { className } = _Ra, props = __objRest(_Ra, ["className"]);
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    })
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
function Calendar(_Sa) {
  var _Ta = _Sa, {
    className,
    classNames,
    showOutsideDays = true
  } = _Ta, props = __objRest(_Ta, [
    "className",
    "classNames",
    "showOutsideDays"
  ]);
  return /* @__PURE__ */ jsx(
    DayPicker,
    __spreadValues({
      showOutsideDays,
      className: cn("p-3", className),
      classNames: __spreadValues({
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible"
      }, classNames),
      components: {
        IconLeft: (_a) => {
          var _props = __objRest(_a, []);
          return /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" });
        },
        IconRight: (_b) => {
          var _props = __objRest(_b, []);
          return /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" });
        }
      }
    }, props)
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef((_Ua, ref) => {
  var _Va = _Ua, { className, align = "center", sideOffset = 4 } = _Va, props = __objRest(_Va, ["className", "align", "sideOffset"]);
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    __spreadValues({
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  ) });
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const ReservationDialog = ({ children }) => {
  const { t } = useLanguage();
  const { toast: toast2 } = useToast();
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState("kayak");
  const [duration, setDuration] = useState("1");
  const [date, setDate] = useState(void 0);
  const [time, setTime] = useState("11:00");
  const [price, setPrice] = useState(12);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  useEffect(() => {
    let basePrice = 0;
    if (activity === "kayak") {
      if (duration === "1") basePrice = 12;
      else if (duration === "2") basePrice = 20;
      else if (duration === "half") basePrice = 35;
    } else {
      if (duration === "1") basePrice = 15;
      else if (duration === "2") basePrice = 25;
      else if (duration === "half") basePrice = 40;
    }
    setPrice(basePrice);
  }, [activity, duration]);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast2({
      title: "Reservation submitted!",
      description: `We'll contact you soon to confirm your ${activity} reservation for ${date ? format(date, "PPP") : ""} at ${time}.`
    });
    setOpen(false);
    setActivity("kayak");
    setDuration("1");
    setDate(void 0);
    setTime("11:00");
    setName("");
    setEmail("");
    setPhone("");
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-md", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: t("makeReservation") }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          t("selectActivity"),
          ", ",
          t("selectDuration"),
          ", ",
          t("selectDate")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "activity", children: t("selectActivity") }),
          /* @__PURE__ */ jsxs(
            RadioGroup,
            {
              id: "activity",
              value: activity,
              onValueChange: setActivity,
              className: "flex space-x-2",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { value: "kayak", id: "kayak" }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "kayak", children: t("kayak") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { value: "paddle", id: "paddle" }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "paddle", children: t("paddleSurf") })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "duration", children: t("selectDuration") }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: duration,
              onValueChange: setDuration,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: "duration", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: t("selectDuration") }) }),
                /* @__PURE__ */ jsxs(SelectContent, { position: "popper", className: "bg-white", children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "1", children: t("oneHour") }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "2", children: t("twoHours") }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "half", children: t("halfDay") })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date", children: t("selectDate") }),
          /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                id: "date",
                className: cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                  date ? format(date, "PPP") : t("selectDate")
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0 bg-white", align: "start", children: /* @__PURE__ */ jsx(
              Calendar,
              {
                mode: "single",
                selected: date,
                onSelect: setDate,
                initialFocus: true,
                className: cn("p-3 pointer-events-auto"),
                disabled: (date2) => date2 < /* @__PURE__ */ new Date()
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "time", children: t("selectTime") }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: time,
              onValueChange: setTime,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: "time", className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: t("selectTime") }) }),
                /* @__PURE__ */ jsx(SelectContent, { position: "popper", className: "bg-white", children: timeSlots.map((timeSlot) => /* @__PURE__ */ jsx(SelectItem, { value: timeSlot, children: timeSlot }, timeSlot)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-ocean-light pt-2 mt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "price", className: "text-lg font-medium", children: [
            t("price"),
            ":"
          ] }),
          /* @__PURE__ */ jsxs("span", { id: "price", className: "text-xl font-bold text-ocean-dark", children: [
            "€",
            price
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-ocean-light pt-2 mt-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: t("yourDetails") }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: t("name") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: name,
                onChange: (e) => setName(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2 mt-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: t("email") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2 mt-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: t("phone") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                required: true
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: t("cancel") }),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: t("reserve") })
      ] })
    ] }) })
  ] });
};
const KayakRental = () => {
  const { t, language } = useLanguage();
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords,
        structuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative h-[60vh] bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-4", children: content.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8", children: content.subtitle }),
      /* @__PURE__ */ jsx(ReservationDialog, { children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-white text-blue-900 hover:bg-gray-100", children: t("reserveButton") }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed max-w-3xl mx-auto text-center", children: content.intro }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Why Choose Our Kayak Rentals" : language === "es" ? "Por Qué Elegir Nuestro Alquiler de Kayaks" : "Pourquoi Choisir Nos Locations de Kayaks" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: content.features.map((feature, index) => /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3", children: feature.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: feature.desc })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Kayak Rental Prices" : language === "es" ? "Precios de Alquiler de Kayak" : "Prix de Location de Kayak" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: t("oneHour") }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "15€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: t("twoHours") }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "25€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              t("halfDay"),
              " (4h)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "35€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              t("day"),
              " (8h)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "50€" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-gray-600 text-center", children: t("includeLife") })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Find Us in Almuñécar" : language === "es" ? "Encuéntranos en Almuñécar" : "Trouvez-nous à Almuñécar" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: t("address") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsxs("p", { children: [
            t("everyday"),
            ": 10:00 - 19:00"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsx("p", { children: "+34 666 666 666" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords,
        structuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative h-[60vh] bg-gradient-to-b from-cyan-900 to-cyan-700 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-4", children: content.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8", children: content.subtitle }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(ReservationDialog, { children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-white text-cyan-900 hover:bg-gray-100", children: t("reserveButton") }) }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "text-white border-white hover:bg-white/10", children: t("viewPricesButton") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed max-w-3xl mx-auto text-center", children: content.intro }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Why Choose Our SUP Rentals" : language === "es" ? "Por Qué Elegir Nuestro Alquiler SUP" : "Pourquoi Choisir Nos Locations SUP" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: content.benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return /* @__PURE__ */ jsxs(Card, { className: "p-6 text-center", children: [
          /* @__PURE__ */ jsx(Icon, { className: "w-12 h-12 text-cyan-600 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-3", children: benefit.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: benefit.desc })
        ] }, index);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "SUP Activities in Almuñécar" : language === "es" ? "Actividades SUP en Almuñécar" : "Activités SUP à Almuñécar" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: content.activities.map((activity, index) => /* @__PURE__ */ jsxs(Card, { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-cyan-600 rounded-full" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg", children: activity })
      ] }, index)) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Stand Up Paddle Board Prices" : language === "es" ? "Precios de Paddle Surf" : "Prix de Stand Up Paddle" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxs(Card, { className: "p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: t("oneHour") }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "15€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: t("twoHours") }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "25€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              t("halfDay"),
              " (4h)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "35€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              t("day"),
              " (8h)"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "50€" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: language === "en" ? "SUP Yoga Class (90 min)" : language === "es" ? "Clase SUP Yoga (90 min)" : "Cours SUP Yoga (90 min)" }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "30€" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-gray-600 text-center", children: t("allEquipment") })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "SUP Location in Almuñécar" : language === "es" ? "Ubicación SUP en Almuñécar" : "Emplacement SUP à Almuñécar" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-cyan-600" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: t("address") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-cyan-600" }),
          /* @__PURE__ */ jsxs("p", { children: [
            t("everyday"),
            ": 10:00 - 19:00"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-cyan-600" }),
          /* @__PURE__ */ jsx("p", { children: "+34 666 666 666" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoData[language].title,
        description: seoData[language].description,
        keywords: seoData[language].keywords,
        structuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "relative h-[60vh] bg-gradient-to-b from-blue-900 via-blue-800 to-cyan-700 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-4", children: content.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8", children: content.subtitle }),
      /* @__PURE__ */ jsx(ReservationDialog, { children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-white text-blue-900 hover:bg-gray-100", children: t("reserveButton") }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed max-w-3xl mx-auto text-center", children: content.intro }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Our Water Sports & Activities" : language === "es" ? "Nuestros Deportes y Actividades Acuáticas" : "Nos Sports et Activités Nautiques" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: content.activities.map((activity, index) => {
        const Icon = activity.icon;
        return /* @__PURE__ */ jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(Icon, { className: "w-10 h-10 text-blue-600 flex-shrink-0" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: activity.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-3", children: activity.desc }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: activity.duration }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-600", children: activity.price })
            ] })
          ] })
        ] }) }, index);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Why Choose OpenSea Costa Tropical" : language === "es" ? "Por Qué Elegir OpenSea Costa Tropical" : "Pourquoi Choisir OpenSea Costa Tropical" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: content.whyChoose.map((reason, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: reason })
      ] }, index)) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-4", children: language === "en" ? "Ready for Your Mediterranean Adventure?" : language === "es" ? "¿Listo para tu Aventura Mediterránea?" : "Prêt pour Votre Aventure Méditerranéenne?" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: language === "en" ? "Book your water sports experience today and create unforgettable memories on the Costa Tropical" : language === "es" ? "Reserva tu experiencia de deportes acuáticos hoy y crea recuerdos inolvidables en la Costa Tropical" : "Réservez votre expérience de sports nautiques aujourd'hui et créez des souvenirs inoubliables sur la Costa Tropical" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(ReservationDialog, { children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "bg-white text-blue-600 hover:bg-gray-100", children: t("reserveButton") }) }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "text-white border-white hover:bg-white/10", children: language === "en" ? "Call Us" : language === "es" ? "Llámanos" : "Appelez-nous" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: language === "en" ? "Visit Us in Almuñécar" : language === "es" ? "Visítanos en Almuñécar" : "Visitez-nous à Almuñécar" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto text-center space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: t("address") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsxs("p", { children: [
            t("everyday"),
            ": 10:00 - 19:00"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsx("p", { children: "+34 666 666 666" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs(LanguageProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/kayak-rental-almunecar", element: /* @__PURE__ */ jsx(KayakRental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/paddle-board-almunecar", element: /* @__PURE__ */ jsx(PaddleBoard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/sea-activities-costa-tropical", element: /* @__PURE__ */ jsx(SeaActivities, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es/alquiler-kayak-almunecar", element: /* @__PURE__ */ jsx(KayakRental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es/paddle-surf-almunecar", element: /* @__PURE__ */ jsx(PaddleBoard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/es/actividades-maritimas-costa-tropical", element: /* @__PURE__ */ jsx(SeaActivities, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr/location-kayak-almunecar", element: /* @__PURE__ */ jsx(KayakRental, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr/paddle-board-almunecar", element: /* @__PURE__ */ jsx(PaddleBoard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fr/activites-maritimes-costa-tropical", element: /* @__PURE__ */ jsx(SeaActivities, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/kayak", element: /* @__PURE__ */ jsx(Navigate, { to: "/kayak-rental-almunecar", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/paddle", element: /* @__PURE__ */ jsx(Navigate, { to: "/paddle-board-almunecar", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/activities", element: /* @__PURE__ */ jsx(Navigate, { to: "/sea-activities-costa-tropical", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] })
] }) }) }) }) });
createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(App, {}));
