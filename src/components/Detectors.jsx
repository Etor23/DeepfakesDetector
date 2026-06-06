import { detectors } from '../data/researchData'
import DetectorCard from './DetectorCard'

export default function Detectors() {
  return (
    <section className="section" id="detectores">
      <div className="section__head">
        <h2 className="section__title">Detectores evaluados</h2>
        <p className="section__lead">
          Tres herramientas con alcances distintos según el tipo de archivo
          analizado.
        </p>
      </div>

      <div className="cards-grid cards-grid--3">
        {detectors.map((d) => (
          <DetectorCard key={d.id} detector={d} />
        ))}
      </div>
    </section>
  )
}
