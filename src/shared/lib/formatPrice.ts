/**
 * Formats a numeric price as a localized currency string.
 * Defaults to Russian rubles for the land-search domain context.
 */
export function formatPrice(value: number, currency = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
