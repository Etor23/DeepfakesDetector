import { site, detectors } from '../data/researchData'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <p className="footer__brand">{site.name}</p>
          <p className="footer__theme">{site.title}</p>
        </div>
        <div className="footer__col footer__meta">
          <p>
            <strong>Detectores evaluados:</strong>{' '}
            {detectors.map((d) => d.name).join(' · ')}
          </p>
          <p className="footer__note">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
