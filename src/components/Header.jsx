import { useState } from 'react'
import { useTheme } from '../context/themeContext'
import { site } from '../data/researchData'
import { IconSun, IconMoon, IconMenu, IconClose } from './icons'

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'investigacion', label: 'Investigación' },
  { id: 'detectores', label: 'Detectores' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'graficas', label: 'Gráficas' },
  { id: 'recomendador', label: 'Recomendador' },
  { id: 'conclusiones', label: 'Conclusiones' },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="#inicio" onClick={closeMenu}>
          <span className="header__brand-mark" aria-hidden="true">
            DR
          </span>
          <span className="header__brand-text">{site.name}</span>
        </a>

        <nav
          className={`header__nav ${open ? 'is-open' : ''}`}
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="header__link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Activar modo claro'
                : 'Activar modo oscuro'
            }
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
          </button>

          <button
            type="button"
            className="icon-btn header__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
