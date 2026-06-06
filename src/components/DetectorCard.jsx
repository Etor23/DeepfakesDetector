import { metricOrder, rankingBadges } from '../data/researchData'
import MetricBar from './MetricBar'

const MODALITY_LABEL = { audio: 'Audio', imagen: 'Imagen', video: 'Video' }

export default function DetectorCard({ detector }) {
  const badge = rankingBadges[detector.id]

  return (
    <article
      className="detector-card"
      style={{ '--card-accent': detector.accent }}
    >
      <header className="detector-card__head">
        <div>
          <h3 className="detector-card__name">{detector.name}</h3>
          <p className="detector-card__tagline">{detector.tagline}</p>
        </div>
        <span className="detector-card__n">n = {detector.n}</span>
      </header>

      {badge ? (
        <span className={`badge badge--${badge.tone}`}>{badge.label}</span>
      ) : null}

      <p className="detector-card__summary">{detector.summary}</p>

      <div className="detector-card__modalities">
        <span className="detector-card__modalities-label">Procesa:</span>
        <ul className="chips chips--sm" aria-label="Modalidades que procesa">
          {detector.supportedModalities.map((m) => (
            <li className="chip chip--sm" key={m}>
              {MODALITY_LABEL[m] || m}
            </li>
          ))}
        </ul>
      </div>

      <div className="detector-card__metrics">
        {metricOrder.map((key) => (
          <MetricBar key={key} metricKey={key} value={detector.metrics[key]} />
        ))}
      </div>
    </article>
  )
}
