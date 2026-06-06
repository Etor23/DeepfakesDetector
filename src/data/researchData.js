/**
 * researchData.js
 * -----------------------------------------------------------------------------
 * FUENTE ÚNICA Y CENTRALIZADA DE DATOS del sitio DeepfakeRank.
 *
 * Todos los valores provienen de:
 *   - "Investigacion deepfakes v4 FINAL.docx"
 *   - "metricas_resumen.xlsx" y "hipotesis_completa.xlsx" (graficas_deepfakes_vFinal.zip)
 *
 * Ningún número de la página (incluido el Recomendador) está inventado ni
 * duplicado: todos los componentes leen desde este archivo.
 * -----------------------------------------------------------------------------
 */

// --- Identidad del proyecto -------------------------------------------------
export const site = {
  name: 'DeepfakeRank',
  title:
    'Robustez de detectores de deepfakes frente a perturbaciones visuales y/o sonoras',
  subtitle:
    'Análisis comparativo de Deepware Scanner, Hive Moderation y Resemble AI frente a compresión y degradación de archivos de video, imagen y audio.',
  description:
    'Visualización web académica de los resultados de una investigación experimental. La página no detecta deepfakes en tiempo real: solo presenta y explica los resultados del estudio.',
  institution: 'Instituto Tecnológico de Delicias — Taller de Investigación II',
  disclaimer:
    'Sitio informativo basado en resultados experimentales. No realiza detección en tiempo real.',
}

// --- Pregunta y objetivo ----------------------------------------------------
export const researchQuestion =
  '¿En qué medida Deepware Scanner, Hive Moderation y Resemble AI mantienen su rendimiento y fiabilidad para detectar deepfakes de imagen, video y audio cuando los contenidos son sometidos a perturbaciones comunes como compresión, reducción de tamaño, baja resolución, cambios de iluminación, ruido ambiental, eco y reverberación?'

export const generalObjective =
  'Evaluar y comparar la robustez de Deepware Scanner, Hive Moderation y Resemble AI frente a perturbaciones aplicadas a archivos de video, imagen y audio, cuantificando la degradación de su desempeño.'

// Tipos de perturbación evaluados / comunes en circulación digital.
export const perturbations = [
  'Compresión ligera',
  'Compresión media o moderada',
  'Compresión severa',
  'Baja resolución',
  'Recodificación',
  'Pérdida de calidad',
  'Ruido ambiental, eco o reverberación en audio',
]

// --- Metadatos de métricas (para barras y "Cómo interpretar") ---------------
// higherIsBetter: true  -> más alto es mejor
// higherIsBetter: false -> más bajo es mejor (errores)
export const metricMeta = {
  accuracy: {
    key: 'accuracy',
    label: 'Accuracy',
    higherIsBetter: true,
    description: 'Porcentaje total de predicciones correctas.',
  },
  precision: {
    key: 'precision',
    label: 'Precisión',
    higherIsBetter: true,
    description: 'Qué tan confiables son las alertas positivas (deepfake).',
  },
  recall: {
    key: 'recall',
    label: 'Recall / Sensibilidad',
    higherIsBetter: true,
    description: 'Qué tantos deepfakes reales logra detectar.',
  },
  f1: {
    key: 'f1',
    label: 'F1-Score',
    higherIsBetter: true,
    description: 'Resume el equilibrio entre precisión y recall.',
  },
  mcc: {
    key: 'mcc',
    label: 'MCC',
    higherIsBetter: true,
    description:
      'Mide el rendimiento general incluso cuando los datos están desbalanceados (rango −1 a 1).',
  },
  fpr: {
    key: 'fpr',
    label: 'FPR',
    higherIsBetter: false,
    description: 'Tasa de falsas alarmas (contenido real marcado como deepfake).',
  },
  fnr: {
    key: 'fnr',
    label: 'FNR',
    higherIsBetter: false,
    description: 'Tasa de casos reales (deepfakes) que no fueron detectados.',
  },
}

// Orden canónico de métricas para las barras de progreso.
export const metricOrder = [
  'accuracy',
  'precision',
  'recall',
  'f1',
  'mcc',
  'fpr',
  'fnr',
]

// --- Conteos y métricas globales -------------------------------------------
export const globalCounts = {
  total: 259,
  tp: 95,
  tn: 114,
  fp: 10,
  fn: 40,
  na: 0,
}

export const globalMetrics = {
  accuracy: 0.807,
  precision: 0.905,
  recall: 0.704,
  f1: 0.792,
  mcc: 0.634,
  fpr: 0.081,
  fnr: 0.296,
}

// --- Detectores -------------------------------------------------------------
// supportedModalities: modalidades que la herramienta puede procesar.
// Deepware Scanner se centra solo en video (no analiza audio ni imágenes).
export const detectors = [
  {
    id: 'resemble',
    name: 'Resemble AI',
    n: 97,
    supportedModalities: ['audio', 'imagen', 'video'],
    tagline: 'Voz sintética y detección multimodal (audio, imagen y video).',
    summary:
      'Plataforma enfocada en voz sintética y detección multimodal. Fue el detector con mejor desempeño general y logró el mejor equilibrio entre falsos positivos y falsos negativos.',
    accent: '#22d3ee',
    metrics: {
      accuracy: 0.845,
      precision: 0.917,
      recall: 0.8,
      f1: 0.854,
      mcc: 0.698,
      fpr: 0.095,
      fnr: 0.2,
    },
  },
  {
    id: 'hive',
    name: 'Hive Moderation',
    n: 112,
    supportedModalities: ['audio', 'imagen', 'video'],
    tagline: 'Detector multimodal (imagen, video y audio).',
    summary:
      'Detector multimodal que obtuvo precisión perfecta. Su principal problema fue la omisión de deepfakes, es decir, los falsos negativos.',
    accent: '#a855f7',
    metrics: {
      accuracy: 0.804,
      precision: 1.0,
      recall: 0.607,
      f1: 0.756,
      mcc: 0.66,
      fpr: 0.0,
      fnr: 0.393,
    },
  },
  {
    id: 'deepware',
    name: 'Deepware Scanner',
    n: 50,
    supportedModalities: ['video'],
    tagline: 'Especializado en video; detección de manipulación facial.',
    summary:
      'Especializado principalmente en video, enfocado en detección de manipulación facial. En el estudio fue el detector más sensible a perturbaciones, especialmente afectado por la compresión leve.',
    accent: '#f59e0b',
    metrics: {
      accuracy: 0.74,
      precision: 0.739,
      recall: 0.708,
      f1: 0.723,
      mcc: 0.479,
      fpr: 0.231,
      fnr: 0.292,
    },
  },
]

// Mapa id -> detector (utilidad).
export const detectorsById = detectors.reduce((acc, d) => {
  acc[d.id] = d
  return acc
}, {})

// --- Ranking general (badges) ----------------------------------------------
// El orden de "detectors" ya está por desempeño general; aquí los distintivos.
export const rankingBadges = {
  resemble: { label: 'Mejor desempeño general', tone: 'good' },
  hive: { label: 'Mayor precisión (FPR 0.000)', tone: 'accent' },
  deepware: { label: 'Más vulnerable a compresión', tone: 'warn' },
}

export const rankingNotes = {
  resemble:
    'Mejor desempeño general y mejor equilibrio entre errores (accuracy, recall, F1-Score y MCC).',
  hive: 'No generó falsos positivos, pero omitió varios deepfakes (FNR 0.393).',
  deepware:
    'Desempeño más bajo y mayor vulnerabilidad ante perturbaciones, sobre todo en compresión leve.',
}

// --- Resultados por tipo de archivo ----------------------------------------
export const byFileType = [
  {
    id: 'audio',
    label: 'Audio',
    note: 'Modalidad más robusta: rendimiento perfecto en todos los indicadores.',
    metrics: {
      accuracy: 1.0,
      precision: 1.0,
      recall: 1.0,
      f1: 1.0,
      mcc: 1.0,
      fpr: 0.0,
      fnr: 0.0,
    },
  },
  {
    id: 'video',
    label: 'Video',
    note: 'Desempeño intermedio, asociado principalmente a Deepware Scanner.',
    metrics: {
      accuracy: 0.74,
      precision: 0.739,
      recall: 0.708,
      f1: 0.723,
      mcc: 0.479,
      fpr: 0.231,
      fnr: 0.292,
    },
  },
  {
    id: 'imagen',
    label: 'Imagen',
    note: 'Modalidad más vulnerable: muchas imágenes deepfake no fueron detectadas.',
    metrics: {
      accuracy: 0.619,
      precision: 0.846,
      recall: 0.4,
      f1: 0.543,
      mcc: 0.341,
      fpr: 0.095,
      fnr: 0.6,
    },
  },
]

export const byFileTypeById = byFileType.reduce((acc, t) => {
  acc[t.id] = t
  return acc
}, {})

// --- Niveles de compresión --------------------------------------------------
export const compressionLevels = [
  { id: 0, key: 'original', label: 'Original' },
  { id: 1, key: 'leve', label: 'Leve' },
  { id: 2, key: 'moderado', label: 'Moderado' },
  { id: 3, key: 'alto', label: 'Alto' },
]

// Accuracy por detector y nivel de compresión (índices 0..3).
export const accuracyByLevel = {
  deepware: [1.0, 0.364, 0.667, 0.857],
  hive: [0.857, 0.786, 0.786, 0.786],
  resemble: [0.84, 0.808, 0.818, 0.917],
}

export const compressionNotes = {
  deepware: 'Tuvo la caída más fuerte en compresión leve (de 1.000 a 0.364).',
  hive: 'Se mantuvo estable a lo largo de los cuatro niveles.',
  resemble: 'Se mantuvo estable y con buen desempeño general (mejor en nivel alto).',
}

// --- Prueba de hipótesis ----------------------------------------------------
export const hypothesis = {
  statement:
    'Las perturbaciones aplicadas a archivos de video, imagen y audio reducen en al menos un 20% el desempeño de Deepware Scanner, Hive Moderation y Resemble AI en la detección de deepfakes, según la modalidad admitida por cada detector.',
  result:
    'La hipótesis solo se confirmó de forma estadísticamente significativa para Deepware Scanner en compresión leve (caída de 69.2%, p ajustado = 0.006, prueba exacta de Fisher con corrección de Bonferroni).',
}

// --- Conclusiones -----------------------------------------------------------
export const conclusions = [
  'La robustez no fue igual entre detectores.',
  'Resemble AI tuvo el mejor desempeño general.',
  'Hive Moderation fue muy preciso, pero omitió varios deepfakes.',
  'Deepware Scanner fue el más sensible a perturbaciones.',
  'El audio fue la modalidad más robusta.',
  'La imagen fue la modalidad más vulnerable.',
  'El error predominante fue el falso negativo (deepfakes reales clasificados como auténticos).',
  'La hipótesis solo se confirmó de forma estadísticamente significativa para Deepware Scanner en compresión leve.',
  'Los resultados no significan que un detector sea perfecto: su rendimiento depende del tipo de archivo y de la perturbación aplicada.',
]

// --- Galería de gráficas (ZIP) ----------------------------------------------
// 'file' coincide con el nombre real dentro de src/assets/graficas/.
export const charts = [
  {
    id: 'g1',
    file: 'g1_distribucion_global.png',
    title: 'Distribución global de clasificaciones',
    caption:
      'Conteo total de TP (95), TN (114), FP (10) y FN (40). El error predominante fue la omisión de deepfakes reales (FN = 15.4%).',
    alt: 'Gráfica de la distribución global de clasificaciones: verdaderos positivos, verdaderos negativos, falsos positivos y falsos negativos.',
  },
  {
    id: 'g2',
    file: 'g2_por_detector.png',
    title: 'Clasificaciones por detector',
    caption:
      'Conteos apilados de TP, TN, FP y FN para cada detector. Hive acumuló el mayor volumen de clasificaciones y la mayor cantidad de falsos negativos.',
    alt: 'Gráfica de barras apiladas de clasificaciones por cada detector evaluado.',
  },
  {
    id: 'g4',
    file: 'g4_por_nivel.png',
    title: 'Clasificaciones por nivel de compresión',
    caption:
      'Resultados según el nivel de perturbación aplicado (0–3). La proporción de falsos negativos se mantiene en todos los niveles sin un patrón claramente creciente.',
    alt: 'Gráfica de clasificaciones distribuidas por nivel de compresión.',
  },
  {
    id: 'g5',
    file: 'g5_heatmap_accuracy.png',
    title: 'Accuracy por detector y nivel',
    caption:
      'Mapa de calor de la accuracy por nivel. Deepware Scanner registró la caída más severa en nivel leve (0.36), mientras Hive y Resemble se mantuvieron estables.',
    alt: 'Mapa de calor de la accuracy de cada detector en los cuatro niveles de compresión.',
  },
  {
    id: 'g6',
    file: 'g6_heatmap_f1.png',
    title: 'F1-Score por detector y tipo de archivo',
    caption:
      'Hive y Resemble obtuvieron F1 perfecto en audio (1.00), pero menor desempeño en imagen. Deepware Scanner solo opera con video (F1 = 0.72).',
    alt: 'Mapa de calor del F1-Score por detector y por tipo de archivo.',
  },
  {
    id: 'g7',
    file: 'g7_mcc_detector.png',
    title: 'MCC por detector',
    caption:
      'Resemble AI lideró con MCC = 0.698, seguido de Hive (0.660) y Deepware Scanner (0.479). Ningún detector alcanzó correlación fuerte con la clasificación real.',
    alt: 'Gráfica de barras del coeficiente de correlación de Matthews (MCC) por detector.',
  },
  {
    id: 'g8',
    file: 'g8_tasa_na.png',
    title: 'Tasa de NA (indecisión)',
    caption:
      'Los tres detectores registraron 0% de indecisión en todas las combinaciones evaluadas: siempre emitieron una clasificación definitiva.',
    alt: 'Gráfica de la tasa de NA (casos sin clasificación) por detector y tipo de archivo.',
  },
  {
    id: 'g9',
    file: 'g9_score_violin.png',
    title: 'Distribución del score por clasificación',
    caption:
      'Los TP se concentran cerca de 1.0 y los TN cerca de 0.0. Los FP se emitieron con alta confianza (mediana ≈ 0.95) y los FN presentaron distribución bimodal.',
    alt: 'Gráfica de violín de la distribución del score de confianza por tipo de clasificación.',
  },
  {
    id: 'g11',
    file: 'g11_acierto_detector_nivel.png',
    title: 'Tasa de acierto por detector y nivel',
    caption:
      'Deepware Scanner mostró el comportamiento más irregular (0.93 en original y 0.29 en leve). Hive y Resemble mantuvieron valores consistentes entre niveles.',
    alt: 'Gráfica de la tasa de acierto media por detector y nivel de compresión.',
  },
  {
    id: 'g12',
    file: 'g12_fpr_fnr_scatter.png',
    title: 'FPR vs. FNR por detector',
    caption:
      'Los tres detectores se ubican en la zona de bajo FPR pero FNR variable. Resemble AI logró el mejor equilibrio; Hive eliminó falsas alarmas a costa de más omisiones.',
    alt: 'Gráfica de dispersión de la tasa de falsos positivos (FPR) frente a falsos negativos (FNR) por detector.',
  },
]

// --- Recomendador: catálogos y lógica de perturbación -----------------------
export const fileTypeOptions = [
  { id: 'audio', label: 'Audio' },
  { id: 'imagen', label: 'Imagen' },
  { id: 'video', label: 'Video' },
]

// Niveles de perturbación aproximados (referencia, NO detección real).
export const perturbationTiers = {
  original: { key: 'original', label: 'Original', levelIndex: 0 },
  leve: { key: 'leve', label: 'Leve', levelIndex: 1 },
  moderada: { key: 'moderada', label: 'Moderada', levelIndex: 2 },
  alta: { key: 'alta', label: 'Alta', levelIndex: 3 },
}

// Origen aproximado -> nivel de perturbación estimado.
// IMPORTANTE: es una estimación del nivel de perturbación, NO una detección
// automática de la red social de origen.
export const originOptions = [
  { id: 'original', label: 'Archivo original', tier: 'original' },
  { id: 'whatsapp', label: 'WhatsApp', tier: 'alta' },
  { id: 'facebook', label: 'Facebook', tier: 'moderada' },
  { id: 'instagram', label: 'Instagram', tier: 'moderada' },
  { id: 'tiktok', label: 'TikTok', tier: 'alta' },
  { id: 'youtube', label: 'YouTube', tier: 'leve' },
  { id: 'otro', label: 'Otro', tier: 'leve', manual: true },
]

export const originById = originOptions.reduce((acc, o) => {
  acc[o.id] = o
  return acc
}, {})
