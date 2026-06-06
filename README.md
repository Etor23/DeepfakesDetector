# DeepfakeRank

**Robustez de detectores de deepfakes frente a perturbaciones visuales y/o sonoras.**

Análisis comparativo de **Deepware Scanner**, **Hive Moderation** y **Resemble AI**
frente a compresión y degradación de archivos de video, imagen y audio.

## Descripción

DeepfakeRank es una **visualización web académica** de los resultados de una
investigación experimental. La página explica el estudio, los detectores
evaluados, la metodología, los resultados, las gráficas y las conclusiones, e
incluye un **recomendador interactivo de detectores** basado únicamente en las
métricas reales del estudio.

> ⚠️ **Importante:** la página **no realiza detección de deepfakes en tiempo
> real**. Solo presenta y explica resultados de investigación. El "origen" del
> archivo en el recomendador es una **estimación aproximada del nivel de
> perturbación**, no una detección automática de la red social de procedencia.

## Características

- Datos **centralizados** en `src/data/researchData.js` (fuente única). Todos los
  componentes —incluido el recomendador— leen desde ahí; no hay cifras inventadas
  ni duplicadas.
- **Recomendador de detector** interactivo: elige tipo de archivo y origen, y el
  ranking se reordena dinámicamente según los criterios del estudio.
- Galería de las **10 gráficas** del estudio con títulos, explicaciones y texto
  alternativo accesible.
- **Modo claro y oscuro** (botón en la barra superior; por defecto, oscuro).
- Diseño **responsive** (móvil, tablet y escritorio) y accesible.

## Tecnologías

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- ESLint (flat config)
- Sin librerías de gráficas externas: las visualizaciones interactivas usan
  SVG/CSS propios para mantener las dependencias al mínimo.

## Requisitos

- Node.js 18 o superior.

## Instalación

```bash
npm install
```

## Cómo correr (desarrollo)

```bash
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

## Cómo construir (producción)

```bash
npm run build
```

Los archivos optimizados quedan en `dist/`. Para previsualizar el build:

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Estructura del proyecto

```
la pagina/
├─ index.html
├─ package.json
├─ vite.config.js
├─ eslint.config.js
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   ├─ assets/graficas/        # 10 gráficas PNG del estudio
   ├─ context/                # ThemeProvider (modo claro/oscuro)
   ├─ data/
   │  ├─ researchData.js       # FUENTE ÚNICA de métricas y textos
   │  └─ recommender.js        # lógica del recomendador (lee de researchData)
   ├─ utils/format.js
   └─ components/
      ├─ Header.jsx  Hero.jsx  About.jsx  MetricsOverview.jsx
      ├─ Detectors.jsx  DetectorCard.jsx  Ranking.jsx
      ├─ ResultsTable.jsx  Results.jsx  ChartsGallery.jsx
      ├─ Recommender.jsx  Conclusions.jsx  Footer.jsx
      ├─ MetricCard.jsx  MetricBar.jsx  BarChart.jsx  icons.jsx
```

## Fuente de los datos

Los datos provienen del documento de investigación
*"Investigacion deepfakes v4 FINAL"* y de las hojas de cálculo y gráficas del
paquete *"graficas_deepfakes_vFinal"* (`metricas_resumen.xlsx`,
`hipotesis_completa.xlsx` y las imágenes PNG).

---

*Sitio informativo basado en resultados experimentales. No realiza detección en
tiempo real.*
