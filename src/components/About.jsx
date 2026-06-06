import {
  researchQuestion,
  generalObjective,
  perturbations,
} from '../data/researchData'

const ABOUT_CARDS = [
  {
    title: '¿Qué son los deepfakes?',
    body: 'Son contenidos sintéticos —imágenes, videos o audios— generados o manipulados con inteligencia artificial. Resultan muy convincentes y difuminan los límites entre lo auténtico y lo manipulado.',
  },
  {
    title: '¿Por qué son un problema?',
    body: 'No solo existe el contenido falso: circula con rapidez y puede afectar la seguridad, la reputación de personas e instituciones y la confianza pública, facilitando desinformación, suplantación de identidad y fraude.',
  },
  {
    title: '¿Por qué fallan los detectores?',
    body: 'Los modelos dependen de patrones aprendidos. La compresión, la recodificación, la baja resolución o el ruido eliminan señales finas que usan los detectores, reduciendo su capacidad para distinguir contenido real del manipulado.',
  },
  {
    title: '¿Qué compara este estudio?',
    body: 'La robustez de tres herramientas —Deepware Scanner, Hive Moderation y Resemble AI— cuando los archivos se someten a perturbaciones comunes de circulación digital.',
  },
]

export default function About() {
  return (
    <section className="section" id="investigacion">
      <div className="section__head">
        <h2 className="section__title">Sobre la investigación</h2>
        <p className="section__lead">
          El estudio evalúa la robustez de detectores de deepfakes frente a
          perturbaciones comunes en la circulación digital.
        </p>
      </div>

      <div className="about__grid">
        {ABOUT_CARDS.map((card) => (
          <article className="about__card" key={card.title}>
            <h3 className="about__card-title">{card.title}</h3>
            <p className="about__card-body">{card.body}</p>
          </article>
        ))}
      </div>

      <div className="about__perturbations">
        <h3 className="about__sub">Perturbaciones consideradas</h3>
        <ul className="chips" aria-label="Lista de perturbaciones consideradas">
          {perturbations.map((p) => (
            <li className="chip" key={p}>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="quote-grid">
        <figure className="quote">
          <figcaption className="quote__label">
            Pregunta de investigación
          </figcaption>
          <blockquote className="quote__text">{researchQuestion}</blockquote>
        </figure>
        <figure className="quote">
          <figcaption className="quote__label">Objetivo general</figcaption>
          <blockquote className="quote__text">{generalObjective}</blockquote>
        </figure>
      </div>
    </section>
  )
}
