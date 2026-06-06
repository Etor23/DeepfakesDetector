/**
 * Iconos SVG en línea (sin dependencias externas).
 * Son decorativos por defecto (aria-hidden): el texto siempre los acompaña,
 * por lo que el significado nunca depende solo del icono o del color.
 */

function Svg({ size = 24, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function IconSun(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  )
}

export function IconMoon(props) {
  return (
    <Svg {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </Svg>
  )
}

export function IconMenu(props) {
  return (
    <Svg {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Svg>
  )
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function IconAudio(props) {
  return (
    <Svg {...props}>
      <path d="M3 10v4M7 7v10M11 4v16M15 8v8M19 6v12M23 10v4" />
    </Svg>
  )
}

export function IconImage(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </Svg>
  )
}

export function IconVideo(props) {
  return (
    <Svg {...props}>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="M22 8l-6 4 6 4V8z" />
    </Svg>
  )
}

export function IconFile(props) {
  return (
    <Svg {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </Svg>
  )
}

export function IconGlobe(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </Svg>
  )
}

export function IconChat(props) {
  return (
    <Svg {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l1.9-5.1A8.5 8.5 0 1 1 21 11.5z" />
    </Svg>
  )
}

export function IconFacebook(props) {
  return (
    <Svg {...props}>
      <path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z" />
    </Svg>
  )
}

export function IconCamera(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="18" height="14" rx="3" />
      <circle cx="12" cy="14" r="3.5" />
      <path d="M8 7l1.5-2h5L16 7" />
    </Svg>
  )
}

export function IconMusicNote(props) {
  return (
    <Svg {...props}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </Svg>
  )
}

export function IconPlay(props) {
  return (
    <Svg {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function IconTrophy(props) {
  return (
    <Svg {...props}>
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4v1a4 4 0 0 0 3 3.8M17 6h3v1a4 4 0 0 1-3 3.8" />
    </Svg>
  )
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="M20 6L9 17l-5-5" />
    </Svg>
  )
}

export function IconInfo(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </Svg>
  )
}

export function IconAlert(props) {
  return (
    <Svg {...props}>
      <path d="M12 3l9 16H3l9-16z" />
      <path d="M12 10v4M12 17h.01" />
    </Svg>
  )
}

export function IconArrowDown(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  )
}
