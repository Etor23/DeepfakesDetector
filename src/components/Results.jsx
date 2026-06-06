import Ranking from './Ranking'
import ResultsTable from './ResultsTable'

export default function Results() {
  return (
    <section className="section" id="resultados">
      <div className="section__head">
        <h2 className="section__title">Resultados</h2>
        <p className="section__lead">
          Ranking general de detectores y exploración interactiva de las métricas
          por agrupación.
        </p>
      </div>

      <h3 className="subhead">Ranking de detectores</h3>
      <Ranking />

      <h3 className="subhead">Explora los resultados</h3>
      <ResultsTable />
    </section>
  )
}
