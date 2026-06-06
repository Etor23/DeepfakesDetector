import { useState } from 'react'
import {
  globalMetrics,
  globalCounts,
  detectors,
  byFileType,
  compressionLevels,
  accuracyByLevel,
  compressionNotes,
} from '../data/researchData'
import { toFixed } from '../utils/format'

const METRIC_COLS = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'precision', label: 'Precisión' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1', label: 'F1-Score' },
  { key: 'mcc', label: 'MCC' },
  { key: 'fpr', label: 'FPR' },
  { key: 'fnr', label: 'FNR' },
]

const TABS = [
  { id: 'global', label: 'Global' },
  { id: 'detector', label: 'Por detector' },
  { id: 'archivo', label: 'Por tipo de archivo' },
  { id: 'nivel', label: 'Por nivel de compresión' },
]

// Color tipo RdYlGn para el heatmap (0 = rojo, 1 = verde). El valor numérico
// siempre se muestra: el color es solo un apoyo visual, no la única señal.
function heatColor(value) {
  const hue = Math.max(0, Math.min(1, value)) * 120
  return `hsl(${hue}, 65%, 42%)`
}

function MetricsRows({ rows }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{rows.firstColLabel}</th>
            {METRIC_COLS.map((c) => (
              <th scope="col" key={c.key}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.data.map((r) => (
            <tr key={r.id}>
              <th scope="row">
                {r.label}
                {typeof r.n === 'number' ? (
                  <span className="table__sub"> (n = {r.n})</span>
                ) : null}
              </th>
              {METRIC_COLS.map((c) => (
                <td key={c.key}>{toFixed(r.metrics[c.key], 3)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ResultsTable() {
  const [active, setActive] = useState('global')

  return (
    <div className="results-tabs">
      <div className="tabs" role="tablist" aria-label="Vistas de resultados">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            className={`tab ${active === t.id ? 'is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === 'global' && (
        <div
          className="tab-panel"
          role="tabpanel"
          id="panel-global"
          aria-labelledby="tab-global"
        >
          <MetricsRows
            rows={{
              firstColLabel: 'Agrupación',
              data: [{ id: 'global', label: 'Global', n: globalCounts.total, metrics: globalMetrics }],
            }}
          />
          <p className="note">
            Conteos: TP {globalCounts.tp} · TN {globalCounts.tn} · FP{' '}
            {globalCounts.fp} · FN {globalCounts.fn} · NA {globalCounts.na}.
          </p>
        </div>
      )}

      {active === 'detector' && (
        <div
          className="tab-panel"
          role="tabpanel"
          id="panel-detector"
          aria-labelledby="tab-detector"
        >
          <MetricsRows
            rows={{
              firstColLabel: 'Detector',
              data: detectors.map((d) => ({
                id: d.id,
                label: d.name,
                n: d.n,
                metrics: d.metrics,
              })),
            }}
          />
        </div>
      )}

      {active === 'archivo' && (
        <div
          className="tab-panel"
          role="tabpanel"
          id="panel-archivo"
          aria-labelledby="tab-archivo"
        >
          <MetricsRows
            rows={{
              firstColLabel: 'Tipo de archivo',
              data: byFileType.map((t) => ({
                id: t.id,
                label: t.label,
                metrics: t.metrics,
              })),
            }}
          />
          <ul className="notes-list">
            {byFileType.map((t) => (
              <li key={t.id}>
                <strong>{t.label}:</strong> {t.note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {active === 'nivel' && (
        <div
          className="tab-panel"
          role="tabpanel"
          id="panel-nivel"
          aria-labelledby="tab-nivel"
        >
          <p className="section__lead">
            Accuracy por detector y nivel de compresión (mapa de calor).
          </p>
          <div className="table-wrap">
            <table className="table heatmap">
              <thead>
                <tr>
                  <th scope="col">Detector</th>
                  {compressionLevels.map((lvl) => (
                    <th scope="col" key={lvl.id}>
                      {lvl.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detectors.map((d) => (
                  <tr key={d.id}>
                    <th scope="row">{d.name}</th>
                    {compressionLevels.map((lvl) => {
                      const v = accuracyByLevel[d.id][lvl.id]
                      return (
                        <td
                          key={lvl.id}
                          className="heatmap__cell"
                          style={{ background: heatColor(v) }}
                          aria-label={`${d.name}, nivel ${lvl.label}: accuracy ${toFixed(
                            v,
                            3
                          )}`}
                        >
                          {toFixed(v, 3)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="notes-list">
            {detectors.map((d) => (
              <li key={d.id}>
                <strong>{d.name}:</strong> {compressionNotes[d.id]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
