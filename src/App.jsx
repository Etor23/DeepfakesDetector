import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import MetricsOverview from './components/MetricsOverview.jsx'
import Detectors from './components/Detectors.jsx'
import Results from './components/Results.jsx'
import ChartsGallery from './components/ChartsGallery.jsx'
import Recommender from './components/Recommender.jsx'
import Conclusions from './components/Conclusions.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <MetricsOverview />
        <Detectors />
        <Results />
        <ChartsGallery />
        <Recommender />
        <Conclusions />
      </main>
      <Footer />
    </>
  )
}
