import { metricMeta } from '../data/researchData'
import { toFixed } from '../utils/format'

/**
 * Barra de progreso para una métrica.
 * No depende solo del color: muestra el valor numérico y un indicador textual
 * ("↑ mejor" / "↓ mejor") para señalar la dirección deseable.
 */
export default function MetricBar({ metricKey, value }) {
  const meta = metricMeta[metricKey]
  if (!meta) return null

  const pct = Math.max(0, Math.min(1, value)) * 100
  const valueText = toFixed(value, 3)
  const tone = meta.higherIsBetter ? 'good' : 'bad'

  return (
    <div className="metric-bar">
      <div className="metric-bar__head">
        <span className="metric-bar__label">{meta.label}</span>
        <span className="metric-bar__value">{valueText}</span>
      </div>
      <div
        className="metric-bar__track"
        role="progressbar"
        aria-valuenow={Number(pct.toFixed(0))}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${meta.label}: ${valueText} (${
          meta.higherIsBetter ? 'más alto es mejor' : 'más bajo es mejor'
        })`}
      >
        <span
          className={`metric-bar__fill metric-bar__fill--${tone}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="metric-bar__hint">
        {meta.higherIsBetter ? '↑ mejor' : '↓ mejor'}
      </span>
    </div>
  )
}
