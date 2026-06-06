import { useState } from 'react'
import {
  fileTypeOptions,
  originOptions,
  perturbationTiers,
  metricOrder,
  metricMeta,
} from '../data/researchData'
import { recommend } from '../data/recommender'
import { toFixed } from '../utils/format'
import MetricBar from './MetricBar'
import BarChart from './BarChart'
import {
  IconAudio,
  IconImage,
  IconVideo,
  IconFile,
  IconChat,
  IconFacebook,
  IconCamera,
  IconMusicNote,
  IconPlay,
  IconGlobe,
  IconAlert,
  IconTrophy,
  IconInfo,
} from './icons'

const FILE_ICON = {
  audio: IconAudio,
  imagen: IconImage,
  video: IconVideo,
}

const ORIGIN_ICON = {
  original: IconFile,
  whatsapp: IconChat,
  facebook: IconFacebook,
  instagram: IconCamera,
  tiktok: IconMusicNote,
  youtube: IconPlay,
  otro: IconGlobe,
}

const FILE_LABEL = { audio: 'audio', imagen: 'imagen', video: 'video' }
const PLACE_CLASS = { 1: 'gold', 2: 'silver', 3: 'bronze' }
const MANUAL_TIERS = ['original', 'leve', 'moderada', 'alta']

function buildExplanation(entry, place, fileType, tier) {
  const d = entry.detector
  const m = d.metrics

  if (!entry.supported) {
    return `${d.name} no procesa ${FILE_LABEL[fileType]} (se especializa en video). Se muestra solo como comparación, con sus métricas globales.`
  }

  const opener =
    place === 1
      ? 'Aparece como la mejor opción para este caso. '
      : `Posición ${place} para este caso. `

  const parts = []
  if (d.id === 'resemble') {
    parts.push(
      `Mostró el mejor equilibrio general entre accuracy, recall, F1-score y MCC (MCC ${toFixed(
        m.mcc,
        3
      )}), con la omisión más baja (FNR ${toFixed(m.fnr, 3)}).`
    )
    if (fileType === 'imagen' || tier.key === 'alta') {
      parts.push(
        'Es especialmente útil aquí porque prioriza detectar deepfakes reales sin perder equilibrio.'
      )
    }
  } else if (d.id === 'hive') {
    parts.push(
      `Precisión perfecta (FPR ${toFixed(
        m.fpr,
        3
      )}): no genera falsas alarmas. Sin embargo, su FNR de ${toFixed(
        m.fnr,
        3
      )} implica que puede omitir más deepfakes.`
    )
    if (tier.key === 'original' || tier.key === 'leve') {
      parts.push('Buena opción cuando el costo de una falsa alarma es alto.')
    }
  } else if (d.id === 'deepware') {
    parts.push(
      `Especializado en video; en nivel ${tier.label} su accuracy fue ${toFixed(
        entry.levelAccuracy,
        3
      )}.`
    )
    parts.push(
      tier.key === 'leve'
        ? 'Es muy sensible a la compresión leve (cae a 0.364), por eso baja en el ranking.'
        : 'Sus métricas globales son más bajas frente a Resemble AI y Hive Moderation.'
    )
  }

  return opener + parts.join(' ')
}

function OptionButton(props) {
  const { active, onClick, Icon, label } = props
  return (
    <button
      type="button"
      className={`option-btn ${active ? 'is-active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="option-btn__icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <span className="option-btn__label">{label}</span>
    </button>
  )
}

export default function Recommender() {
  const [fileType, setFileType] = useState(null)
  const [originId, setOriginId] = useState(null)
  const [manualTier, setManualTier] = useState('leve')
  const [result, setResult] = useState(null)

  const selectedOrigin = originId
    ? originOptions.find((o) => o.id === originId)
    : null
  const showManual = selectedOrigin?.manual
  const canGenerate = Boolean(fileType && originId)

  const handleGenerate = () => {
    if (!canGenerate) return
    const r = recommend(fileType, originId, manualTier)
    setResult({ ...r, fileType, originId })
  }

  // Asigna posiciones (solo a detectores compatibles).
  let counter = 0
  const ranked = result
    ? result.results.map((entry) => {
        const place = entry.supported ? (counter += 1) : null
        return { entry, place }
      })
    : []

  const highlightMetric = result?.highlightMetric
  const highlightIsAccuracy = highlightMetric === 'accuracy'
  const chartData = result
    ? result.results.map((r) => ({
        id: r.detector.id,
        name: r.detector.name,
        value: highlightIsAccuracy
          ? r.levelAccuracy
          : r.detector.metrics[highlightMetric],
        color: r.detector.accent,
      }))
    : []

  return (
    <section className="section band" id="recomendador">
      <div className="section__head">
        <h2 className="section__title">Recomendador de detector</h2>
        <p className="section__lead">
          Asistente que ordena los detectores para tu caso usando únicamente las
          métricas reales del estudio.
        </p>
      </div>

      <div className="recommender">
        {/* Paso 1: tipo de archivo */}
        <div className="recommender__step">
          <h3 className="recommender__step-title">
            <span className="recommender__step-num">1</span> Tipo de archivo
          </h3>
          <div className="option-row">
            {fileTypeOptions.map((opt) => (
              <OptionButton
                key={opt.id}
                active={fileType === opt.id}
                onClick={() => setFileType(opt.id)}
                Icon={FILE_ICON[opt.id]}
                label={opt.label}
              />
            ))}
          </div>
        </div>

        {/* Paso 2: origen */}
        <div className="recommender__step">
          <h3 className="recommender__step-title">
            <span className="recommender__step-num">2</span> Posible origen del
            archivo
          </h3>
          <div className="option-row option-row--wrap">
            {originOptions.map((opt) => (
              <OptionButton
                key={opt.id}
                active={originId === opt.id}
                onClick={() => setOriginId(opt.id)}
                Icon={ORIGIN_ICON[opt.id]}
                label={opt.label}
              />
            ))}
          </div>

          {showManual ? (
            <div className="manual-tier">
              <span className="manual-tier__label">
                Nivel de perturbación estimado:
              </span>
              <div className="seg">
                {MANUAL_TIERS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`seg__btn ${manualTier === key ? 'is-active' : ''}`}
                    onClick={() => setManualTier(key)}
                    aria-pressed={manualTier === key}
                  >
                    {perturbationTiers[key].label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="btn btn--primary recommender__generate"
          onClick={handleGenerate}
          disabled={!canGenerate}
        >
          Generar recomendación
        </button>

        <p className="recommender__warning">
          <IconAlert size={16} />
          <span>
            El origen del archivo se usa como referencia aproximada del nivel de
            perturbación. La página no detecta automáticamente de qué red social
            proviene el archivo.
          </span>
        </p>
      </div>

      {result ? (
        <div className="recommender__result">
          <div className="recommender__summary">
            <IconTrophy size={18} />
            <span>
              Caso: <strong>{FILE_LABEL[result.fileType]}</strong> · origen{' '}
              <strong>{selectedOrigin?.label}</strong> · perturbación estimada{' '}
              <strong>{result.tier.label}</strong>
            </span>
          </div>

          <div className="rec-cards">
            {ranked.map(({ entry, place }) => {
              const d = entry.detector
              const placeClass = place ? PLACE_CLASS[place] || 'default' : 'na'
              return (
                <article
                  className={`rec-card rec-card--${placeClass} ${
                    entry.supported ? '' : 'rec-card--disabled'
                  }`}
                  key={d.id}
                  style={{ '--card-accent': d.accent }}
                >
                  <header className="rec-card__head">
                    <span className="rec-card__rank" aria-hidden="true">
                      {place ?? '—'}
                    </span>
                    <div>
                      <h4 className="rec-card__name">{d.name}</h4>
                      <p className="rec-card__place">
                        {entry.supported
                          ? `${place}.° lugar`
                          : `No compatible con ${FILE_LABEL[result.fileType]}`}
                      </p>
                    </div>
                  </header>

                  <p className="rec-card__why">
                    {buildExplanation(entry, place, result.fileType, result.tier)}
                  </p>

                  {entry.supported ? (
                    <p className="rec-card__levelacc">
                      Accuracy en nivel {result.tier.label}:{' '}
                      <strong>{toFixed(entry.levelAccuracy, 3)}</strong>
                    </p>
                  ) : null}

                  <div className="rec-card__metrics">
                    {metricOrder.map((key) => (
                      <MetricBar
                        key={key}
                        metricKey={key}
                        value={d.metrics[key]}
                      />
                    ))}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="rec-chart">
            <BarChart
              title={`Comparación de ${metricMeta[highlightMetric].label}${
                highlightIsAccuracy ? ` (nivel ${result.tier.label})` : ''
              } entre detectores`}
              subtitle="Métrica más relevante para el caso seleccionado."
              data={chartData}
            />
          </div>
        </div>
      ) : null}

      <div className="interpret">
        <h3 className="subhead">
          <IconInfo size={18} /> Cómo interpretar la recomendación
        </h3>
        <dl className="interpret__list">
          {metricOrder.map((key) => (
            <div className="interpret__item" key={key}>
              <dt>{metricMeta[key].label}</dt>
              <dd>{metricMeta[key].description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
