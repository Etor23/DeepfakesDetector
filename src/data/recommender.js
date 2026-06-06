/**
 * recommender.js
 * -----------------------------------------------------------------------------
 * Lógica del Recomendador de detector. NO contiene métricas propias: todas las
 * cifras se leen desde researchData.js (fuente única). Aquí solo viven los
 * criterios de ordenamiento descritos en el estudio.
 * -----------------------------------------------------------------------------
 */
import {
  detectors,
  accuracyByLevel,
  perturbationTiers,
  originById,
} from './researchData'

// Pesos base por tipo de archivo (criterios del estudio):
//  - Imagen: prioriza recall/sensibilidad y menor FNR (su mayor problema son los FN).
//  - Video: balance entre accuracy, recall, F1-score y MCC.
//  - Audio: métricas generales (el rendimiento global en audio fue perfecto).
const baseWeights = {
  audio: { accuracy: 0.2, precision: 0.15, recall: 0.15, f1: 0.2, mcc: 0.2, fpr: 0.05, fnr: 0.05 },
  imagen: { accuracy: 0.15, precision: 0.05, recall: 0.3, f1: 0.15, mcc: 0.1, fpr: 0.0, fnr: 0.25 },
  video: { accuracy: 0.3, precision: 0.1, recall: 0.2, f1: 0.2, mcc: 0.2, fpr: 0.05, fnr: 0.1 },
}

// Ajuste por nivel de perturbación:
//  - Alta perturbación: más importancia a recall y FNR.
//  - Baja perturbación (original/leve): más peso a accuracy y precisión.
function adjustWeights(weights, tierKey) {
  const w = { ...weights }
  if (tierKey === 'alta') {
    w.recall += 0.1
    w.fnr += 0.1
  } else if (tierKey === 'original' || tierKey === 'leve') {
    w.accuracy += 0.1
    w.precision += 0.1
  }
  return w
}

export function getTierForOrigin(originId, manualTierKey) {
  const origin = originById[originId]
  if (!origin) return perturbationTiers.leve
  if (origin.manual && manualTierKey && perturbationTiers[manualTierKey]) {
    return perturbationTiers[manualTierKey]
  }
  return perturbationTiers[origin.tier] || perturbationTiers.leve
}

// Métrica clave a graficar según el caso seleccionado.
export function getHighlightMetric(fileType, tierKey) {
  if (fileType === 'imagen') return 'recall'
  if (tierKey === 'alta') return 'recall'
  if (fileType === 'video') return 'mcc'
  return 'accuracy'
}

export function recommend(fileType, originId, manualTierKey) {
  const tier = getTierForOrigin(originId, manualTierKey)
  const weights = adjustWeights(
    baseWeights[fileType] || baseWeights.video,
    tier.key
  )

  const results = detectors
    .map((d) => {
      const m = d.metrics
      // Accuracy usada para el puntaje: la del detector EN EL NIVEL
      // seleccionado (dato real del estudio). Así el origen sí afecta el orden.
      const levelAcc = accuracyByLevel[d.id]?.[tier.levelIndex]
      const accUsed = typeof levelAcc === 'number' ? levelAcc : m.accuracy
      const supported = d.supportedModalities.includes(fileType)

      const score =
        weights.accuracy * accUsed +
        weights.precision * m.precision +
        weights.recall * m.recall +
        weights.f1 * m.f1 +
        weights.mcc * m.mcc -
        weights.fpr * m.fpr -
        weights.fnr * m.fnr

      return { detector: d, score, levelAccuracy: accUsed, supported }
    })
    // Compatibles primero (ordenados por puntaje); los no compatibles al final.
    .sort((a, b) => {
      if (a.supported !== b.supported) return a.supported ? -1 : 1
      return b.score - a.score
    })

  return {
    tier,
    weights,
    results,
    highlightMetric: getHighlightMetric(fileType, tier.key),
  }
}
