// Canonical prices — the single source of truth for the home Prices section AND
// the dedicated kayak/paddle pages, so they can never drift apart again.
// `nameKey`/`noteKey`/`labelKey` are i18n keys resolved via t() at render time.

export interface PriceRow {
  labelKey: string;
  price: string;
}

export interface Product {
  nameKey: string;
  noteKey: string;
  rows: PriceRow[];
}

export const PRODUCTS = {
  twoPersonKayak: {
    nameKey: 'twoPersonKayak',
    noteKey: 'includeLife',
    rows: [
      { labelKey: 'oneHour', price: '€15' },
      { labelKey: 'twoHours', price: '€25' },
      { labelKey: 'halfDay', price: '€35' },
      { labelKey: 'day', price: '€60' },
    ],
  },
  onePersonKayak: {
    nameKey: 'onePersonKayak',
    noteKey: 'includeLife',
    rows: [
      { labelKey: 'oneHour', price: '€10' },
      { labelKey: 'twoHours', price: '€18' },
      { labelKey: 'halfDay', price: '€30' },
      { labelKey: 'day', price: '€50' },
    ],
  },
  paddleSurf: {
    nameKey: 'paddleSurf',
    noteKey: 'allEquipment',
    rows: [
      { labelKey: 'oneHour', price: '€12' },
      { labelKey: 'twoHours', price: '€20' },
      { labelKey: 'halfDay', price: '€30' },
      { labelKey: 'day', price: '€50' },
    ],
  },
  waterBike: {
    nameKey: 'waterBike',
    noteKey: 'allEquipment',
    rows: [
      { labelKey: 'thirtyMinutes', price: '€15' },
      { labelKey: 'oneHour', price: '€20' },
      { labelKey: 'halfDay', price: '€50' },
      { labelKey: 'day', price: '€90' },
    ],
  },
} satisfies Record<string, Product>;

// Order shown on the home page.
export const HOME_PRODUCTS: Product[] = [
  PRODUCTS.twoPersonKayak,
  PRODUCTS.onePersonKayak,
  PRODUCTS.paddleSurf,
  PRODUCTS.waterBike,
];
