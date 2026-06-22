// Single source of truth for site-wide constants (domain, NAP, geo).
// The live domain is opensea-almunecar.es — keep everything pointing here.
// To change the phone/socials later, edit only this file.

export const SITE_URL = "https://opensea-almunecar.es";

export const BUSINESS = {
  name: "OpenSea Kayak & Paddle Surf",
  // NAP matches the Google Business Profile (the source of truth) for local-SEO
  // consistency. Keep these in sync with the GBP listing.
  telephone: "+34722172004",
  telephoneDisplay: "+34 722 17 20 04",
  streetAddress: "Paseo Miguel Ángel Blanco, 2",
  addressLocality: "Almuñécar",
  addressRegion: "Granada",
  postalCode: "18690",
  addressCountry: "ES",
  // Precise coordinates of Playa de San Cristóbal pitch.
  latitude: 36.7294014,
  longitude: -3.695261,
  opens: "11:00",
  closes: "20:00",
  priceRange: "€€",
  // Real social URLs go here when available. The Google Business Profile is the
  // CID link below — listed in sameAs so Google ties this site to that entity.
  sameAs: ["https://maps.google.com/?cid=4081209814812519440"] as string[],
} as const;

// Canonical Google Business Profile (Maps place) — used for sameAs + schema hasMap.
export const GBP_URL = "https://maps.google.com/?cid=4081209814812519440";

// "Cómo llegar" deep-link: opens turn-by-turn directions to the pitch.
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.latitude},${BUSINESS.longitude}`;
