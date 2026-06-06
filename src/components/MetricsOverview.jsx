import {
  globalMetrics,
  globalCounts,
  detectors,
} from '../data/researchData'
import { toFixed } from '../utils/format'
import MetricCard from './MetricCard'
import { IconTrophy, IconAlert } from './icons'

const COUNTS = [
  { key: 'tp', label: 'Verdaderos positivos (TP)' },
  { key: 'tn', label: 'Verdaderos negativos (TN)' },
  { key: 'fp', label: 'Falsos positivos (FP)' },
  { key: 'fn', label: 'Falsos negativos (FN)' },
  { key: 'na', label: 'Indecisión (NA)' },
]

export default function MetricsOverview() {
  const winner = detectors[0]

  return (
    <section className="section band" id="resumen">
      <div className="section__head">
        <h2 className="section__title">Datos globales del estudio</h2>
        <p className="section__lead">
          Métricas calculadas sobre {globalCounts.total} clasificaciones binarias
          válidas (sin casos NA).
        </p>
      </div>

      <div className="cards-grid cards-grid--6">
        <MetricCard
          label="Accuracy global"
          value={toFixed(globalMetrics.accuracy, 3)}
          tone="good"
        />
        <MetricCard
          label="F1-Score global"
          value={toFixed(globalMetrics.f1, 3)}
          tone="good"
        />
        <MetricCard
          label="MCC global"
          value={toFixed(globalMetrics.mcc, 3)}
          tone="good"
        />
        <MetricCard
          label="Total de muestras"
          value={globalCounts.total}
          tone="accent"
        />
        <MetricCard
          label="Falsos negativos"
          value={globalCounts.fn}
          tone="warn"
          hint="Error predominante"
          icon={<IconAlert size={22} />}
        />
        <MetricCard
          label="Detector ganador"
          value={winner.name}
          tone="accent"
          hint="Mejor desempeño general"
          icon={<IconTrophy size={22} />}
        />
      </div>

      <div className="counts">
        {COUNTS.map((c) => (
          <div className={`counts__item counts__item--${c.key}`} key={c.key}>
            <span className="counts__value">{globalCounts[c.key]}</span>
            <span className="counts__label">{c.label}</span>
          </div>
        ))}
      </div>

      <p className="note">
        <IconAlert size={16} />
        <span>
          El error predominante fue el falso negativo: deepfakes reales
          clasificados como auténticos.
        </span>
      </p>
    </section>
  )
}
