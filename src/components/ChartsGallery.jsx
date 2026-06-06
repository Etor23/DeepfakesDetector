import { useState } from 'react'
import { charts } from '../data/researchData'
import { IconAlert } from './icons'

// Vite resuelve en build las URLs de todas las imágenes de la carpeta.
const images = import.meta.glob('../assets/graficas/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

function resolve(file) {
  const entry = Object.entries(images).find(([path]) =>
    path.endsWith(`/${file}`)
  )
  return entry ? entry[1] : null
}

function ChartFigure({ chart }) {
  const [errored, setErrored] = useState(false)
  const src = resolve(chart.file)
  const showFallback = !src || errored

  return (
    <figure className="chart">
      <h3 className="chart__title">{chart.title}</h3>
      <div className="chart__media">
        {showFallback ? (
          <div className="chart__fallback" role="img" aria-label={chart.alt}>
            <IconAlert size={28} />
            <span>No se pudo cargar esta gráfica.</span>
          </div>
        ) : (
          <img
            src={src}
            alt={chart.alt}
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <figcaption className="chart__caption">{chart.caption}</figcaption>
    </figure>
  )
}

export default function ChartsGallery() {
  return (
    <section className="section band" id="graficas">
      <div className="section__head">
        <h2 className="section__title">Resultados visuales</h2>
        <p className="section__lead">
          Gráficas generadas a partir de los datos del estudio.
        </p>
      </div>

      <div className="charts-grid">
        {charts.map((c) => (
          <ChartFigure key={c.id} chart={c} />
        ))}
      </div>
    </section>
  )
}
