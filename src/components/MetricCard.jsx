/** Tarjeta de indicador para una métrica/dato global. */
export default function MetricCard({ label, value, hint, tone = 'default', icon }) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      {icon ? (
        <div className="metric-card__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <div className="metric-card__value">{value}</div>
      <div className="metric-card__label">{label}</div>
      {hint ? <div className="metric-card__hint">{hint}</div> : null}
    </article>
  )
}
