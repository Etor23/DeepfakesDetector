import { conclusions, hypothesis } from '../data/researchData'
import { IconCheck } from './icons'

export default function Conclusions() {
  return (
    <section className="section" id="conclusiones">
      <div className="section__head">
        <h2 className="section__title">Conclusiones</h2>
      </div>

      <ul className="conclusions">
        {conclusions.map((c) => (
          <li className="conclusions__item" key={c}>
            <span className="conclusions__icon" aria-hidden="true">
              <IconCheck size={18} />
            </span>
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <div className="hypothesis">
        <h3 className="subhead">Hipótesis</h3>
        <blockquote className="quote__text">{hypothesis.statement}</blockquote>
        <p className="hypothesis__result">
          <strong>Resultado:</strong> {hypothesis.result}
        </p>
      </div>
    </section>
  )
}
