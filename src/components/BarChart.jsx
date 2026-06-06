import { toFixed } from '../utils/format'

/**
 * Gráfica de barras horizontal sin dependencias externas.
 * Escala fija 0–1 para representar de forma honesta las métricas del estudio.
 */
export default function BarChart({ title, subtitle, data }) {
  return (
    <figure className="barchart">
      {title ? <figcaption className="barchart__title">{title}</figcaption> : null}
      {subtitle ? <p className="barchart__subtitle">{subtitle}</p> : null}
      <div className="barchart__rows">
        {data.map((d) => {
          const pct = Math.max(0, Math.min(1, d.value)) * 100
          return (
            <div className="barchart__row" key={d.id}>
              <span className="barchart__name">{d.name}</span>
              <div className="barchart__track">
                <span
                  className="barchart__bar"
                  style={{ width: `${pct}%`, background: d.color }}
                  role="img"
                  aria-label={`${d.name}: ${toFixed(d.value, 3)}`}
                />
              </div>
              <span className="barchart__value">{toFixed(d.value, 3)}</span>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
