
export function getCurrencyUSD(_n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(_n)
}