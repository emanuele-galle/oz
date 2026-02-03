// OZ Extrait - Business Constants

export const FREE_SHIPPING_THRESHOLD = 200; // EUR
export const CURRENCY = 'EUR';
export const BRAND_NAME = 'OZ Extrait';
export const SITE_URL = 'https://oz.fodivps2.cloud';

// Shipping costs by zone
export const SHIPPING_COSTS = {
  IT: 5,
  EU: 10,
  EXTRA_EU: 15,
} as const;

// EU countries (+ CH, GB, NO for shipping zone purposes)
export const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL',
  'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // Non-EU but EU shipping zone
  'CH', 'GB', 'NO',
] as const;
