// Utilidades de formato numérico compartidas.

export function toPct(value, decimals = 1) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return `${(value * 100).toFixed(decimals)}%`
}

export function toFixed(value, decimals = 3) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return value.toFixed(decimals)
}
