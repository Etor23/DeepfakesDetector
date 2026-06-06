import { site } from '../data/researchData'
import { IconInfo } from './icons'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner section">
        <p className="hero__eyebrow">
          <IconInfo size={16} />
          <span>Visualización web académica · No detecta en tiempo real</span>
        </p>

        <h1 className="hero__title">{site.title}</h1>
        <p className="hero__subtitle">{site.subtitle}</p>
        <p className="hero__desc">{site.description}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#resultados">
            Ver resultados
          </a>
          <a className="btn btn--ghost" href="#detectores">
            Comparar detectores
          </a>
          <a className="btn btn--ghost" href="#graficas">
            Ver gráficas
          </a>
        </div>

        <p className="hero__institution">{site.institution}</p>
      </div>
    </section>
  )
}
