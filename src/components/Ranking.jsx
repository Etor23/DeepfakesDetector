import { detectors, rankingBadges, rankingNotes } from '../data/researchData'
import { toFixed } from '../utils/format'
import { IconTrophy } from './icons'

const MEDALS = ['1.°', '2.°', '3.°']
const PLACE_CLASS = ['gold', 'silver', 'bronze']
const KEY_METRICS = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'f1', label: 'F1' },
  { key: 'mcc', label: 'MCC' },
  { key: 'fnr', label: 'FNR' },
]

export default function Ranking() {
  return (
    <div className="ranking">
      {detectors.map((d, i) => {
        const badge = rankingBadges[d.id]
        return (
          <article
            className={`ranking__card ranking__card--${PLACE_CLASS[i]}`}
            key={d.id}
            style={{ '--card-accent': d.accent }}
          >
            <div className="ranking__rank">
              <span className="ranking__medal" aria-hidden="true">
                <IconTrophy size={18} />
              </span>
              <span className="ranking__place">{MEDALS[i]} lugar</span>
            </div>

            <h3 className="ranking__name">{d.name}</h3>
            {badge ? (
              <span className={`badge badge--${badge.tone}`}>{badge.label}</span>
            ) : null}
            <p className="ranking__note">{rankingNotes[d.id]}</p>

            <dl className="ranking__metrics">
              {KEY_METRICS.map((m) => (
                <div className="ranking__metric" key={m.key}>
                  <dt>{m.label}</dt>
                  <dd>{toFixed(d.metrics[m.key], 3)}</dd>
                </div>
              ))}
            </dl>
          </article>
        )
      })}
    </div>
  )
}
