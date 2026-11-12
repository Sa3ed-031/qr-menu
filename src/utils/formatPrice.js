export function formatPrice(value, currency) {
  return `${Number(value).toLocaleString("en-US")} ${currency}`;
}
