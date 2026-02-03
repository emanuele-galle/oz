// OZ Extrait - Shipping calculation

import { SHIPPING_COSTS, EU_COUNTRIES, FREE_SHIPPING_THRESHOLD } from './constants';

export type ShippingZone = 'IT' | 'EU' | 'EXTRA_EU';

export function getShippingZone(countryCode: string): ShippingZone {
  if (countryCode === 'IT') return 'IT';
  if ((EU_COUNTRIES as readonly string[]).includes(countryCode)) return 'EU';
  return 'EXTRA_EU';
}

export function calculateShippingCost(subtotal: number, countryCode: string): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  const zone = getShippingZone(countryCode);
  return SHIPPING_COSTS[zone];
}

export function getShippingLabel(subtotal: number, countryCode: string): string {
  const cost = calculateShippingCost(subtotal, countryCode);
  if (cost === 0) return 'Spedizione Gratuita';
  const zone = getShippingZone(countryCode);
  const zoneLabels: Record<ShippingZone, string> = {
    IT: 'Spedizione Italia',
    EU: 'Spedizione Europa',
    EXTRA_EU: 'Spedizione Internazionale',
  };
  return zoneLabels[zone];
}
